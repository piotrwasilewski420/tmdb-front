import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

export const fetchAllUsers = createAsyncThunk('admin/fetchAllUsers', async () => {
    try {
        const {data} = await axiosInstance.get('/admin/users');
        return data;
    } catch (error) {
        throw new Error(error);
    }
});

export const deleteUser = createAsyncThunk('admin/deleteUser', async (userId) => {
    try {
        const {data} = await axiosInstance.delete(`/admin/user/${userId}`);
        return userId;
    } catch (error) {
        throw new Error(error);
    }
});

export const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        users: [],
        loading: false,
        error: null
    },
    reducers: {
        registerNewUser: (state, action) => {
            state.users.push({...action.payload,role:'ADMIN'});
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchAllUsers.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload;
        });
        builder.addCase(fetchAllUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
        builder.addCase(deleteUser.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(deleteUser.fulfilled, (state, action) => {
            state.loading = false;
            state.users = state.users.filter(user => user.id !== action.payload);
        });
        builder.addCase(deleteUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
    }
});

export default adminSlice.reducer;
export const { registerNewUser } = adminSlice.actions;