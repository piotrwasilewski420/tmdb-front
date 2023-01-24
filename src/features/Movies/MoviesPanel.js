import { useSelector } from 'react-redux';
import React from 'react';
import Movie from './Movie';

const MoviesPanel = () => {
    
    const {movies} = useSelector(state => state.movies);
    
    return (
        <div className='moviesPanel flex flex-row flex-wrap'>
            {
                movies.map(movie => (
                    <Movie 
                    key={movie.movie.id} 
                    title={movie.movie.title}
                    released={movie.movie.released}
                    tagline={movie.movie.tagline}
                    poster_path={movie.movie.poster_path}
                    rating={movie.rating}
                    genres={movie.genre}
                    id={movie.movie.id}
                    />
                ))
            }
        </div>
    );
};

export default MoviesPanel;