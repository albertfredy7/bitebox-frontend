import axios from '../api'; // Assuming axios is set up with baseURL

const updateProduct = async (id, productData) => {
  try {
    const token = localStorage.getItem('token'); // Or however you manage tokens
    const response = await axios.put(`/menu/${id}`, productData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    return response;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

export default updateProduct;