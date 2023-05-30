import React, { useState } from 'react';
import { Rating } from 'react-simple-star-rating';

export default function StarRating(props) {
  const [rating, setRating] = useState(0);

  // Catch Rating value
  const handleRating = (rate) => {
    if (props.id === 0) {
      setRating(rate);
      console.log('bina');
      localStorage.setItem('bina', JSON.stringify(rate));
    } else if (props.id === 1) {
      setRating(rate);
      console.log('sahip');
      localStorage.setItem('sahip', JSON.stringify(rate));
    } else if (props.id === 2) {
      setRating(rate);
      console.log('ilan rating');
      localStorage.setItem('postRating', JSON.stringify(rate));
    } else if (props.id === 3) {
      setRating(rate);
      console.log('yorum rating');
    }
  };

  return (
    <div>
      <Rating onClick={handleRating} initialValue={rating} />
    </div>
  );
}
