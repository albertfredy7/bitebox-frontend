import React from 'react';
import { Trash2Icon } from 'lucide-react';

const MenuItemCard = ({ image, title, price, available, onDelete, onEdit }) => {
    console.log(image);

    return (
        <div className="bg-white rounded-3xl shadow-lg p-4 w-72 relative">
            <div className="relative">
                <img src={image} alt={title} className="w-full h-40 object-cover rounded-2xl" />
                <div className="absolute top-2 left-2">
                    {available ? (
                        <span className="bg-green-400 text-white px-2 py-1 rounded-full font-semibold">Available</span>
                    ) : (
                        <span className="bg-red-400 text-white px-2 py-1 rounded-full font-semibold">Unavaiable</span>
                    )}
                </div>
                <button 
                    onClick={onDelete}
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                >
                    <Trash2Icon className="w-7 h-7 p-1" />
                </button>
            </div>
            <h2 className="text-xl font-bold mt-4 mb-2">{title}</h2>
            <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">₹{price}</span>
                <button 
                    onClick={onEdit}
                    className="bg-teal-400 text-white text-sm font-semibold py-2 px-4 rounded-full flex items-center transition-all hover:bg-gray-800"
                >
                    Edit Product
                    <span className="ml-2">→</span>
                </button>
            </div>
        </div>
    );
};

export default MenuItemCard;