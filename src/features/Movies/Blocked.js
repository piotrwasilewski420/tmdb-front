import React from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { useLayoutEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import Movie from './Movie';
import { unblockMovie } from './moviesSlice';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

const Blocked = () => {
    const [blocked, setBlocked] = useState([]);
    const loading = useRef(false);
    const dispatch = useDispatch();
    const fetchBlocked = async () => {
        loading.current = true;
        try {
            const { data } = await axiosInstance.get('/movies/blocked');
            setBlocked(data);
            loading.current = false; 
        } catch (error) {
            console.log(error);
        }
    }
    useLayoutEffect(() => {
    fetchBlocked();
    console.log(blocked);
    }, []);
    return (
        <div>
            {loading.current && <LoadingSpinner />}
            <h1>Blocked Movies</h1>
            {
                
                blocked.map(movie => (
                    <>
                    <Movie 
                    key={movie.movie.id} 
                    title={movie.movie.title}
                    released={movie.movie.released}
                    tagline={movie.movie.tagline}
                    poster_path={movie.movie.poster_path}
                    rating={movie.movie.rating}
                    genres={movie.movie.genre}
                    id={movie.movie.id}
                    />
                    <button
                    onClick={async () => {
                        await dispatch(unblockMovie(movie.movie.id));
                        await fetchBlocked();
                    }}
                    >UNBLOCK</button>
                    </>
                ))
                
            }

        </div>
    );
};

export default Blocked;