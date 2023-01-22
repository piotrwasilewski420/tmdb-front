import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

export const fetchTopMovies = createAsyncThunk("TopMovies/getTopMovies", async (payload) => {
    try {
        const response = await axiosInstance.get('/movies/top');
        if(response.status !== 200) {
            throw new Error('Error fetching top movies');
        }
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
});

const topMoviesSlice = createSlice({
    name: 'TopMovies',
    initialState: {
        topMovies: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchTopMovies.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchTopMovies.fulfilled, (state, action) => {
            state.loading = false;
            state.topMovies = action.payload;
        });
        builder.addCase(fetchTopMovies.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
});

export default topMoviesSlice.reducer;


