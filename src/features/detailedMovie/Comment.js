import React from 'react';

const Comment = ({ comment, name }) => {
  return (
    <div className="my-4">
        <p className="text-base leading-relaxed">{comment}</p>
        <p className="text-sm font-medium">- {name}</p>
    </div>
  );
};

export default Comment;