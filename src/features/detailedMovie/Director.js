import React from 'react';

const Director = ({ id, profile_image, name }) => {
  return (
    <div className="flex items-center">
      <img
        className="w-16 h-16 rounded-full"
        src={profile_image}
        alt={`${name}`}
      />
      <div className="ml-4 text-lg font-medium">{name}</div>
    </div>
  );
};

export default Director;
