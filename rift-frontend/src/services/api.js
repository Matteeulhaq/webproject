// src/services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/*
export const getProducts = () => API.get("/products");
export const getProductById = (id) => API.get(`/products/${id}`);
export const createProduct = (product) => API.post("/products", product);
export const deleteProduct = (id) => API.delete(`/products/${id}`);
export const login = (credentials) => API.post("/users/login", credentials);
*/

export default API;