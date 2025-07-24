import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user: null,
    loading: false,
    error: null,
    success: false,
    token: localStorage.getItem("token") || null,
}

export const registerUser = createAsyncThunk("user/register", async (userData, { rejectWithValue }) => {
    try {
        const response = await axios.post("/api/v1/users/register",
            userData,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        const token = response.data.token;

        if (token) {
            localStorage.setItem("token", token);
        }

        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message || "Something went wrong");
    }
});

export const loginUser = createAsyncThunk("user/login", async (userData, { rejectWithValue }) => {
    try {
        const response = await axios.post("/api/v1/users/login", userData, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        });

        const token = response.data.token;

        if (token) {
            localStorage.setItem("token", token);
        }

        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message || "Something went wrong");
    }
});

export const logoutUser = createAsyncThunk("user/logout", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.post("/api/v1/users/logout", {}, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        });

        localStorage.removeItem("token");
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message || "Something went wrong");
    }
});

export const fetchUser = createAsyncThunk("user/profile", async (_, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/v1/users/profile", {
            withCredentials: true, headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': "application/json",
            }
        });

        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message || "Something went wrong");
    }
});
const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.user = null;
        }
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
                state.user = action.payload;
                state.success = true;
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
            .addCase(loginUser.pending, (state, action) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.success = true
                state.loading = false;
                state.error = null;
                state.token = localStorage.getItem("token");
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.payload;
                state.user = null;
            });
        builder
            .addCase(logoutUser.pending, (state, action) => {
                state.loading = true;
                state.error = null;
                state.success = false;
                state.user = null;
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.error = null;
                state.loading = false;
                state.user = action.payload;
                state.success = true;
                state.token = null;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
                state.user = null;
                state.success = false;
            });
        builder
            .addCase(fetchUser.pending, (state, action) => {
                state.error = null;
                state.loading = true;
                state.user = null;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.loading = false;
                state.success = true;
                state.token = localStorage.getItem("token");
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.user = null;
                state.error = action.payload;
                state.loading = false;
                state.success = false;
            });
    }
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;