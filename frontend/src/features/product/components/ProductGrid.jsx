"use client";

import { useSelector } from "react-redux";

import ProductCard from "./ProductCard";

//{ onAddToCart }
const ProductGrid = ({ onDelete, onEdit }) => {
  const products = useSelector((state) => state.Product.products);

  if (!products?.length) {
    return (
      <div className="flex min-h-60 items-center justify-center rounded-xl border border-gray-200 bg-white">
        <p className="text-sm text-gray-500">
          No products found.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products?.map((product) => (
        <ProductCard
          key={product._id || product.id}
          product={product}
          //onAddToCart={onAddToCart}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ProductGrid;