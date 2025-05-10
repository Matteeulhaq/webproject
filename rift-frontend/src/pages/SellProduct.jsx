// src/pages/SellProduct.jsx
import BackButton from "../components/common/BackButton";
import AddProductForm from "../components/product/AddProductForm";

function SellProduct() {
  const handleSubmit = (formData) => {
    // Simulate API call
    console.log("Listing product:", formData);
    alert("Product listed successfully!");
  };

  return (
    <div className="min-h-screen bg-primary-white p-4">
      <BackButton />
      <div className="container mx-auto max-w-4xl">
        <h2 className="font-heading text-2xl mb-6">Sell a Product</h2>
        <AddProductForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}

export default SellProduct;