import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filtered_products: [],
  unFiltered_products: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    // searchProducts: (state, action) => {
    //   state.filtered_products = state.filtered_products.filter((product) =>
    //     product.name.includes(action.payload)
    //   );
    // },
  },
});

export default filterSlice.reducer;
// export const { searchProducts } = filterSlice.actions;
