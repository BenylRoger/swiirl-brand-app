import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Galleries.css";

function ImageGallery() {
  const [imageData, setImageData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // State for loader

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://mc54wwmd2jqfhvis2huj46wl240ilczp.lambda-url.us-east-1.on.aws/?isdefault=true"
        );
        const data = await response.json();

        const imageDataWithSignedUrls = await Promise.all(
          data.map(async (image) => {
            try {
              const cachedUrl = sessionStorage.getItem(image.imagename);
              if (cachedUrl) {
                return {
                  ...image,
                  signedUrl: cachedUrl,
                };
              }

              const signedUrlResponse = await fetch(
                `https://h5ptrghgi6dpvnbz5t6njqzrom0uhvkb.lambda-url.us-east-1.on.aws/?action=getSignedUrl&bucketName=swiirl-brand-app-images&keyName=default/${encodeURIComponent(
                  image.imagename
                )}`
              );
              const signedUrlData = await signedUrlResponse.json();
              sessionStorage.setItem(image.imagename, signedUrlData.signedUrl);

              return {
                ...image,
                signedUrl: signedUrlData.signedUrl,
              };
            } catch (error) {
              console.error("Error fetching signed URL", error);
              return {
                ...image,
                signedUrl: "/home/Image_not_available1.jpg",
              };
            }
          })
        );

        setImageData(imageDataWithSignedUrls);
        setIsLoading(false); // Hide loader after fetching
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false); // Hide loader in case of an error
      }
    };

    fetchData();
  }, []);
  const columns = [[], [], []]; // Three columns

  // Distribute images equally among the columns
  imageData.forEach((image, index) => {
    columns[index % 3].push(image);
  });
  return (
    <div
      className="default-image-container p-5"
      style={{ position: "relative" }}
    >
      {isLoading ? (
        <div className="loader-container">
          <img
            src="/Loader/Loader.svg"
            className="loader-middle"
            alt="Loading"
          />
        </div>
      ) : (
        <div className="parent">
          {columns.map((column, colIndex) => (
            <div className="column" key={colIndex}>
              {column.map((image, index) => (
                <div className="image-container1" key={index}>
                  <img
                    src={image.signedUrl}
                    alt={image.description || "Image"}
                    className="img-fluid"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ImageGallery;
