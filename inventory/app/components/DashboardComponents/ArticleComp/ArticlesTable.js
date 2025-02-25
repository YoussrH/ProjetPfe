"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUpDown, MoreHorizontal, Edit, Trash, ChevronDown } from "lucide-react";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import EditArticleModal from "./EditArticleModal";

const ArticlesTable = () => {
  const [articles, setArticles] = useState([]);
  const [marques, setMarques] = useState([]);
  const [genres, setGenres] = useState([]);
  const [tailles, setTailles] = useState([]); // Add this line
  const [categories, setCategories] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  const handleEdit = (article) => {
    setSelectedArticle(article);
    setIsEditModalOpen(true);
  };

  const handleSave = (updatedArticle) => {
    setArticles((prev) =>
      prev.map((article) =>
        article.id === updatedArticle.id ? updatedArticle : article
      )
    );
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [articlesRes, marquesRes, genresRes, categoriesRes, taillesRes] = await Promise.all([
          axios.get("http://localhost:5000/api/articles"),
          axios.get("http://localhost:5000/api/marques"),
          axios.get("http://localhost:5000/api/genres"),
          axios.get("http://localhost:5000/api/categories"),
          axios.get("http://localhost:5000/api/tailles"),
        ]);

        // Map IDs to names
        const marquesMap = new Map(marquesRes.data.map(marque => [marque.id, marque.name]));
        const genresMap = new Map(genresRes.data.map(genre => [genre.id, genre.name]));
        const categoriesMap = new Map(categoriesRes.data.map(category => [category.id, category.name]));
        const taillesMap = new Map(taillesRes.data.map(taille => [taille.id, taille.name]));

        // Transform articles data
        const transformedArticles = articlesRes.data.map(article => ({
          ...article,
          marque: marquesMap.get(article.marqueId) || "N/A",
          genre: genresMap.get(article.genreId) || "N/A",
          category: categoriesMap.get(article.categoryId) || "N/A",
          tailles: article.tailles.map(id => taillesMap.get(id) || "N/A"),
        }));

        setArticles(transformedArticles);
        setMarques(marquesRes.data);
        setGenres(genresRes.data);
        setCategories(categoriesRes.data);
        setTailles(taillesRes.data); // Now `setTailles` is defined
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Échec du chargement des données");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  
  const columns = [
    {
      accessorKey: "images",
      header: "Image",
      cell: ({ row }) => (
        <div className="flex items-center">
          {row.getValue("images")?.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Preview ${index}`}
              className="w-10 h-10 object-cover rounded-lg mr-2"
            />
          ))}
        </div>
      ),
    },
    {
      accessorKey: "name",
      header: () => (
        <Button variant="ghost" onClick={() => setSorting([{ id: "name", desc: !sorting[0]?.desc }])}>
          Nom <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "sku",
      header: "SKU",
      cell: ({ row }) => <div>{row.getValue("sku")}</div>,
    },
    {
      accessorKey: "price",
      header: "Prix",
      cell: ({ row }) => <div>{row.getValue("price")} DT</div>,
    },
    {
      accessorKey: "stock",
      header: "Stock",
      cell: ({ row }) => <div>{row.getValue("stock")}</div>,
    },
    {
      accessorKey: "genre",
      header: "Genre",
      cell: ({ row }) => <div>{row.getValue("genre")}</div>,
    },
    {
      accessorKey: "category",
      header: "Catégorie",
      cell: ({ row }) => <div>{row.getValue("category")}</div>,
    },
    {
      accessorKey: "marque",
      header: "Marque",
      cell: ({ row }) => <div>{row.getValue("marque")}</div>,
    },
    {
      accessorKey: "tailles",
      header: "Tailles",
      cell: ({ row }) => {
        const tailles = row.getValue("tailles") || [];
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="font-sans">
              <DropdownMenuLabel>Tailles disponibles</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {tailles.map((taille, index) => (
                <DropdownMenuItem key={index} className="cursor-default">
                  {taille}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const article = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="font-sans">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => handleEdit(article)}>
                <Edit className="mr-2 h-4 w-4" /> Modifier
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleDelete(article.id)}>
                <Trash className="mr-2 h-4 w-4 text-red-700" /> Supprimer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  
  const table = useReactTable({
    data: articles,
    columns, // Now `columns` is defined before being used
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: { sorting, columnFilters, columnVisibility, rowSelection },
  });

  return (
    <div className="p-6 rounded-lg font-sans">
      <Toaster position="top-right" />
      <h2 className="text-xl font-normal mb-4">Tous les articles</h2>
  
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <p>Chargement en cours...</p>
        </div>
      ) : (
        <>
          {/* Filtre de recherche et sélection de colonnes */}
          <div className="flex items-center py-4">
            <Input
              placeholder="Filtrer les articles..."
              value={table.getColumn("name")?.getFilterValue() || ""}
              onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
              className="max-w-sm"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Colonnes <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table.getAllColumns()
                  .filter(column => column.getCanHide())
                  .map(column => (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
  
          {/* Tableau des articles */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map(headerGroup => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder ? null : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.length ? (
                  table.getRowModel().rows.map(row => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map(cell => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="text-center">
                      Aucun résultat.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
  
          {/* Pagination */}
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Précédent
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Suivant
              </Button>
            </div>
          </div>
        </>
      )}
  
      {/* Edit Modal */}
      {isEditModalOpen && (
        <EditArticleModal
          article={selectedArticle}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default ArticlesTable;