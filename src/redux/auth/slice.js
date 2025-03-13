import { createSlice } from "@reduxjs/toolkit";
import {
  apiIsRefreshing,
  apiLogin,
  apiLogout,
  apiRegister,
} from "./operations";

const INITIAL_STATE = {
  user: {
    name: null,
    email: null,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  loading: false,
  error: null,
};

const handlePending = (state) => {
  state.loading = true;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    builder
      .addCase(apiRegister.pending, handlePending)
      .addCase(apiRegister.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.isLoggedIn = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(apiRegister.rejected, handleRejected)

      .addCase(apiLogin.pending, handlePending)
      .addCase(apiLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.isLoggedIn = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(apiLogin.rejected, handleRejected)

      .addCase(apiIsRefreshing.pending, (state) => {
        state.error = null;
        state.isRefreshing = true;
      })
      .addCase(apiIsRefreshing.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.isLoggedIn = true;
        state.user = action.payload;
        state.isRefreshing = false;
      })
      .addCase(apiIsRefreshing.rejected, (state, action) => {
        state.error = action.payload;
        state.isRefreshing = false;
      })

      .addCase(apiLogout.pending, handlePending)
      .addCase(apiLogout.fulfilled, (state) => {
        state.user = {
          name: null,
          email: null,
        };
        state.token = null;
        state.isLoggedIn = false;
        state.isRefreshing = false;
        state.loading = false;
        state.error = null;
      })
      .addCase(apiLogout.rejected, handleRejected);
  },
});

export const authReducer = authSlice.reducer;
