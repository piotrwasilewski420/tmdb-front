import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from './moviesSlice';
import { fetchGenres } from '../resources/resourceSlice';

const MovieForm = () => {
  const dispatch = useDispatch();

  const { genres } = useSelector((state) => state.genres);

  const [formData, setFormData] = useState({
    actor: '',
    director: '',
    title: '',
    genre: '',
    year: ''
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  }

  const fetchMovie = async () => {
    await dispatch(fetchMovies(formData));
  };

  const fetchGenre = async () => {
    await dispatch(fetchGenres());
  };

  useLayoutEffect(() => {
    fetchGenre();
  }, []);

  useEffect(() => {
    fetchMovie();
  }, [formData]);

  return (
    <form className="movieForm">
      <div className="mb-4 ">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="actor">
          Actor
        </label>
        <input
          className="form-input py-2 px-3 bg-gray-200 rounded-md"
          type="text"
          id="actor"
          name="actor"
          value={formData.actor}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="director">
          Director
        </label>
        <input
          className="form-input py-2 px-3 bg-gray-200 rounded-md"
          type="text"
          id="director"
          name="director"
          value={formData.director}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="title">
          Title
        </label>
        <input
          className="form-input py-2 px-3 bg-gray-200 rounded-md"
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="genre">
          Genre
        </label>
        <select
          className="form-select py-2 px-3 bg-gray-200 rounded-md"
          id="genre"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
        >
          <option value="">Select a genre</option>
          {
            genres.map((genre) => {
              return (
                <option key={genre.name} value={genre.id}>{genre.name}</option>
              );
            }
          )
          }
          {/* // 
          // <option value="action">Action</option>
          // <option value="comedy">Comedy</option>
          // <option value="drama">Drama</option>
          // <option value="horror">Horror</option> */}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="year">
          Year
        </label>
        <input
          className="form-input py-2 px-3 border border-gray-300 rounded-md"
          type="number"
          id="year"
          name="year"
          value={formData.year}
          onChange={handleChange}
        />
      </div>
      <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
        Submit
      </button>
    </form>
  );
};

export default MovieForm;

