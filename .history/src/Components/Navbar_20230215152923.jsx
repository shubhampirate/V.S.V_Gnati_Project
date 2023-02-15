import React,{useState} from 'react'
import { NavLink } from "react-router-dom";
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


      <div className="social-media">
      
 <ul className="social-media-desktop">
 
  <button class="button-arounder">Hover Me</button>


          </ul>
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