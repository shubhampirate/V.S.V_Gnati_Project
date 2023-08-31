import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Extra.css";
import MenuIcon from '@mui/icons-material/Menu';
import EmergencyShareIcon from '@mui/icons-material/EmergencyShare';
import Swal from "sweetalert2";
import logo from "../images/VSVLogo.png"

const Navbar = () => {
  const [click, setClick] = useState(false);
  const tokenid = localStorage.getItem("tokenvsv");

  const handleClick = () => setClick(!click);

  const handleClickRemove = () => {
    setClick(!click);
    localStorage.removeItem("tokenvsv");
    localStorage.removeItem("family");
  }

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo" style={{ textAlign: "center" }}>
            {/* <EmergencyShareIcon style={{ width: "5vh", height: "5vh" }} onClick={success} /> */}
            <img src={logo} style={{ width: "7.5rem", marginTop: "0.5rem" }} />
            <img src={logo} style={{ width: "10%",height:"10%", marginTop: "0.5rem" }} />
            <i className="fas fa-code"></i>
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/about"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/events"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Events
              </NavLink>
            </li>
            {tokenid ?
              <li className="nav-item">
                <NavLink
                  exact
                  to="/family"
                  activeClassName="active"
                  className="nav-links"
                  onClick={handleClick}
                >
                  Members
                </NavLink>
              </li> : <li className="nav-item">
                <NavLink
                  exact
                  to="/login"
                  activeClassName="active"
                  className="nav-links"
                  onClick={handleClick}
                >
                  Members
                </NavLink>
              </li>}
            {tokenid ?
              <li className="nav-item">
                <NavLink
                  exact
                  to="/profile"
                  activeClassName="active"
                  className="nav-links"
                  onClick={handleClick}
                >
                  Profile
                </NavLink>
              </li> : <li className="nav-item">
                <NavLink
                  exact
                  to="/login"
                  activeClassName="active"
                  className="nav-links"
                  onClick={handleClick}
                >
                  Profile
                </NavLink>
              </li>}

            {tokenid ?
              <li className="nav-item">
                <NavLink
                  exact
                  to="/matrimonial"
                  activeClassName="active"
                  className="nav-links"
                  onClick={handleClick}
                >
                  Matrimonial
                </NavLink>
              </li> : <li className="nav-item">
                <NavLink
                  exact
                  to="/login"
                  activeClassName="active"
                  className="nav-links"
                  onClick={handleClick}
                >
                  Matrimonial
                </NavLink>
              </li>}

            {tokenid ?
              <li className="nav-item">
                <NavLink
                  exact
                  to="/jobs"
                  activeClassName="active"
                  className="nav-links"
                  onClick={handleClick}
                >
                  Jobs
                </NavLink>
              </li> : <li className="nav-item">
                <NavLink
                  exact
                  to="/login"
                  activeClassName="active"
                  className="nav-links"
                  onClick={handleClick}
                >
                  Jobs
                </NavLink>
              </li>}

            <li className="nav-item">
              <NavLink
                exact
                to="/donate"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Donate
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/contact"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Contact
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={handleClickRemove}
              >
                Logout
              </NavLink>
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}><MenuIcon /></i>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar
