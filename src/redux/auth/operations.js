import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const instance = axios.create({
  baseURL: "https://petlove.b.goit.study/api",
});

const setAuthHeaders = (token) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const apiLogin = createAsyncThunk(
  "auth/login",
  async (forDate, thunkApi) => {
    try {
      const { data } = await instance.post("users/signin", forDate);
      const token = data.accessToken;
      setAuthHeaders(token);
      console.log("login", data);
      return data;
    } catch (error) {
      console.error("login error", error);
      const message = error.response?.data?.message || "Unauthorized";
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const apiRegister = createAsyncThunk(
  "auth/register",
  async (forDate, thunkApi) => {
    try {
      console.log("Sending register request with:", forDate);
      const { data } = await instance.post("users/signup", forDate);
      const token = data?.accessToken;
      setAuthHeaders(token);
      console.log("register successful", data);
      return data;
    } catch (error) {
      console.error("register error", error);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const apiIsRefreshing = createAsyncThunk(
  "auth/refreshing",
  async (_, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const token = state.auth.token;
      setAuthHeaders(token);
      const { data } = await instance.get("users/current");
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
  {
    condition: (_, thunkApi) => {
      const state = thunkApi.getState();
      const token = state.auth.token;
      if (token) return true;
      return false;
    },
  }
);

export const apiLogout = createAsyncThunk(
  "auth/logout",
  async (_, thunkApi) => {
    try {
      await instance.post("users/signout");
      setAuthHeaders("");
      return;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
