import axiosInstance from "@/lib/axios/client";

export const getProductsApi = async ({
  search = "",
  category = "",
} = {}) => {
  const params = {};

  if (search.trim()) {
    params.search = search.trim();
  }

  if (category.trim()) {
    params.category = category.trim();
  }

  return await axiosInstance.get("/product/read", {
    params,
    withCredentials: true
  });
};

export const getProductByIdApi = async (productId) => {
  if (!productId) {
    throw new Error("Product ID is required");
  }

  return await axiosInstance.get(`/product/${productId}`, {
    withCredentials: true,
  });
};

export const addProductApi = async (productData) => {
  return await axiosInstance.post(
    "/product/add",
    productData,
    {
      withCredentials: true,
    }
  );
};

export const updateProductApi = async (productId, productData) => {
  if (!productId) {
    throw new Error("Product ID is required");
  }

  return await axiosInstance.put(
    `/product/update/${productId}`,
    productData,
    {
      withCredentials: true,
    }
  );
};

export const deleteProductApi = async (productId) => {
  if (!productId) {
    throw new Error("Product ID is required");
  }

  return await axiosInstance.delete(
    `/product/delete/${productId}`,
    {
      withCredentials: true,
    }
  );
};