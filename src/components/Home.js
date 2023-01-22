import HomeNavbar from "./HomeNavbar";
import { useDispatch, useSelector } from "react-redux";
import { Fragment, useEffect } from "react";
import {fetchTopMovies} from "../features/topMovies/topMoviesSlice";
import TopMovie from "../features/topMovies/TopMovie";
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
                <div>
                    {topMovies.map(({movie,rating}) => (
                       <TopMovie key={movie.id} movie={movie} rating={rating}/>
                    ))}
                </div>
            )
        }
        </Fragment>
    );
};

export default Home;