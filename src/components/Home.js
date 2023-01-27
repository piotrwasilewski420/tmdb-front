import HomeNavbar from "./HomeNavbar";
import { useDispatch, useSelector } from "react-redux";
import { Fragment, useEffect } from "react";
import {fetchTopMovies} from "../features/topMovies/topMoviesSlice";
import TopMovie from "../features/topMovies/TopMovie";
import Movie from "../features/Movies/Movie";
import LoadingSpinner from "./LoadingSpinner/LoadingSpinner";
import Error from "./Error/Error";

const Home = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        if(topMovies.length === 0){
            dispatch(fetchTopMovies());
        }
    }, []);

    const topMovies = useSelector((state) => state.topMovies.topMovies);
    const loading = useSelector((state) => state.topMovies.loading);
    const error = useSelector((state) => state.topMovies.error);

    return (
        <Fragment>
        <HomeNavbar/>
        {
            loading ? <LoadingSpinner/> : error ? <Error message={error}/> : (
                <div className="flex flex-col items-center w-full">
                    <h1 className="font-semibold text-4xl my-4">Top Movies by rating:</h1>
                    <div className="flex flex-wrap w-1/2 justify-between">
                        {topMovies.map(({movie,rating}) => 
                        (
                        <Movie key={movie.id} title={movie.title} released={movie.released} tagline={movie.tagline} poster_path={movie.poster_path} rating={rating} id={movie.id} isRedirect={false}
                            />
                            )
                        )}
                    </div>
                </div>
            )
        }
        </Fragment>
    );
};

export default Home;