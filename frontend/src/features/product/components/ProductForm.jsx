"use client";

import { useEffect, useState } from "react";

const initialFormData = {
  productName: "",
  price: "",
  category: "",
  image: null,
  description: "",
};

const ProductForm = ({
  initialData = null,
  onSubmit,
  loading = false,
  error = "",
  submitLabel = "Add Product",
}) => {
  const [formData, setFormData] = useState(initialFormData);
  const [previewUrl, setPreviewUrl] = useState("");

  // Pre-fill form when editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        productName: initialData.productName ?? "",
        price: initialData.price ?? "",
        category: initialData.category ?? "",
        image: null,
        description: initialData.description ?? "",
      });

      setPreviewUrl(initialData.imageUrl ?? "");
    } else {
      setFormData(initialFormData);
      setPreviewUrl("");
    }
  }, [initialData]);

  const handleChange = (event) => {
    const { name, value, files } = event.target;

    if (name === "image") {
      const file = files?.[0] || null;

      setFormData((previous) => ({
        ...previous,
        image: file,
      }));

      if (file) {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      }

      return;
    }

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData();

    data.append("productName", formData.productName);
    data.append("price", formData.price);
    data.append("category", formData.category);
    data.append("description", formData.description);

    // Only append image when user selected a new image
    if (formData.image) {
      data.append("image", formData.image);
    }

    await onSubmit?.(data);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      {/* Error */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Product Name */}
      <div>
        <label
          htmlFor="productName"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Product Name
        </label>

        <input
          id="productName"
          name="productName"
          type="text"
          value={formData.productName}
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

      {/* Image */}
      <div>
        <label
          htmlFor="image"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Product Image
        </label>

        <input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          onChange={handleChange}
          required={!initialData}
          disabled={loading}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-100"
        />

        {/* Image Preview */}
        {previewUrl && (
          <div className="mt-4 overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
            <img
              src={previewUrl}
              alt="Product preview"
              className="h-48 w-full object-contain p-3"
            />
          </div>
        )}
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