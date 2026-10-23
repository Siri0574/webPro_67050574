import { useState, useEffect } from 'react'
import Header from './components/Header'
import ProductList from './components/ProductList'
import Profile from './components/Profile'

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const [cartCount, setCartCount] = useState(0) 
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All') 
  const [sortOrder, setSortOrder] = useState('default') 
  const [selectedProduct, setSelectedProduct] = useState(null) 

  const categories = ['All', 'Computer', 'Audio', 'Fashion', 'Gadget']

  useEffect(() => {
    // fetch('https://fakestoreapi.com/products')
    fetch('/products.json')
      .then((res) => {
        if (!res.ok) throw new Error('ไม่สามารถโหลดข้อมูลได้')
        return res.json()
      })
      .then((data) => {
        setProducts(data)
        setLoading(false)
      })
      .catch((err) => {
        setError('ไม่สามารถโหลดข้อมูลได้')
        setLoading(false)
      })
  }, [])

  const handleAddToCart = () => {
    setCartCount(cartCount + 1)
  }

  let processedProducts = products.filter((product) => {
    const name = product.title || product.name || ''
    const matchesSearch = name.toLowerCase().includes(search.toLowerCase())
    const matchesCategory =
      selectedCategory === 'All' ||
      (product.category && product.category.toLowerCase() === selectedCategory.toLowerCase())

    return matchesSearch && matchesCategory
  })

  if (sortOrder === 'lowToHigh') {
    processedProducts.sort((a, b) => a.price - b.price)
  } else if (sortOrder === 'highToLow') {
    processedProducts.sort((a, b) => b.price - a.price)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center text-xl font-semibold text-gray-600">
        Loading...
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center text-xl font-semibold text-red-500">
        {error}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <Profile />

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Products</h2>

          <div className="text-lg font-semibold bg-white px-4 py-2 rounded-lg shadow flex items-center gap-2">
            <span>🛒 Cart:</span>
            <span className="text-indigo-600 font-bold">{cartCount}</span>
          </div>
        </div>

        <div className="mb-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search product..."
            className="w-full border p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          />
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex gap-2 mb-6 items-center">
          <span className="text-sm text-gray-600 font-medium">Sort by price:</span>
          <button
            onClick={() => setSortOrder('lowToHigh')}
            className={`px-3 py-1 text-xs rounded-md border transition ${
              sortOrder === 'lowToHigh' ? 'bg-indigo-100 border-indigo-500 text-indigo-700 font-bold' : 'bg-white'
            }`}
          >
            Price Low → High
          </button>
          <button
            onClick={() => setSortOrder('highToLow')}
            className={`px-3 py-1 text-xs rounded-md border transition ${
              sortOrder === 'highToLow' ? 'bg-indigo-100 border-indigo-500 text-indigo-700 font-bold' : 'bg-white'
            }`}
          >
            Price High → Low
          </button>
          {sortOrder !== 'default' && (
            <button
              onClick={() => setSortOrder('default')}
              className="text-xs text-gray-500 underline ml-2"
            >
              Reset
            </button>
          )}
        </div>

        {processedProducts.length === 0 ? (
          <div className="text-center py-10 text-gray-500 font-semibold text-lg">
            ไม่พบสินค้าที่ค้นหา
          </div>
        ) : (
          <ProductList
            products={processedProducts}
            onAddToCart={handleAddToCart}
            onViewDetail={(product) => setSelectedProduct(product)}
          />
        )}

        {selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl relative">
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl font-bold"
              >
                ✕
              </button>
              <div className="h-48 flex items-center justify-center mb-4">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">
                {selectedProduct.title || selectedProduct.name}
              </h3>
              <p className="text-indigo-600 font-bold text-2xl mb-2">฿{selectedProduct.price}</p>
              <p className="text-sm text-yellow-500 font-semibold mb-3">
                ⭐ Rating: {selectedProduct.rating?.rate || selectedProduct.rating || '4.5'} / 5
              </p>
              <p className="text-gray-600 text-sm mb-6">
                {selectedProduct.description || 'ไม่มีรายละเอียดสินค้าเพิ่มเติม'}
              </p>
              <button
                onClick={() => {
                  handleAddToCart()
                  setSelectedProduct(null)
                }}
                className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700"
              >
                Add to Cart
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App