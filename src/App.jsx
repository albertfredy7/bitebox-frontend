// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './Pages/Home';
import Settings from './Pages/Settings';
import Menu from './Pages/Menu';
import Products from './Pages/Products';
import Orders from './Pages/Orders';
import Login from './Pages/Login';
import PrivateRoute from './components/PrivateRoute'; // Import PrivateRoute
import Users from './Pages/Users';
import { Toaster } from 'react-hot-toast';
import PageNotFound from './Pages/PageNotFound';
import Student from './Pages/Student';

const App = () => {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/login" element={<Login isLogin={true} />} />
        <Route path="/register" element={<Login isLogin={false} />} />
        <Route path='/student' element={<Student/>}/>
        <Route path="/" element={<Layout />}>
          <Route index element={<PrivateRoute element={<Home />} />} />
          <Route path="settings" element={<PrivateRoute element={<Settings />} />} />
          <Route path="menu" element={<PrivateRoute element={<Menu />} />} />
          <Route path="products" element={<PrivateRoute element={<Products />} />} />
          <Route path="orders" element={<PrivateRoute element={<Orders />} />} />
          <Route path="users" element={<PrivateRoute element={<Users />} />} />

        </Route>
        <Route path="*" element={<PageNotFound />} /> {/* Catch-all route for 404 */}

      </Routes>
    </>

  );
};

export default App;
