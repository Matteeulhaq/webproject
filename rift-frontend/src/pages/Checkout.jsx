// src/pages/Checkout.jsx
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { mockOrders } from "../data/orders";
import { mockProducts } from "../data/products";
import { CreditCardIcon, XMarkIcon } from "@heroicons/react/24/outline";
import BackButton from "../components/common/BackButton";

function Checkout() {
  const { user } = useContext(AuthContext);
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
    cardNumber: "",
    expiration: "",
    cvv: "",
  });
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.street ||
      !formData.city ||
      !formData.state ||
      !formData.zip ||
      !formData.cardNumber ||
      !formData.expiration ||
      !formData.cvv
    ) {
      setError("Please fill all fields.");
      return;
    }
    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }
    const total = cart.reduce((sum, item) => {
      const product = mockProducts.find((p) => p.id === item.id);
      return sum + (product?.price || 0) * item.quantity;
    }, 0);
    const newOrder = {
      id: `order${mockOrders.length + 1}`,
      userId: user.id,
      items: cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        price: mockProducts.find((p) => p.id === item.id)?.price || 0,
      })),
      total,
      address: {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zip: formData.zip,
      },
      billing: {
        cardNumber: `**** **** **** ${formData.cardNumber.slice(-4)}`,
        expiration: formData.expiration,
        cvv: "***",
      },
      status: "Pending", // Default per requirement
      date: new Date().toISOString(),
    };
    mockOrders.push(newOrder);
    clearCart();
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      navigate("/");
    }, 3000);
  };

  return (
    <div className="container mt-8">
      <BackButton />
      <h1 className="font-heading text-3xl mb-8 text-center">Checkout</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="mb-6">
          <h2 className="text-xl text-gray-800 mb-4">Shipping Address</h2>
          <div className="mb-4">
            <label htmlFor="street" className="block text-gray-800 mb-2">
              Street
            </label>
            <input
              type="text"
              id="street"
              name="street"
              value={formData.street}
              onChange={handleInputChange}
              placeholder="e.g., 123 Thrift St"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="city" className="block text-gray-800 mb-2">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="e.g., Fashion City"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="state" className="block text-gray-800 mb-2">
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              placeholder="e.g., CA"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="zip" className="block text-gray-800 mb-2">
              ZIP Code
            </label>
            <input
              type="text"
              id="zip"
              name="zip"
              value={formData.zip}
              onChange={handleInputChange}
              placeholder="e.g., 90210"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-xl text-gray-800 mb-4">Billing Information</h2>
          <div className="mb-4">
            <label htmlFor="cardNumber" className="block text-gray-800 mb-2">
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
              placeholder="e.g., 1234 5678 9012 3456"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="expiration" className="block text-gray-800 mb-2">
              Expiration (MM/YY)
            </label>
            <input
              type="text"
              id="expiration"
              name="expiration"
              value={formData.expiration}
              onChange={handleInputChange}
              placeholder="e.g., 12/25"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="cvv" className="block text-gray-800 mb-2">
              CVV
            </label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              value={formData.cvv}
              onChange={handleInputChange}
              placeholder="e.g., 123"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
        </div>
        {error && (
          <p className="text-red-600 mb-6">{error}</p>
        )}
        <button
          type="submit"
          className="w-full bg-yellow-600 text-white py-3 rounded-md hover:bg-yellow-700 transition-colors flex items-center justify-center gap-2"
        >
          <CreditCardIcon className="h-5 w-5" />
          Place Order
        </button>
      </form>
      {showPopup && (
        <div className="fixed top-4 right-4 bg-yellow-600 text-white p-4 rounded-md shadow-lg flex items-center gap-2 z-50">
          <span>Order placed successfully!</span>
          <button onClick={() => setShowPopup(false)}>
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
}

export default Checkout;