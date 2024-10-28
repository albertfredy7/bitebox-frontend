import axios from "axios";
import { useState, useEffect } from 'react';
import api from "../services/api";
import { fetchOrders } from "../services/orders/fetchOrders";
import { format } from 'date-fns';
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { updateOrderStatus } from "../services/orders/updateStatus";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState({}); // To track the selected status for each order

  const getOrders = async () => {
    try {
      const response = await fetchOrders();
      setOrders(response.data.sort((a, b) => {
        return new Date(b.orderTime).getTime() - new Date(a.orderTime).getTime();
      }));
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusClick = (orderId, currentStatus) => {
    setSelectedStatus((prev) => ({
      ...prev,
      [orderId]: currentStatus,
    }));
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus); // Call the update function
      setSelectedStatus((prev) => ({ ...prev, [orderId]: null })); // Reset the selected status to hide dropdown
      getOrders(); // Refresh orders
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-500';
      case 'accepted':
        return 'bg-green-500';
      case 'delivered':
        return 'bg-teal-500';
      default:
        return 'bg-gray-500';
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Orders</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white p-4 rounded-lg shadow animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Today's Orders</h1>
      {orders.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto h-12 w-12 text-gray-400 mb-4">📦</div>
          <p className="text-gray-500 text-lg">No orders found</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => (
            <motion.div
              key={order._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-lg shadow-md h-full">
                <div className="p-4 border-b">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                      <p className="text-sm font-medium text-gray-500">
                        Order #{order._id.slice(-6)}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-gray-400">⏰</span>
                        <span className="text-sm text-gray-500">
                          {format(new Date(order.orderTime), "PPp")}
                        </span>
                      </div>
                      <div>
                        {order.studentId ? (
                          <h1 className="text-gray-700">{order.studentId.name || 'Unknown Student'} | {order.studentId.email}</h1>
                        ) : (
                          <span>No student information available</span>
                        )}
                      </div>
                    </div>
                    <div>
                      <button
                        onClick={() => handleStatusClick(order._id, order.status)}
                        className={`px-3 py-1 rounded-full text-sm text-white font-bold ${getStatusColor(order.status)}`}
                      >
                        {order.status}
                      </button>
                      {selectedStatus[order._id] === order.status && (
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order._id, e.target.value)}
                          className="ml-2 border rounded-md"
                        >
                          <option value="pending">Pending</option>
                          <option value="accepted">Accepted</option>
                          <option value="delivered">Delivered</option>
                        </select>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <div className="space-y-3 max-h-[280px] overflow-y-auto">
                    {order.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-16 h-16 rounded-md object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            ₹ {item.price} × {item.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t p-4">
                  <div className="flex items-center justify-between w-full">
                    <span className="text-sm font-medium text-gray-500">Total Amount:</span>
                    <span className="text-lg font-bold text-green-600">₹ {order.totalPrice}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
