import { Link } from 'react-router-dom';
import { getProducts } from '../models/productModel';

export default function Home() {
  const products = getProducts().slice(0, 2); // ดึงมาแสดงเฉพาะสินค้าแนะนำ

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-4">ยินดีต้อนรับสู่ MiniShop</h1>
      <p className="text-gray-600 mb-6">ร้านค้าออนไลน์จำหน่ายอุปกรณ์ IT และ Gadget คุณภาพดี</p>
      
      <h2 className="text-2xl font-bold text-gray-800 mb-4">สินค้าแนะนำ</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-bold text-lg">{product.name}</h3>
            <p className="text-indigo-600 font-bold">฿{product.price}</p>
            <Link 
              to={`/products/${product.id}`}
              className="inline-block mt-2 bg-indigo-600 text-white px-4 py-2 rounded text-sm hover:bg-indigo-700"
            >
              ดูรายละเอียด
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}