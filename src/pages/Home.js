import React, { useState, useEffect } from "react";
import "./Home.css"; // Import CSS file
import EditIcon from "../icons/Edit";
import { Link } from "react-router-dom";
import ImageGallery from "../components/Galleries";
import { useSelector } from "react-redux";
import CommissionListing from "../components/CommissionListing";
import axios from "axios";

const Home = () => {
  const [commissionData, setCommissionData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // New loading state
  const username = useSelector((state) => state.user.username);

  useEffect(() => {
    console.log(username);
    const fetchCommissions = async () => {
      try {
        const response = await axios.get(
          `https://mc54wwmd2jqfhvis2huj46wl240ilczp.lambda-url.us-east-1.on.aws/?createdby=${username}&status=Completed`
        );
        setCommissionData(response.data);
      } catch (error) {
        console.error("Error fetching commissions", error);
      } finally {
        setIsLoading(false); // Set loading to false after API call
      }
    };
    fetchCommissions();
  }, [username]);

  // Check if there are commissions
  const hasCommission = commissionData && commissionData.length > 0;

  return (
    <div className="content-area">
      <div className="row">
        <div className="col-lg-12">
          <div className="image-container">
            <img
              src="/home/header.png"
              alt="Home Page Banner"
              className="img-banner img-fluid"
            />
            <div className="circle">
              <img src="/home/circle2.png" alt="Circle Page Banner" />
            </div>
          </div>
        </div>

        <div className="col-lg-12 mt-5">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <div className="button-placement">
                {/* <Link to="/galleries" style={{ textDecoration: "none" }}>
                  <button className="button-secondary-sw">
                    View Galleries
                  </button>
                </Link> */}
                <Link
                  to="/commissions/create"
                  style={{ textDecoration: "none" }}
                >
                  <button className="button-primary-sw">New Commission</button>
                </Link>
              </div>
              {!isLoading && !hasCommission && (
                <div className="Cta">
                  <div className="FeaturedIcon">
                    <div className="Edit04">
                      <EditIcon />
                    </div>
                  </div>
                  <div className="TextAndSupportingText">
                    <div className="Text">
                      You do not have any art commissioned yet.
                    </div>
                    <div className="SupportingText">
                      Dive into the editor and start creating
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-lg-12 mt-3">
          {!isLoading &&
            (hasCommission ? (
              // commissions={commissionData}
              <CommissionListing username={username} />
            ) : (
              <ImageGallery />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
