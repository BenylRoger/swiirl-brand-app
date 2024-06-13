import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ImageDetails.css";
import useAsticaNLPAPI from "../services/fetch_asticaGPT";

const getModeration = (moderate) => {
  // Implement your moderation logic here
  return moderate ? "Moderated" : "Not Moderated";
};

function ImageDetail() {
  const [imageUrl, setImageUrl] = useState([]);
  const location = useLocation();
  const { image, commissionname } = location.state;
  const [copied, setCopied] = useState(false);
  const [chatprompt, setChatprompt] = useState("");
  const { nlpResult, nlpError, nlpLoading, callAsticaNLPAPI } =
    useAsticaNLPAPI();
  console.log(image);
  const copyTags = () => {
    navigator.clipboard.writeText(image.tags.join(", ")).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  useEffect(() => {
    const fetchImageUrls = async () => {
      try {
        // Check if commission name and image are available
        if (!commissionname || !image) {
          console.log("Commission name or image not provided");
          return;
        }

        // Check if the image has a valid name
        if (!image.imagename) {
          console.log("Image name not provided");
          return;
        }

        // Make the API call to fetch the signed URL
        const response = await fetch(
          `https://h5ptrghgi6dpvnbz5t6njqzrom0uhvkb.lambda-url.us-east-1.on.aws/?action=getSignedUrl&bucketName=swiirl-brand-app-images&keyName=${commissionname}/${image.imagename}`
        );

        if (response.ok) {
          const data = await response.json();
          const url = data.signedUrl;
          console.log("Signed URL fetched successfully:", url);

          // Construct the image URL object
          const imageUrl = {
            ...image,
            url: url,
            alt: image.alt || "No image available",
          };

          // Update state with the image URL
          setImageUrl(imageUrl);
        } else {
          console.error("Failed to fetch signed URL:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching signed URL:", error);
      }
    };

    fetchImageUrls();
  }, [image, commissionname]);

  const handleProcessNLP = () => {
    if (chatprompt) {
      if (image && image.caption) {
        callAsticaNLPAPI(image.caption + " " + chatprompt);
      }
    }
  };

  return (
    <div className="container container-gallery-item">
      <div className="row">
        <div className="col-lg-6">
          <div className="header-title">Create your media</div>
          <div className="header-title-tagline">
            Use the power of swiirl AI to streamline your work
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <div className="image-container-1 d-flex flex-column align-items-center justify-content-center">
            <img alt="swiirl-logo" className="nft-image" src={imageUrl.url} />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="image-details">
            <div className="row">
              <div className="col-md-6">
                <div className="group-nft">
                  <div className="label">Image Caption</div>
                  <div className="tag attribute-values">
                    {image.caption || "N/A"}
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="group-nft">
                  <div className="label">Metadata</div>
                  <div className="tag attribute-values">
                    {image.color_data || "N/A"}
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="group-nft">
                  <div className="label">Facial Recognition</div>
                  {image.faces && image.faces.length > 0 ? (
                    <div className="tag attribute-values">
                      {image.face_recognition.map((face, index) => (
                        <div key={index}>
                          Gender: {face.gender} Age: {face.age}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="tag attribute-values">None</div>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="group-nft">
                  <div className="label">Object Detection</div>
                  {image.objects && image.objects.length > 0 ? (
                    <div className="tag attribute-values">
                      {image.object_detection.map((obj, index) => (
                        <div key={index}>
                          {obj.name}: {Math.round(obj.confidence * 100)}%
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="tag attribute-values">None</div>
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="group-nft">
                  <div className="label">Image Moderation</div>
                  <div className="tag attribute-values">
                    {image && getModeration(image.moderation)}
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="group-nft">
                  <div className="label">Known Personas</div>
                  <div className="tag attribute-values">
                    {image.known_personas || "N/A"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="group-nft">
            <div className="label">Main Tags</div>
            <div className="tags-container attribute-values">
              {image.tags &&
                image.tags.map((tag, index) => (
                  <span key={index} className="tag-small attribute-values">
                    {tag}
                  </span>
                ))}
            </div>
            <button className="button-link" onClick={copyTags}>
              Copy Tags
            </button>
            {copied && (
              <p className="attribute-values" style={{ marginRight: "5px" }}>
                Tags copied!
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="group-nft">
            <div className="label">
              Image Description [ai captured description]
            </div>
            <div className="tag attribute-values">{image.description}</div>
          </div>
        </div>
      </div>
      <hr className="mt-1 mb-1 hr-shadow" />

      <div className="row">
        <div className="col-md-12">
          <div className="group-nft">
            <div className="prompt-container">
              <div className="header-description">swiirl AI co-pilot</div>
              <input
                type="text"
                className="prompt-input attribute-values"
                value={chatprompt}
                onChange={(e) => setChatprompt(e.target.value)}
              />
              <div className="button-area">
                <button
                  onClick={handleProcessNLP}
                  className="button-primary-sw"
                >
                  Generate Content
                </button>
              </div>
              {nlpLoading && (
                <img
                  src="/Loader/Loader.svg"
                  className="loader-middle"
                  alt="Loading"
                />
              )}
              {nlpError && <div>Error: {nlpError}</div>}
              <div className="nlpdata">
                {nlpResult && (
                  <div>
                    <div className="header-description">
                      Social Media Post [AI driven based on image]
                    </div>
                    {nlpResult.status === "error" ? (
                      <div className="error-message-nft">
                        {
                          "Apologies for the inconvenience as the service is currently unavailable. Please try again in a few minutes."
                        }
                      </div>
                    ) : (
                      <div className="tag attribute-values">
                        {nlpResult.output}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageDetail;
