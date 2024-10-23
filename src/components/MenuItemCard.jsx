import React from 'react';
import { PencilIcon } from 'lucide-react';

const MenuItemCard = ({ id, image, title, price, onAddToCart, quantity }) => {
    return (
        <div className="bg-white rounded-3xl shadow-lg p-4 w-72 relative">
            <div className="relative">
                <img src={image} alt={title} className="w-full h-40 object-cover rounded-2xl" />
            </div>
            <h2 className="text-xl font-bold mt-4 mb-2">{title}</h2>
            <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">₹{price}</span>
                <div className="flex items-center">
                    {quantity > 0 && (
                        <span className="mr-2 text-lg font-semibold">{quantity}</span>
                    )}
                    <button 
                        onClick={() => onAddToCart({ id, image, title, price, quantity: 1 })}
                        className="bg-teal-400 text-white text-sm font-semibold py-2 px-4 rounded-full flex items-center transition-all hover:bg-gray-800"
                    >
                        Add to Cart
                        <span className="ml-2">→</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MenuItemCard;
