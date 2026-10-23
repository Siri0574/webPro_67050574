import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
      <div className="text-2xl font-bold text-indigo-600">MiniShop</div>
      <div className="flex gap-6 font-medium text-gray-600">
        <NavLink to="/" className={({ isActive }) => isActive ? "text-indigo-600 font-bold" : "hover:text-indigo-600"}>Home</NavLink>
        <NavLink to="/products" className={({ isActive }) => isActive ? "text-indigo-600 font-bold" : "hover:text-indigo-600"}>Products</NavLink>
        <NavLink to="/profile" className={({ isActive }) => isActive ? "text-indigo-600 font-bold" : "hover:text-indigo-600"}>Profile</NavLink>
        <NavLink to="/admin/products" className={({ isActive }) => isActive ? "text-indigo-600 font-bold" : "hover:text-indigo-600"}>Admin</NavLink>
      </div>
    </nav>
  );
}