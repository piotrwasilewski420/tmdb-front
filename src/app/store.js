import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import topMoviesReducer from "../features/topMovies/topMoviesSlice";
import moviesReducer from "../features/Movies/moviesSlice";
import genresReducer from "../features/resources/resourceSlice";
import detailedMovieReducer from "../features/detailedMovie/detailedMovieSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        topMovies: topMoviesReducer,
        movies: moviesReducer,
        genres: genresReducer,
        detailedMovie: detailedMovieReducer
    },
});

export default store;