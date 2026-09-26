import './style.css'

const productsData = [
  {
    id: 1,
    name: 'Laptop',
    price: '฿12,900',
    rating: '★ 4.3 (24)',
    image: '/laptop.svg'
  },
  {
    id: 2,
    name: 'Headphones',
    price: '฿1,290',
    rating: '★ 4.5 (18)',
    image: '/headphones.svg'
  },
  {
    id: 3,
    name: 'Backpack',
    price: '฿890',
    rating: '★ 4.7 (32)',
    image: '/backpack.svg'
  },
  {
    id: 4,
    name: 'Smart Watch',
    price: '฿2,990',
    rating: '★ 4.4 (20)',
    image: '/smart_watch.svg'
  }
]

let currentTab = 'dashboard'
let selectedProduct = null
let cartCount = 2
let itemQuantity = 1

function renderApp() {
  document.querySelector('#app').innerHTML = `
  <div class="flex min-h-screen bg-gray-50 text-gray-800 font-sans">

    <!-- ================= SIDEBAR MENU ================= -->
    <aside class="w-64 bg-white border-r border-gray-100 flex flex-col justify-between p-6">
      <div>
        <div class="mb-8">
          <h1 class="text-xl font-bold text-blue-600 flex items-center gap-2">MiniShop</h1>
        </div>

        <nav class="space-y-2">
          <!-- ปุ่ม Dashboard -->
          <button id="nav-dashboard" class="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${currentTab === 'dashboard' ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-50'}">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
            Dashboard
          </button>

          <!-- ปุ่ม Products -->
          <button id="nav-products" class="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${currentTab === 'products' || currentTab === 'product-detail' ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-50'}">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
            Products
          </button>

          <!-- ปุ่ม Profile -->
          <button id="nav-profile" class="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${currentTab === 'profile' ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-50'}">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
            Profile
          </button>
        </nav>
      </div>
    </aside>

    <!-- ================= MAIN CONTENT AREA ================= -->
    <div class="flex-1 flex flex-col">

      <!-- Header Bar -->
      <header class="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8">
        <div></div>
        <div class="flex items-center gap-4 text-gray-500">
          <button class="p-2 hover:bg-gray-100 rounded-full transition">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </button>
          <button class="p-2 hover:bg-gray-100 rounded-full transition relative">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"></path></svg>
            <span class="absolute top-1 right-1 w-4 h-4 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center">${cartCount}</span>
          </button>
          <button class="p-1 hover:bg-gray-100 rounded-full transition">
            <div class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
            </div>
          </button>
        </div>
      </header>

      <!-- Main Content Area -->
      <main class="p-8">

        <!-- DASHBOARD -->
        ${currentTab === 'dashboard' ? `
          <section class="space-y-6">
            <h2 class="text-2xl font-bold text-gray-800">Dashboard</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
                </div>
                <div><p class="text-xs text-gray-400 font-medium">Total Products</p><h3 class="text-2xl font-bold text-blue-600">24</h3></div>
              </div>
              <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div class="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"></path></svg>
                </div>
                <div><p class="text-xs text-gray-400 font-medium">Orders</p><h3 class="text-2xl font-bold text-emerald-600">128</h3></div>
              </div>
              <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div class="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center font-bold text-xl">฿</div>
                <div><p class="text-xs text-gray-400 font-medium">Revenue</p><h3 class="text-2xl font-bold text-purple-600">฿48,500</h3></div>
              </div>
            </div>

            <!-- Recent Orders Table -->
            <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
              <h3 class="text-lg font-bold text-gray-800">Recent Orders</h3>
              <table class="w-full text-left text-sm text-gray-500">
                <thead class="text-xs text-gray-400 border-b">
                  <tr><th class="py-2">#</th><th>Date</th><th>Customer</th><th>Items</th><th>Total</th><th>Status</th></tr>
                </thead>
                <tbody class="divide-y">
                  <tr><td class="py-3">1</td><td>2025-09-15</td><td>Somchai J.</td><td>3</td><td>฿1,260</td><td><span class="bg-emerald-100 text-emerald-600 px-2.5 py-1 rounded-full text-xs">Completed</span></td></tr>
                  <tr><td class="py-3">2</td><td>2025-09-14</td><td>Nattaya K.</td><td>1</td><td>฿520</td><td><span class="bg-blue-100 text-blue-600 px-2.5 py-1 rounded-full text-xs">Processing</span></td></tr>
                  <tr><td class="py-3">3</td><td>2025-09-13</td><td>Kritsada P.</td><td>2</td><td>฿980</td><td><span class="bg-purple-100 text-purple-600 px-2.5 py-1 rounded-full text-xs">Shipped</span></td></tr>
                </tbody>
              </table>
            </div>
          </section>
        ` : ''}

        <!-- PRODUCTS -->
        ${currentTab === 'products' ? `
          <section class="space-y-6">
            <div class="flex justify-between items-center">
              <h2 class="text-2xl font-bold text-gray-800">Products</h2>
              <div class="flex gap-3">
                <input type="text" placeholder="Search products..." class="px-4 py-2 border rounded-xl text-sm w-64 bg-white" />
                <select class="px-4 py-2 border rounded-xl text-sm bg-white"><option>All Categories</option></select>
              </div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              ${productsData.map(item => `
                <div data-product-id="${item.id}" class="product-card bg-white rounded-2xl border p-5 space-y-4 cursor-pointer hover:shadow-md transition">
                  <div class="h-40 bg-gray-50 rounded-xl flex items-center justify-center p-4 overflow-hidden">
                    <img src="${item.image}" alt="${item.name}" class="h-full w-full object-contain" />
                  </div>
                  <div>
                    <h3 class="font-bold text-gray-800">${item.name}</h3>
                    <p class="text-blue-600 font-bold mt-1">${item.price}</p>
                    <p class="text-amber-500 text-xs mt-1">${item.rating}</p>
                  </div>
                  <button class="add-btn w-full bg-blue-600 text-white py-2 rounded-xl text-sm hover:bg-blue-700 transition">Add to Cart</button>
                </div>
              `).join('')}
            </div>
          </section>
        ` : ''}
        <!-- PRODUCT DETAIL -->
        ${currentTab === 'product-detail' && selectedProduct ? `
          <section class="space-y-6">
            <div class="flex items-center gap-4">
              <button id="back-to-products" class="p-2 bg-white border rounded-xl hover:bg-gray-50 transition">
                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
              </button>
              <div>
                <h2 class="text-2xl font-bold text-gray-800">${selectedProduct.name} Details</h2>
                <p class="text-sm text-gray-400">รายละเอียดสินค้าและการสั่งซื้อ</p>
              </div>
            </div>
            
            <div class="bg-white rounded-2xl border p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div class="h-64 bg-gray-50 rounded-xl flex items-center justify-center p-6 overflow-hidden">
                <img src="${selectedProduct.image}" alt="${selectedProduct.name}" class="h-full w-full object-contain" />
              </div>
              <div class="space-y-4">
                <h3 class="text-2xl font-bold text-gray-800">${selectedProduct.name}</h3>
                <p class="text-blue-600 font-bold text-2xl">${selectedProduct.price}</p>
                <p class="text-amber-500 text-sm">${selectedProduct.rating}</p>
                
                <!-- Counter Quantity -->
                <div class="flex items-center gap-4 py-2">
                  <button id="btn-decrease" class="w-10 h-10 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition flex items-center justify-center">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path></svg>
                  </button>
                  <span class="font-bold text-lg w-8 text-center">${itemQuantity}</span>
                  <button id="btn-increase" class="w-10 h-10 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition flex items-center justify-center">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                  </button>
                </div>

                <button id="btn-add-to-cart" class="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition flex items-center justify-center gap-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"></path></svg>
                  Add to Cart
                </button>
              </div>
            </div>
          </section>
        ` : ''}

        <!-- PROFILE -->
        ${currentTab === 'profile' ? `
          <section class="space-y-6">
            <h2 class="text-2xl font-bold text-gray-800">Profile</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="bg-white rounded-2xl border p-8 flex flex-col items-center text-center space-y-4">
                <div class="w-24 h-24 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                  <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                </div>
                <div>
                  <h3 class="text-xl font-bold text-gray-800">Sirima Intong</h3>
                  <p class="text-gray-400 text-sm">67050574@email.com</p>
                  <p class="text-gray-400 text-xs mt-1">Student ID: 67050574</p>
                </div>
                <button class="w-full bg-blue-600 text-white py-2 rounded-xl text-sm hover:bg-blue-700 transition">Edit Profile</button>
              </div>

              <div class="md:col-span-2 bg-white rounded-2xl border p-6 space-y-4">
                <h3 class="font-bold text-gray-800">Account Summary</h3>
                <div class="grid grid-cols-2 gap-4">
                  <div class="bg-blue-50 p-4 rounded-xl">
                    <p class="text-xs text-gray-500">Total Orders</p>
                    <p class="text-xl font-bold text-blue-600 mt-1">128</p>
                  </div>
                  <div class="bg-purple-50 p-4 rounded-xl">
                    <p class="text-xs text-gray-500">Total Spent</p>
                    <p class="text-xl font-bold text-purple-600 mt-1">฿48,500</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ` : ''}

      </main>
    </div>
  </div>
  `


  document.querySelector('#nav-dashboard').addEventListener('click', () => { currentTab = 'dashboard'; renderApp(); })
  document.querySelector('#nav-products').addEventListener('click', () => { currentTab = 'products'; renderApp(); })
  document.querySelector('#nav-profile').addEventListener('click', () => { currentTab = 'profile'; renderApp(); })

  if (currentTab === 'products') {
    document.querySelectorAll('.product-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const id = parseInt(card.getAttribute('data-product-id'))
        selectedProduct = productsData.find(p => p.id === id)
        itemQuantity = 1
        currentTab = 'product-detail'
        renderApp()
      })
    })
  }

  
  if (currentTab === 'product-detail') {
    document.querySelector('#back-to-products').addEventListener('click', () => {
      currentTab = 'products'
      renderApp()
    })

    document.querySelector('#btn-increase').addEventListener('click', () => {
      itemQuantity++
      renderApp()
    })

    document.querySelector('#btn-decrease').addEventListener('click', () => {
      if (itemQuantity > 1) {
        itemQuantity--
        renderApp()
      }
    })

  }
}

renderApp()