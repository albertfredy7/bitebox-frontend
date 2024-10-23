// src/components/RoleBasedRoute.js
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Assuming you have an auth context

const RoleBasedRoute = ({ element, allowedRoles }) => {
  const { user, isAuthenticated } = useAuth();
  if(!isAuthenticated) return <Navigate to="/login"/>
  
  if (!allowedRoles.includes(user.role)) {
    // Redirect based on role
    if (user.role === 'student') return <Navigate to="/student" replace />;
    if (user.role === 'canteen') return <Navigate to="/" replace />;
  }
  return element;
};

export default RoleBasedRoute;