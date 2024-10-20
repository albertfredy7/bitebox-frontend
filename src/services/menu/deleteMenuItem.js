// services/menu/deleteMenuItem.js
import api from '../api'; // Axios instance

// Function to delete a menu item by ID
const deleteMenuItem = async (id) => {
    const token = localStorage.getItem('token');
    try {
        const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

        // Send a DELETE request to the backend to delete the menu item by ID
        const response = await api.delete(`/menu/${id}`,config);

        // Check if the deletion was successful
        if (response.status === 200) {
            return { success: true, message: 'Menu item deleted successfully' };
        } else {
            return { success: false, message: 'Failed to delete menu item' };
        }
    } catch (error) {
        console.error('Error deleting menu item:', error);
        return { success: false, message: 'Error occurred while deleting the menu item' };
    }
};

export default deleteMenuItem;
