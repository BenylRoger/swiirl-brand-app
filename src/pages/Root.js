import React, { useState } from "react";
import { Link } from "react-router-dom";

import HomeIcon from "../icons/home";
import AnalyticIcon from "../icons/Analytics";
import CommissionIcon from "../icons/Commissions";
import GalleryIcon from "../icons/Galleries";
import SupportIcon from "../icons/Support";
import SettingIcon from "../icons/Settings";
import LogoutIcon from "../icons/Logout";

import "@fortawesome/fontawesome-free/css/all.css";
import "./Root.css";

function RootLayout({ children }) {
  const [isSidebarClosed, setIsSidebarClosed] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarClosed(!isSidebarClosed);
  };

  return (
    <div className="container-fluid" style={{ display: "flex" }}>
      {/* Overlay element */}
      <div
        className={`overlay ${isSidebarClosed ? "" : "active"}`}
        onMouseEnter={!isSidebarClosed ? toggleSidebar : undefined}
      ></div>

      <nav
        className={`sidebar ${isSidebarClosed ? "close" : ""}`}
        onMouseEnter={toggleSidebar}
      >
        <header className="navbar">
          <img
            alt="swiirl-logo"
            className="swiirl-logo"
            src="/swiirl-logo.png"
          />
        </header>

        <div
          className="menu-bar"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div className="menu">
            <li className="nav-link">
              <Link to="/home">
                <HomeIcon />
                <span className="text nav-text">Home</span>
              </Link>
            </li>

            <li className="nav-link">
              <Link to="/galleries">
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
                <LogoutIcon />
                <span className="text nav-text">Logout</span>
              </Link>
            </li>
          </div>
        </div>
      </nav>

      <div
        className={`content ${isSidebarClosed ? "overlayed" : ""}`}
        style={{
          flex: 1,
          marginLeft: isSidebarClosed ? "80px" : "225px",
          transition: "margin-left 0.3s ease-in-out",
        }}
      >
        <main>{children}</main>
      </div>
    </div>
  );
}

export default RootLayout;
