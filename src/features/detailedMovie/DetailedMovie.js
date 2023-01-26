import React, {Fragment, useEffect, useState} from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchMovieById, sendComment } from './detailedMovieSlice';
import { fetchFavorites, fetchWishlisted, favoritesThunk, wishlistedThunk } from '../resources/resourceSlice';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import NavProfile from '../user/NavProfile';
import Actor from './Actor';
import Director from './Director';
import Comments from './Comments';
import Rating from './Rating';
import styles from "./detailedMovie.module.scss";

const DetailedMovie = () => {
    const {name} = useSelector(state => state.user);
    const {title,tagline,poster_path,director,actors,image_urls,rating,genre,error,released,comments} = useSelector(state => state.detailedMovie);
    const movieLoading = useSelector(state => state.detailedMovie.loading);
    const {favorites, wishlisted} = useSelector(state => state.genres);
    const resourcesLoading = useSelector(state => state.genres.loading);
    const { id } = useParams();
    const dispatch = useDispatch();
    const fetchDetailedMovie = async () => {
        await dispatch(fetchMovieById(id));
    };
    const fetchFavoritesList = async () => {
        await dispatch(fetchFavorites());
    };
    const fetchWishlistedList = async () => {
        await dispatch(fetchWishlisted());
    };
    const fetchAll = async () => {
        await fetchDetailedMovie();
        await fetchFavoritesList();
        await fetchWishlistedList();
    };
    useEffect(() => {
        fetchAll();
    }, []);

  const [comment, setComment] = useState('');

  const handleChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(sendComment({id, comment}));
  };

  const handleFavorites = async (e) => {
    e.preventDefault();
    const fav = favorites.map(fav => fav.id).includes(id);
    await dispatch(favoritesThunk({fav,id}))
    
  };
  
  const handleWishlist = async (e) => {
    e.preventDefault();
    const wish = wishlisted.map(wish => wish.id).includes(id);
    await dispatch(wishlistedThunk({wish,id}))
  };

  return (movieLoading || resourcesLoading) ? (<LoadingSpinner/>) : (
   <>
      <div className={styles.detailedMovie}>
        
        <NavProfile name={name} />
          
            
        <div className={styles.main}>
          <div className={styles.rating}>
            <Rating title={title}/>
            <div className={styles.btns}>
              <div className="px-6 py-4" onClick={handleFavorites}>
                {favorites.map(fav => fav.id).includes(id) ?  
                  <button  className="bg-gray-900 text-white font-bold py-2 px-4 rounded-full"> Remove from favorites </button>
                  : <button  className="bg-gray-900 text-white font-bold py-2 px-4 rounded-full"> Add to favorites </button>
                }
                </div>

              <div className="px-6 py-4" onClick={handleWishlist}>
                {wishlisted.map(wish => wish.id).includes(id) ?
                  <button  className="bg-gray-900 text-white font-bold py-2 px-4 rounded-full"> Remove from watchlist </button> 
                  : <button  className="bg-gray-900 text-white font-bold py-2 px-4 rounded-full"> Add to watchlist </button>
                }
              </div>
            </div>
          </div>
          <div className={styles.movie_info}>
            <div className={styles.left}>
              <div className={styles.leftLeft}>
              <img src={poster_path} alt={title} className={styles.poster} />
              </div>
              <div className={styles.leftRight}>

              <p className={styles.title}>{title}</p>
              <ul>
              <li className="font-medium">Rating: {rating}</li> 
            <li className="font-medium">Tagline: {tagline}</li> 
            <li className="font-medium">Genre: {genre}</li> 
            <li className="font-medium">Release date: {released}</li> 
              </ul>
            <div className={styles.directors}>
            <p className={styles.header}>Directors:</p>
            <ul>
              {director.map((director, index) => (
                <li key={index}>
                  <Director {...director} />
                  </li>
                  ))
                }
            </ul>
            </div>
                </div>
            </div>
            <div className={styles.right}>
            <p className={styles.title}>{title}</p> 
            <div className={styles.actors}>
            
            {
              actors.map((actor, index) => (
                <div key={index} className={styles.actor}>
                  <Actor  {...actor} />
                </div>
                ))
              }
            
          </div>
            </div>
          </div>
          
        </div>
        <div>
        <Carousel showThumbs={false} className="">
          {image_urls.map((image, index) => (
            <div key={index}>
              <img src={image} alt={`Image ${index + 1}`} className="w-500px h-500px object-cover" />
            </div>
          ))}
        </Carousel>
        </div>
          <div className={styles.title}>Comments:</div>
        <Comments comments={comments} movieId={id}/>
        <div className="px-6 py-4">
          <textarea onChange={handleChange} className="bg-gray-200 rounded-lg w-full py-2 px-3" placeholder="Leave a comment"></textarea>
      <button
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </button>
        </div>
      </div>
      
      </>
    )
};

export default DetailedMovie;
 