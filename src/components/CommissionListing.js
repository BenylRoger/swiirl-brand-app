import React, { useState, useEffect } from "react";
import "./CommissionListing.css";

// Import the image data
import imageData from "../data/images.json";

function CommissionListing() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Shuffle the image data to ensure randomness
    const shuffledImages = [...imageData].sort(() => Math.random() - 0.5);
    setImages(shuffledImages.slice(0, 3)); // Select the first 3 images
  }, []);
  return (
    <div>
      <div className="intro-commission">
        <div className="new-symbol">NEW</div>
        <div className="new-commission-text">
          Your latest commission is here!
        </div>
      </div>
      <div className="commission-collage">
        <div className="image-container">
          <div className="image-column first">
            <img src={images[0]?.url} alt={images[0]?.alt} />
          </div>
          <div className="image-column second">
            <img src={images[1]?.url} alt={images[1]?.alt} />
            <img src={images[2]?.url} alt={images[2]?.alt} />
          </div>
          <div className="image-column first">
            <img src={images[0]?.url} alt={images[0]?.alt} />
          </div>
          <div className="image-column second">
            <img src={images[1]?.url} alt={images[1]?.alt} />
            <img src={images[2]?.url} alt={images[2]?.alt} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommissionListing;
