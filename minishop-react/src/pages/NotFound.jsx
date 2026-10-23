import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="text-center py-16">
      <h1 className="text-6xl font-bold text-indigo-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">ไม่พบหน้าที่คุณต้องการ (Page Not Found)</h2>
      <p className="text-gray-500 mb-6">URL ที่คุณเข้าถึงไม่มีอยู่จริงหรือถูกย้ายไปแล้ว</p>
      <Link
        to="/"
        className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
      >
        กลับหน้าแรก
      </Link>
    </div>
  );
}