import "./MainNavigation.css"; // Import CSS file

import React, { useState } from "react";
import { Link } from "react-router-dom";

import HomeIcon from "../icons/home";
import AnalyticIcon from "../icons/Analytics";
import CommissionIcon from "../icons/Commissions";
import GalleryIcon from "../icons/Galleries";
import SupportIcon from "../icons/Support";
import SettingIcon from "../icons/Settings";

import "@fortawesome/fontawesome-free/css/all.css";

function MainNavigation() {
  const [isSidebarClosed, setIsSidebarClosed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarClosed(!isSidebarClosed);
  };

  return (
    <nav className={`sidebar ${isSidebarClosed ? "close" : ""}`}>
      <header className="navbar navbar-light bg-light">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleSidebar}
          >
            <i className="fas fa-bars"></i>
          </button>
          <div className="text logo-text">
            <img
              alt="swiirl-logo"
              className="swiirl-logo"
              src="/swiirl-logo.png"
            />
          </div>
        </div>
      </header>

      <div className="menu-bar">
        <div className="menu">
          {/* <li className="search-box" onClick={toggleSearch}>
            <i className="bx bx-search icon"></i>
            <input type="text" placeholder="Search..." />
          </li> */}

          <ul className="menu-links">
            <li className="nav-link">
              <Link to="/home">
                <HomeIcon />
                <span className="text nav-text">Home</span>
              </Link>
            </li>

            <li className="nav-link">
              <Link to="/images">
                {/* <i className="bx bx-pie-chart-alt icon"></i> */}
                <GalleryIcon />
                <span className="text nav-text">Galleries</span>
              </Link>
            </li>

            <li className="nav-link">
              <Link to="/commissions">
                <CommissionIcon />
                <span className="text nav-text">commissions</span>
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
  );
}

export default MainNavigation;
