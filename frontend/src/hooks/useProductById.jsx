"use client";

import { useCallback, useEffect, useState } from "react";

import { getProductByIdApi } from "@/features/product/services/product.service";

export const useProductById = (productId) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProduct = useCallback(async () => {
    if (!productId) {
      setProduct(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await getProductByIdApi(productId);

      setProduct(response?.data?.data || null);
    } catch (error) {
      setProduct(null);

      setError(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to fetch product"
      );
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return {
    product,
    loading,
    error,
    refetch: fetchProduct,
  };
};