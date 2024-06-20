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
  const [isLoading, setIsLoading] = useState(true);
  const query = useQuery();
  const commissionid = query.get("commissionid");
  const commissionname = query.get("commissionname");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://yv5njvks2xbquqciiauvn6bfj40ibxav.lambda-url.us-east-1.on.aws/?commissionid=${commissionid}`
        );
        const data = await response.json();
        const processedData = data.map((image) => ({
          ...image,
          tags: image.tags.split(",").map((tag) => tag.trim()),
        }));
        setImageData(processedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (commissionid) {
      fetchData();
    }
  }, [commissionid]);

  useEffect(() => {
    const fetchImageUrls = async () => {
      const fetchUrl = async (image) => {
        try {
          const cachedUrl = sessionStorage.getItem(image.imagename);
          if (cachedUrl) {
            return cachedUrl;
          }
          const response = await fetch(
            `https://h5ptrghgi6dpvnbz5t6njqzrom0uhvkb.lambda-url.us-east-1.on.aws/?action=getSignedUrl&bucketName=swiirl-brand-app-images&keyName=${commissionname}/${image.imagename}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch signed URL");
          }
          const data = await response.json();
          sessionStorage.setItem(image.imagename, data.signedUrl);
          return data.signedUrl;
        } catch (error) {
          console.error("Error fetching signed URL:", error);
          return null;
        }
      };

      try {
        const urls = await Promise.all(
          imageData.map((image) => fetchUrl(image))
        );
        setImageUrls(urls.filter((url) => url !== null));
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

  if (isLoading) {
    return (
      <div className="loader-container">
        <div className="loader">
          <img
            src="/Loader/Loader.svg"
            className="loader-middle"
            alt="Loading"
          />
        </div>
      </div>
    );
  }

  // Divide images into 3 columns
  const columns = [[], [], []];
  imageUrls.forEach((imageUrl, index) => {
    columns[index % 3].push({ url: imageUrl, data: imageData[index] });
  });

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
      <div className="image-container1 p-5">
        {columns.map((column, colIndex) => (
          <div className="column" key={colIndex}>
            {column.map(({ url, data }, index) => (
              <div
                key={index}
                className="image-item"
                onClick={() => handleImageClick(data)}
              >
                <img
                  src={url}
                  alt={data.alt || "Image"}
                  className="img-fluid lazyload"
                  loading="lazy"
                />
                {data.tags && data.tags.length > 0 && (
                  <ul className="list-inline">
                    {data.tags.map((tag, tagIndex) => (
                      <li key={tagIndex} className="list-inline-item">
                        <span className="tags">{tag}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommissionGalleries;
