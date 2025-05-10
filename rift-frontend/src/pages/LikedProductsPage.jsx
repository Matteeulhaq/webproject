// src/pages/LikedProducts.jsx
import LikedProducts from "../components/account/LikedProducts";
import BackButton from "../components/common/BackButton";

function LikedProductsPage() {
  return (
    <div className="min-h-screen bg-primary-white p-4">
      <BackButton />
      <div className="container mx-auto max-w-4xl">
        <LikedProducts />
      </div>
    </div>
  );
}

export default LikedProductsPage;