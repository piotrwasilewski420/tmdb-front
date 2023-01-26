import React, { useState } from 'react';

const Rating = ({title}) => {
  const [rating, setRating] = useState(5);

  const handleClick = (newRating) => {
    setRating(newRating);
  }

  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => (
        <span 
          key={star}
          onClick={() => handleClick(star)}
          onMouseEnter={() => {document.body.style.cursor = "pointer"}}
          onMouseLeave={() => {document.body.style.cursor = "default"}}
        >
          {rating >= star ? '⭐' : '☆'}
        </span>
      ))}
      <p>You have rated {title} {rating} out of 5</p>
    </div>
  );
}

export default Rating;
