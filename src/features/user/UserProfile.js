import React, { Fragment } from 'react';
import NavProfile from './NavProfile';
import { useSelector } from 'react-redux';
import MovieForm from '../Movies/MovieForm';
import MoviesPanel from '../Movies/MoviesPanel';
import LoadingSpinner from '../Movies/LoadingSpinner/LoadingSpinner';

export default function UserProfile() {
    const {name} = useSelector(state => state.user);
    const {loading} = useSelector(state => state.movies);
  return (
    <>
      <NavProfile name={name} className="navbar"/>
      <div className="flex flex-row w-screen">
        <div className='w-1/8 fixed pl-6 pt-14'>     
          <MovieForm style={{maxHeight:'20vh'}}/>
        </div>
        <div className='pl-64 mt-14'>
          {loading ? <LoadingSpinner /> : <MoviesPanel/>}
        </div>
      </div>
    </>
        );
      }
