// updateProduct.js
import axios from '../api';

const updateProduct = async (id, productData) => {
  if (!id) {
    throw new Error('Product ID is required for update');
  }

  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('Authentication token is missing');
    }

    const response = await axios.put(`/menu/${id}`, productData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json', // Changed from multipart/form-data
      },
    });

    return {
      status: response.status,
      success: true,
      data: response.data,
      message: 'Product updated successfully'
    };

  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || error.message;
      return {
        status: error.response?.status || 500,
        success: false,
        message: errorMessage,
        error: error.response?.data
      };
    }

    return {
      status: 500,
      success: false,
      message: error.message || 'Failed to update product',
      error: error
    };
  }
};

export default updateProduct;