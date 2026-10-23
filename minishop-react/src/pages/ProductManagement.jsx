import { useState, useEffect } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../services/productApi';

const emptyForm = { name: '', price: '', category: 'Computer', image: '/laptop.svg', description: '' };

export default function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState('');

  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
      setError('');
    } catch (err) {
      setError('ไม่สามารถโหลดข้อมูลสินค้าได้');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  function openAddModal() {
    setEditingId(null);
    setForm(emptyForm);
    setFormError('');
    setIsModalOpen(true);
  }

  function startEdit(product) {
    setEditingId(product.id);
    setForm({
      name: product.name,
      price: String(product.price),
      category: product.category || 'Computer',
      image: product.image || '/laptop.svg',
      description: product.description || '',
    });
    setFormError('');
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setEditingId(null);
    setForm(emptyForm);
    setFormError('');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.price || Number(form.price) <= 0) {
      setFormError('กรุณากรอกชื่อสินค้าและราคาให้ถูกต้อง (ราคาต้องมากกว่า 0)');
      return;
    }

    try {
      const payload = { ...form, price: Number(form.price) };
      if (editingId) {
        await updateProduct(editingId, payload);
      } else {
        await createProduct(payload);
      }
      closeModal();
      fetchAllProducts();
    } catch (err) {
      alert(err.message);
    }
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
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <div className="breadcrumbs text-sm">
        <ul>
          <li>Admin</li>
          <li>Products</li>
        </ul>
      </div>

      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">Product Management</h1>
          <p className="mt-1 opacity-70">Manage your store products and inventory</p>
        </div>
        <button onClick={openAddModal} className="btn btn-primary">
          + Add Product
        </button>
      </div>

      {/* Product Table */}
      <div className="overflow-x-auto rounded-box bg-base-100 shadow-md">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6 opacity-60">
                  ไม่มีรายการสินค้าในระบบ
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id}>
                  <td className="font-mono text-xs">{product.id}</td>
                  <td className="font-medium">{product.name}</td>
                  <td>
                    <span className="badge badge-outline">{product.category}</span>
                  </td>
                  <td className="font-bold text-primary">
                    ฿{Number(product.price).toLocaleString('en-US')}
                  </td>
                  <td>
                    <div className="flex justify-center gap-2">
                      <button onClick={() => startEdit(product)} className="btn btn-info btn-sm">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(product.id)} className="btn btn-error btn-sm">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* DaisyUI Modal */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box max-w-lg">
            <h3 className="font-bold text-lg mb-4">
              {editingId ? 'Edit Product' : 'Add New Product'}
            </h3>

            {formError && (
              <div role="alert" className="alert alert-error text-sm mb-4 py-2">
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label">
                  <span className="label-text font-medium">Product Name</span>
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Wireless Mouse"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium">Price (฿)</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  placeholder="450"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium">Category</span>
                </label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="select select-bordered w-full"
                >
                  <option value="Computer">Computer</option>
                  <option value="Audio">Audio</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Gadget">Gadget</option>
                </select>
              </div>

              <div className="modal-action">
                <button type="button" onClick={closeModal} className="btn btn-ghost">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingId ? 'Save Changes' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}