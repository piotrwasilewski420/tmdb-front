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

const genresSlice = createSlice({
    name: 'Genres',
    initialState: {
        genres: [],
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
    }
});

export default genresSlice.reducer;