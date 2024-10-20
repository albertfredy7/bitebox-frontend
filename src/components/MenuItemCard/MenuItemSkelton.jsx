import React from 'react';

const MenuItemSkeleton = () => {
    return (
        <div className="bg-gray-200 animate-pulse rounded-3xl shadow-lg p-4 w-72 h-64">
            <div className="bg-gray-300 w-full h-40 rounded-2xl"></div>
            <div className="mt-4 space-y-3">
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded"></div>
                {/* <div className="flex justify-between items-center mt-3">
                    <div className="h-4 bg-gray-300 rounded w-16"></div>
                    <div className="h-8 bg-gray-300 rounded-full w-20"></div>
                </div> */}
            </div>
        </div>
    );
};

export default MenuItemSkeleton;
