import React from 'react';
import Comment from './Comment';

const Comments = ({ comments }) => {
  console.log(comments);
  return (
    <div className="bg-gray-200 p-4 rounded-md">
      {comments.map((comment, index) => (
        <Comment key={index} comment={comment.comments} name={comment.user.name} />
      ))}
    </div>
  );
};

export default Comments;
