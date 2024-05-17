import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Galleries.css";

function ImageGallery() {
  const [imageData, setImageData] = useState([]);

  useEffect(() => {
    // Simulate fetching data from an API or local JSON file
    const fetchData = async () => {
      //   const response = await fetch("your_image_data.json"); // Replace with your JSON data path
      //   const data = await response.json();
      const imageData = require("../data/images.json");
      setImageData(imageData);
    };

    fetchData();
  }, []);

  return (
    <div
      className="image-container p-5"
      style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}
    >
      {imageData.map((image, index) => (
        <div
          key={index}
          style={{
            flex: "0 0 auto",
            maxWidth: "33%",
            marginBottom: "1rem",
            minWidth: "25%",
          }}
        >
          <img
            src={image.url}
            alt={image.alt || "Image"}
            className="img-fluid"
            style={{ width: "100%", height: "auto", maxHeight: "400px" }}
          />
          <div style={{ marginTop: "0.5rem" }}>
            {image.tags && image.tags.length > 0 && (
              <ul className="list-inline">
                {image.tags.map((tag, tagIndex) => (
                  <li key={tagIndex} className="list-inline-item">
                    <span className="tags">{tag}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ImageGallery;
