// src/pages/Login.jsx
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import BackButton from "../components/common/BackButton";

function Login() {
  const { user, user_login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = user_login(formData.username, formData.password);
    if (success) {
      navigate("/");
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="container mt-8">
      <BackButton />
      <h1 className="font-heading text-3xl mb-8 text-center">Login</h1>
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
            placeholder="Enter your password"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>
        {error && (
          <p className="text-red-600 mb-6">{error}</p>
        )}
        <button
          type="submit"
          className="w-full bg-yellow-600 text-white py-3 rounded-md hover:bg-yellow-700 transition-colors flex items-center justify-center gap-2"
        >
          <LockClosedIcon className="h-5 w-5" />
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;