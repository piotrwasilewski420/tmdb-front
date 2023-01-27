import React from 'react';
import styles from "./detailedMovie.module.scss";
// import { FaRegTimesCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { deleteComment, deleteCommentByAdmin } from './detailedMovieSlice';
import { RxCross1 } from 'react-icons/rx'


const Comment = ({ comment, name, id, movieId, commentId }) => {
  const userId = useSelector(state => state.user.id);
  const role = useSelector(state => state.user.role);
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
      (userId === id || role === 'ADMIN') ?
      <div className={styles.commentBtns}>
      <CancelButton movieId={movieId} commentId={commentId} userId={id} />
      </div> : null
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
  const role = useSelector(state => state.user.role);
  const dispatch = useDispatch();
  const handleDelete = (e) => {
    e.preventDefault();
    if(role === 'ADMIN') {
      dispatch(deleteCommentByAdmin({movieId, commentId}))
    } else {
      dispatch(deleteComment({movieId, commentId}));
    }
    console.log(`movieId: ${movieId}, commentId: ${commentId}, userId: ${userId}`);
  }
  return (
    <button onClick={handleDelete} style={{color: "red", border:"none", padding:"10px", borderRadius:"50%"}}>
      <RxCross1 size={20}/>
    </button>
  );
}
