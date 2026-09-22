"use client";

import { useRouter } from "next/navigation";

import ProductForm from "../../features/product/components/ProductForm";
import { useProductAdd } from "../../features/hooks/useProductAdd";

const AddProductPage = () => {
  const router = useRouter();

  const {
    addProduct,
    loading,
    error,
  } = useProductAdd();

  const handleAddProduct = async (productData) => {
    try {
      await addProduct(productData);

      router.push("/");
    } catch (error) {
      console.error("Add product failed:", error);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Add Product
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Add a new product to your store.
          </p>
        </div>

        {/* Product Form */}
        <ProductForm
          onSubmit={handleAddProduct}
          loading={loading}
          error={error}
          submitLabel="Add Product"
        />
      </div>
    </main>
  );
};

export default AddProductPage;