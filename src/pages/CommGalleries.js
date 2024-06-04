import React from "react";
import CommissionGalleries from "../components/CommissionGalleries";
import { Link } from "react-router-dom";

import "./CommGalleries.css"; // Import CSS file

const CommGalleries = () => {
  return (
    <div>
      <div className="back-to-galleries-div">
        <Link to="/home" className="back-to-galleries-link">
          <svg
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="arrow-left">
              <path
                id="Icon"
                d="M16.0436 10.8603H4.37695M4.37695 10.8603L10.2103 16.6936M4.37695 10.8603L10.2103 5.02698"
                stroke="#344054"
                stroke-width="1.66667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
          </svg>
          Back to all galleries
        </Link>
      </div>
      <CommissionGalleries />
    </div>
  );
};

export default CommGalleries;
