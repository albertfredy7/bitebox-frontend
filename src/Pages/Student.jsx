import React, { useState, useEffect } from 'react';
import api from '../services/api';
import toast, { Toaster } from 'react-hot-toast';
import MenuItemCard from '../components/MenuItemCard';
import { useAtom } from 'jotai';
import { cartItemsAtom, cartTotalAtom, removeFromCartAtom } from '../atoms/cartAtom';
import { ShoppingCartIcon, ChefHatIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const Student = () => {
  const carts = localStorage.getItem('cart')
  const [menuItems, setMenuItems] = useState([]);
  const [cartItems, setCartItems] = useAtom(cartItemsAtom);
  const [total, setTotal] = useAtom(cartTotalAtom);
  const removeFromCart = useAtom(removeFromCartAtom)[1];
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch menu items from the backend
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await api.get('/menu');
        setMenuItems(response.data);
        if(carts!==null) setCartItems(JSON.parse(carts))
      } catch (error) {
        toast.error("There was a problem fetching the menu items from the server.");
        console.error('Error fetching menu items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  // Utility function to calculate total price
  const calculateTotal = (items) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Add item to cart
  const handleAddToCart = (item) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      const updatedCart = cartItems.map(cartItem =>
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      );
      setCartItems(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } else {
      let newcart = [...cartItems, { ...item, quantity: 1 }]
      setCartItems(newcart);
      localStorage.setItem('cart', JSON.stringify(newcart))
    }

    // Recalculate total price after updating cart
    const newTotal = calculateTotal(cartItems);
    setTotal(newTotal);
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <Toaster position="top-right" reverseOrder={false} />

      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-teal-600 text-white py-6 shadow-lg sticky top-0 z-10"
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <ChefHatIcon className="w-8 h-8" />
            <div>
              <h1 className="text-3xl font-bold">Foodie's Paradise - Student Portal</h1>
              <p className="text-teal-100 mt-2">Order your favorites effortlessly</p>
            </div>
          </div>
          <button
            onClick={() => setIsCartOpen(!isCartOpen)}
            className="relative p-2 hover:bg-teal-700 rounded-full transition-colors"
          >
            <ShoppingCartIcon className="w-6 h-6" />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </button>
        </div>
      </motion.header>

      {/* Cart Sidebar */}
      <div
        className={`fixed right-0 top-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 z-20 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Your Cart</h2>
            <button
              onClick={() => setIsCartOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>
          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-center mt-8">Your cart is empty</p>
          ) : (
            <>
              <div className="overflow-y-auto max-h-96">
                {cartItems.map((item, key) => (
                  <div key={key} className="flex justify-between items-center border-b py-2">
                    <div>
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-sm text-gray-500">₹{item.price} × {item.quantity}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <p className="text-lg font-semibold">Total: ₹{total}</p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Menu Items */}
      <main className="container flex flex-wrap gap-8">
        {loading ? (
          <p className="text-center">Loading menu items...</p>
        ) : (
          menuItems.map((item, key) => (<>
            <MenuItemCard
              key={key}
              id={item._id}
              image={item.imageUrl}
              title={item.name}
              price={item.price}
              available={item.available}
              onAddToCart={handleAddToCart} // Pass the add-to-cart function
            /></>
          ))
        )}
      </main>
    </div>
  );
};

export default Student;
