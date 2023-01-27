import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

export const login = createAsyncThunk("user/login", async (payload) => {
    try {
        const response = await axiosInstance.post("/auth/login", payload);
        if(!response.data.token) {
            throw new Error("Bad Credentials or user not found");
        }
        console.log(response.data.token);
        axiosInstance.defaults.headers.common["Authorization"] = response.data.token;
        console.log('siema przed getem');
        const user = await axiosInstance.get("/user");
        return user.data;
    } catch (error) {
        throw new Error('Bad Credentials or user not found');
    }
});

export const register = createAsyncThunk("user/register", async (payload, {rejectWithValue}) => {
    try {
        const response = await axiosInstance.post("/auth/register", payload);
        return response.data;
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.response.data);
    }
});

const userSlice = createSlice({
    name: "user",
    initialState: {
        email: "",
        name: "",
        lastName: "",
        role: "",
        id: "",
        error : null,
        loading: false,
        status: "idle",
        isLoggedIn: false
    },
    reducers: {
        clearError: (state, action) => {
            state.error = null;
        },
        logout: (state, action) => {
            state.email = "";
            state.name = "";
            state.lastName = "";
            state.role = "";
            state.id = "";
            state.error = null;
            state.loading = false;
            state.status = "idle";
            state.isLoggedIn = false;
        }
    },
    extraReducers: builder => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.email = action.payload.email;
            state.name = action.payload.name;
            state.lastName = action.payload.last_name;
            state.role = action.payload.role;
            state.id = action.payload.id;
            state.error = null;
            state.loading = false;
            state.status = "success";
            state.isLoggedIn = true;
        });
        builder.addCase(login.rejected, (state, action) => {
            state.email = "";
            state.isLoggedIn = false;
            state.name = "";
            state.lastName = "";
            state.role = "";
            state.id = "";
            state.error = action.error.message;
            state.loading = false;
            state.status = "failed";
            console.log(action.error.message);
        });
        builder.addCase(login.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(register.fulfilled, (state, action) => {
            state.email = action.payload.email;
            state.name = action.payload.name;
            state.lastName = action.payload.lastName;
            state.role = action.payload.role;
            state.id = action.payload.id;
            state.isLoggedIn = true;
            state.error = null;
            state.loading = false;
            state.status = "success";
        });
        builder.addCase(register.rejected, (state, action) => {
            state.email = "";
            state.name = "";
            state.lastName = "";
            state.role = "";
            state.id = "";
            state.isLoggedIn = false;
            state.error = action.payload;
            state.loading = false;
            state.status = "failed";
            console.log(action.error.message);
        });
        builder.addCase(register.pending, (state, action) => {
            state.loading = true;
        });
    }
});

export default userSlice.reducer;

export const { clearError, logout } = userSlice.actions;


