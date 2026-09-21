"use client";

import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { getProductsApi } from "@/services/product.service";
import { setProducts } from "@/redux/slice/productSlice";

export const useProductRead = ({
  search = "",
  category = "",
} = {}) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getProductsApi({
        search,
        category,
      });

      dispatch(
        setProducts(response?.data?.data || [])
      );
    } catch (error) {
      dispatch(setProducts([]));

      setError(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to fetch products"
      );
    } finally {
      setLoading(false);
    }
  }, [search, category, dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts();
    }, 400);

    return () => clearTimeout(timer);
  }, [fetchProducts]);

  return {
    loading,
    error,
    refetch: fetchProducts,
  };
};