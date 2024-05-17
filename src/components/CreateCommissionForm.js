import React from "react";
import "./CreateCommissionForm.css"; // Import CSS file

const CreateCommissionForm = () => {
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
          <button className="button-primary-sw btn-center">
            Submit Commission
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCommissionForm;
