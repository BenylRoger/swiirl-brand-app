import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import AWS from "../Awsconfig";
import "bootstrap/dist/css/bootstrap.min.css";

const s3 = new AWS.S3();

const CommissionDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [commission, setCommission] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  useEffect(() => {
    const fetchCommission = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://mc54wwmd2jqfhvis2huj46wl240ilczp.lambda-url.us-east-1.on.aws/?id=${id}`
        );
        setCommission(response.data[0]); // Assuming response is an array with a single commission object
        setLoading(false);
      } catch (error) {
        console.error("Error fetching commission:", error);
        setLoading(false);
        setErrorMessage("Error fetching commission data.");
      }
    };

    fetchCommission();
  }, [id]);

  const handleUpdateStatus = async () => {
    try {
      const response = await axios.put(
        `https://mc54wwmd2jqfhvis2huj46wl240ilczp.lambda-url.us-east-1.on.aws/?id=${id}`,
        { status: "Completed" }
      );

      if (response.status === 200) {
        setSuccessMessage("Commission status updated successfully.");
        setCommission({ ...commission, status: "Completed" });
      } else {
        console.error("Error updating commission status");
        setErrorMessage("Error updating commission status");
      }
    } catch (error) {
      console.error("Error updating commission status:", error);
      setErrorMessage("Error updating commission status");
    }
  };

  const handleUploadToS3 = async (file) => {
    const params = {
      Bucket: "swiirl-brand-app-images",
      Key: `${commission.name}/${file.name}`,
      Body: file,
      ContentType: file.type,
    };

    try {
      const data = await s3.upload(params).promise();
      return data.Location; // URL of the uploaded file
    } catch (error) {
      console.error("Error uploading to S3", error);
      setErrorMessage("Error uploading to S3");
      throw error;
    }
  };

  const handleFileSelection = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 5) {
      alert("You can only upload a maximum of 5 files");
      return;
    }
    setSelectedFiles(files);
  };

  const handleFileSubmit = async () => {
    setLoading(true);
    try {
      const fileUploadPromises = selectedFiles.map(handleUploadToS3);
      console.log(fileUploadPromises);
      const fileUrls = await Promise.all(fileUploadPromises);
      console.log(fileUrls);
      const fileNames = selectedFiles.map((file) => file.name);
      console.log(fileNames);
      // Assuming commission object has a files property
      const updatedCommission = {
        ...commission,
        files: fileUrls.join(", "),
        filenames: fileNames.join(", "),
      };
      setCommission(updatedCommission);

      // Upload to API
      for (let i = 0; i < fileUrls.length; i++) {
        const imageUrl = fileUrls[i];
        const filename = fileNames[i];
        console.log(filename);
        await axios.post(
          `https://yv5njvks2xbquqciiauvn6bfj40ibxav.lambda-url.us-east-1.on.aws/?commissionid=${id}`,
          {
            commissionid: id,
            tags: "NA",
            caption: "NA",
            face_recognition: "false",
            known_personas: "NA",
            object_detection: "NA",
            moderation: "NA",
            color_data: "NA",
            image_url: imageUrl,
            imagename: filename,
          }
        );
      }

      setSuccessMessage("Files uploaded and API updated successfully.");
    } catch (error) {
      console.error("Error uploading files or updating API:", error);
      setErrorMessage("Error uploading files or updating API");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <button onClick={() => navigate("/admin")} className="mb-3">
        Back to Admin Page
      </button>
      <div className="row">
        <div className="col-md-6">
          {commission ? (
            <div>
              <h3>{commission.name}</h3>
              <p>
                <strong>Name:</strong> {commission.name}
              </p>
              <p>
                <strong>Target Location:</strong> {commission.target_location}
              </p>
              <p>
                <strong>Timeline:</strong>{" "}
                {new Date(commission.timeline).toLocaleString()}
              </p>
              <p>
                <strong>Media Type:</strong> {commission.mediatype}
              </p>
              <p>
                <strong>Content Usage:</strong> {commission.content_usage}
              </p>
              <p>
                <strong>Campaign Goal:</strong> {commission.campaign_goal}
              </p>
              <p>
                <strong>Creative Design:</strong> {commission.creative_design}
              </p>
              <p>
                <strong>Themes/Prompts:</strong> {commission.themes_prompts}
              </p>
              <p>
                <strong>Links:</strong>{" "}
                {commission.links
                  ? commission.links.split(", ").map((link, index) => (
                      <a
                        key={index}
                        href={`http://${link.trim()}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.trim()}
                      </a>
                    ))
                  : "N/A"}
              </p>
              <p>
                <strong>Files:</strong>{" "}
                {commission.files
                  ? commission.files.split(", ").map((file, index) => (
                      <div key={index}>
                        <a
                          href={file.trim()}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {file.trim()}
                        </a>
                      </div>
                    ))
                  : "N/A"}
              </p>
              <p>
                <strong>Filenames:</strong> {commission.filenames}
              </p>
              <p>
                <strong>Created By:</strong> {commission.createdby}
              </p>
              <p>
                <strong>Created On:</strong>{" "}
                {new Date(commission.createdon).toLocaleString()}
              </p>
              <p>
                <strong>Status:</strong> {commission.status}
              </p>
            </div>
          ) : (
            <p>No commission found</p>
          )}
        </div>

        <div className="d-flex flex-column justify-content-center align-items-center">
          <h2>Actions</h2>
          <input
            type="file"
            multiple
            onChange={handleFileSelection}
            accept="image/*"
            className="mb-3"
          />
          <button
            onClick={handleFileSubmit}
            className="btn btn-primary mb-3"
            disabled={loading}
          >
            Submit Files
          </button>
          <button
            onClick={handleUpdateStatus}
            className="btn btn-success"
            disabled={loading}
          >
            Mark as Completed
          </button>
          {loading && <p>Loading...</p>}
          {successMessage && (
            <div className="alert alert-success mt-3">{successMessage}</div>
          )}
          {errorMessage && (
            <div className="alert alert-danger mt-3">{errorMessage}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommissionDetailPage;
