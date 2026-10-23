import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import ProductManagement from './pages/ProductManagement';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
        <Route path="admin/products" element={<ProductManagement />} />
      </Route>
    </Routes>
  );
}