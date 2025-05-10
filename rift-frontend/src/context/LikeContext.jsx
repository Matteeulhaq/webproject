// src/context/LikeContext.jsx
import { createContext, useState } from "react";
import { mockProducts } from "../data/products";

export const LikeContext = createContext();

export function LikeProvider({ children }) {
  const [likedProducts, setLikedProducts] = useState([]);
  const [products] = useState(mockProducts);

  const toggleLike = (productId) => {
    setLikedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <LikeContext.Provider value={{ likedProducts, toggleLike, products }}>
      {children}
    </LikeContext.Provider>
  );
}