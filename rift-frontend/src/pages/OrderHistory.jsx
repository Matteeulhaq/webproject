// src/pages/OrderHistory.jsx
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { mockOrders } from "../data/orders";
import { mockProducts } from "../data/products";
import BackButton from "../components/common/BackButton";

function OrderHistory() {
  const { user } = useContext(AuthContext);
  const userOrders = mockOrders
    .filter((order) => order.userId === user.id)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="container mt-8">
      <BackButton />
      <h1 className="font-heading text-3xl mb-8 text-center">Order History</h1>
      {userOrders.length === 0 ? (
        <p className="text-gray-600 text-center">No orders found.</p>
      ) : (
        <div className="max-w-4xl mx-auto">
          {userOrders.map((order) => (
            <div
              key={order.id}
              className="mb-6 p-4 border border-gray-300 rounded-md"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="nav-heading text-lg font-semibold">
                  Order #{order.id}
                </h2>
                <span
                  className={`px-2 py-1 rounded text-white ${
                    order.status === "Delivered"
                      ? "bg-green-500"
                      : "bg-yellow-500"
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <p className="text-gray-600 mb-2">
                Placed on: {new Date(order.date).toLocaleDateString()}
              </p>
              <div className="mb-2">
                <h3 className="nav-heading text-gray-800">Items:</h3>
                <ul className="list-disc pl-5">
                  {order.items.map((item, index) => {
                    const product = mockProducts.find(
                      (p) => p.id === item.productId
                    );
                    return (
                      <li key={index} className="text-gray-600">
                        {product?.name || "Unknown Product"} (x{item.quantity}) - $
                        {(item.price * item.quantity).toFixed(2)}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <p className="text-gray-800 font-semibold">
                Total: ${order.total.toFixed(2)}
              </p>
              <div className="mt-2">
                <h3 className="nav-heading text-gray-800">Shipping Address:</h3>
                <p className="text-gray-600">
                  {order.address.street}, {order.address.city}, {order.address.state}{" "}
                  {order.address.zip}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderHistory;