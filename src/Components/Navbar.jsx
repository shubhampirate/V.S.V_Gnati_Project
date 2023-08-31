// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
// import "./Extra.css";
// import MenuIcon from '@mui/icons-material/Menu';
// import EmergencyShareIcon from '@mui/icons-material/EmergencyShare';
// import Swal from "sweetalert2";
// import logo from "../images/logo.jpeg"

// const Navbar = () => {
// const [click, setClick] = useState(false);
// const tokenid = localStorage.getItem("tokenvsv");

// const handleClick = () => setClick(!click);

// const handleClickRemove = () => {
//   setClick(!click);
//   localStorage.removeItem("tokenvsv");
//   localStorage.removeItem("family");
// }

//   return (
//     <>
//       <nav className="navbar">
//         <div className="nav-container">
//           <NavLink exact to="/" className="nav-logo" style={{ textAlign: "center" }}>
//             {/* <EmergencyShareIcon style={{ width: "5vh", height: "5vh" }} onClick={success} /> */}
//             <img src={logo} style={{ width: "7.5rem", marginTop: "0.5rem" }} />
//             <i className="fas fa-code"></i>
//           </NavLink>

//           <ul className={click ? "nav-menu active" : "nav-menu"}>
//             <li className="nav-item">
//               <NavLink
//                 exact
//                 to="/"
//                 activeClassName="active"
//                 className="nav-links"
//                 onClick={handleClick}
//               >
//                 Home
//               </NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink
//                 exact
//                 to="/about"
//                 activeClassName="active"
//                 className="nav-links"
//                 onClick={handleClick}
//               >
//                 About
//               </NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink
//                 exact
//                 to="/events"
//                 activeClassName="active"
//                 className="nav-links"
//                 onClick={handleClick}
//               >
//                 Events
//               </NavLink>
//             </li>
//             {tokenid ?
//               <li className="nav-item">
//                 <NavLink
//                   exact
//                   to="/family"
//                   activeClassName="active"
//                   className="nav-links"
//                   onClick={handleClick}
//                 >
//                   Members
//                 </NavLink>
//               </li> : <li className="nav-item">
//                 <NavLink
//                   exact
//                   to="/login"
//                   activeClassName="active"
//                   className="nav-links"
//                   onClick={handleClick}
//                 >
//                   Members
//                 </NavLink>
//               </li>}
//             {tokenid ?
//               <li className="nav-item">
//                 <NavLink
//                   exact
//                   to="/profile"
//                   activeClassName="active"
//                   className="nav-links"
//                   onClick={handleClick}
//                 >
//                   Profile
//                 </NavLink>
//               </li> : <li className="nav-item">
//                 <NavLink
//                   exact
//                   to="/login"
//                   activeClassName="active"
//                   className="nav-links"
//                   onClick={handleClick}
//                 >
//                   Profile
//                 </NavLink>
//               </li>}

//             {tokenid ?
//               <li className="nav-item">
//                 <NavLink
//                   exact
//                   to="/matrimonial"
//                   activeClassName="active"
//                   className="nav-links"
//                   onClick={handleClick}
//                 >
//                   Matrimonial
//                 </NavLink>
//               </li> : <li className="nav-item">
//                 <NavLink
//                   exact
//                   to="/login"
//                   activeClassName="active"
//                   className="nav-links"
//                   onClick={handleClick}
//                 >
//                   Matrimonial
//                 </NavLink>
//               </li>}

//             {tokenid ?
//               <li className="nav-item">
//                 <NavLink
//                   exact
//                   to="/jobs"
//                   activeClassName="active"
//                   className="nav-links"
//                   onClick={handleClick}
//                 >
//                   Jobs
//                 </NavLink>
//               </li> : <li className="nav-item">
//                 <NavLink
//                   exact
//                   to="/login"
//                   activeClassName="active"
//                   className="nav-links"
//                   onClick={handleClick}
//                 >
//                   Jobs
//                 </NavLink>
//               </li>}

//             <li className="nav-item">
//               <NavLink
//                 exact
//                 to="/donate"
//                 activeClassName="active"
//                 className="nav-links"
//                 onClick={handleClick}
//               >
//                 Donate
//               </NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink
//                 exact
//                 to="/contact"
//                 activeClassName="active"
//                 className="nav-links"
//                 onClick={handleClick}
//               >
//                 Contact
//               </NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink
//                 exact
//                 to="/"
//                 activeClassName="active"
//                 className="nav-links"
//                 onClick={handleClickRemove}
//               >
//                 Logout
//               </NavLink>
//             </li>
//           </ul>
//           <div className="nav-icon" onClick={handleClick}>
//             <i className={click ? "fas fa-times" : "fas fa-bars"}><MenuIcon /></i>
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// }

// export default Navbar


import React, { useState } from "react";
import styled from "styled-components";
import logo from "../images/logo.jpeg"
import { NavLink } from "react-router-dom";

const Nav = styled.nav`
  padding: 0 20px;
  min-height: 9vh;
  background: rgba(255,255,255, 0.5);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  font-size: 25px;
  color: white;
`;

const Menu = styled.ul`
  list-style: none;
  display: flex;
  color: black;

  li:nth-child(1) {
    margin: 0px 10px;
  }

  li:nth-child(2) {
    margin: 0px 10px;
  }

   li:nth-child(3) {
    margin: 0px 10px;
  }

   li:nth-child(4) {
    margin: 0px 10px;
  }

   li:nth-child(5) {
    margin: 0px 10px;
  }

   li:nth-child(6) {
    margin: 0px 10px;
  }

   li:nth-child(7) {
    margin: 0px 10px;
  }

   li:nth-child(8) {
    margin: 0px 10px;
  }

  li:nth-child(9) {
    margin: 0px 10px;
  }

  @media (max-width: 863.5px) {
    display: none;
  }
`;

