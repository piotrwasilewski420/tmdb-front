import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import topMoviesReducer from "../features/topMovies/topMoviesSlice";
import moviesReducer from "../features/Movies/moviesSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        topMovies: topMoviesReducer,
        movies: moviesReducer
    },
});

export default store;