import { Link } from 'react-router-dom';
import { getProducts } from '../models/productModel';

export default function Products() {
  const products = getProducts();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">สินค้าทั้งหมด</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow flex flex-col justify-between">
            <div>
              <div className="h-32 flex items-center justify-center mb-2">
                <img src={product.image} alt={product.name} className="max-h-full object-contain" />
              </div>
              <h3 className="font-bold text-lg">{product.name}</h3>
              <p className="text-indigo-600 font-bold">฿{product.price}</p>
            </div>
            <Link
              to={`/products/${product.id}`}
              className="mt-4 text-center bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
            >
              รายละเอียดสินค้า
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}