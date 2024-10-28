import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCartIcon, User, Utensils, FileWarning, CircleMinus, CirclePlus } from 'lucide-react';
import { cartItemsAtom, removeFromCartAtom } from '../atoms/cartAtom';
import { useAtom } from 'jotai';
import { placeOrder } from '../services/orders/placeOrder';
import CartSidebar from './CartSidebar';
import { logoutUser } from '../services/auth/auth';

const StudentLayout = () => {
    const [cartItems, setCartItems] = useAtom(cartItemsAtom);
    const [isAccountOpen, setIsAccountOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const removeFromCart = useAtom(removeFromCartAtom)[1];
    const navigate = useNavigate();





    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className="bg-teal-600 text-white py-6 shadow-lg sticky top-0 z-10"
            >
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <Link to={'/'}><h1 className="text-3xl font-bold">BiteBOX</h1></Link>
                    <div className='flex gap-5'>
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
                        <button onClick={() => setIsAccountOpen((prev) => !prev)}>
                            <User />
                        </button>
                        {isAccountOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 0 }}
                                animate={{ opacity: 1, y: 10 }}
                                transition={{ duration: 0.2 }}
                                className='absolute top-16 right-2 w-full md:w-fit text-gray-900 bg-white shadow-md p-5 rounded-lg'
                            >
                                <div className="flex flex-col">
                                    <ul className="space-y-0">
                                        <li>
                                            <button onClick={() => {
                                                console.log("clicked account");
                                                
                                                navigate('myorders');
                                                setIsAccountOpen(false);
                                            }} className="w-full text-left py-2 hover:bg-gray-100 flex gap-3">
                                                <Utensils size={18} /> Orders
                                            </button>
                                        </li>
                                        <li>
                                            <button className="w-full text-left py-2 hover:bg-gray-100 flex gap-3">
                                                <FileWarning size={18} /> Complaints
                                            </button>
                                        </li>
                                        <li>
                                            <button className="w-full text-left py-2 hover:bg-gray-100" onClick={() => logoutUser()}>
                                                Logout
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </motion.header>

            <CartSidebar isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
            <Outlet />
        </>
    );
};

export default StudentLayout;
