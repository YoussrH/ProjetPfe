'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dropzone } from '@/components/ui/dropzone';
import CustomDropdown from '../CustomDropdown';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export default function AjouterArticle() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    discount: '',
    stock: '',
    sku: '',
    images: [],
    seoTitle: '',
    seoKeywords: '',
    categoryId: '',
    marqueId: '',
  });

  const [categories, setCategories] = useState([]);
  const [marques, setMarques] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [selectedMainCategory, setSelectedMainCategory] = useState('');
  const [subcategories, setSubcategories] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  // Fetch categories and marques on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, marquesRes] = await Promise.all([
          axios.get('http://localhost:5000/api/categories'),
          axios.get('http://localhost:5000/api/marques'),
        ]);
        console.log("Categories Data:", categoriesRes.data);
        console.log("Marques Data:", marquesRes.data);
        setCategories(categoriesRes.data);
        setMarques(marquesRes.data);
      } catch (error) {
        console.error("Error loading categories/marques:", error);
        toast.error("Failed to load categories and brands.");
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file uploads & previews
  const handleFileUpload = (files) => {
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(prev => [...prev, ...newPreviews]);

    setFormData((prevState) => ({
      ...prevState,
      images: [...prevState.images, ...files],
    }));
  };

  // Handle main category change
  const handleMainCategoryChange = (value) => {
    setSelectedMainCategory(value);
    const selectedCat = categories.find(cat => cat.id === value);
    console.log("Selected Main Category:", selectedCat);

    if (selectedCat && selectedCat.subcategories) {
      setSubcategories(selectedCat.subcategories.map(sub => ({
        value: sub.id,
        label: sub.name,
      })));
    } else {
      setSubcategories([]);
    }

    setFormData(prev => ({ ...prev, categoryId: '' }));
  };

  // Handle subcategory change
  const handleSubcategoryChange = (value) => {
    console.log("Selected Subcategory ID:", value);
    setFormData(prev => ({ ...prev, categoryId: value }));
  };

  // Handle marque change
  const handleMarqueChange = (value) => {
    console.log("Selected Marque ID:", value);
    setFormData(prev => ({ ...prev, marqueId: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const imageUrls = [];
  
      for (const file of formData.images) {
        const formDataCloudinary = new FormData();
        formDataCloudinary.append('file', file);
        formDataCloudinary.append('upload_preset', 'Bgtm_D'); 
  
        try {
          const response = await axios.post(
            'https://api.cloudinary.com/v1_1/dnkd2ksye/image/upload',
            formDataCloudinary
          );
          imageUrls.push(response.data.secure_url);
        } catch (error) {
          console.error('Cloudinary Upload Error:', error);
          toast.error("Error uploading images!");
        }
      }
  
      // Send article data to backend
      await axios.post('http://localhost:5000/api/articles', {
        ...formData,
        price: parseFloat(formData.price) || 0,
        discount: parseFloat(formData.discount) || 0,
        stock: Number.isNaN(parseInt(formData.stock)) ? 0 : parseInt(formData.stock),
        categoryId: parseInt(formData.categoryId),  // Ensure it's a number
        marqueId: parseInt(formData.marqueId),  // Ensure it's a number
        images: imageUrls,
      });
  
      toast.success('Article added successfully!');
  
      // Reset the form
      setFormData({
        name: '',
        description: '',
        price: '',
        discount: '',
        stock: '',
        sku: '',
        images: [],
        seoTitle: '',
        seoKeywords: '',
        categoryId: '',
        marqueId: '',
      });
      setImagePreviews([]);
      setSelectedMainCategory('');
      setSubcategories([]);
    } catch (error) {
      toast.error("Error adding article");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Prepare options
  const mainCategoryOptions = categories
    .filter(cat => cat.parentId === null)
    .map(cat => ({
      value: cat.id,
      label: cat.name,
    }));

  return (
    <section className="dark:bg-gray-900  p-8 max-w-4xl mx-16 rounded-lg ">
    <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
  
    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
      Ajouter un Nouvel Article
    </h2>
  
    <form onSubmit={handleSubmit} className="grid gap-6">
      {/* Product Details */}
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-4">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Nom du produit</label>
          <Input type="text" name="name" value={formData.name} onChange={handleChange} required />
  
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Prix (€)</label>
          <Input type="number" name="price" value={formData.price} onChange={handleChange} required />
  
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Stock disponible</label>
          <Input type="number" name="stock" value={formData.stock} onChange={handleChange} required />
        </div>
  
        {/* Image Upload Section */}
        <div className="flex flex-col items-center justify-center border border-gray-300 dark:border-gray-600 rounded-lg p-4">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Ajouter des images</p>
          <Dropzone onDrop={handleFileUpload} />
          <div className="flex gap-2 mt-4 flex-wrap">
            {imagePreviews.map((src, index) => (
              <img key={index} src={src} alt="Aperçu" className="w-20 h-20 object-cover rounded-lg" />
            ))}
          </div>
        </div>
      </div>
  
      <hr className="border-gray-300 dark:border-gray-600" />
  
      {/* Description */}
      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
        <Textarea name="description" value={formData.description} onChange={handleChange} />
      </div>
  
      {/* Category Selection */}
      <div className="grid sm:grid-cols-2 gap-6">
        <div className=''>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Catégorie principale</label>
          <CustomDropdown options={mainCategoryOptions} value={selectedMainCategory} onChange={handleMainCategoryChange} />
        </div>
  
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Sous-catégorie</label>
          <CustomDropdown options={subcategories} value={formData.categoryId} onChange={handleSubcategoryChange} />
        </div>
      </div>
      
  
      {/* Brand & SKU */}
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Marque</label>
          <CustomDropdown options={marques.map(m => ({ value: m.id, label: m.name }))} value={formData.marqueId} onChange={handleMarqueChange} />
        </div>
  
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Référence (SKU)</label>
          <Input type="text" name="sku" value={formData.sku} onChange={handleChange} required />
        </div>
      </div>
  
      <hr className="border-gray-300 dark:border-gray-600" />
  
      {/* SEO Fields */}
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Titre SEO</label>
          <Input type="text" name="seoTitle" value={formData.seoTitle} onChange={handleChange} />
        </div>
  
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Mots-clés SEO</label>
          <Input type="text" name="seoKeywords" value={formData.seoKeywords} onChange={handleChange} />
        </div>
      </div>
  
      {/* Discount Field */}
      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Remise (%)</label>
        <Input type="number" name="discount" value={formData.discount} onChange={handleChange} />
      </div>
  
      {/* Submit Button */}
      <div className="flex justify-center mt-4">
        <Button
          type="submit"
          disabled={loading}
          className={`w-1/2 sm:w-1/3 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition ${
            loading ? 'opacity-50' : ''
          }`}
        >
          {loading ? 'Ajout en cours...' : 'Ajouter l’article'}
        </Button>
      </div>
    </form>
  </section>
  
  );
}
