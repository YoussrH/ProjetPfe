
  "use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dropzone } from "@/components/ui/dropzone";
import CustomDropdown from "../CustomDropdown";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CouleurDropdown from "./CouleurDropdown";

export default function AjouterArticle() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    discount: "",
    stock: "",
    sku: "",
    images: [],
    seoTitle: "",
    seoKeywords: "",
    categoryId: "",
    marqueId: "",
    genreId: "",
    tailles: [], // Array to store selected taille IDs
    couleurs: [], // Array to store selected color IDs
    conseils: "", // Field for advice
  });

  const [categories, setCategories] = useState([]);
  const [marques, setMarques] = useState([]);
  const [genres, setGenres] = useState([]);
  const [tailles, setTailles] = useState([]); // State for tailles
  const [couleurs, setCouleurs] = useState([]); // State for couleurs
  const [loading, setLoading] = useState(false);
  const [selectedMainCategory, setSelectedMainCategory] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, marquesRes, genresRes, articlesRes, couleursRes] = await Promise.all([
          axios.get("http://localhost:5000/api/categories"),
          axios.get("http://localhost:5000/api/marques"),
          axios.get("http://localhost:5000/api/genres"),
          axios.get("http://localhost:5000/api/articles"),
          axios.get("http://localhost:5000/api/couleurs"), // Fetch couleurs
        ]);

        // Update state with fetched data
        setCategories(categoriesRes.data);
        setMarques(marquesRes.data);
        setGenres(genresRes.data);
        setCouleurs(couleursRes.data); // Set couleurs

        // Generate SKU
        const numberOfArticles = Array.isArray(articlesRes.data) ? articlesRes.data.length : 0;
        const formattedName = formData.name
          ? formData.name.trim().replace(/\s+/g, "-").toUpperCase()
          : "ARTICLE";

        let generatedSKU;
        let isUnique = false;
        let attempt = 0;

        while (!isUnique) {
          generatedSKU = `${formattedName}-${String(numberOfArticles + 1 + attempt).padStart(3, "0")}`;

          if (Array.isArray(articlesRes.data)) {
            const existingArticle = articlesRes.data.find((article) => article.sku === generatedSKU);
            if (!existingArticle) {
              isUnique = true;
            }
          } else {
            isUnique = true;
          }

          attempt++;
        }

        setFormData((prev) => ({ ...prev, sku: generatedSKU }));
      } catch (error) {
        console.error("Error loading data:", error);
        toast.error("Failed to load data.");
      }
    };

    fetchData();
  }, [formData.name]); // Regenerate SKU when name changes

  // Fetch tailles when genreId or categoryId changes
  useEffect(() => {
    if (!formData.categoryId || !formData.genreId) return;

    const fetchTailles = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/tailles", {
          params: {
            category_id: formData.categoryId,
            genre_id: formData.genreId,
          },
        });

        console.log("Fetched tailles:", response.data); // Debugging output

        setTailles(response.data);
      } catch (error) {
        console.error("Error fetching tailles:", error);
        toast.error("Failed to load tailles.");
      }
    };

    fetchTailles();
  }, [formData.categoryId, formData.genreId]); // Run when categoryId or genreId changes

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle genre change
  const handleGenreChange = (value) => {
    setFormData((prev) => ({ ...prev, genreId: value }));
  };

  // Handle file upload
  const handleFileUpload = (files) => {
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    
    // Prevent duplicate previews
    setImagePreviews((prevPreviews) => [...new Set([...prevPreviews, ...newPreviews])]);
  
    // Prevent duplicate file uploads
    setFormData((prevState) => ({
      ...prevState,
      images: [...new Set([...prevState.images, ...files])],
    }));
  };
  

  // Handle main category change
  const handleMainCategoryChange = (value) => {
    setSelectedMainCategory(value);
    const selectedCat = categories.find((cat) => cat.id === value);
    if (selectedCat && selectedCat.subcategories) {
      setSubcategories(
        selectedCat.subcategories.map((sub) => ({
          value: sub.id,
          label: sub.name,
        }))
      );
    } else {
      setSubcategories([]);
    }
    setFormData((prev) => ({ ...prev, categoryId: "" }));
  };

  // Handle subcategory change
  const handleSubcategoryChange = (value) => {
    setFormData((prev) => ({ ...prev, categoryId: value }));
  };

  // Handle marque change
  const handleMarqueChange = (value) => {
    setFormData((prev) => ({ ...prev, marqueId: value }));
  };

  // Handle taille change
  const handleTailleChange = (tailleId, checked) => {
    setFormData((prev) => ({
      ...prev,
      tailles: checked
        ? [...prev.tailles, String(tailleId)] // Add taille ID
        : prev.tailles.filter((id) => id !== String(tailleId)), // Remove taille ID
    }));
  };

  // Handle couleur change
  const handleCouleurChange = (couleurId, checked) => {
    setFormData((prev) => ({
      ...prev,
      couleurs: checked
        ? [...prev.couleurs, String(couleurId)] // Add couleur ID
        : prev.couleurs.filter((id) => id !== String(couleurId)), // Remove couleur ID
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const imageUrls = [];

      // Upload images to Cloudinary
     /*  for (const file of formData.images) {
        const formDataCloudinary = new FormData();
        formDataCloudinary.append("file", file);
        formDataCloudinary.append("upload_preset", "Bgtm_D");

        try {
          const response = await axios.post(
            "https://api.cloudinary.com/v1_1/dnkd2ksye/image/upload",
            formDataCloudinary
          );
          imageUrls.push(response.data.secure_url);
        } catch (error) {
          console.error("Cloudinary Upload Error:", error);
          toast.error("Error uploading images!");
        }
      } */


          for (const file of formData.images) {
            if (file instanceof File) {  // Ensure it's a file and not already an uploaded URL
              const formDataCloudinary = new FormData();
              formDataCloudinary.append("file", file);
              formDataCloudinary.append("upload_preset", "Bgtm_D");

              try {
                const response = await axios.post(
                  "https://api.cloudinary.com/v1_1/dnkd2ksye/image/upload",
                  formDataCloudinary
                );
                imageUrls.push(response.data.secure_url);
              } catch (error) {
                console.error("Cloudinary Upload Error:", error);
                toast.error("Error uploading images!");
              }
            } else {
              imageUrls.push(file); // If it's already a URL, don't re-upload
            }
          }


      // Send article data to backend
      await axios.post("http://localhost:5000/api/articles/ajouterArticle", {
        ...formData,
        price: parseFloat(formData.price) || 0,
        discount: parseFloat(formData.discount) || 0,
        stock: Number.isNaN(parseInt(formData.stock)) ? 0 : parseInt(formData.stock),
        categoryId: parseInt(formData.categoryId),
        marqueId: parseInt(formData.marqueId),
        genreId: parseInt(formData.genreId),
        tailles: formData.tailles.map((id) => parseInt(id)), // Convert taille IDs to numbers
        couleurs: formData.couleurs.map((id) => parseInt(id)), // Convert couleur IDs to numbers
        images: imageUrls,
      });
      toast.success("Article added successfully!");

      // Reset form
      setFormData({
        name: "",
        description: "",
        price: "",
        discount: "",
        stock: "",
        sku: "",
        images: [],
        seoTitle: "",
        seoKeywords: "",
        categoryId: "",
        marqueId: "",
        genreId: "",
        tailles: [], // Reset tailles
        couleurs: [], // Reset couleurs
        conseils: "", // Reset conseils
      });
      setImagePreviews([]);
      setSelectedMainCategory("");
      setSubcategories([]);
    } catch (error) {
      toast.error("Error adding article");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Prepare main category options
  const mainCategoryOptions = categories
    .filter((cat) => cat.parentId === null)
    .map((cat) => ({
      value: cat.id,
      label: cat.name,
    }));

  // Prepare genre options
  const genreOptions = genres.map((genre) => ({
    value: genre.id,
    label: genre.name,
  }));

  // Taille Dropdown Component
  const TailleDropdown = ({ tailles, selectedTailles, onTailleChange }) => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full font-sans">
            Sélectionner les tailles
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 font-sans max-h-60 p-1 overflow-y-auto">
          <div className="sticky -top-1 pt-2 bg-white z-50 ">
            <DropdownMenuLabel>Tailles disponibles</DropdownMenuLabel>
            <DropdownMenuSeparator />
          </div>
          {tailles.map((taille) => (
            <DropdownMenuCheckboxItem
              key={taille.id}
              checked={selectedTailles.includes(String(taille.id))}
              onCheckedChange={(checked) => onTailleChange(taille.id, checked)}
            >
              {taille.name}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

 return (
<section className="dark:bg-gray-900 p-8 max-w-4xl mx-16 rounded-lg">
  <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

  <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
    Ajouter un Nouvel Article
  </h2>

  <form onSubmit={handleSubmit} className="grid gap-6">
    <div className="grid sm:grid-cols-2 gap-6">
      <div className="space-y-4">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Nom du produit</label>
        <Input type="text" name="name" value={formData.name} onChange={handleChange} required />

        {/* Prix and Remise in a grid */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Prix (DT)</label>
            <Input type="number" name="price" value={formData.price} onChange={handleChange} required />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Remise (%)</label>
            <Input type="number" name="discount" value={formData.discount} onChange={handleChange} />
          </div>
        </div>

        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Stock disponible</label>
        <Input type="number" name="stock" value={formData.stock} onChange={handleChange} required />
      </div>

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

    <div>
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
      <Textarea name="description" value={formData.description} onChange={handleChange} />
    </div>

    <div>
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Conseils</label>
      <Textarea name="conseils" value={formData.conseils} onChange={handleChange} />
    </div>

    <hr className="border-gray-300 dark:border-gray-600" />

    <div>
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Référence (SKU)</label>
      <Input type="text" name="sku" value={formData.sku} onChange={handleChange} disabled />
    </div>

    <div className="grid sm:grid-cols-2 gap-6">
      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Catégorie principale</label>
        <CustomDropdown options={mainCategoryOptions} value={selectedMainCategory} onChange={handleMainCategoryChange} />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Sous-catégorie</label>
        <CustomDropdown options={subcategories} value={formData.categoryId} onChange={handleSubcategoryChange} />
      </div>
    </div>

    <div className="grid sm:grid-cols-2 gap-6">
      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Marque</label>
        <CustomDropdown options={marques.map(m => ({ value: m.id, label: m.name }))} value={formData.marqueId} onChange={handleMarqueChange} />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Genre</label>
        <CustomDropdown options={genreOptions} value={formData.genreId} onChange={handleGenreChange} />
      </div>
    </div>

    <div className="grid sm:grid-cols-2 gap-6">
      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Tailles disponibles</label>
        <TailleDropdown
          tailles={tailles}
          selectedTailles={formData.tailles}
          onTailleChange={handleTailleChange}
        />
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Couleurs disponibles</label>
        <CouleurDropdown
    couleurs={couleurs}
    selectedCouleurs={formData.couleurs}
    onCouleurChange={handleCouleurChange}
    setCouleurs={setCouleurs} // Pass setCouleurs here
  />
      </div>
    </div>

    <hr className="border-gray-300 dark:border-gray-600" />

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