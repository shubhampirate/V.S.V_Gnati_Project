import React,{useState} from 'react'
import { NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    
    <>
      <nav className="main-nav">
        {/* 1st logo part  */}
        <div className="logo">
          <h2>
            <span>T</span>hapa
            <span>T</span>echnical
          </h2>
    </div>
        <div>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about">about</NavLink>
            </li>
            <li>
              <NavLink to="/service">services</NavLink>
            </li>
            <li>
              <NavLink to="/contact">contact</NavLink>
            </li>
          </ul>
        </div>
      </nav>

    </>
  )
}

export default Navbar