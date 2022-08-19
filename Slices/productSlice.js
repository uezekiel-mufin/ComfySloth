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
  product: {},

  featured_products: [],
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const resp = await axios.get(url);
    return resp.data;
  }
);

export const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async (id) => {
    const resp = await axios.get(`${single_product_url}${id}`);
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
    builder.addCase(fetchProduct.pending, (state) => {
      state.product_loading = true;
    });
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      (state.product_loading = false),
        (state.product = action.payload),
        (state.product_error = "");
    });
    builder.addCase(fetchProduct.rejected, (state, action) => {
      (state.product_loading = false),
        (state.product = {}),
        (state.product_error = "There was an error fetching this Product");
    });
  },
});

export default productSlice.reducer;
export const { menuState } = productSlice.actions;
