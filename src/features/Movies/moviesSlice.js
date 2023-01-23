import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

export const fetchMovies = createAsyncThunk("Movies/getMovies", async (payload) => {
    try {
        const {actor, director, year, title, genre} = payload;
        const query = `?&actor=${actor}&director=${director}&year=${year}&title=${title}&genre=${genre}`;
        const response = await axiosInstance.get(`/movies/${query}`);
        if(response.status !== 200) {
            throw new Error("No movies");
        }
        return response.data;
        }
        catch (error) {
        throw new Error(error.message);
    }
});

const moviesSlice = createSlice({
    name: 'Movies',
    initialState: {
        movies: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchMovies.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchMovies.fulfilled, (state, action) => {
            state.loading = false;
            state.movies = action.payload;
        });
        builder.addCase(fetchMovies.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
});

export default moviesSlice.reducer;