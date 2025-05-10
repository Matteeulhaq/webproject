// src/components/product/AddProductForm.jsx
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { mockProducts } from "../../data/products";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";

function AddProductForm() {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState("");

  const categories = ["Tops", "Bottoms", "Jackets", "Shoes"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (!validTypes.includes(file.type)) {
        setError("Please upload a PNG, JPEG, or JPG image.");
        setImageFile(null);
        setImagePreview(null);
        return;
      }
      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size must be less than 5MB.");
        setImageFile(null);
        setImagePreview(null);
        return;
      }
      setError("");
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!imageFile) {
      setError("Please upload an image.");
      return;
    }
    if (!formData.name || !formData.price || !formData.category || !formData.description) {
      setError("Please fill all fields.");
      return;
    }
    const newProduct = {
      id: mockProducts.length + 1,
      name: formData.name,
      price: parseFloat(formData.price),
      image: imagePreview || "/src/assets/images/placeholder.jpg", // Mock path
      category: formData.category,
      sellerId: user?.id || "user1", // Fallback
      description: formData.description,
    };
    mockProducts.push(newProduct); // Simulate database
    console.log("New product added:", newProduct); // Debug
    // Reset form
    setFormData({ name: "", price: "", category: "", description: "" });
    setImageFile(null);
    setImagePreview(null);
    setError("");
    alert("Product listed successfully!");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
      <div className="mb-6">
        <label htmlFor="name" className="block text-gray-800 mb-2">
          Product Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="e.g., Vintage Denim Jacket"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="price" className="block text-gray-800 mb-2">
          Price ($)
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          placeholder="e.g., 45.99"
          step="0.01"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="category" className="block text-gray-800 mb-2">
          Category
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-6">
        <label htmlFor="description" className="block text-gray-800 mb-2">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Describe your product..."
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          rows="4"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="image" className="block text-gray-800 mb-2">
          Product Image
        </label>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-yellow-600 hover:text-white cursor-pointer transition-colors">
            <ArrowUpTrayIcon className="h-5 w-5" />
            <span>Choose Image</span>
            <input
              type="file"
              id="image"
              accept="image/png,image/jpeg,image/jpg"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>
        {imagePreview && (
          <div className="mt-4">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-md border border-gray-300"
            />
          </div>
        )}
      </div>
      {error && (
        <p className="text-red-600 mb-6">{error}</p>
      )}
      <button
        type="submit"
        className="w-full bg-yellow-600 text-white py-3 rounded-md hover:bg-yellow-700 transition-colors"
      >
        List Product
      </button>
    </form>
  );
}

export default AddProductForm;