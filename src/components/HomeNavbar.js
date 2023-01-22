import React from 'react';
import { Link } from 'react-router-dom';

const HomeNavbar = () => {
  return (
    <nav className="bg-gray-800 p-6">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-lg font-medium text-white">
          Movie Database
        </Link>
        <div className="flex items-center">
          <Link to="/login" className="bg-gray-700 px-4 py-2 rounded-md text-sm font-medium text-white mr-4 hover:bg-gray-600">
            Login
          </Link>
          <Link to="/register" className="bg-gray-700 px-4 py-2 rounded-md text-sm font-medium text-white hover:bg-gray-600">
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default HomeNavbar;
