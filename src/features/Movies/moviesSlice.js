import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

export const fetchMovies = createAsyncThunk("Movies/getMovies", async (payload) => {
    try {
        const {actor, director, year, title, genre} = payload;
        const query = `?&actor=${actor}&director=${director}&year=${year}&title=${title}&genre=${genre}`;
        console.log('siema przed movies');
        const response = await axiosInstance.get(`/movies/${query}`);
        console.log('siema po movies');
        if(response.status !== 200) {
            throw new Error("No movies");
        }
        return response.data;
        }
        catch (error) {
        throw new Error(error.message);
    }
});

export const blockMovie = createAsyncThunk("Movie/blockMovie", async (payload) => {
    try {
        const response = await axiosInstance.put(`/movie/block/${payload.id}`);
        if(response.status !== 200) {
            throw new Error("No movie");
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
    reducers: {
        sortMovies: (state, action) => {
            const {field, order} = action.payload;
            if(field === 'title') {
                state.movies.sort((a, b) => {
                    if(a.movie.title < b.movie.title) {
                        return order === 'asc' ? -1 : 1;
                    }
                    if(a.movie.title > b.movie.title) {
                        return order === 'asc' ? 1 : -1;
                    }
                    return 0;
                });
            }
            if(field === 'year') {
                state.movies.sort((a, b) => {
                    if(a.movie.released < b.movie.released) {
                        return order === 'asc' ? -1 : 1;
                    }
                    if(a.movie.released > b.movie.released) {
                        return order === 'asc' ? 1 : -1;
                    }
                    return 0;
                });
            }
            if(field === 'rating'){
                state.movies.sort((a, b) => {
                    if(a.rating < b.rating) {
                        return order === 'asc' ? -1 : 1;
                    }
                    if(a.rating > b.rating) {
                        return order === 'asc' ? 1 : -1;
                    }
                    return 0;
                });
            }

        }
    },
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
        builder.addCase(blockMovie.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(blockMovie.fulfilled, (state, action) => {
            state.loading = false;
            state.movies = state.movies.filter(movie => movie.id !== action.payload.id);
        });
        builder.addCase(blockMovie.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
});

export default moviesSlice.reducer;

export const {sortMovies} = moviesSlice.actions;

