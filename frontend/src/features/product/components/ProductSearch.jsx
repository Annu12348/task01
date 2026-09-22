"use client";

const ProductSearch = ({ value = "", onChange }) => {
  return (
    <div className="relative w-full">
      <input
        type="search"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder="Search products..."
        aria-label="Search products"
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 pr-10 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />

      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
        🔍
      </span>
    </div>
  );
};

export default ProductSearch;