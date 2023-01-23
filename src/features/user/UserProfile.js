import React, { Fragment } from 'react';
import NavProfile from './NavProfile';
import { useSelector } from 'react-redux';
import MovieForm from '../Movies/MovieForm';
import MoviesPanel from '../Movies/MoviesPanel';

export default function UserProfile() {
    const {name} = useSelector(state => state.user);
  return (
    <Fragment>
      <NavProfile name={name}/>
      <div className="flex flex-row ">
      <MovieForm className="w-1/4"/>
      <MoviesPanel className="w-3/4"/>
      </div>
    </Fragment>
        );
      }
