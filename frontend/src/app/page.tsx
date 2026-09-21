"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";

import ProductSearch from "@/features/product/ProductSearch";
import ProductFilters from "@/features/product/ProductFilter";
import ProductGrid from "@/features/product/ProductGrid";
import { useProductRead } from "@/hooks/useProducts";
import { useRouter } from "next/navigation";
import { useProductDelete } from "@/hooks/useProductDelete"
import Navbar from "../components/common/Navbar";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const router = useRouter()
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const { loading, error, refetch } = useProductRead({
    search,
    category,
  });

  const { deleteProduct, loading: deleteLoading, error: deleteError } = useProductDelete();

  const handleEdit = (product) => {
    if (!product?._id) return;

    router.push(`/${product._id}/edit`);
  };

  const handleDelete = async (product) => {
    if (!product?._id) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete "${product.productName}"?`
    );

    if (!confirmed) return;

    try {
      await deleteProduct(product._id);

      // Refresh product list after successful delete
      await refetch();
    } catch (error) {
      // Error is already handled inside useProductDelete
      console.error("Delete product failed:", error);
    }
  };


  return (
    <main className="min-h-screen w-full bg-gray-50">
      <Navbar />
      <div className="w-full px-4 sm:px-6 mt-10 ">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Products
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Browse and find the products you need.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row">
          <ProductSearch
            value={search}
            onChange={setSearch}
          />

          <ProductFilters
            value={category}
            onChange={setCategory}
          />
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex min-h-60 items-center justify-center">
            <p className="text-sm text-gray-500">
              Loading products...
            </p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Products */}
        {!loading && !error && (
          <ProductGrid
            //onAddToCart={handleAddToCart}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
    </main>
  );
};

export default ProductsPage;
//5 hourse + 4 hourse