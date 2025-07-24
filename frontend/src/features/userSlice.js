import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  loading: false,
  error: null,
  success: false,
  token: localStorage.getItem("token") || null,
};

// ✅ Use correct backend server port (e.g., 5000)
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/v1/users",
  withCredentials: true,
});

// ✅ Add interceptor to inject token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ REGISTER USER
export const registerUser = createAsyncThunk("user/register", async (userData, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post("/register", userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const token = response.data.token;
    if (token) localStorage.setItem("token", token);

    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Registration failed");
  }
});

// ✅ LOGIN USER
export const loginUser = createAsyncThunk("user/login", async (userData, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post("/login", userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const token = response.data.token;
    if (token) localStorage.setItem("token", token);

    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Login failed");
  }
});

// ✅ LOGOUT USER
export const logoutUser = createAsyncThunk("user/logout", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post("/logout");

    localStorage.removeItem("token");
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Logout failed");
  }
});

// ✅ FETCH LOGGED-IN USER
export const fetchUser = createAsyncThunk("user/profile", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get("/profile");
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Fetching user failed");
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload.user;
        state.token = localStorage.getItem("token");
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
        state.user = null;
      });

    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload.user;
        state.token = localStorage.getItem("token");
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
        state.user = null;
      });

    builder
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.success = true;
        state.loading = false;
      });

    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = localStorage.getItem("token");
        state.loading = false;
        state.success = true;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.user = null;
        state.token = null;
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { setUser, clearUser, logout } = userSlice.actions;
export default userSlice.reducer;