import axios from '../api'; // assuming axios is set up with baseURL

const addProduct = async (productData) => {
  try {
    const token = localStorage.getItem('token'); // Or however you manage tokens
    const response = await axios.post('/menu', productData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    return response;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

export default addProduct;
