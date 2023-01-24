import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

export const fetchGenres = createAsyncThunk("Genres/getGenres", async () => {
    try {
        const response = await axiosInstance.get("/other/genres");
        if(response.status !== 200) {
            throw new Error("No genres");
        }
        return response.data;
        }
        catch (error) {
        throw new Error(error.message);
    }
});

export const fetchFavorites = createAsyncThunk("Genres/getFavorites", async () => {
    try {
        const response = await axiosInstance.get("/user/favs");
        if(response.status !== 200) {
            throw new Error("No favorites");
        }
        return response.data;
        }
        catch (error) {
        throw new Error(error.message);
    }
});

export const fetchWishlisted = createAsyncThunk("Genres/getWishlisted", async () => {
    try {
        const response = await axiosInstance.get("/user/wishlist");
        if(response.status !== 200) {
            throw new Error("No wishlisted");
        }
        return response.data;
        }
        catch (error) {
        throw new Error(error.message);
    }
});


const genresSlice = createSlice({
    name: 'Genres',
    initialState: {
        genres: [],
        favorites: [],
        wishlisted: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchGenres.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchGenres.fulfilled, (state, action) => {
            state.loading = false;
            state.genres = action.payload;
        });
        builder.addCase(fetchGenres.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        builder.addCase(fetchFavorites.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchFavorites.fulfilled, (state, action) => {
            state.loading = false;
            state.favorites = action.payload;
        });
        builder.addCase(fetchFavorites.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        builder.addCase(fetchWishlisted.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchWishlisted.fulfilled, (state, action) => {
            state.loading = false;
            state.wishlisted = action.payload;
        });
        builder.addCase(fetchWishlisted.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
});

export default genresSlice.reducer;