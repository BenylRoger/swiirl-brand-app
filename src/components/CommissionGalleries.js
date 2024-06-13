import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CommissionGalleries.css";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

function CommissionGalleries() {
  const [imageData, setImageData] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const query = useQuery();
  const commissionid = query.get("commissionid");
  const commissionname = query.get("commissionname");
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
        setImageData(processedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (commissionid) {
      fetchData();
    }
  }, [commissionid]);

  useEffect(() => {
    const fetchImageUrls = async () => {
      try {
        const urls = await Promise.all(
          imageData.map(async (image) => {
            // Make the API call to fetch the signed URL
            const response = await fetch(
              `https://h5ptrghgi6dpvnbz5t6njqzrom0uhvkb.lambda-url.us-east-1.on.aws/?action=getSignedUrl&bucketName=swiirl-brand-app-images&keyName=${commissionname}/${image.imagename}`
            );

            if (response.ok) {
              const data = await response.json();
              const url = data.signedUrl;
              console.log("Signed URL fetched successfully:", url);
              return url;
            } else {
              console.error("Failed to fetch signed URL:", response.statusText);
              return null; // Return null if there's an error
            }
          })
        );

        setImageUrls(urls.filter((url) => url !== null)); // Filter out null values
      } catch (error) {
        console.error("Error fetching image URLs", error);
      }
    };

    if (imageData.length > 0 && commissionname) {
      fetchImageUrls();
    }
  }, [imageData, commissionname]);

  const handleImageClick = (image) => {
    navigate("/image-details", { state: { image, commissionname } });
  };

  return (
    <div className="container-gallery">
      <div className="heading-content">
        <img
          alt="swiirl-logo"
          className="campaign-name-image"
          src="/Commission/campaign-name.png"
        />
        <div className="campaign-name">{commissionname}</div>
      </div>
      <div
        className="image-container p-5"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          justifyContent: "left",
        }}
      >
        {imageUrls.map((imageUrl, index) => (
          <div
            key={index}
            style={{
              flex: "0 0 auto",
              maxWidth: "32%",
              marginBottom: "1rem",
              minWidth: "25%",
              cursor: "pointer",
            }}
            onClick={() => handleImageClick(imageData[index])}
          >
            <img
              src={imageUrl}
              alt={imageData[index].alt || "Image"}
              className="img-fluid"
              style={{ width: "100%", height: "auto", maxHeight: "400px" }}
            />
            <div style={{ marginTop: "0.5rem" }}>
              {imageData[index].tags && imageData[index].tags.length > 0 && (
                <ul className="list-inline">
                  {imageData[index].tags.map((tag, tagIndex) => (
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
    </div>
  );
}

export default CommissionGalleries;
