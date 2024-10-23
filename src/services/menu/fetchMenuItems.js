import api from "../api";
import { logoutUser } from "../auth/auth";

export const fetchMenuItems = async () => {
    const token = localStorage.getItem('token');
    try {
      const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
      const response = await api.get('/menu', config);
      console.log(response.data);
      return response.data; // Return the entire response data
    } catch (error) {
        if (error.response && error.response.status === 401) {
            console.log("Unauthorized error occurred");
            logoutUser();
        } else {
            console.log("An unexpected error occurred:", error);
        }
    }
};