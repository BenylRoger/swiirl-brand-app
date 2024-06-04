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
    <div
      className="container-fluid"
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <div style={{ display: "flex", flex: 1 }}>
        {/* Overlay element */}
        <div
          className={`overlay ${isSidebarClosed ? "" : "active"}`}
          onMouseEnter={!isSidebarClosed ? toggleSidebar : undefined}
        ></div>

        <nav
          className={`sidebar ${isSidebarClosed ? "close" : ""}`}
          onMouseEnter={toggleSidebar}
        >
          {isSidebarClosed ? (
            <header className="navbar">
              <img
                alt="swiirl-logo"
                className="swiirl-logo"
                src="/home/brand-short.png"
              />
            </header>
          ) : (
            <header className="navbar">
              <img
                alt="swiirl-logo"
                className="swiirl-logo"
                src="/home/swiirl-logo.png"
              />
            </header>
          )}
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
                <Link to="/admin">
                  <AnalyticIcon />
                  <span className="text nav-text">Admin</span>
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
            marginLeft: isSidebarClosed ? "80px" : "210px",
            transition: "margin-left 0.3s ease-in-out",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <main style={{ flex: 1 }}>{children}</main>
          <footer className="footer">
            <div className="footer-content">
              <img
                alt="swiirl-logo"
                className="swiirl-logo"
                src="/home/brand-short.png"
              />
              <span>© 2024, All rights reserved.</span>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default RootLayout;
