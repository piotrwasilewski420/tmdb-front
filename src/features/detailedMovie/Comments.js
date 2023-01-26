import React from 'react';
import Comment from './Comment';
import styles from "./detailedMovie.module.scss";

const Comments = ({ comments, movieId }) => {
  console.log(comments);
  return (
    <div className={styles.comments}>
      {comments.map((comment, index) => (
        <Comment key={index} movieId={movieId} commentId={comment.id} comment={comment.comments} name={comment.user.name} id={comment.user.id}/>
      ))}
    </div>
  );
};

export default Comments;
