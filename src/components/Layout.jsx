import { NavLink, Outlet } from 'react-router-dom';
import { Home, Utensils, ShoppingCart, Package, Users, Settings, LogOut } from 'lucide-react';
import { logoutUser } from '../services/auth/auth';

const Layout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="p-4 w-72">
        <aside className="w-full bg-white shadow-md h-full rounded-2xl flex flex-col justify-between">
          <div>
            <div className="mb-10 p-4">
              <h1 className="text-4xl font-bold p-5 ">Bite<span className="text-teal-400">BOX</span></h1>
            </div>
            <nav className="space-y-2 p-4">
              <NavLink to="/" className={({ isActive }) => `flex items-center p-2 rounded-lg ${isActive ? 'bg-teal-400 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
                <Home className="w-5 h-5 mr-3" />
                <span>Home</span>
              </NavLink>
              <NavLink to="/orders" className={({ isActive }) => `flex items-center p-2 rounded-lg ${isActive ? 'bg-teal-400 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
                <ShoppingCart className="w-5 h-5 mr-3" />
                <span>Orders</span>
              </NavLink>
              <NavLink to="/menu" className={({ isActive }) => `flex items-center p-2 rounded-lg ${isActive ? 'bg-teal-400 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
                <Utensils className="w-5 h-5 mr-3" />
                <span>Menu</span>
              </NavLink>
              <NavLink to="/settings" className={({ isActive }) => `flex items-center p-2 rounded-lg ${isActive ? 'bg-teal-400 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
                <Settings className="w-5 h-5 mr-3" />
                <span>Settings</span>
              </NavLink>
              <NavLink to="/users" className={({ isActive }) => `flex items-center p-2 rounded-lg ${isActive ? 'bg-teal-400 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
                <Users className="w-5 h-5 mr-3" />
                <span>Users</span>
              </NavLink>
            </nav>
          </div>
          <div className="p-4">
            <button
             className="flex items-center w-full p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
             onClick={logoutUser}
             >
              <LogOut className="w-5 h-5 mr-3" />
              <span>Sign Out</span>
            </button>
          </div>
        </aside>
      </div>
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
