import { useState, useEffect } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../services/productApi';

export default function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: '', price: '', category: 'Computer', image: '/laptop.svg', description: '' });
  const [formError, setFormError] = useState('');

  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.price || Number(formData.price) <= 0) {
      setFormError('กรุณากรอกชื่อสินค้าและราคาให้ถูกต้อง');
      return;
    }

    try {
      setFormError('');
      const payload = { ...formData, price: Number(formData.price) };

      if (editingId) {
        await updateProduct(editingId, payload);
      } else {
        await createProduct(payload);
      }

      setFormData({ name: '', price: '', category: 'Computer', image: '/laptop.svg', description: '' });
      setEditingId(null);
      fetchAllProducts();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setFormData({
      name: product.name,
      price: product.price,
      category: product.category || 'Computer',
      image: product.image || '/laptop.svg',
      description: product.description || '',
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('คุณต้องการลบสินค้านี้ใช่หรือไม่?')) {
      try {
        await deleteProduct(id);
        fetchAllProducts();
      } catch (err) {
        alert(err.message);
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ name: '', price: '', category: 'Computer', image: '/laptop.svg', description: '' });
    setFormError('');
  };

  if (loading) return <div className="text-center py-10 font-bold">Loading products...</div>;
  if (error) return <div className="text-center py-10 text-red-500 font-bold">Error: {error}</div>;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Product Management (Admin)</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <h2 className="text-xl font-bold text-gray-700">{editingId ? 'Edit Product' : 'Add New Product'}</h2>
        
        {formError && <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">{formError}</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g. Mouse"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price (฿)</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g. 450"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 font-semibold">
            {editingId ? 'Save Changes' : 'Add Product'}
          </button>
          {editingId && (
            <button type="button" onClick={handleCancelEdit} className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {products.length === 0 ? (
          <div className="p-6 text-center text-gray-500 font-semibold">ไม่มีรายการสินค้าในระบบ (Empty State)</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="p-4 font-semibold">ID</th>
                <th className="p-4 font-semibold">Name</th>
                <th className="p-4 font-semibold">Category</th>
                <th className="p-4 font-semibold">Price</th>
                <th className="p-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{p.id}</td>
                  <td className="p-4 font-medium">{p.name}</td>
                  <td className="p-4 text-sm text-gray-600">{p.category}</td>
                  <td className="p-4 text-indigo-600 font-bold">฿{p.price}</td>
                  <td className="p-4 text-center space-x-2">
                    <button onClick={() => handleEdit(p)} className="bg-amber-500 text-white px-3 py-1 rounded text-sm hover:bg-amber-600">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(p.id)} className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}