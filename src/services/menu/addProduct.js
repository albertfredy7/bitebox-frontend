// addProduct.js
import axios from '../api';

const addProduct = async (productData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post('/menu', productData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json', // Changed from multipart/form-data
      },
    });

    return {
      success: true,
      status: response.status,
      data: response.data
    };
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

export default addProduct;