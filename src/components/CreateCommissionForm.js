import React, { useState } from "react";

import "./CreateCommissionForm.css"; // Import CSS file
import UploadIcon from "../icons/upload";
import { useSelector } from "react-redux";

import "bootstrap/dist/css/bootstrap.min.css";

const CreateCommissionForm = () => {
  const [formCommData, setFormData] = useState({
    name: "",
    target_location: "",
    timeline: "",
    mediatype: "",
    content_usage: "",
    campaign_goal: "",
    creative_design: "",
    themes_prompts: "",
    links: "",
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const username = useSelector((state) => state.user.username);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formCommData, [name]: value });
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
    console.log("file", file);
    const formData = new FormData();

    formData.append("bucketName", "swiirl-brand-app-images");
    formData.append("keyName", `${formCommData.name}/sample_${file.name}`);
    formData.append("file", file);

    const response = await fetch(
      "https://h5ptrghgi6dpvnbz5t6njqzrom0uhvkb.lambda-url.us-east-1.on.aws/",
      {
        method: "PUT",

        body: formData,
      }
    );

    if (response.ok) {
      const result = await response.json();
      console.log("File uploaded successfully", result);
    } else {
      console.error("File upload failed", response.statusText);
    }
  };

  const handleSubmitCommission = async (event) => {
    event.preventDefault();

    try {
      console.log("selectedFiles", selectedFiles);
      const fileUploadPromises = selectedFiles.map(uploadToS3);
      const fileUrls = await Promise.all(fileUploadPromises);

      const fileNames = selectedFiles.map((file) => "sample_" + file.name);
      const requestBody = {
        ...formCommData,
        filenames: fileNames.join(", "),
        files: fileUrls.join(", "), // Join file URLs with commas
        createdby: username, // Hardcoded value
        createdon: new Date().toISOString(), // Current date and time
        status: "In Progress", // Hardcoded value
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
          links: "",
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
              value={formCommData.name}
              onChange={handleChange}
              placeholder="Let’s give the school details for their new assignment"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Target Locations</label>
            <textarea
              className="form-control-textarea"
              name="target_location"
              value={formCommData.target_location}
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
              value={formCommData.timeline}
              onChange={handleChange}
              placeholder="Start, deadline, review"
            />
            <label className="form-label">Media Type</label>
            <input
              type="text"
              className="form-control-input"
              name="mediatype"
              value={formCommData.mediatype}
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
              value={formCommData.content_usage}
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
              value={formCommData.campaign_goal}
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
              value={formCommData.creative_design}
              onChange={handleChange}
              placeholder="E.g. use of earthy tones and natural colors is encouraged. No harmful content or disturbing images."
            />
          </div>
          <div className="form-group">
            <label className="form-label">Themes and Prompts</label>
            <textarea
              className="form-control-textarea"
              name="themes_prompts"
              value={formCommData.themes_prompts}
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
                <UploadIcon />
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
            <label className="form-label">Links</label>
            <textarea
              className="form-control-textarea"
              name="links"
              value={formCommData.links}
              onChange={handleChange}
              placeholder="Provide any relevant links"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <button className="button-primary-sw btn-center" type="submit">
              Submit Commission
            </button>
          </div>
        </div>
        {successMessage && (
          <div className="form-row">
            <div className="login-form-group">
              <div class="alert alert-success">{successMessage}</div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateCommissionForm;
