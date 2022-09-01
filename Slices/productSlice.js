import React, { useState } from "react";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { products_url as url, single_product_url } from "../utils/constants";
import axios from "axios";
import { HYDRATE } from "next-redux-wrapper";
import Product from "../components/Models/Products";
import db from "../utils/db";

const initialState = {
  isMenu: false,
  products_loading: false,
  products_error: "",
  products: [],
  product_loading: false,
  product_error: "",
  product: {},
  featured_products: [],
  filtered_products: [],
  grid_view: true,
  list_view: false,
  filters: false,
};

export const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async (id) => {
    db.connect();
    const products = await products.find().lean();
    return products;
  }
);
export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    db.connect();
    const products = await products.find().lean();
    return products;
  }
);
// export const fetchProduct = createAsyncThunk(
//   "product/fetchProduct",
//   async (id) => {
//     const response = await axios.get(`${single_product_url}${id}`);
//     return response.data;
//   }
// );
// export const fetchProducts = createAsyncThunk(
//   "product/fetchProducts",
//   async () => {
//     const response = await axios.get(`${url}`);
//     return response.data;
//   }
// );

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    menuState: (state) => {
      state.isMenu = !state.isMenu;
    },
    gridView: (state) => {
      state.grid_view = true;
      state.list_view = false;
    },
    listView: (state) => {
      state.grid_view = false;
      state.list_view = true;
    },
    sortByLowest: (state) => {
      state.filtered_products = state.filtered_products.sort((a, b) => {
        if (a.price > b.price) return 1;
        if (a.price < b.price) return -1;
      });
    },
    sortByHighest: (state) => {
      state.filtered_products = state.filtered_products.sort((a, b) => {
        if (a.price > b.price) return -1;
        if (a.price < b.price) return 1;
      });
    },
    sortByName: (state) => {
      state.filtered_products = state.filtered_products.sort((a, b) => {
        const nameA = a.name;
        const nameB = b.name;
        if (nameA > nameB) return 1;
        if (nameA < nameB) return -1;
      });
    },
    sortByReverseName: (state) => {
      state.filtered_products = state.filtered_products.sort((a, b) => {
        const nameA = a.name;
        const nameB = b.name;
        if (nameA > nameB) return -1;
        if (nameA < nameB) return 1;
      });
    },
    searchProducts: (state, action) => {
      state.filtered_products = state.filters
        ? state.filtered_products.filter((product) =>
            product.name.includes(action.payload)
          )
        : state.products.filter((product) =>
            product.name.includes(action.payload)
          );
      state.filters = true;
    },
    searchProductsByCategory: (state, action) => {
      if (action.payload === "all") {
        state.filtered_products = state.products.filter(
          (product) => product.category !== "all"
        );
      } else {
        state.filtered_products = state.products.filter(
          (product) =>
            product.category === action.payload && action.payload !== "all"
        );
      }
      state.filters = true;
    },
    searchProductsByCompany: (state, action) => {
      if (action.payload === "all") {
        state.filtered_products = state.filters
          ? state.filtered_products.filter(
              (product) => product.company !== "all"
            )
          : state.products.filter((product) => product.company !== "all");
      } else {
        state.filtered_products = state.filters
          ? state.filtered_products.filter(
              (product) =>
                product.company === action.payload && action.payload !== "all"
            )
          : state.products.filter(
              (product) =>
                product.company === action.payload && action.payload !== "all"
            );
      }
      state.filters = true;
    },
    searchProductsByColor: (state, action) => {
      if (action.payload == "all") {
        state.filtered_products = [...state.products];
      } else {
        state.filtered_products = state.filters
          ? state.filtered_products.filter((product) =>
              product.colors.includes(action.payload)
            )
          : state.products.filter((product) =>
              product.colors.includes(action.payload)
            );
      }
      state.filters = true;
    },
    searchProductsByPrice: (state, action) => {
      state.filtered_products = state.products.filter(
        (product) => product.price >= 0 && product.price <= action.payload
      );
      state.filters = true;
    },
    searchByFreeShipping: (state, action) => {
      if (action.payload === "not_checked") {
        state.filtered_products = [...state.products];
      } else {
        state.filtered_products = state.filters
          ? state.filtered_products.filter(
              (product) => product.shipping === true
            )
          : state.products.filter((product) => product.shipping === true);
      }
      state.filters = true;
    },
    clearFilters: (state) => {
      state.filtered_products = [...state.products];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.products_loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      (state.products_loading = false),
        (state.products = action.payload),
        (state.filtered_products = action.payload),
        (state.featured_products = action.payload.filter(
          (product) => product.featured === true
        ));
    });
    builder.addCase(fetchProducts.rejected, (state) => {
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
    builder.addCase([HYDRATE], (state, action) => {
      state.product = action.payload.products.product;
      state.featured_products = action.payload.products.featured_products;
      state.products = action.payload.products.products;
      state.isMenu = action.payload.products.isMenu;
      state.product_loading = action.payload.products.product_loading;
      state.products_loading = action.payload.products.products_loading;
      state.products_error = action.payload.products.products_error;
      state.product_error = action.payload.products.product_error;
    });
  },
});

export default productSlice.reducer;
export const {
  menuState,
  gridView,
  listView,
  sortByHighest,
  sortByLowest,
  sortByName,
  sortByReverseName,
  searchProducts,
  searchProductsByCategory,
  searchProductsByCompany,
  searchProductsByColor,
  searchProductsByPrice,
  searchByFreeShipping,
  clearFilters,
} = productSlice.actions;
