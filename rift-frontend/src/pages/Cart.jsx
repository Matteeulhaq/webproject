// src/pages/Cart.jsx
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import BackButton from "../components/common/BackButton";

function Cart() {
  const { cart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  return (
    <div className="container">
      <BackButton />
      <h1 className="font-heading text-center mb-8">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <CartSummary cart={cart} />
        </div>
      )}
    </div>
  );
}

export default Cart;