import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CommissionGrid.css";

import TimelineIcon from "../icons/Timeline";
import MediaTypeIcon from "../icons/Mediatype";
import FileIcon from "../icons/Files";
import TargetLocationIcon from "../icons/TargetLocation";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

const CommissionGrid = () => {
  const [commissions, setCommissions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(2);
  const [activeTab, setActiveTab] = useState("basicdetails");
  const [imageUrls, setImageUrls] = useState([]);
  const [selectedCommission, setSelectedCommission] = useState(null);

  const username = useSelector((state) => state.user.username);
  useEffect(() => {
    console.log(username);
    const fetchCommissions = async () => {
      try {
        const response = await axios.get(
          `https://mc54wwmd2jqfhvis2huj46wl240ilczp.lambda-url.us-east-1.on.aws/?createdby=${username}`
        );
        setCommissions(response.data);
      } catch (error) {
        console.error("Error fetching commissions", error);
      }
    };
    fetchCommissions();
  }, [username]);

  useEffect(() => {
    const fetchImageUrls = async () => {
      try {
        if (!selectedCommission || !selectedCommission.filenames) {
          console.log("No filenames available in the selected commission");
          return;
        }

        const filenames = selectedCommission.filenames
          .split(",")
          .map((file) => file.trim());

        const imageUrls = await Promise.all(
          filenames.map(async (file) => {
            try {
              const response = await fetch(
                `https://h5ptrghgi6dpvnbz5t6njqzrom0uhvkb.lambda-url.us-east-1.on.aws/?action=getSignedUrl&bucketName=swiirl-brand-app-images&keyName=${selectedCommission.name}/${file}`
              );
              if (!response.ok) {
                throw new Error("Failed to fetch signed URL");
              }
              const data = await response.json();
              console.log(data);
              return data.signedUrl;
            } catch (error) {
              console.error("Error fetching signed URL for file", file, error);
              return "/home/Image_not_available1.jpg";
            }
          })
        );

        setImageUrls(imageUrls);
      } catch (error) {
        console.error("Error fetching image URLs", error);
      }
    };

    if (selectedCommission) {
      fetchImageUrls();
    }
  }, [selectedCommission]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = commissions.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(commissions.length / itemsPerPage);

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers.map((number) => (
      <li
        key={number}
        id={number}
        onClick={handleClick}
        className={currentPage === number ? "active" : null}
      >
        {number}
      </li>
    ));
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleViewClick = (commission) => {
    setSelectedCommission(commission);
    setActiveTab("basicdetails");
  };

  const commissionToDisplay =
    selectedCommission ||
    (commissions.length > 0 ? commissions[commissions.length - 1] : null);

  return (
    <div className="grid-container">
      <div className="col-lg-12 mb-3">
        <div className="row align-items-center">
          <div className="col-lg-12 d-flex justify-content-between align-items-center">
            <div className="heading-text">Commissions</div>

            <div className="button-placement1">
              <Link to="/commissions/create" style={{ textDecoration: "none" }}>
                <button className="button-primary-sw">New Commission</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {commissionToDisplay && (
        <div className="latest-commission">
          <div className="commission-details">
            <div className="form-row">
              <div className="form-group" style={{ paddingLeft: "10px" }}>
                <div className="status">{commissionToDisplay.status}</div>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group" style={{ paddingLeft: "10px" }}>
                <div className="latest-commission-name">
                  {commissionToDisplay.name}
                </div>
                <div className="latest-commission-name-footer">
                  {commissionToDisplay.campaign_goal}
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <div className="tabs">
                  <button
                    className={activeTab === "basicdetails" ? "active" : ""}
                    onClick={() => setActiveTab("basicdetails")}
                  >
                    Basic Details
                  </button>
                  <button
                    className={activeTab === "goals" ? "active" : ""}
                    onClick={() => setActiveTab("goals")}
                  >
                    Goals
                  </button>
                  <button
                    className={activeTab === "format" ? "active" : ""}
                    onClick={() => setActiveTab("format")}
                  >
                    Format
                  </button>
                  <button
                    className={activeTab === "creativedesign" ? "active" : ""}
                    onClick={() => setActiveTab("creativedesign")}
                  >
                    Creative Design
                  </button>
                  <button
                    className={activeTab === "themesprompts" ? "active" : ""}
                    onClick={() => setActiveTab("themesprompts")}
                  >
                    Themes & Prompts
                  </button>
                </div>
                {activeTab === "basicdetails" && (
                  <div className="tab-content">
                    <div className="details-row">
                      <div className="fields">
                        <TargetLocationIcon />
                        <div className="details-right">
                          <div>
                            <strong>Target Location</strong>{" "}
                          </div>
                          <div>{commissionToDisplay.target_location}</div>
                        </div>
                      </div>
                      <div className="fields">
                        <FileIcon />
                        <div className="details-right">
                          <div>
                            <strong>Files</strong>{" "}
                          </div>
                          <div>{commissionToDisplay.files}</div>
                        </div>
                      </div>
                    </div>
                    <div className="details-row">
                      <div className="fields">
                        <TimelineIcon />
                        <div className="details-right">
                          <div>
                            <strong>Timeline</strong>{" "}
                          </div>
                          <div>
                            {new Date(
                              commissionToDisplay.timeline
                            ).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="fields">
                        <TimelineIcon />
                        <div className="details-right">
                          <div>
                            <strong>Relevant links</strong>{" "}
                          </div>
                          <div>{commissionToDisplay.links}</div>
                        </div>
                      </div>
                    </div>
                    <div className="details-row">
                      <div className="fields">
                        <MediaTypeIcon />
                        <div className="details-right">
                          <div>
                            <strong>Media Type</strong>{" "}
                          </div>
                          <div style={{ whiteSpace: "pre-wrap" }}>
                            {commissionToDisplay.mediatype.replace(/,/g, ",\n")}
                          </div>
                        </div>
                      </div>
                      <div className="fields">
                        {imageUrls.map((url, index) => (
                          <img
                            style={{ height: "75px", width: "75px" }}
                            key={index}
                            src={url}
                            alt={`swiirl-brand pic ${index + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === "goals" && (
                  <div className="tab-content">
                    <p>
                      <strong>Content Usage:</strong>{" "}
                      {commissionToDisplay.content_usage}
                    </p>
                    <p>
                      <strong>Target Audience:</strong>{" "}
                      {commissionToDisplay.target_audience}
                    </p>
                    <p>
                      <strong>Tags:</strong> {commissionToDisplay.tags}
                    </p>
                    <p>
                      <strong>Campaign Goal:</strong>{" "}
                      {commissionToDisplay.campaign_goal}
                    </p>
                  </div>
                )}
                {activeTab === "format" && (
                  <div className="tab-content">
                    <p>
                      <strong>Media Type:</strong>{" "}
                      {commissionToDisplay.mediatype}
                    </p>
                    <p>
                      <strong>Files:</strong> {commissionToDisplay.files}
                    </p>
                  </div>
                )}
                {activeTab === "creativedesign" && (
                  <div className="tab-content">
                    <p>
                      <strong>Creative Design:</strong>{" "}
                      {commissionToDisplay.creative_design}
                    </p>
                  </div>
                )}
                {activeTab === "themesprompts" && (
                  <div className="tab-content">
                    <p>
                      <strong>Themes Prompts:</strong>{" "}
                      {commissionToDisplay.themes_prompts}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="table-responsive">
        <table>
          <thead>
            <tr className="font-style-grid">
              <th>ID</th>
              <th>Name</th>
              <th>Target Location</th>
              <th>Timeline</th>
              <th>Media Type</th>
              <th>Content Usage</th>
              <th>Created On</th>
              <th>Status</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((commission, index) => (
              <tr
                key={commission.id}
                className={
                  index % 2 === 0
                    ? "even-row font-style-grid"
                    : "odd-row font-style-grid"
                }
              >
                <td>{commission.id}</td>
                <td>{commission.name}</td>
                <td>{commission.target_location}</td>
                <td>{new Date(commission.timeline).toLocaleDateString()}</td>
                <td style={{ whiteSpace: "pre-wrap" }}>
                  {commission.mediatype.replace(/,/g, ",\n")}
                </td>
                <td>{commission.content_usage}</td>
                <td>{new Date(commission.createdon).toLocaleDateString()}</td>
                <td>{commission.status}</td>
                <td>
                  <button onClick={() => handleViewClick(commission)}>
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination-container">
        <button
          className="previous-button"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
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
          Previous
        </button>
        <ul className="pagination">{renderPageNumbers()}</ul>
        <button
          className="next-button"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
          <svg
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="arrow-right">
              <path
                id="Icon"
                d="M4.37646 10.8603H16.0431M16.0431 10.8603L10.2098 5.02698M16.0431 10.8603L10.2098 16.6936"
                stroke="#344054"
                stroke-width="1.66667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CommissionGrid;
