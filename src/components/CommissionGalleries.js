import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CommissionGalleries.css";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

function CommissionGalleries() {
  const [imageData, setImageData] = useState([]);
  const query = useQuery();
  const commissionid = query.get("commissionid");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://yv5njvks2xbquqciiauvn6bfj40ibxav.lambda-url.us-east-1.on.aws/?commissionid=${commissionid}`
        );
        const data = await response.json();
        // Convert comma-separated tags string to an array
        const processedData = data.map((image) => ({
          ...image,
          tags: image.tags.split(",").map((tag) => tag.trim()),
        }));
        console.log(processedData);
        setImageData(processedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (commissionid) {
      fetchData();
    }
  }, [commissionid]);

  const handleImageClick = (image) => {
    navigate("/image-details", { state: { image } });
  };

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
            cursor: "pointer",
          }}
          onClick={() => handleImageClick(image)}
        >
          <img
            src={image.image_url}
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

export default CommissionGalleries;
