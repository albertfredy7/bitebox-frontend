// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './Pages/Home';
import Settings from './Pages/Settings';
import Menu from './Pages/Menu';
import Products from './Pages/Products';
import Orders from './Pages/Orders';
import Login from './Pages/Login';
import { Toaster } from 'react-hot-toast';
import PageNotFound from './Pages/PageNotFound';
import Student from './Pages/Student';
import RoleBasedRoute from './components/RoleBasedRoutes'; // Make sure this matches the actual file name
import { useAuth } from './context/AuthContext';
import StudentLayout from './components/StudentLayout';
import MyOrders from './Pages/MyOrders';
import Complaints from './Pages/Complaints';
import Forum from './Pages/Forum';

const App = () => {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login isLogin={true} />} />
        <Route path="/register" element={<Login isLogin={false} />} />

        {/* Student-only route */}
        <Route
          path="/student"
          element={ <StudentLayout/>}
        >
          <Route
            path="myorders"
            element={
              <RoleBasedRoute
                element={<MyOrders />}
                allowedRoles={['student']}
              />
            }
          />
          <Route
            path="forum"
            element={
              <RoleBasedRoute
                element={<Forum />}
                allowedRoles={['student']}
              />
            }
          />

          <Route
            index
            element={
              <RoleBasedRoute
                element={<Student />}
                allowedRoles={['student']}
              />
            }
          />
          

        </Route>

        {/* Canteen staff routes wrapped in Layout */}
        <Route path="/" element={<Layout />}>
          <Route
          index
            element={
              <RoleBasedRoute
                element={<Menu />}
                allowedRoles={['canteen']}
              />
            }
          />
          <Route
            path="orders"
            element={
              <RoleBasedRoute
                element={<Orders />}
                allowedRoles={['canteen']}
              />
            }
          />
          <Route
            path="complaints"
            element={
              <RoleBasedRoute
                element={<Complaints />}
                allowedRoles={['canteen']}
              />
            }
          />
        </Route>
        {/* 404 route */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App;