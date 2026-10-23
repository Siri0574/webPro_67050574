import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductById } from '../models/productModel';

export default function ProductDetail() {
  const { id } = useParams();
  const product = getProductById(id);
  const navigate = useNavigate();

  if (!product) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-red-500">Product not found</h2>
        <Link to="/products" className="text-indigo-600 underline mt-4 inline-block">
          กลับไปหน้ารายการสินค้า
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow max-w-2xl mx-auto">
      <div className="h-64 flex items-center justify-center mb-6">
        <img src={product.image} alt={product.name} className="max-h-full object-contain" />
      </div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
      <p className="text-2xl font-bold text-indigo-600 mb-4">฿{product.price}</p>
      <p className="text-gray-600 mb-6">{product.description}</p>
      
      <div className="flex gap-4">
        {/* ปุ่ม Continue Shopping ตามโจทย์ Assignment */}
        <button
          onClick={() => navigate('/products')}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
        >
          ← Continue Shopping
        </button>
      </div>
    </div>
  );
}