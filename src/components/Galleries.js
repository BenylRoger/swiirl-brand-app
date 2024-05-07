import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

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
    <div className="container m-5">
      <div className="row">
        {imageData.map((image, index) => (
          <div className="col-md-4 mb-3" key={index}>
            <img
              src={image.url}
              alt={image.alt || "Image"}
              className="img-fluid"
              style={{ maxHeight: "400px" }} // Set a maximum height for responsive layout
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageGallery;
