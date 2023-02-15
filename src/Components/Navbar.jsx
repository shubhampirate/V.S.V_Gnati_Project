import React,{useState} from 'react'
import { NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

import "./Navbar.css";
const Navbar = () => {
    const [showMediaIcons, setShowMediaIcons] = useState(false);
  return (
    <>
    <nav className="main-nav">
    
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
            <NavLink to="/matrimonial">Matrimonial</NavLink>
          </li>
          <li>
            <NavLink to="/jobs">Jobs</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact Us</NavLink>
          </li>
          <li>
            <NavLink to="/profile">Profile</NavLink>
          </li>
          <li>
          <button class="button-arounder" >Donate</button>

          </li>
        
        </ul>
      </div>


      <div className="social-media"style={{justifyContent: 'center'}}>
      
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