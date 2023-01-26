import React from 'react';
import styles from "./detailedMovie.module.scss";
import { FaRegTimesCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { deleteComment } from './detailedMovieSlice';


const Comment = ({ comment, name, id, movieId, commentId }) => {
  const userId = useSelector(state => state.user.id);
  return (
    <div className={styles.comment}>
    <div className={styles.commentContent}>
      <div className={styles.author}>
        <span className="text-sm font-medium">{name}</span>
      </div>
      <div className={styles.text}>
        <span className="text-base leading-relaxed">{comment}</span>
      </div>
    </div>
    {
      userId === id &&
      <div className={styles.commentBtns}>
      <CancelButton movieId={movieId} commentId={commentId} userId={id} />
      </div>
    }
    
    </div>
  );
};

export default Comment;

const CancelButton = ({
  movieId,
  commentId,
  userId
}) => {
  const dispatch = useDispatch();
  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteComment({movieId, commentId}));
    console.log(`movieId: ${movieId}, commentId: ${commentId}, userId: ${userId}`);
  }
  return (
    <button onClick={handleDelete} style={{color: "red", backgroundColor:"white", border:"none", padding:"10px", borderRadius:"50%"}}>
      <FaRegTimesCircle size={30} />
    </button>
  );
}
