import React from 'react';
import './TourCard.css';

/*
Prompt:
Create a card component to display a tour's name, info, image, and price.
The tour image, name, price, and info.
Include a "Not Interested" button that removes this tour when clicked.
Each html element in the card should show in a single column.
*/

function TourCard({ id, name, info, image, price, onRemove }) {
  return (
    <div className="tour-card">
      <img src={image} alt={name} className="tour-card-image" />
      <div className="tour-card-details">
        <h2 className="tour-card-title">{name}</h2>
        <p className="tour-card-price">${price}</p>
        <p className="tour-card-info">{info}</p>
        <button className="tour-card-button" onClick={() => onRemove(id)}>
          Not Interested
        </button>
      </div>
    </div>
  );
}

export default TourCard;