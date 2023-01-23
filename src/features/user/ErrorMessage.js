import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { clearError } from './userSlice';

export default function ErrorMessage({ error }) {
    const showError = useSelector((state) => state.user.error);
    const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(clearError());
  };

  return (
    showError && (
      <div className="fixed inset-0 flex items-center justify-center h-screen bg-red-500 text-white p-6 rounded-lg opacity-75">
        <div className="text-center">
          <p className="text-xl font-medium">{error}</p>
          <button
            className="bg-white text-red-500 py-2 px-4 rounded-lg hover:bg-red-50"
            onClick={handleClick}
          >
            Close
          </button>
        </div>
      </div>
    )
  );
}
