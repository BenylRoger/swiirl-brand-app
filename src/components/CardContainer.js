import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./CardContainer.css";
import AWS from "../Awsconfig";

const s3 = new AWS.S3();

const getSignedUrl = async (key) => {
  console.log("key", key);
  const params = {
    Bucket: "swiirl-brand-app-images",
    Key: key,
  };
  try {
    const data = await s3.getObject(params).promise();
    console.log("data", data);
    const imageUrl = `data:image/jpeg;base64,${data.Body.toString("base64")}`;
    return imageUrl;
  } catch (error) {
    console.error("Error getting signed URL from S3", error);
    return "/home/Image_not_available1.jpg"; // Fallback image
  }
};

function Card({ images, title, description, commissionid, isFirst }) {
  const [imageUrls, setImageUrls] = useState([]);
  console.log(images);
  console.log(title);
  console.log(description);
  console.log(commissionid);
  console.log(isFirst);

  useEffect(() => {
    const fetchImageUrls = async () => {
      const urls = await Promise.all(
        images.map(async (image) => ({
          ...image,
          url: await getSignedUrl(`${title}/${image.imagename}`), // Pass the image URL directly
          alt: image.alt || "No image available",
        }))
      );
      console.log(urls);
      setImageUrls(urls);
    };
    fetchImageUrls();
  }, [images, title]);

  while (imageUrls.length < 3) {
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
