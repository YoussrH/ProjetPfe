"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { usePagination, useTable } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Toaster, toast } from "react-hot-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CategoryTable = () => {
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [name, setName] = useState("");
  const [parentId, setParentId] = useState("");
  const [page, setPage] = useState(0);
  const pageSize = 5;

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/categories");
      const categoriesData = response.data;
      const updatedCategories = categoriesData.map(category => {
        const parent = categoriesData.find(cat => cat.id === category.parentId);
        return {
          ...category,
          parentCategory: parent ? parent.name : "None",
        };
      });
      setCategories(updatedCategories);
    } catch (error) {
      toast.error("Failed to load categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/categories/${id}`);
      toast.success("Category deleted successfully");
      fetchCategories();
    } catch (error) {
      toast.error("Failed to delete category");
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setName(category.name);
    setParentId(category.parentId || "");
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/categories/${editingCategory.id}`, {
        name,
        parentId: parentId || null,
      });
      toast.success("Category updated successfully");
      setEditingCategory(null);
      fetchCategories();
    } catch (error) {
      toast.error("Failed to update category");
    }
  };

  const columns = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "parentCategory",
      header: "Parent Category",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleEdit(row.original)}>Edit</Button>
          <Button variant="destructive" onClick={() => handleDelete(row.original.id)}>Delete</Button>
        </div>
      ),
    },
  ];

  const paginatedCategories = categories.slice(page * pageSize, (page + 1) * pageSize);

  return (
    <div className="p-6 rounded-lg">
      <Toaster position="top-right" reverseOrder={false} />
      <h2 className="text-xl font-semibold mb-4">Category Management</h2>
      <DataTable columns={columns} data={paginatedCategories} />
      <div className="flex justify-between items-center mt-4">
        <Button
          disabled={page === 0}
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
        >
          Previous
        </Button>
        <span>Page {page + 1} of {Math.ceil(categories.length / pageSize)}</span>
        <Button
          disabled={(page + 1) * pageSize >= categories.length}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </div>
      {editingCategory && (
        <Dialog open={!!editingCategory} onOpenChange={() => setEditingCategory(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Category</DialogTitle>
            </DialogHeader>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Category Name" />
            <Select value={parentId} onValueChange={(value) => setParentId(value)}>
              <SelectTrigger><SelectValue placeholder="Select Parent Category" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="">None</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setEditingCategory(null)}>Cancel</Button>
              <Button onClick={handleUpdate}>Update</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default CategoryTable;
