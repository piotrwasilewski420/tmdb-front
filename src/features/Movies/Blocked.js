import React from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { useLayoutEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import Movie from './Movie';
import { unblockMovie } from './moviesSlice';
import {ImBlocked} from 'react-icons/im';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import NavProfile from '../user/NavProfile';

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
        <div className='flex justify-center w-full'>
            <NavProfile />
            <div className='flex flex-col items-center flex-wrap w-4/5 mt-12'>
                {loading.current && <LoadingSpinner />}
                <h1 className='text-4xl font-semibold'>Blocked Movies</h1>
                <div className='flex'>
                    {  
                        blocked.map(movie => (
                            <>
                            <div className='flex flex-col items-center justify-center'>
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
                                className='pl-1 text-red-500 font-semibold'
                                onClick={async () => {
                                    await dispatch(unblockMovie(movie.movie.id));
                                    await fetchBlocked();
                                }}
                                ><ImBlocked size={28}/></button>
                            </div>
                            </>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Blocked;