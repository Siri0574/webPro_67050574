import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../services/productApi';

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError('ไม่สามารถโหลดข้อมูลสินค้าได้');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const totalValue = products.reduce((sum, p) => sum + Number(p.price || 0), 0);
  const categories = new Set(products.map((p) => p.category)).size;

  if (loading) {
    return (
      <div className="flex justify-center p-10">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div role="alert" className="alert alert-error">
        <span>{error}</span>
        <button className="btn btn-sm" onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    );
  }

  const stats = [
    { title: 'Total Products', value: products.length, icon: '📦', description: 'จำนวนสินค้าทั้งหมด' },
    { title: 'Product Value', value: `฿${totalValue.toLocaleString('en-US')}`, icon: '💰', description: 'ผลรวมราคาสินค้า' },
    { title: 'Categories', value: categories, icon: '🏷️', description: 'จำนวนหมวดหมู่' },
  ];

  return (
    <section className="space-y-6">
      <div className="breadcrumbs text-sm">
        <ul>
          <li>Admin</li>
          <li>Dashboard</li>
        </ul>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="mt-1 opacity-70">Overview of your MiniShop products</p>
        </div>
        <Link to="/admin/products" className="btn btn-primary">
          Manage Products
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.title} className="card bg-base-100 shadow-md">
            <div className="card-body">
              <div className="flex items-center justify-between gap-3">
                <h2 className="card-title text-base">{stat.title}</h2>
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <p className="mt-2 text-3xl font-bold text-primary">{stat.value}</p>
              <p className="text-xs opacity-60">{stat.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="card bg-base-100 shadow-md">
        <div className="card-body">
          <div className="flex items-center justify-between gap-3 mb-4">
            <h2 className="card-title">Recent Products</h2>
            <Link to="/admin/products" className="link link-primary text-sm font-semibold">
              View All
            </Link>
          </div>

          {products.length === 0 ? (
            <div className="alert mt-2"><span>ยังไม่มีสินค้าในระบบ</span></div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products.slice(0, 5).map((product) => (
                    <tr key={product.id}>
                      <td className="font-medium">{product.name}</td>
                      <td><span className="badge badge-outline">{product.category}</span></td>
                      <td className="font-bold text-primary">฿{Number(product.price).toLocaleString('en-US')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}