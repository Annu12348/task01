"use client";

import Image from "next/image";
import { Pencil, ShoppingCart, Trash2 } from "lucide-react";

const ProductCard = ({
  product,
  onAddToCart,
  onEdit,
  onDelete,
}) => {
  if (!product) return null;

  const {
    _id,
    productName,
    description,
    price,
    image,
    imageUrl,
    category,
  } = product;

  const productImage = image || imageUrl;

  return (
    <article className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow duration-200 hover:shadow-md">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        {productImage ? (
          <Image
            src={productImage}
            alt={productName || "Product image"}
            fill
            sizes="
              (max-width: 640px) 100vw,
              (max-width: 1024px) 50vw,
              25vw
            "
            className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-gray-400">
            No Image
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-4">
        {/* Category */}
        {category && (
          <span className="text-xs font-medium text-gray-500">
            {category}
          </span>
        )}

        {/* Product Name */}
        <h2 className="mt-1 line-clamp-1 text-base font-semibold text-gray-900">
          {productName || "Unnamed Product"}
        </h2>

        {/* Description */}
        {description && (
          <p className="mt-2 min-h-10 line-clamp-2 text-sm leading-5 text-gray-500">
            {description}
          </p>
        )}

        {/* Price */}
        <p className="mt-3 text-lg font-bold text-blue-600">
          ₹{Number(price || 0).toLocaleString("en-IN")}
        </p>

        {/* Actions */}
        <div className="mt-4 flex items-center gap-2">
          {/* Add To Cart */}
          <button
            type="button"
            onClick={() => onAddToCart?.(product)}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 active:bg-blue-800"
          >
            <ShoppingCart size={17} />
            <span>Add to Cart</span>
          </button>

          {/* Edit */}
          <button
            type="button"
            onClick={() => onEdit?.(product)}
            aria-label={`Edit ${productName || "product"}`}
            title="Edit product"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
          >
            <Pencil size={17} />
          </button>

          {/* Delete */}
          <button
            type="button"
            onClick={() => onDelete?.(product)}
            aria-label={`Delete ${productName || "product"}`}
            title="Delete product"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-red-200 text-red-600 transition-colors hover:bg-red-50 hover:text-red-700"
          >
            <Trash2 size={17} />
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;