import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Galleries.css";

function ImageGallery() {
  const [imageData, setImageData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://mc54wwmd2jqfhvis2huj46wl240ilczp.lambda-url.us-east-1.on.aws/?isdefault=true"
        );
        const data = await response.json();

        const imageDataWithSignedUrls = await Promise.all(
          data.map(async (image) => {
            const signedUrlResponse = await fetch(
              `https://h5ptrghgi6dpvnbz5t6njqzrom0uhvkb.lambda-url.us-east-1.on.aws/?action=getSignedUrl&bucketName=swiirl-brand-app-images&keyName=default/${encodeURIComponent(
                image.imagename
              )}`
            );
            const signedUrlData = await signedUrlResponse.json();

            return {
              ...image,
              signedUrl: signedUrlData.signedUrl,
            };
          })
        );

        setImageData(imageDataWithSignedUrls);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
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
            maxWidth: "32%",
            marginBottom: "1rem",
            minWidth: "25%",
          }}
        >
          <img
            src={image.signedUrl}
            alt={image.description || "Image"}
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
