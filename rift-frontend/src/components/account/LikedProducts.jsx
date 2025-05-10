// src/components/account/LikedProducts.jsx
import { useContext } from "react";
import { LikeContext } from "../../context/LikeContext";
import ProductCard from "../product/ProductCard";

function LikedProducts() {
  const { likedProducts, products } = useContext(LikeContext);
  const likedItems = products.filter((product) =>
    likedProducts.includes(product.id)
  );

  return (
    <div className="space-y-6">
      <h2 className="font-heading text-2xl mb-4">Your Liked Products</h2>
      {likedItems.length === 0 ? (
        <p className="text-gray-600">You haven't liked any products yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {likedItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default LikedProducts;