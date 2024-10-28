import axios from "axios";
import { useState, useEffect } from 'react';
import api from "../services/api";
import { fetchMyOrders } from "../services/orders/fetchStudentOrder";
import { format } from 'date-fns';


export default function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const sortedOrders = orders.sort((a, b) => {
        // Sort orders based on orderTime in descending order
        return new Date(b.orderTime).getTime() - new Date(a.orderTime).getTime();
      });

      useEffect(() => {
        const getOrders = async () => {
          try {
            const response = await fetchMyOrders();
            setOrders(response.data.sort((a, b) => {
              return new Date(b.orderTime).getTime() - new Date(a.orderTime).getTime();
            }));
          } catch (error) {
            console.error('Error fetching orders:', error);
          } finally {
            setLoading(false);
          }
        };
        getOrders();
      }, []);

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return 'bg-yellow-500';
            case 'accepted':
                return 'bg-green-500';
            case 'delivered':
                return 'bg-black-500';
            default:
                return 'bg-gray-500';
        }
    };

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
            <h1 className="text-3xl font-bold mb-6">My Orders</h1>
            {orders.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-500">No orders found</p>
                </div>
            ) : (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {orders.map((order) => (
                        <div
                            key={order._id}
                            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 flex flex-col h-[300px]"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <h3 className="text-lg font-semibold">
                                    Order #{order._id.slice(-6)}
                                </h3>
                                <span className={`${getStatusColor(order.status)} px-2 py-1 rounded-full text-white text-sm`}>
                                    {order.status}
                                </span>
                            </div>
                            <p className="text-sm text-gray-500 mb-4">
                                {format(new Date(order.orderTime), "PPp")}
                            </p>

                            <div className="flex-1 overflow-y-auto mb-4">
                                {order.items.map((item, index) => (
                                    <div key={index} className="flex items-center gap-3 mb-2 p-2 bg-gray-50 rounded">
                                        <img
                                            src={item.imageUrl}
                                            alt={item.name}
                                            className="w-12 h-12 rounded-md object-cover"
                                        />
                                        <div className="flex-1">
                                            <p className="font-medium">{item.name}</p>
                                            <p className="text-sm text-gray-500">
                                                ₹{item.price} × {item.quantity}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t pt-3 mt-auto">
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold">Total</span>
                                    <span className="font-bold">₹{order.totalPrice}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}