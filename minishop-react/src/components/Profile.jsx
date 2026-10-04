function Profile() {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
          ST
        </div>
        <div>
          <h3 className="font-bold text-gray-800">Developed by สิริมา</h3>
          <p className="text-xs text-gray-500">รหัสนักศึกษา: 67050574 | Web Programming</p>
        </div>
      </div>
      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
        Active
      </span>
    </div>
  )
}

export default Profile