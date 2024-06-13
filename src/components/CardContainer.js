import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./CardContainer.css";

function Card({ images, title, description, commissionid, isFirst }) {
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const fetchImageUrls = async () => {
      const urls = await Promise.all(
        [...images]
          .sort(() => Math.random() - 0.5)
          .slice(0, 5)
          .map(async (image) => {
            // Only take the first 5 images
            try {
              const response = await fetch(
                `https://h5ptrghgi6dpvnbz5t6njqzrom0uhvkb.lambda-url.us-east-1.on.aws/?action=getSignedUrl&bucketName=swiirl-brand-app-images&keyName=${title}/${image.imagename}`
              );
              if (!response.ok) {
                throw new Error("Failed to fetch signed URL");
              }
              const data = await response.json();
              return {
                ...image,
                url: data.signedUrl, // Assuming the response contains the signed URL
                alt: image.alt || "No image available",
              };
            } catch (error) {
              console.error("Error fetching signed URL", error);
              return {
                ...image,
                url: "/home/Image_not_available1.jpg",
                alt: "No image available",
              };
            }
          })
      );
      setImageUrls(urls);
    };
    fetchImageUrls();
  }, [images, title]);
  let count = isFirst ? 5 : 3;

  while (imageUrls.length < count) {
    // Ensure there are always 5 images
    imageUrls.push({
      url: "/home/Image_not_available1.jpg",
      alt: "No image available",
    });
  }

  const cardClassName = isFirst ? "card first-card" : "card";

  return (
    <div>
      <Link
        to={`/comm-galleries?commissionid=${commissionid}&commissionname=${title}`}
        className="card-link"
      >
        <div className={cardClassName}>
          <div className="card-images">
            {imageUrls.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.alt}
                className="card-image"
              />
            ))}
          </div>
          <div className="card-content">
            <img
              alt="avatar"
              className="avatar-image"
              src="/Commission/Avatar.png"
            />
            <div className="title-description">
              <h3 className="card-title">{title}</h3>
              <p className="card-description">{description}</p>
            </div>
          </div>
        </div>
      </Link>
      {cardClassName === "card first-card" && images.length > 1 && (
        <div className="gallery-label">Your Galleries</div>
      )}
    </div>
  );
}

function CardContainer({ cards }) {
  return (
    <div className="card-container">
      {cards.map((card, index) => (
        <Card
          key={index}
          images={card.images}
          title={card.name}
          description={`${card.campaign_goal}`}
          commissionid={card.id}
          isFirst={index === 0} // Determine if the card is the first one
        />
      ))}
    </div>
  );
}

export default CardContainer;
