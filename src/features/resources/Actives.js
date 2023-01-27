import React, { useRef } from 'react';
import { useLayoutEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import {fetchTopMovies} from "../topMovies/topMoviesSlice";
import Movie from "../Movies/Movie";
import NavProfile from '../user/NavProfile';

const Actives = () => {
    const dispatch = useDispatch();
    const topMovies = useSelector((state) => state.topMovies.topMovies);
    const activesRef = useRef([]);
    
    useLayoutEffect(() => {
        const fetchActives = async () => {
            try {
                const {data} = await axiosInstance.get('/other/most-active');
                console.log(`data: ${data}`);
                activesRef.current = data;
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchActives();
        console.log(`activesRef.current: ${activesRef.current}`);
        dispatch(fetchTopMovies());
        console.log(`activesRef.current: ${activesRef.current}`);
        },[]);
    return (
        <>
            <NavProfile />
            {activesRef.current.length === 0 && <p>Loading...</p>}
            <div className="flex flex-col items-center justify-center w-full mt-12">
                <h2 className="text-4xl font-bold mb-2">Most active users</h2>
                <div className="flex wrap justify-between w-1/2 mb-16">
                {
                    activesRef.current.map(({name,comments}) => {
                        return (
                            <div key={name} className="flex flex-col items-center p-4">
                                <p className="text-2xl font-medium">{name}</p>
                                <p className='text-xl'>Num of comments: {comments}</p>
                            </div>
                        );
                    })
                }
                </div>
                <h2 className="text-4xl font-medium mb-2">Movies</h2>
                <div className="flex flex-wrap justify-between w-1/2">
                    {topMovies.map(({movie,rating}) => 
                            (
                            <div className="p-4">
                            <Movie key={movie.id} title={movie.title} released={movie.released} tagline={movie.tagline} poster_path={movie.poster_path} rating={rating} id={movie.id} isRedirect={false}
                                />
                                </div>
                            )
                        )
                    }
                </div>
            </div>
        </>
    );
};

export default Actives;
