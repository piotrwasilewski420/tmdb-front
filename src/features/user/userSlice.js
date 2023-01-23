import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

export const login = createAsyncThunk("user/login", async (payload) => {
    try {
        const response = await axiosInstance.post("/auth/login", payload);
        if(!response.data.token) {
            throw new Error("Bad Credentials or user not found");
        }
        axiosInstance.defaults.headers.common["Authorization"] = response.data.token;
        const userInfo = await axiosInstance.get("/user");
        if(!userInfo.data){
            throw new Error("No user info");
        }
        return userInfo.data;
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
        status: "idle"
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.email = action.payload.email;
            state.name = action.payload.name;
            state.lastName = action.payload.lastName;
            state.role = action.payload.role;
            state.id = action.payload.id;
            state.error = null;
            state.loading = false;
            state.status = "success";
        });
        builder.addCase(login.rejected, (state, action) => {
            state.email = "";
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


