import React,{useState} from 'react'
import { NavLink } from "react-router-dom";
import {
    FaFacebookSquare,
    FaInstagramSquare,
    FaYoutubeSquare,
  } from "react-icons/fa";
  import { GiHamburgerMenu } from "react-icons/gi";
  
import "./Navbar.css";
const Navbar = () => {
    const [showMediaIcons, setShowMediaIcons] = useState(false);
  return (
    <>
    <nav className="main-nav">
      {/* 1st logo part  */}
      <div className="logo">
        <h2>
            
          <span>V.S.V</span>
          <span>G</span>nati  
          <span>S</span>amta
        </h2>
      </div>

      {/* 2nd menu part  */}
      <div
        className={
          showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"
        }>
        <ul>
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
            <NavLink to="/">Matrimonial</NavLink>
          </li>
          <li>
            <NavLink to="/">Jobs</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact Us</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Profile</NavLink>
          </li>
        </ul>
      </div>

      {/* 3rd social media links */}
      <div className="social-media">
       

        {/* hamburget menu start  */}
        <div className="hamburger-menu">
          <a href="#" onClick={() => setShowMediaIcons(!showMediaIcons)}>
            <GiHamburgerMenu />
          </a>
        </div>
      </div>
    </nav>


    </>
  )
}

export default Navbar