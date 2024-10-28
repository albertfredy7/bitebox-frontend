import api from "../api";

export const fetchMyOrders = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await api.get(`/orders/my-orders`,{
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json', // Changed from multipart/form-data
            },
          });

        console.log(response);
        

        return response
    } catch (err) {
        console.error('Error fetching orders:', err.message);
    }
};