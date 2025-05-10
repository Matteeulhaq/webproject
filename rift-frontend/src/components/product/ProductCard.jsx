// src/components/product/ProductCard.jsx
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { LikeContext } from "../../context/LikeContext";
import Button from "../common/Button";
import { HeartIcon } from "@heroicons/react/24/outline";

function ProductCard({ product }) {
  const { addToCart, removeFromCart, cart } = useContext(CartContext);
  const { toggleLike, likedProducts } = useContext(LikeContext);
  const isLiked = likedProducts.includes(product.id);
  const isInCart = cart.some((item) => item.id === product.id);
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = () => {
    if (!isInCart) {
      addToCart(product);
      setJustAdded(true);
    }
  };

  const handleRemoveFromCart = () => {
    if (isInCart){
      removeFromCart(product.id);
      setJustAdded(false);
    }
  }

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover hover:scale-105 transition-transform"
        />
      </Link>
      <div className="p-6">
        <h3 className="product-heading text-xl mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4">${product.price}</p>
        <div className="flex justify-between items-center">
          <Button
            onClick={isInCart ? handleRemoveFromCart : handleAddToCart}
            className={`${
              isInCart ? "bg-red-700 hover:bg-red-500" : "bg-black hover:bg-yellow-500"
            } 
            transition-colors text-white`}
          >
            {isInCart ? "Remove" : "Add to Cart"}
          </Button>
          <button
            onClick={() => toggleLike(product.id)}
            className={`p-2 ${isLiked ? "text-red-500" : "text-gray-600"}`}
          >
            {isLiked ? <HeartIcon className="h-6 w-6" fill="red" stroke="red"/> : <HeartIcon className="h-6 w-6" stroke="gray"/>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;