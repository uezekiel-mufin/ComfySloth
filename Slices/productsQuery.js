import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://course-api.com/" }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => `react-store-products`,
    }),
    getSingleProduct: builder.query({
      query: (id) => `react-store-single-product?id=${id}`,
    }),
  }),
});

export const { useGetAllProductsQuery, useGetSingleProductQuery } = productsApi;
