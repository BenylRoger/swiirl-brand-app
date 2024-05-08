import React from "react";
import "./Home.css"; // Import CSS file
import EditIcon from "../icons/Edit";
import { Link } from "react-router-dom";
import ImageGallery from "../components/Galleries";

const Home = () => {
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
                <Link to="/images">
                  <button className="btn btn-secondary">View Galleries</button>
                </Link>
                <Link to="/commissions">
                  <button className="btn btn-primary">New Commission</button>
                </Link>
              </div>
              <div className="Cta">
                <div className="FeaturedIcon">
                  <div className="Edit04">
                    {/* Assuming EditIcon is imported */}
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
            </div>
          </div>
        </div>

        {/* Render ImageGallery component */}
        <div className="col-lg-12 mt-3">
          <ImageGallery />
        </div>
      </div>
    </div>
  );
};

export default Home;
