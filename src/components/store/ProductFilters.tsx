export default function ProductFilters() {
  return (
    <div className="w-64 bg-white border rounded-2xl p-6 sticky top-8 h-fit">
      <h2 className="font-semibold text-xl mb-6">Bộ lọc</h2>
      
      <div className="space-y-8">
        <div>
          <h3 className="font-medium mb-3">Danh mục</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4" />
              <span>Điện thoại</span>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4" />
              <span>Laptop</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-3">Khoảng giá</h3>
          <div className="flex gap-3">
            <input 
              type="number" 
              placeholder="Từ" 
              className="border rounded-lg px-3 py-2 w-full text-sm"
            />
            <input 
              type="number" 
              placeholder="Đến" 
              className="border rounded-lg px-3 py-2 w-full text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}