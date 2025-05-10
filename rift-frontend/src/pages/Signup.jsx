// src/pages/Signup.jsx
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ArrowUpTrayIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import BackButton from "../components/common/BackButton";

function Signup() {
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (!validTypes.includes(file.type)) {
        setError("Please upload a PNG, JPEG, or JPG image.");
        setImageFile(null);
        setImagePreview(null);
        return;
      }
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
    if (!formData.username || !formData.password) {
      setError("Username and password are required.");
      return;
    }
    const newUser = {
      username: formData.username,
      password: formData.password,
      email: formData.email,
      avatar: imagePreview || "/src/assets/images/placeholder.jpg",
    };
    const success = signup(newUser);
    if (success) {
      navigate("/");
    } else {
      setError("Username is already taken.");
    }
  };

  return (
    <div className="container mt-8">
      <BackButton />
      <h1 className="font-heading text-3xl mb-8 text-center">Sign Up</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="mb-6">
          <label htmlFor="username" className="block text-gray-800 mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="e.g., thriftking"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-800 mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Create a password"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="email" className="block text-gray-800 mb-2">
            Email (Optional)
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="e.g., user@example.com"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="avatar" className="block text-gray-800 mb-2">
            Profile Picture (Optional)
          </label>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-yellow-600 hover:text-white cursor-pointer transition-colors">
              <ArrowUpTrayIcon className="h-5 w-5" />
              <span>Choose Image</span>
              <input
                type="file"
                id="avatar"
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
                alt="Avatar Preview"
                className="w-32 h-32 object-cover rounded-full border border-gray-300"
              />
            </div>
          )}
        </div>
        {error && (
          <p className="text-red-600 mb-6">{error}</p>
        )}
        <button
          type="submit"
          className="w-full bg-yellow-600 text-white py-3 rounded-md hover:bg-yellow-700 transition-colors flex items-center justify-center gap-2"
        >
          <UserPlusIcon className="h-5 w-5" />
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signup;