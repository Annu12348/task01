"use client";

import { useState } from "react";
import { addProductApi } from "@/features/product/services/product.service";

export const useProductAdd = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const addProduct = async (productData) => {
    try {
      setLoading(true);
      setError("");

      const response = await addProductApi(productData);

      return response;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to add product";

      setError(message);

      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    addProduct,
    loading,
    error,
  };
};