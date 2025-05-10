// src/components/cart/CartItem.jsx
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import Button from "../common/Button";

function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useContext(CartContext);

  return (
    <div className="flex items-center gap-4 p-4 border-bVite border-primary-gray-light rounded-lg outline-solid outline-gray-100">
      <img
        src={item.image}
        alt={item.name}
        className="w-20 h-20 object-cover rounded"
      />
      <div className="flex-1">
        <h4 className="product-heading">{item.name}</h4>
        <p className="text-primary-gray-dark">${item.price}</p>
      </div>
      <Button onClick={() => removeFromCart(item.id)} className="bg-red-700 hover:bg-red-500 text-white">
        Remove
      </Button>
    </div>
  );
}

export default CartItem;