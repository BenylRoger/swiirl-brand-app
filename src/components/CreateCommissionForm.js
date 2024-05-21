import React, { useState } from "react";
import "./CreateCommissionForm.css"; // Import CSS file
import UploadIcon from "../icons/upload";

const CreateCommissionForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    targetLocation: "",
    timeline: "",
    mediaType: "",
    contentUsage: "",
    campaignGoal: "",
    creativeDirection: "",
    themesPrompts: "",
  });
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event) => {
    setSelectedFiles([...event.target.files]); // Spread operator for immutability
  };

  const handleSubmitCommission = async (event) => {
    event.preventDefault();

    // Assuming you have a function to get file paths or convert files to base64, etc.
    const files = selectedFiles.map((file) => file.name);

    const requestBody = {
      name: formData.name,
      target_location: formData.targetLocation,
      timeline: formData.timeline,
      mediatype: formData.mediaType,
      content_usage: formData.contentUsage,
      campaign_goal: formData.campaignGoal,
      creative_design: formData.creativeDirection,
      themes_prompts: formData.themesPrompts,
      files: files.join(", "), // Join file names with commas or handle as needed
      createdby: "benylrogerj@gmail.com", // Hardcoded value
      createdon: new Date().toISOString(), // Current date and time
      status: "Pending", // Hardcoded value
    };

    try {
      const response = await fetch(
        "https://pe3jqjbadoovbtgmuddibsrpqy0mbfqe.lambda-url.eu-north-1.on.aws/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok) {
        // Handle successful response
        console.log("Commission submitted successfully");
      } else {
        // Handle errors
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
          <div className="form-group">
            <label className="form-label text-md-end">Target Locations</label>
            <input
              type="text"
              className="form-control-input"
              name="targetLocation"
              value={formData.targetLocation}
              onChange={handleChange}
              placeholder="Preferred impact regions"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Target Locations</label>
            <textarea
              className="form-control-textarea"
              name="targetLocation"
              value={formData.targetLocation}
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
              name="mediaType"
              value={formData.mediaType}
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
              name="contentUsage"
              value={formData.contentUsage}
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
              name="campaignGoal"
              value={formData.campaignGoal}
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
              name="creativeDirection"
              value={formData.creativeDirection}
              onChange={handleChange}
              placeholder="E.g. use of earthy tones and natural colors is encouraged. No harmful content or disturbing images."
            />
          </div>
          <div className="form-group">
            <label className="form-label">Themes and Prompts</label>
            <textarea
              className="form-control-textarea"
              name="themesPrompts"
              value={formData.themesPrompts}
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
      </form>
    </div>
  );
};

export default CreateCommissionForm;
