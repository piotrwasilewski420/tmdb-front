import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import { sortMovies } from './moviesSlice';

function Filter() {
    const dispatch = useDispatch();
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState({ field: 'title', order: 'asc' });

  return (
    <div className="bg-gray-200 p-4">
      <div className="flex justify-between">
        <div className="flex">
          <select
            className="border rounded p-2 mr-2"
            value={sort.field}
            onChange={(e) => setSort({ field: e.target.value, order: sort.order })}
          >
            <option value="none">None</option>
            <option value="title">Title</option>
            <option value="year">Year</option>
            <option value="rating">Rating</option>
          </select>
          <div className="flex">
            <label className="mr-2">
              <input
                type="radio"
                name="order"
                value="asc"
                checked={sort.order === 'asc'}
                onChange={(e) => setSort({ field: sort.field, order: e.target.value })}
              />
              Ascending
            </label>
            <label>
              <input
                type="radio"
                name="order"
                value="desc"
                checked={sort.order === 'desc'}
                onChange={(e) => setSort({ field: sort.field, order: e.target.value })}
              />
              Descending
            </label>
          </div>
        </div>
        <button 
        onClick={() => {
            dispatch(sortMovies(sort));
        }}
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
            Filter
        </button>
      </div>
    </div>
  );
}

export default Filter;
