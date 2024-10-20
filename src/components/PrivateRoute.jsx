// src/components/PrivateRoute.js

import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem('token'); // Adjust the key based on how you store the token
  
  return token ? element : <Navigate to="/login" />;
};

export default PrivateRoute;