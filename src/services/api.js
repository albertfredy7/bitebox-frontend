import axios from "axios";

const URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000'; // Fallback to localhost

const api = axios.create({
    baseURL: `${URL}/api`, // Ensure the baseURL is correct
    // withCredentials: true,
});

export default api;
