import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
}

export const ProductSlice = createSlice({
  name: "Product",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },

    clearProduct: (state) => {
      state.products = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { setProducts, clearProduct } = ProductSlice.actions;
export default ProductSlice.reducer;