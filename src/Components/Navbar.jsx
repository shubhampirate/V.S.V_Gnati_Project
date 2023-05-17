import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

import "./Navbar.css";
const Navbar = () => {
  // const [showMediaIcons, setShowMediaIcons] = useState(false);
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
            <NavLink to="/jobs">Jobs</NavLink>
            <input type="checkbox" id="drop-1" />
            <ul>
              <li>
                <NavLink to="/jobs/recruiter">Add Job</NavLink>
              </li>
            </ul>
          </li>
          <li>
            <label for="drop-2" class="toggle">
              Matrimonial
            </label>
            <NavLink to="/matrimonial">Matrimonial</NavLink>
            <input type="checkbox" id="drop-2" />
            <ul>
              <li>
                <NavLink to="/matrimonial/register">Register Now</NavLink>
              </li>
            </ul>
          </li>
          <li>
            <label for="drop-2" class="toggle">
              Profile
            </label>
            <NavLink to="/profile">Members</NavLink>
            <input type="checkbox" id="drop-2" />
            <ul>
              <li>
                <NavLink to="/family">Profile</NavLink>
              </li>
            </ul>
          </li>
          <li>
            <NavLink to="/contact">Contact Us</NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
