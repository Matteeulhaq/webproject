// src/components/profile/ProfileListings.jsx
import ProductList from "../product/ProductList";

function ProfileListings({ products }) {
  return (
    <div>
      <h3 className="font-heading text-xl mb-4 p-5">Listings</h3>
      <ProductList products={products} />
    </div>
  );
}

export default ProfileListings;