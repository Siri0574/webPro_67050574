export default function Profile() {
  return (
    <div className="bg-white p-6 rounded-lg shadow max-w-md mx-auto">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xl">
          ST
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">Developed by สิริมา</h2>
          <p className="text-sm text-gray-500">รหัสนักศึกษา: 67050574 | Web Programming</p>
          <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-semibold">
            Active
          </span>
        </div>
      </div>
    </div>
  );
}