import React, { Fragment } from 'react';
import NavProfile from './NavProfile';
import { useSelector } from 'react-redux';
import MovieForm from '../Movies/MovieForm';
import MoviesPanel from '../Movies/MoviesPanel';
import './styles/styles.css';
import LoadingSpinner from '../Movies/LoadingSpinner/LoadingSpinner';

export default function UserProfile() {
    const {name} = useSelector(state => state.user);
    const {loading} = useSelector(state => state.movies);
  return (
    <>
      <NavProfile name={name} className="navbar"/>
      <div className="container mt-20">
      <MovieForm className="left-bar" style={{maxHeight:'20vh'}}/>
        {loading ? <LoadingSpinner className="right-bar"/> : <MoviesPanel className="right-bar"/>}
      </div>
    </>
        );
      }
