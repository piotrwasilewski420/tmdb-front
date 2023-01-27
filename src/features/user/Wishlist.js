import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import Movie from '../Movies/Movie';
import NavProfile from './NavProfile';

const Wishlist = () => {
    const [favorites, setFavorites] = useState([]);
    const [actualFavs, setActualFavs] = useState([]);
    const movies = useSelector(state => state.movies.movies);
    
    useEffect(() => {
        const fetchFavs = async () => {
            const {data} = await axiosInstance.get('/user/wishlist');
            const idArray = data.map(item => item.id);
            const arr = movies.filter(({movie}) => idArray.includes(movie.id));
            console.log(`arr: ${arr}`);
            setActualFavs(arr);
            console.log(`actualFavs: ${actualFavs}`);
        };
        fetchFavs();
    },[]);
    return (
        <div className='flex flex-col items-center w-full justify-center'>
            <NavProfile />
            <h1 className='text-4xl font-semibold mt-12'>Wishlist</h1>
            <div className='flex flex-wrap'>
                {
                actualFavs && actualFavs.map(movie => (
                                
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
                                    </div>
            
                                    )
                )}
            </div>
        </div>
    )
};

export default Wishlist;