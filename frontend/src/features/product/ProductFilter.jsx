"use client";

const categories = [
  "Electronics",
  "Clothing",
  "Footwear",
  "Accessories",
  "Books",
  "Home & Kitchen",
];

const ProductFilters = ({ value = "", onChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      aria-label="Filter products by category"
      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:w-52"
    >
      <option value="">All Categories</option>

      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
};

export default ProductFilters;