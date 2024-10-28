// CartSidebar.js
import React from 'react';
import { CircleMinus, CirclePlus } from 'lucide-react';
import { useAtom } from 'jotai';
import { cartItemsAtom, removeFromCartAtom } from '../atoms/cartAtom';
import { placeOrder } from '../services/orders/placeOrder';

const CartSidebar = ({ isCartOpen, setIsCartOpen }) => {
    const [cartItems, setCartItems] = useAtom(cartItemsAtom);
    const removeFromCart = useAtom(removeFromCartAtom)[1];

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const incrementQuantity = (id) => {
        const updatedCartItems = cartItems.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCartItems(updatedCartItems);
        localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    };

    const decrementQuantity = (id) => {
        setCartItems((prevItems) =>
            prevItems.flatMap((item) => {
                if (item.id === id) {
                    // Check if quantity is 1; if so, remove the item
                    if (item.quantity === 1) {
                        removeFromCart(id); // Call your remove function
                        return []; // Return an empty array to remove the item
                    }
                    // Otherwise, decrement the quantity
                    const updatedItem = { ...item, quantity: item.quantity - 1 };
                    localStorage.setItem('cart', JSON.stringify(prevItems));
                    return [updatedItem];
                }
                return item;
            })
        );
    };

    const handleCheckout = async () => {
        try {
            await placeOrder(cartItems); // Directly use cartItems
            setCartItems([]); // Clear the cart after successful order
            setIsCartOpen(false);
            localStorage.removeItem('cart'); // Optionally, clear cart from localStorage
        } catch (error) {
            console.error("Checkout failed:", error);
        }
    };


    return (
        <div
            className={`fixed right-0 top-0 h-full w-full sm:w-80 bg-white shadow-lg transform transition-transform duration-300 z-20 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
            <div className="flex flex-col h-full">
                <div className="p-4 border-b">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold">Your Cart</h2>
                        <button onClick={() => setIsCartOpen(false)} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
                    </div>
                </div>

                {cartItems.length === 0 ? (
                    <div className="flex-1 flex items-center justify-center">
                        <p className="text-gray-500">Your cart is empty</p>
                    </div>
                ) : (
                    <>
                        <div className="flex-1 overflow-y-auto p-4">
                            {cartItems.map((item, key) => (
                                <div key={key} className="flex justify-between items-center border-b py-2">
                                    <div>
                                        <p className="font-semibold">{item.title}</p>
                                        <p className="text-sm text-gray-500">₹{item.price} × {item.quantity}</p>
                                    </div>
                                    <div className='flex gap-5 items-center'>
                                        <button onClick={() => decrementQuantity(item.id)}><CircleMinus className="h-5 w-5" /></button>
                                        <p>{item.quantity}</p>
                                        <button onClick={() => incrementQuantity(item.id)}><CirclePlus className="h-5 w-5" /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="border-t p-4 bg-gray-50">
                            <div className="mb-4">
                                <p className="text-lg font-semibold text-center">Total: ₹{calculateTotal()}</p>
                            </div>
                            <button onClick={handleCheckout} className='w-full bg-teal-500 hover:bg-teal-600 px-4 py-3 rounded-lg text-white font-medium transition-colors'>
                                Checkout
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default CartSidebar;
