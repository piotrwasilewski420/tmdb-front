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

export const favoritesThunk = createAsyncThunk("Genres/favoritesThunk", async (payload) => {
    try {
        if(payload.fav) {
            const response = await axiosInstance.delete(`/movie/favorite/${payload.id}`);
        } else {
            const response = await axiosInstance.put(`/movie/favorite/${payload.id}`);
        }
    } catch (error) {
        throw new Error(error.message);
    }
    const result = await axiosInstance.get("/user/favs");
    return result.data;
});

export const wishlistedThunk = createAsyncThunk("Genres/wishlistedThunk", async (payload) => {
    try {
        if(payload.wish) {
            const response = await axiosInstance.delete(`/movie/wishlist/${payload.id}`);
        } else {
            const response = await axiosInstance.put(`/movie/wishlist/${payload.id}`);
        }
    } catch (error) {
        throw new Error(error.message);
    }
    const result = await axiosInstance.get("/user/wishlist");
    return result.data;
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
    reducers: {
    },
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
        builder.addCase(favoritesThunk.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(favoritesThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.favorites = action.payload;
        });
        builder.addCase(favoritesThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        builder.addCase(wishlistedThunk.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(wishlistedThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.wishlisted = action.payload;
        });
        builder.addCase(wishlistedThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
});

export default genresSlice.reducer;