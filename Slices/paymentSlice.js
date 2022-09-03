import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  order: {},
  error: "",
};

export const fetchOrder = createAsyncThunk("payment/fetchOrder", async (id) => {
  const { data } = await axios.get(`/api/order/${id}`);
  return data;
});

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrder.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.order = action.payload;
    });
    builder.addCase(fetchOrder.rejected, (state, action) => {
      state.error = "There was an error fetching the order";
    });
  },
});

export default paymentSlice.reducer;
