"use client";

import { useState } from "react";

import { updateProductApi } from "@/features/product/services/product.service";

export const useProductUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const updateProduct = async (productId, productData) => {
    try {
      setLoading(true);
      setError("");

      const response = await updateProductApi(
        productId,
        productData
      );

      return response;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to update product";

      setError(message);

      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    updateProduct,
    loading,
    error,
  };
};