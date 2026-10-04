function ProductCard({ name, price, image, category, rating, onAddToCart, onViewDetail }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md flex flex-col justify-between hover:shadow-lg transition">
      <div>
        <div className="h-40 flex items-center justify-center p-2 mb-3">
          <img src={image} alt={name} className="max-h-full max-w-full object-contain" />
        </div>

        {category && (
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-500 bg-indigo-50 px-2 py-1 rounded">
            {category}
          </span>
        )}

        <h3 className="font-bold text-gray-800 text-lg mt-2 line-clamp-1">{name}</h3>
        <p className="text-indigo-600 font-bold text-xl my-1">฿{price}</p>
        
        {rating && (
          <p className="text-xs text-yellow-500 font-semibold mb-3">
            ⭐ {rating.rate || rating} / 5
          </p>
        )}
      </div>

      <div className="flex gap-2 mt-2">
        <button
          onClick={onViewDetail}
          className="w-1/2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold py-2 px-2 rounded-lg transition"
        >
          View Detail
        </button>

        <button
          onClick={onAddToCart}
          className="w-1/2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold py-2 px-2 rounded-lg transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default ProductCard