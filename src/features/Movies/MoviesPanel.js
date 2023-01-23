import { useSelector } from 'react-redux';
import React from 'react';

const MoviesPanel = () => {
    const {movies} = useSelector(state => state.movies);
    React.useEffect(() => {
        console.log(movies);
    }, [movies]);
    return (
        <div>
            {
                movies.map(movie => (
                    <div key={movie.movie.id}>
                        <h1>{movie.movie.title}</h1>
                        <p>{movie.movie.released}</p>
                        <p>{movie.movie.director}</p>
                        <p>{movie.genre}</p>
                        <p>{movie.rating}</p>
                    </div>
                ))
            }
        </div>
    );
};

export default MoviesPanel;