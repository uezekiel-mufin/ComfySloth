import React, { useState } from "react";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { products_url as url, single_product_url } from "../utils/constants";
import axios from "axios";

const initialState = {
  isMenu: false,
  products_loading: false,
  products_error: "",
  products: [],
  product_loading: false,
  product_error: "",
  product: [],
  featured_products: [],
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const resp = await axios.get(url);
    return resp.data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    menuState: (state) => {
      state.isMenu = !state.isMenu;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.products_loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      (state.products_loading = false),
        (state.products = action.payload),
        (state.featured_products = action.payload.filter(
          (product) => product.featured === true
        ));
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.products_loading = false;
      state.products = [];
      state.products_error = "There was an error";
    });
  },
});

export default productSlice.reducer;
export const { menuState } = productSlice.actions;
