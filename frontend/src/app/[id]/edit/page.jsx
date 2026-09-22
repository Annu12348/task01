"use client";

import { useParams, useRouter } from "next/navigation";

import ProductForm from "../../../features/product/components/ProductForm";
import { useProductById } from "../../../features/hooks/useProductById";
import { useProductUpdate } from "../../../features/hooks/useProductUpate";

const EditProductPage = () => {
  const params = useParams();
  const router = useRouter();

  const productId = params?.id;

  const {
    product,
    loading: productLoading,
    error: productError,
  } = useProductById(productId);

  const {
    updateProduct,
    loading: updateLoading,
    error: updateError,
  } = useProductUpdate();

  const handleUpdateProduct = async (productData) => {
    if (!productId) return;

    try {
      await updateProduct(productId, productData);

      router.push("/");
    } catch (error) {
      console.error("Update product failed:", error);
    }
  };

  // Loading product
  if (productLoading) {
    return (
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="mx-auto flex min-h-60 max-w-2xl items-center justify-center px-4">
          <p className="text-sm text-gray-500">
            Loading product...
          </p>
        </div>
      </main>
    );
  }

  // Product fetch error
  if (productError) {
    return (
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {productError}
          </div>
        </div>
      </main>
    );
  }

  // Product not found
  if (!product) {
    return (
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-gray-200 bg-white p-6 text-center">
            <p className="text-sm text-gray-500">
              Product not found.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Edit Product
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Update the product information below.
          </p>
        </div>

        {/* Update Error */}
        {updateError && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
            {updateError}
          </div>
        )}

        {/* Product Form */}
        <ProductForm
          initialData={product}
          onSubmit={handleUpdateProduct}
          loading={updateLoading}
          error=""
          submitLabel="Update Product"
        />
      </div>
    </main>
  );
};

export default EditProductPage;