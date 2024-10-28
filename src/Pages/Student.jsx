import React, { useState, useEffect } from 'react';
import api from '../services/api';
import toast, { Toaster } from 'react-hot-toast';
import MenuItemCard from '../components/MenuItemCard';
import { useAtom } from 'jotai';
import { cartItemsAtom, cartTotalAtom, removeFromCartAtom } from '../atoms/cartAtom';

const Student = () => {
  const carts = localStorage.getItem('cart')
  const [menuItems, setMenuItems] = useState([]);
  const [cartItems, setCartItems] = useAtom(cartItemsAtom);
  const [total, setTotal] = useAtom(cartTotalAtom);
  const removeFromCart = useAtom(removeFromCartAtom)[1];
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isAccountOpen, setIsAccountOpen] = useState(false)

  // Fetch menu items from the backend
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await api.get('/menu');
        const filteredItems = response.data.filter(item => item.available === true);

        console.log(filteredItems);

        setMenuItems(filteredItems);
        if (carts !== null) setCartItems(JSON.parse(carts))
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
      <main className="container  flex ms-auto me-auto py-12 justify-center md:justify-normal  flex-wrap gap-8">
        {loading ? (
          <p className="text-center">Loading menu items...</p>
        ) : (
          menuItems.length > 0 ?
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
            )) :
            <div>
              <img src="https://cdn.dribbble.com/users/2243442/screenshots/11362056/media/c9432283d2d6ba1a23f2fcd6169f2983.gif" alt="" />
            </div>
        )}
      </main>
    </div>
  );
};

export default Student;
