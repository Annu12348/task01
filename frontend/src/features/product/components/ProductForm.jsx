"use client";

import { useEffect, useState } from "react";

const initialFormData = {
  productName: "",
  price: "",
  description: "",
  imageUrl: "",
  category: "",
};

const ProductForm = ({
  initialData = null,
  onSubmit,
  loading = false,
  error = "",
  submitLabel = "Add Product",
}) => {
  const [formData, setFormData] = useState(initialFormData);

  // Pre-fill form when editing an existing product
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.productName || "",
        price: initialData.price ?? "",
        description: initialData.description || "",
        image: initialData.imageUrl || initialData.imageUrl || "",
        category: initialData.category || "",
      });
    } else {
      setFormData(initialFormData);
    }
  }, [initialData]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await onSubmit?.(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      {/* Form Error */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Product Name */}
      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Product Name
        </label>

        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter product name"
          required
          disabled={loading}
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-100"
        />
      </div>

      {/* Price */}
      <div>
        <label
          htmlFor="price"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Price
        </label>

        <input
          id="price"
          name="price"
          type="number"
          min="0"
          step="0.01"
          value={formData.price}
          onChange={handleChange}
          placeholder="Enter product price"
          required
          disabled={loading}
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-100"
        />
      </div>

      {/* Category */}
      <div>
        <label
          htmlFor="category"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Category
        </label>

        <input
          id="category"
          name="category"
          type="text"
          value={formData.category}
          onChange={handleChange}
          placeholder="Enter product category"
          disabled={loading}
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-100"
        />
      </div>

      {/* Image URL */}
      <div>
        <label
          htmlFor="image"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Image URL
        </label>

        <input
          id="image"
          name="image"
          type="url"
          value={formData.image}
          onChange={handleChange}
          placeholder="https://example.com/product.jpg"
          disabled={loading}
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-100"
        />
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Description
        </label>

        <textarea
          id="description"
          name="description"
          rows={5}
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter product description"
          disabled={loading}
          className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-100"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 active:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Please wait..." : submitLabel}
      </button>
    </form>
  );
};

export default ProductForm;