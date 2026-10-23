import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center px-8">
      <h1 className="text-xl font-bold text-blue-600">MiniShop</h1>
      <div className="flex gap-4">
        <NavLink to="/" className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "text-gray-600"}>Home</NavLink>
        <NavLink to="/products" className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "text-gray-600"}>Products</NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "text-gray-600"}>About</NavLink>
        <NavLink to="/profile" className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "text-gray-600"}>Profile</NavLink>
        <NavLink to="/admin/products" className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "text-gray-600"}>Admin</NavLink>
      </div>
    </nav>
  );
}