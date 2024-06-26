import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./CardContainer.css";

function Card({ images, title, description, commissionid, isFirst }) {
  const [imageUrls, setImageUrls] = useState([]);

  const fetchedImagesRef = useRef(false); // Ref to ensure API call happens only once

  useEffect(() => {
    if (fetchedImagesRef.current) return; // Exit if already fetched

    const fetchImageUrls = async () => {
      const urls = await Promise.all(
        [...images]
          .sort(() => Math.random() - 0.5)
          .slice(0, 6)
          .map(async (image) => {
            try {
              const cachedUrl = sessionStorage.getItem(image.imagename);
              if (cachedUrl) {
                return {
                  ...image,
                  url: cachedUrl,
                  alt: image.alt || "No image available",
                };
              }

              const response = await fetch(
                `https://h5ptrghgi6dpvnbz5t6njqzrom0uhvkb.lambda-url.us-east-1.on.aws/?action=getSignedUrl&bucketName=swiirl-brand-app-images&keyName=${title}/${image.imagename}`
              );
              if (!response.ok) {
                throw new Error("Failed to fetch signed URL");
              }
              const data = await response.json();
              sessionStorage.setItem(image.imagename, data.signedUrl);

              return {
                ...image,
                url: data.signedUrl,
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

      fetchedImagesRef.current = true; // Set the ref to true after fetching
    };

    fetchImageUrls();
  }, [images, title]);

  let count = isFirst ? 6 : 3;

  while (imageUrls.length < count) {
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
            <div className="column-full">
              {imageUrls[0] && (
                <img
                  src={imageUrls[0].url}
                  alt={imageUrls[0].alt || "Image"}
                  className="card-image"
                />
              )}
            </div>
            <div className="column-half">
              {imageUrls[1] && (
                <img
                  src={imageUrls[1].url}
                  alt={imageUrls[1].alt || "Image"}
                  className="card-image-half"
                />
              )}
              {imageUrls[2] && (
                <img
                  src={imageUrls[2].url}
                  alt={imageUrls[2].alt || "Image"}
                  className="card-image-half"
                />
              )}
            </div>
            {isFirst && (
              <>
                <div className="column-full">
                  {imageUrls[3] && (
                    <img
                      src={imageUrls[3].url}
                      alt={imageUrls[3].alt || "Image"}
                      className="card-image"
                    />
                  )}
                </div>
                <div className="column-half">
                  {imageUrls[4] && (
                    <img
                      src={imageUrls[4].url}
                      alt={imageUrls[4].alt || "Image"}
                      className="card-image-half"
                    />
                  )}
                  {imageUrls[5] && (
                    <img
                      src={imageUrls[5].url}
                      alt={imageUrls[5].alt || "Image"}
                      className="card-image-half"
                    />
                  )}
                </div>
              </>
            )}
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
    </div>
  );
}

function CardContainer({ cards }) {
  return (
    <div className="card-container">
      {cards.map((card, index) => (
        <React.Fragment key={index}>
          <Card
            images={card.images}
            title={card.name}
            description={`${card.campaign_goal}`}
            commissionid={card.id}
            isFirst={index === 0}
          />
          {index === 0 && cards.length > 1 && (
            <div className="gallery-label">Your Galleries</div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default CardContainer;
