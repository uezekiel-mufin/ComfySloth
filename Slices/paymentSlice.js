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
  payStackData_loading: false,
  payStackData: {},
  payStackData_error: "",
  orderHistory: [],
  orderHistory_loading: false,
  orderHistory_error: "",
};

export const fetchOrder = createAsyncThunk("payment/fetchOrder", async (id) => {
  const { data } = await axios.get(`/api/order/${id}`);
  return data;
});

export const fetchOrderHistory = createAsyncThunk(
  "payment/fetchOrderHistory",
  async () => {
    const { data } = await axios.get(`/api/order/history`);
    return data;
  }
);

export const stripeSession = createAsyncThunk(
  "stripeSession",
  async (order) => {
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    const stripePromise = loadStripe(publishableKey);
    const stripe = await stripePromise;
    const checkoutSession = await axios.post("/api/order/stripePay", {
      ...order,
    });
    await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    return checkoutSession;
  }
);

export const paystackSession = createAsyncThunk(
  "paystackSession",
  async (order) => {
    const data = await axios.post(`/api/order/paystack`, {
      order,
    });
    return data;
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    paymentMade: (state) => {
      state.order.isPaid = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrder.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.order = action.payload;
    });
    builder.addCase(fetchOrder.rejected, (state) => {
      state.error = "There was an error fetching the order";
    });
    builder.addCase(stripeSession.pending, (state) => {
      state.stripeLoading = true;
    });
    builder.addCase(stripeSession.fulfilled, (state, action) => {
      state.stripeSessionId = action.payload.data.id;
    });
    builder.addCase(stripeSession.rejected, (state) => {
      state.stripeError = "there was an error making the payment";
    });
    builder.addCase(paystackSession.pending, (state, action) => {
      state.payStackData_loading = true;
    });
    builder.addCase(paystackSession.fulfilled, (state, action) => {
      state.payStackData = action.payload;
      state.order.isPaid = true;
    });
    builder.addCase(paystackSession.rejected, (state, action) => {
      state.payStackData_error = action.payload;
    });
    builder.addCase(fetchOrderHistory.pending, (state) => {
      state.orderHistory_loading = true;
    });
    builder.addCase(fetchOrderHistory.fulfilled, (state, action) => {
      state.orderHistory_loading = false;
      state.orderHistory = action.payload;
    });
    builder.addCase(fetchOrderHistory.rejected, (state) => {
      state.orderHistory_loading = false;
      state.orderHistory = [];
      state.orderHistory_error =
        "There was an error fetching the order History";
    });
  },
});

export default paymentSlice.reducer;
export const { paymentMade } = paymentSlice.actions;
