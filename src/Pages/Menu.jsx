import React, { useState, useEffect } from 'react';
import MenuItemCard from '../components/MenuItemCard/MenuItemCard';
import MenuItemSkeleton from '../components/MenuItemCard/MenuItemSkelton'; // Import skeleton
import { fetchMenuItems } from '../services/menu/fetchMenuItems';
import SearchBar from '../components/SearchBar';
import deleteMenuItem from '../services/menu/deleteMenuItem';
import ProductModal from '../components/ProductModal/ProductModal'; // Import ProductModal

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [searchQuery, setSearchQuery] = useState(''); // State to store the search query
  const [isModalOpen, setIsModalOpen] = useState(false); // Control modal visibility
  const [editingProduct, setEditingProduct] = useState(null); // Store the product being edited

  // Function to refetch the menu items
  const refetchMenuItems = async () => {
    setLoading(true);
    try {
      const menuItems = await fetchMenuItems(); // Fetch menu items
      setMenu(menuItems);
      setLoading(false); // Data loaded
    } catch (error) {
      console.error("Failed to fetch menu items:", error);
      setLoading(false); // Even if there's an error, stop loading
    }
  };

  const handleEditItem = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  // Function to delete an item
  const handleDelete = async (id) => {
    try {
      await deleteMenuItem(id); // Call the delete API
      setMenu(prevMenu => prevMenu.filter(item => item._id !== id));
    } catch (error) {
      console.error("Failed to delete menu item:", error);
    }
  };

  // Fetch menu items on component mount
  useEffect(() => {
    refetchMenuItems();
  }, []);

  return (
    <div>
      <div className='float-end'>
        <div className='flex justify-evenly '>
          {/* <SearchBar /> Pass the search function to SearchBar */}
          <button
            className='bg-gray-900 text-white px-10 py-2 rounded-lg'
            onClick={() => setIsModalOpen(true)}> {/* Set modal to open */}
            Add Item
          </button>
        </div>
      </div>

      <div className='mt-28'>
        <div className='text-3xl font-bold'>
          Menu
        </div>
        <div className='flex flex-wrap gap-8 mt-10'>
          {
            loading ? (
              Array(4).fill(null).map((_, index) => (
                <MenuItemSkeleton key={index} />
              ))
            ) : (
              menu.length > 0 ? (
                menu.map((item, index) => (
                  <MenuItemCard
                    key={index}
                    image={item.imageUrl}
                    title={item.name}
                    price={item.price}
                    available={item.available}
                    onDelete={() => handleDelete(item._id)}
                    onEdit={() => handleEditItem(item)}
                  />
                ))
              ) : (
                <div className='flex justify-center flex-col items-center w-full h-full'>
                  <img src="https://cdn.dribbble.com/users/2243442/screenshots/11362056/media/c9432283d2d6ba1a23f2fcd6169f2983.gif" alt="no food available" className=' h-auto w-1/4 mix-blend-multiply' />
                  <p className='mt-4 text-center'>No food items available now, will prepare soon!</p>
                </div>
              )
            )
          }
        </div>
      </div>
      {/* Pass refetchMenuItems function to ProductModal */}
      <ProductModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} refetchMenuItems={refetchMenuItems} product={editingProduct} />
    </div>
  );
};

export default Menu;