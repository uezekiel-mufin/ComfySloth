import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

const initialState = {
  loading: false,
  order: {},
  error: "",
  stripeSessionId: "",
  stripeLoading: false,
  stripeError: "",
};

export const fetchOrder = createAsyncThunk("payment/fetchOrder", async (id) => {
  const { data } = await axios.get(`/api/order/${id}`);
  return data;
});

export const stripeSession = createAsyncThunk(
  "stripeSession",
  async (order) => {
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    const stripePromise = loadStripe(publishableKey);
    const stripe = await stripePromise;
    const checkoutSession = await axios.post("/api/order/stripePay", {
      ...order,
    });
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });
    return result;
  }
);

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
    builder.addCase(stripeSession.pending, (state, action) => {
      state.stripeLoading = true;
    });
    builder.addCase(stripeSession.fulfilled, (state, action) => {
      state.stripeSessionId = action.payload;
    });
    builder.addCase(stripeSession.rejected, (state, action) => {
      state.stripeError = "there was an error making the payment";
    });
  },
});

export default paymentSlice.reducer;
