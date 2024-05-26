import React, { useState } from "react";
import AWS from "aws-sdk";
import "./CreateCommissionForm.css"; // Import CSS file
import UploadIcon from "../icons/upload";

const s3 = new AWS.S3();

const CreateCommissionForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    target_location: "",
    timeline: "",
    mediatype: "",
    content_usage: "",
    campaign_goal: "",
    creative_design: "",
    themes_prompts: "",
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 5) {
      alert("You can only upload a maximum of 5 files");
    } else {
      setSelectedFiles(files);
    }
  };

  const uploadToS3 = async (file) => {
    const params = {
      Bucket: "swiirl-brand-app-images",
      Key: `uploads/${Date.now()}_${file.name}`,
      Body: file,
      ContentType: file.type,
    };

    try {
      const data = await s3.upload(params).promise();
      return data.Location; // URL of the uploaded file
    } catch (error) {
      console.error("Error uploading to S3", error);
      throw error;
    }
  };

  const handleSubmitCommission = async (event) => {
    event.preventDefault();

    try {
      const fileUploadPromises = selectedFiles.map(uploadToS3);
      const fileUrls = await Promise.all(fileUploadPromises);

      const requestBody = {
        ...formData,
        files: fileUrls.join(", "), // Join file URLs with commas
        createdby: "benylrogerj@gmail.com", // Hardcoded value
        createdon: new Date().toISOString(), // Current date and time
        status: "Pending", // Hardcoded value
      };

      const response = await fetch(
        "https://mc54wwmd2jqfhvis2huj46wl240ilczp.lambda-url.us-east-1.on.aws/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok) {
        setSuccessMessage("Commission submitted successfully");
        setFormData({
          name: "",
          target_location: "",
          timeline: "",
          mediatype: "",
          content_usage: "",
          campaign_goal: "",
          creative_design: "",
          themes_prompts: "",
        });
        setSelectedFiles([]);
      } else {
        console.error("Error submitting commission");
      }
    } catch (error) {
      console.error("Error submitting commission", error);
    }
  };

  function formatFileSize(size) {
    const units = ["KB", "MB", "GB"];
    let i = 0;
    let formattedSize = size;

    while (formattedSize >= 1024 && i < units.length - 1) {
      formattedSize /= 1024;
      i++;
    }

    return `${formattedSize.toFixed(2)}${units[i]}`;
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmitCommission}>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Name your commission</label>
            <input
              type="text"
              className="form-control-input"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Let’s give the school details for their new assignment"
            />
          </div>
          {/* <div className="form-group">
            <label className="form-label text-md-end">Target Locations</label>
            <input
              type="text"
              className="form-control-input"
              name="target_location"
              value={formData.target_location}
              onChange={handleChange}
              placeholder="Preferred impact regions"
            />
          </div> */}
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Target Locations</label>
            <textarea
              className="form-control-textarea"
              name="target_location"
              value={formData.target_location}
              onChange={handleChange}
              placeholder="Preferred impact regions"
            />
          </div>
          <div className="form-group">
            <label className="form-label text-md-end">Timeline</label>
            <input
              type="text"
              className="form-control-input"
              name="timeline"
              value={formData.timeline}
              onChange={handleChange}
              placeholder="Start, deadline, review"
            />
            <label className="form-label">Media Type</label>
            <input
              type="text"
              className="form-control-input"
              name="mediatype"
              value={formData.mediatype}
              onChange={handleChange}
              placeholder="Photography"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label text-md-end">
              How will you use this content?
            </label>
            <textarea
              className="form-control-textarea"
              name="content_usage"
              value={formData.content_usage}
              onChange={handleChange}
              placeholder="E.g. social media campaigns, annual sustainability report, signage for event and retail, etc."
            />
          </div>
          <div className="form-group">
            <label className="form-label">
              What is the goal of this campaign
            </label>
            <textarea
              className="form-control-textarea"
              name="campaign_goal"
              value={formData.campaign_goal}
              onChange={handleChange}
              placeholder="E.g. raise awareness of the importance of sustainable living practices. What does sustainability mean for different communities?"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label text-md-end">Creative direction</label>
            <textarea
              className="form-control-textarea"
              name="creative_design"
              value={formData.creative_design}
              onChange={handleChange}
              placeholder="E.g. use of earthy tones and natural colors is encouraged. No harmful content or disturbing images."
            />
          </div>
          <div className="form-group">
            <label className="form-label">Themes and Prompts</label>
            <textarea
              className="form-control-textarea"
              name="themes_prompts"
              value={formData.themes_prompts}
              onChange={handleChange}
              placeholder="E.g. What does ”Leaving the world better than you found it” mean to you?"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="upload-control" htmlFor="upload-input">
              <input
                type="file"
                multiple
                id="upload-input"
                onChange={handleFileChange}
              />
              <div className="uploadicon">
                <UploadIcon /> {/* Or your SVG element */}
              </div>
              <div className="upload-options">
                <p className="click">Click to upload</p>
              </div>
              <div className="upload-types">
                SVG, PNG, JPG or GIF (max. 800x400px)
              </div>
            </label>

            {selectedFiles.length > 0 && (
              <ul style={{ listStyleType: "none", margin: 0, padding: 0 }}>
                {selectedFiles.map((file) => (
                  <li className="selected-files" key={file.name}>
                    <div className="selected-file-grouping">
                      <div className="icons-files">{/* icon */}</div>
                      <div className="file-details">
                        <div className="filename">{file.name}</div>
                        <div className="filetype">
                          ({formatFileSize(file.size)})
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <button className="button-primary-sw btn-center" type="submit">
              Submit Commission
            </button>
          </div>
        </div>
        {successMessage && <p className="success-message">{successMessage}</p>}
      </form>
    </div>
  );
};

export default CreateCommissionForm;
