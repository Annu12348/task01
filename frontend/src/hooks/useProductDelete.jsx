"use client";

import { useState } from "react";
import { deleteProductApi } from "@/services/product.service";

export const useProductDelete = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const deleteProduct = async (productId) => {
    try {
      setLoading(true);
      setError("");

      const response = await deleteProductApi(productId);

      return response;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to delete product";

      setError(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteProduct,
    loading,
    error,
  };
};