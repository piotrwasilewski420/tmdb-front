import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import topMoviesReducer from "../features/topMovies/topMoviesSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        topMovies: topMoviesReducer
    },
});

export default store;