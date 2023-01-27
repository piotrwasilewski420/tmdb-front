import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const Movie = ({ title, released, tagline, poster_path, rating, id, isRedirect }) => {
  const dispatch = useDispatch();
  const {role} = useSelector((state) => state.user);
  const navigate = useNavigate();
  const redirect = (id) => {
    if (isRedirect == false) {
      navigate('/login');
    } else {
      navigate(`/profile/movie/${id}`);
    }
  };

    console.log(rating);
    const actual_rating = Math.round(rating * 100) / 100;
    let color = 'bg-yellow-500 rounded-full p-1';
    if(actual_rating > 4) color = 'bg-green-500 rounded-full p-1';
    else if(actual_rating < 3) color = 'bg-red-500 rounded-full p-1';
  return (
    <div onClick={() => redirect(id)} className="bg-gray-900 p-4 rounded-lg w-52 m-1">
      <img src={poster_path} alt={title} className="w-48" />
      <h2 className="text-xl font-medium text-white">{title}</h2>
      <p className="text-gray-500">{released}</p>
      <p className="text-gray-400">{tagline}</p>
      <div className="flex items-right">
        <div className={color} >
        <p className="text-xm font-medium text-white" >{actual_rating}/5</p>
        </div>
        {
          role == 'ADMIN' && (
          <button className="bg-red-500 rounded-full p-1 ml-2"
          onClick={(e) => {
            e.preventDefault();
            dispatch()
          }}
          >
           DELETE
          </button>
          )
        }
        
      </div>
    </div>
  );
};

export default Movie;
