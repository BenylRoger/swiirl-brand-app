import React, { useState } from "react";
import "./CreateCommissionForm.css"; // Import CSS file
import UploadIcon from "../icons/upload";

const CreateCommissionForm = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const handleFileChange = (event) => {
    setSelectedFiles([...event.target.files]); // Spread operator for immutability
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
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Name your commission</label>
          <input
            type="text"
            className="form-control-input"
            placeholder="Let’s give the school details for their new assignment"
          />
        </div>
        <div className="form-group">
          <label className="form-label text-md-end">Target Locations</label>
          <input
            type="text"
            className="form-control-input"
            placeholder="Preferred impact regions"
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Target Locations</label>
          <textarea
            type="text"
            className="form-control-textarea"
            placeholder="Preferred impact regions"
          />
        </div>
        <div className="form-group">
          <label className="form-label text-md-end">Timeline</label>
          <input
            type="text"
            className="form-control-input"
            placeholder="Start, deadline, review"
          />
          <label className="form-label">Media Type</label>
          <input
            type="text"
            className="form-control-input"
            placeholder="Photography"
          />
        </div>
        {/* <div className="form-group">
          <label className="form-label">Media Type</label>
          <input
            type="text"
            className="form-control-input"
            placeholder="Enter media type"
          />
        </div> */}
      </div>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label text-md-end">
            How will you use this content?
          </label>
          <textarea
            type="text"
            className="form-control-textarea"
            placeholder="E.g. social media campaigns, annual sustainability report, signage for event and retail, etc."
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            What is the goal of this campaign
          </label>
          <textarea
            type="text"
            className="form-control-textarea"
            placeholder="E.g. raise awareness of the importance of sustainable living practices. What does sustainability mean for different communities?"
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label text-md-end">Creative direction</label>
          <textarea
            type="text"
            className="form-control-textarea"
            placeholder="E.g. use of earthy tones and natural colors is encouraged. No harmful content or disturbing images."
          />
        </div>
        <div className="form-group">
          <label className="form-label">Themes and Prompts</label>
          <textarea
            type="text"
            className="form-control-textarea"
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
            <div className="className=" upload-options>
              <p className="click">Click to upload</p>
              {/* <p className="drag">or drag and drop</p> */}
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
                    <div className="icons-files">{/*icon*/}</div>
                    <div className="file-details">
                      <div className="filename">{file.name} </div>
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
          <button className="button-primary-sw btn-center">
            Submit Commission
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCommissionForm;
