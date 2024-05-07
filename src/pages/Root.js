import React, { useState } from "react";
import { Link } from "react-router-dom";

import HomeIcon from "../icons/home";
import AnalyticIcon from "../icons/Analytics";
import CommissionIcon from "../icons/Commissions";
import GalleryIcon from "../icons/Galleries";
import SupportIcon from "../icons/Support";
import SettingIcon from "../icons/Settings";

import "@fortawesome/fontawesome-free/css/all.css";

import "bootstrap/dist/css/bootstrap.min.css";

import "./Root.css";
import "../components/MainNavigation.css";

function RootLayout({ children }) {
  const [isSidebarClosed, setIsSidebarClosed] = useState(false);

  const toggleSidebar = () => {
    console.log("click event triggered");
    setIsSidebarClosed(!isSidebarClosed);
  };

  return (
    <div className="container-fluid">
      {/* Overlay element */}
      <div
        className={`overlay ${isSidebarClosed ? "" : "active"}`}
        onClick={!isSidebarClosed ? toggleSidebar : undefined}
      ></div>
      {/* Button to open sidebar */}
      <button className="menu-btn-customized" onClick={toggleSidebar}>
        <i className="fas fa-bars"></i> Menu
      </button>
      <div className="row">
        <div className="col-sm-0 col-md-0 col-lg-0">
          <nav className={`sidebar ${isSidebarClosed ? "close" : ""}`}>
            <header className="navbar">
              <div className="container">
                <img
                  alt="swiirl-logo"
                  className="swiirl-logo"
                  src="/swiirl-logo.png"
                />
              </div>
            </header>

            <div className="menu-bar">
              <div className="menu">
                <ul className="menu-links">
                  <li className="nav-link">
                    <Link to="/home">
                      <HomeIcon />
                      <span className="text nav-text">Home</span>
                    </Link>
                  </li>

                  <li className="nav-link">
                    <Link to="/images">
                      <GalleryIcon />
                      <span className="text nav-text">Galleries</span>
                    </Link>
                  </li>

                  <li className="nav-link">
                    <Link to="/commissions">
                      <CommissionIcon />
                      <span className="text nav-text">Commissions</span>
                    </Link>
                  </li>

                  <li className="nav-link">
                    <Link to="/analytics">
                      <AnalyticIcon />
                      <span className="text nav-text">Analytics</span>
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="bottom-content">
                <li className="nav-link">
                  <Link to="/analytics">
                    <SupportIcon />
                    <span className="text nav-text">Support</span>
                  </Link>
                </li>
                <li className="nav-link">
                  <Link to="/analytics">
                    <SettingIcon />
                    <span className="text nav-text">Settings</span>
                  </Link>
                </li>
                <li className="nav-link">
                  <Link to="/analytics">
                    <i className="bx bx-pie-chart-alt icon"></i>
                    <span className="text nav-text">Benyl</span>
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <i className="bx bx-log-out icon"></i>
                    <span className="text nav-text">Logout</span>
                  </Link>
                </li>
              </div>
            </div>
          </nav>
        </div>
        <div
          className={`col-sm-12 col-md-12 col-lg-12 content ${
            isSidebarClosed ? "overlayed" : ""
          }`}
        >
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}

export default RootLayout;
