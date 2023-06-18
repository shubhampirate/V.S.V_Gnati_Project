import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

import "./Navbar.css";
const Navbar = () => {
  // const [showMediaIcons, setShowMediaIcons] = useState(false);
  const tokenvsv = localStorage.getItem("tokenvsv");
  console.log(tokenvsv)
  return (
    <>
      <nav>
        <label for="drop" class="toggle">
          <GiHamburgerMenu />
        </label>
        <input type="checkbox" id="drop" />
        <ul class="menu">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/about">About Us</NavLink>
          </li>
          <li>
            <NavLink to="/events">Events</NavLink>
          </li>
          <li>
            <label for="drop-1" class="toggle">
              Jobs
            </label>
            {tokenvsv !== null ?
              <>
                <NavLink to="/jobs"> Jobs </NavLink>
                <input type="checkbox" id="drop-1" />
                <ul>
                  <li>
                    <NavLink to="/jobs">Jobs</NavLink>
                  </li>
                  <li>
                    <NavLink to="/jobs/recruiter">Add Job</NavLink>
                  </li>
                </ul>
              </> : <>
                <NavLink to="/login">Jobs</NavLink>
              </>}
          </li>
          <li>
            <label for="drop-2" class="toggle">
              Matrimonial
            </label>
            {tokenvsv !== null ?
              <>
                <NavLink to="/matrimonial">Matrimonial</NavLink>
                <input type="checkbox" id="drop-2" />
                <ul>
                  <li>
                    <NavLink to="/matrimonial">Matrimonial</NavLink>
                  </li>
                  <li>
                    <NavLink to="/matrimonial/register">Register Now</NavLink>
                  </li>
                </ul>
              </> : <>
                <NavLink to="/login">Matrimonial</NavLink>
              </>}
          </li>
          <li>
            <label for="drop-3" class="toggle">
              Profile
            </label>
            {tokenvsv !== null ?
              <>
                <NavLink to="/profile">Members</NavLink>
                <input type="checkbox" id="drop-3" />
                <ul>
                  <li>
                    <NavLink to="/profile">Members</NavLink>
                  </li>
                  <li>
                    <NavLink to="/family">Family</NavLink>
                  </li>
                </ul>
              </> : <>
                <NavLink to="/profile">Members</NavLink>
              </>}
          </li>
          <li>
            <NavLink to="/contact">Contact Us</NavLink>
          </li>
          <li>
            <NavLink to="/donate">Donate</NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
