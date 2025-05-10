// src/pages/ProductDetail.jsx
import { useParams, Link } from "react-router-dom";
import { useContext, useState } from "react";
import { LikeContext } from "../context/LikeContext";
import { CartContext } from "../context/CartContext";
import { HeartIcon } from "@heroicons/react/24/outline";
import Button from "../components/common/Button";
import BackButton from "../components/common/BackButton";
import { mockUsers } from "../data/users";

function ProductDetail() {
  const { id } = useParams();
  const { products, toggleLike, likedProducts } = useContext(LikeContext);
  const { addToCart, removeFromCart, cart } = useContext(CartContext);
  const product = products.find((p) => p.id === Number(id));
  const isLiked = likedProducts.includes(Number(id));
  const isInCart = cart.some((item) => item.id === product.id);
  const [justAdded, setJustAdded] = useState(false);
  const foundUser = mockUsers.find(
          (u) => u.id === product.sellerId
    );

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

  if (!product) {
    return <p className="text-center p-4">Product not found.</p>;
  }

  return (
    <div className="min-h-screen bg-primary-white p-4">
      <BackButton />
      <div className="container mx-auto max-w-4xl flex flex-col md:flex-row gap-6">
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-1/2 h-96 object-cover rounded-lg"
        />
        <div className="flex-1">
          <h2 className="product-heading text-3xl mb-4">{product.name}</h2>
          <p className="text-primary-gray-dark mb-4">${product.price}</p>
          <p className="mb-4">{product.description || "No description available."}</p>
          <div className="flex gap-4 mb-4">
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
              className={`p-2 ${isLiked ? "text-red-500" : "text-primary-gray-dark"}`}
            >
              {isLiked ? <HeartIcon className="h-6 w-6" fill="red" stroke="red"/> : <HeartIcon className="h-6 w-6" stroke="gray"/>}
            </button>
          </div>
          <Link
            to={`/profile/${product.sellerId}`}
            className="text-primary-gold hover:underline"
          >
            {foundUser.username || "Unknown Seller"}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;