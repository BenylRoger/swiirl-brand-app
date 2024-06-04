import React from "react";
import { Link } from "react-router-dom";
import "./CardContainer.css";

function Card({ images, title, description, icon, commissionid }) {
  const defaultImage = {
    url: "/home/Image_not_available1.jpg",
    alt: "No image available",
  };

  const displayedImages = [...images];
  while (displayedImages.length < 3) {
    displayedImages.push(defaultImage);
  }

  return (
    <Link
      to={`/comm-galleries?commissionid=${commissionid}`}
      className="card-link"
    >
      <div className="card">
        <div className="card-images">
          {displayedImages.map((image, index) => (
            <img
              key={index}
              src={image.url}
              alt={image.alt}
              className="card-image"
            />
          ))}
        </div>
        <div className="card-content">
          <h3 className="card-title">{title}</h3>
          <p className="card-description">{description}</p>
        </div>
      </div>
    </Link>
  );
}

function CardContainer({ cards }) {
  return (
    <div className="card-container">
      {cards.map((card, index) => (
        <Card
          key={index}
          images={card.images}
          title={`Commission ID: ${card.commissionid}`}
          description={card.description}
          icon={card.icon}
          commissionid={card.commissionid}
        />
      ))}
    </div>
  );
}

export default CardContainer;
