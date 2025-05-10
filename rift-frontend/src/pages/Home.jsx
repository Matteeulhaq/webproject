// src/pages/Home.jsx
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { LikeContext } from "../context/LikeContext";
import ProductList from "../components/product/ProductList";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

function Home() {
  const { user } = useContext(AuthContext);
  const { products } = useContext(LikeContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const categories = ["Tops", "Bottoms", "Jackets", "Shoes"];

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const clearCategories = () => {
    setSelectedCategories([]);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategories.length > 0
        ? selectedCategories.includes(product.category)
        : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container">
      <h1 className="font-heading text-center mb-8">Welcome, {user?.username || "Guest"}!</h1>
      <div className="mb-6">
        <div className="relative max-w-md mx-auto">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>
      </div>
      <div className="sticky top-[88px] bg-white z-2 py-4 border-b border-gray-200">
        <div className="flex justify-center gap-4">
          <button
            onClick={clearCategories}
            className={`px-4 py-2 rounded-md font-medium ${
              selectedCategories.length === 0
                ? "bg-yellow-600 text-white hover:bg-yellow-700"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => toggleCategory(category)}
              className={`px-4 py-2 rounded-md font-medium ${
                selectedCategories.includes(category)
                  ? "bg-yellow-600 text-white hover:bg-yellow-700"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <ProductList products={filteredProducts} />
    </div>
  );
}

export default Home;