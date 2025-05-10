// src/components/cart/CartSummary.jsx
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";

function CartSummary() {
  const { cart } = useContext(CartContext);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const navigate = useNavigate();
  const to = "/checkout"; // Define the route you want to navigate to
  const handleCheckout = () => {
    if (to) {
      navigate(to);
    }
  };

  return (
    <div className="p-4 bg-primary-gray-light rounded-lg shadow-md">
      <h3 className="font-heading font-semibold text-xl mb-4">Order Summary</h3>
      <p className="text-primary-gray-dark">Total: ${total.toFixed(2)}</p>
      <p className="text-sm text-primary-gray-dark mt-2">
        Payment: Cash on Delivery
      </p>
      <Button onClick={handleCheckout} className="mt-4 w-full bg-black text-white hover:bg-white hover:text-black hover:outline-solid transition-colors duration-250">Checkout</Button>
    </div>
  );
}

export default CartSummary;