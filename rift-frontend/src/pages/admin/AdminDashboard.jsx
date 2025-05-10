// src/pages/admin/AdminDashboard.jsx
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import { mockOrders } from "../../data/orders";
import { mockProducts } from "../../data/products";
import { mockUsers } from "../../data/users";
import { TrashIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import BackButton from "../../components/common/BackButton";

function AdminDashboard() {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("pendingOrders");
  const [orderSearch, setOrderSearch] = useState("");
  const [listingSearch, setListingSearch] = useState("");
  const [userSearch, setUserSearch] = useState("");
  const [orderHistorySearch, setOrderHistorySearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const pendingOrders = mockOrders
    .filter((order) => order.status === "Pending")
    .filter((order) => order.id.toLowerCase().includes(orderSearch.toLowerCase()));
  const allProducts = mockProducts.filter((product) =>
    String(product.id).includes(listingSearch)
  );
  const allUsers = mockUsers
    .filter((u) => u.role !== "admin")
    .filter((u) => u.username.toLowerCase().includes(userSearch.toLowerCase()));

  const handleStatusChange = (orderId, newStatus) => {
    const order = mockOrders.find((o) => o.id === orderId);
    if (order) {
      order.status = newStatus;
    }
  };

  const handleDeleteProduct = (productId) => {
    const index = mockProducts.findIndex((p) => p.id === productId);
    if (index !== -1) {
      mockProducts.splice(index, 1);
    }
  };

  const handleDeleteUser = (userId) => {
    const index = mockUsers.findIndex((u) => u.id === userId);
    if (index !== -1) {
      mockUsers.splice(index, 1);
      // Delete user's products
      for (let i = mockProducts.length - 1; i >= 0; i--) {
        if (mockProducts[i].sellerId === userId) {
          mockProducts.splice(i, 1);
        }
      }
      // Delete user's orders
      for (let i = mockOrders.length - 1; i >= 0; i--) {
        if (mockOrders[i].userId === userId) {
          mockOrders.splice(i, 1);
        }
      }
    }
  };

  const handleOrderHistorySearch = (e) => {
    e.preventDefault();
    const foundUser = mockUsers.find(
      (u) => u.username.toLowerCase() === orderHistorySearch.toLowerCase()
    );
    setSelectedUser(foundUser || null);
    if (!foundUser) {
      setOrderHistorySearch("");
    }
  };

  return (
    <div className="container mt-8">
      <BackButton />
      <h1 className="font-heading text-3xl mb-8 text-center">Admin Dashboard</h1>

      {/* Tab Buttons */}
      <div className="flex gap-2 mb-8 flex-wrap justify-center">
        <button
          onClick={() => setActiveTab("pendingOrders")}
          className={`px-4 py-2 rounded-md ${
            activeTab === "pendingOrders"
              ? "bg-yellow-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-yellow-500 hover:text-white"
          } transition-colors`}
        >
          Pending Orders
        </button>
        <button
          onClick={() => setActiveTab("manageListings")}
          className={`px-4 py-2 rounded-md ${
            activeTab === "manageListings"
              ? "bg-yellow-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-yellow-500 hover:text-white"
          } transition-colors`}
        >
          Manage Listings
        </button>
        <button
          onClick={() => setActiveTab("manageUsers")}
          className={`px-4 py-2 rounded-md ${
            activeTab === "manageUsers"
              ? "bg-yellow-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-yellow-500 hover:text-white"
          } transition-colors`}
        >
          Manage Users
        </button>
        <button
          onClick={() => setActiveTab("userOrderHistory")}
          className={`px-4 py-2 rounded-md ${
            activeTab === "userOrderHistory"
              ? "bg-yellow-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-yellow-500 hover:text-white"
          } transition-colors`}
        >
          User Order History
        </button>
      </div>

      {/* Pending Orders */}
      {activeTab === "pendingOrders" && (
        <section className="mb-12">
          <h2 className="text-2xl text-gray-800 mb-4">Pending Orders</h2>
          <div className="mb-6">
            <input
              type="text"
              value={orderSearch}
              onChange={(e) => setOrderSearch(e.target.value)}
              placeholder="Search by Order ID (e.g., order1)"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          {pendingOrders.length === 0 ? (
            <p className="text-gray-600">No pending orders found.</p>
          ) : (
            <div className="border border-gray-300 rounded-md">
              {pendingOrders.map((order) => (
                <div
                  key={order.id}
                  className="p-4 border-b border-gray-300 last:border-b-0 hover:bg-gray-100"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">Order #{order.id}</p>
                      <p className="text-gray-600">
                        User:{" "}
                        {mockUsers.find((u) => u.id === order.userId)?.username ||
                          "Unknown"}
                      </p>
                      <p className="text-gray-600">
                        Total: ${order.total.toFixed(2)}
                      </p>
                      <p className="text-gray-600">
                        Placed on: {new Date(order.date).toLocaleDateString()}
                      </p>
                    </div>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                  <div className="mt-2">
                    <p className="text-gray-600">
                      Items:{" "}
                      {order.items
                        .map((item) => {
                          const product = mockProducts.find(
                            (p) => p.id === Number(item.productId)
                          );
                          return `${product?.name || "Unknown"} (x${item.quantity})`;
                        })
                        .join(", ")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Manage Listings */}
      {activeTab === "manageListings" && (
        <section className="mb-12">
          <h2 className="text-2xl text-gray-800 mb-4">Manage Listings</h2>
          <div className="mb-6">
            <input
              type="text"
              value={listingSearch}
              onChange={(e) => setListingSearch(e.target.value)}
              placeholder="Search by Listing ID (e.g., 1)"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          {allProducts.length === 0 ? (
            <p className="text-gray-600">No listings found.</p>
          ) : (
            <div className="border border-gray-300 rounded-md">
              {allProducts.map((product) => (
                <div
                  key={product.id}
                  className="p-4 border-b border-gray-300 last:border-b-0 flex justify-between items-center hover:bg-gray-100"
                >
                  <div>
                    <p className="font-semibold">
                      ID: {product.id} - {product.name}
                    </p>
                    <p className="text-gray-600">
                      Seller:{" "}
                      {mockUsers.find((u) => u.id === product.sellerId)?.username ||
                        "Unknown"}
                    </p>
                    <p className="text-gray-600">Category: {product.category}</p>
                    <p className="text-gray-600">${product.price.toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Manage Users */}
      {activeTab === "manageUsers" && (
        <section className="mb-12">
          <h2 className="text-2xl text-gray-800 mb-4">Manage Users</h2>
          <div className="mb-6">
            <input
              type="text"
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
              placeholder="Search by Username (e.g., thriftking)"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          {allUsers.length === 0 ? (
            <p className="text-gray-600">No users found.</p>
          ) : (
            <div className="border border-gray-300 rounded-md">
              {allUsers.map((user) => (
                <div
                  key={user.id}
                  className="p-4 border-b border-gray-300 last:border-b-0 flex justify-between items-center hover:bg-gray-100"
                >
                  <div>
                    <p className="font-semibold">{user.username}</p>
                    <p className="text-gray-600">{user.email}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* User Order History */}
      {activeTab === "userOrderHistory" && (
        <section>
          <h2 className="text-2xl text-gray-800 mb-4">User Order History</h2>
          <form onSubmit={handleOrderHistorySearch} className="mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                value={orderHistorySearch}
                onChange={(e) => setOrderHistorySearch(e.target.value)}
                placeholder="Enter username (e.g., thriftking)"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <button
                type="submit"
                className="bg-yellow-600 text-white py-3 px-4 rounded-md hover:bg-yellow-700 transition-colors"
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
              </button>
            </div>
          </form>
          {selectedUser ? (
            <div>
              <h3 className="text-xl text-gray-800 mb-4">
                Orders for {selectedUser.username}
              </h3>
              {mockOrders
                .filter((order) => order.userId === selectedUser.id)
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map((order) => (
                  <div
                    key={order.id}
                    className="mb-6 p-4 border border-gray-300 rounded-md"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-lg font-semibold">Order #{order.id}</h4>
                      <span
                        className={`px-2 py-1 rounded text-white ${
                          order.status === "Delivered"
                            ? "bg-green-500"
                            : order.status === "Pending"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2">
                      Placed on: {new Date(order.date).toLocaleDateString()}
                    </p>
                    <div className="mb-2">
                      <h5 className="text-gray-800">Items:</h5>
                      <ul className="list-disc pl-5">
                        {order.items.map((item, index) => {
                          const product = mockProducts.find(
                            (p) => p.id === Number(item.productId)
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
                      <h5 className="text-gray-800">Shipping Address:</h5>
                      <p className="text-gray-600">
                        {order.address.street}, {order.address.city}, {order.address.state}{" "}
                        {order.address.zip}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-gray-600">Search for a user to view their order history.</p>
          )}
        </section>
      )}
    </div>
  );
}

export default AdminDashboard;