// Card.jsx
import React from 'react';
import "./Card.css";
const Card = ({ value, suit, flipped, matched, isError, onClick }) => {
  return (
    <div 
      className={`card animate__animated ${flipped ? 'animate__flipInY flipped' : ''} ${matched ? 'matched' : ''} ${isError ? 'error' : ''}`}
      onClick={onClick}
    >
      <div className={`card-value top`}>{flipped || matched ? value : ''}</div>
      <div className={`card-suit`}>{flipped || matched ? suit : ''}</div>
      <div className={`card-value bottom`}>{flipped || matched ? value : ''}</div>
    </div>
  );
};

export default Card;