const Item = styled.li``;

const NavLinkStyled = styled(NavLink)`
  color: black;
  text-decoration: none;

  :hover {
    text-decoration: underline;
  }
`;

const NavIcon = styled.button`
  background: none;
  cursor: pointer;
  border: none;
  outline: none;
  @media (min-width: 863.5px) {
    display: none;
  }
`;

const Line = styled.span`
  display: block;
  border-radius: 50px;
  width: 25px;
  height: 3px;
  margin: 5px;
  background-color: black;
  transition: width 0.4s ease-in-out;

  :nth-child(2) {
    width: ${props => (props.open ? "40%" : "70%")};
  }
`;

const Overlay = styled.div`
  position: absolute;
  height: ${props => (props.open ? "91vh" : 0)};
  width: 100vw;
  background: rgba(255,255,255,0.95);
  transition: height 0.4s ease-in-out;
  @media (min-width: 863.5px) {
    display: none;
  }
`;

const OverlayMenu = styled.ul`
  list-style: none;
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
  

  li {
    opacity: ${props => (props.open ? 1 : 0)};
    font-size: 1.5rem;
    margin: 20px 0px;
    transition: opacity 0.4s ease-in-out;
  }

`;


const Navbar = () => {
  const tokenid = localStorage.getItem("tokenvsv");

  const handleClickRemove = () => {
    localStorage.removeItem("tokenvsv");
    localStorage.removeItem("family");
  }

  const [toggle, toggleNav] = useState(false);
  return (
    <>
      <Nav>
        <Logo>
          <img src={logo} style={{ width: "100%", height: "3.5rem", marginLeft: "5%" }} />
        </Logo>
        <Menu style={{ marginTop: "-0.25%" }}>
          <Item>
            <NavLinkStyled to="/" >
              Home
            </NavLinkStyled>
          </Item>
          <Item>
            <NavLinkStyled to="/about">
              About Us
            </NavLinkStyled>
          </Item>
          <Item>
            <NavLinkStyled to="/events">
              Events
            </NavLinkStyled>
          </Item>
          <Item>
            {tokenid ? <>
              <NavLinkStyled to="/members">
                Members
              </NavLinkStyled></> : <>
              <NavLinkStyled to="/login">
                Members
              </NavLinkStyled></>}
          </Item>
          <Item>
            {tokenid ? <>
              <NavLinkStyled to="/profile">
                Profile
              </NavLinkStyled></> : <>
              <NavLinkStyled to="/login">
                Profile
              </NavLinkStyled></>}
          </Item>
          <Item>
            {tokenid ? <>
              <NavLinkStyled to="/jobs">
                Jobs
              </NavLinkStyled></> : <>
              <NavLinkStyled to="/login">
                Jobs
              </NavLinkStyled></>}
          </Item>
          <Item>
            {tokenid ? <>
              <NavLinkStyled to="/matrimonial">
                Matrimony
              </NavLinkStyled></> : <>
              <NavLinkStyled to="/login">
                Matrimony
              </NavLinkStyled></>}
          </Item>
          <Item>
            <NavLinkStyled to="/donate">
              Donate
            </NavLinkStyled>
          </Item>
          <Item>
            <NavLinkStyled to="/contact">
              Contact Us
            </NavLinkStyled>
          </Item>
          <Item>
            {tokenid ? <>
              <NavLinkStyled to="/login" onClick={handleClickRemove}>
                Logout
              </NavLinkStyled></> : <>
              <NavLinkStyled to="/login">
                Login
              </NavLinkStyled></>}
          </Item>
        </Menu>
        <NavIcon onClick={() => toggleNav(!toggle)}>
          <Line open={toggle} />
          <Line open={toggle} />
          <Line open={toggle} />
        </NavIcon>
      </Nav>
      <Overlay open={toggle} style={{ zIndex: "1000", overflow: "hidden", marginTop: "-1.2rem" }}>
        <OverlayMenu open={toggle}>
          <Item>
            <NavLinkStyled to="/">
              Home
            </NavLinkStyled>
          </Item>
          <Item>
            <NavLinkStyled to="/about">
              About Us
            </NavLinkStyled>
          </Item>
          <Item>
            <NavLinkStyled to="/events" >
              Events
            </NavLinkStyled>
          </Item>
          <Item>
            {tokenid ? <>
              <NavLinkStyled to="/members">
                Members
              </NavLinkStyled></> : <>
              <NavLinkStyled to="/login">
                Members
              </NavLinkStyled></>}
          </Item>
          <Item>
            {tokenid ? <>
              <NavLinkStyled to="/profile">
                Profile
              </NavLinkStyled></> : <>
              <NavLinkStyled to="/login">
                Profile
              </NavLinkStyled></>}
          </Item>
          <Item>
            {tokenid ? <>
              <NavLinkStyled to="/jobs">
                Jobs
              </NavLinkStyled></> : <>
              <NavLinkStyled to="/login">
                Jobs
              </NavLinkStyled></>}
          </Item>
          <Item>
            {tokenid ? <>
              <NavLinkStyled to="/matrimonial">
                Matrimony
              </NavLinkStyled></> : <>
              <NavLinkStyled to="/login">
                Matrimony
              </NavLinkStyled></>}
          </Item>
          <Item>
            <NavLinkStyled to="/donate">
              Donate
            </NavLinkStyled>
          </Item>
          <Item>
            <NavLinkStyled to="/contact">
              Contact Us
            </NavLinkStyled>
          </Item>
        </OverlayMenu>
      </Overlay>
    </>
  );
};

export default Navbar;
