import React, { useState } from "react";
import styled from "styled-components";
import logo from "../images/logo.jpeg"
import { NavLink } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { token } from "../Pages/Login";
import CloseIcon from '@mui/icons-material/Close';

const Nav = styled.nav`
  padding: 0 20px;
  min-height: 9vh;
  background: rgba(255,255,255,0.5);
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

  @media (max-width: 937px) {
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
  @media (min-width: 937px) {
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
  @media (min-width: 937px) {
    display: none;
  }
`;

const OverlayMenu = styled.ul`
  list-style: none;
  position: absolute;
  left: 45%;
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

  const handleClickRemove = () => {
    secureLocalStorage.removeItem("tokenvsv");
    secureLocalStorage.removeItem("familyidvsv");
    secureLocalStorage.removeItem("companyvsv");
    secureLocalStorage.removeItem("matrimonyvsv");
    secureLocalStorage.removeItem("isadminvsv");
  }

  const token = secureLocalStorage.getItem("tokenvsv");

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
            {token ? <>
              <NavLinkStyled to="/members">
                Members
              </NavLinkStyled></> : <>
              <NavLinkStyled to="/login">
                Members
              </NavLinkStyled></>}
          </Item>
          <Item>
            {token ? <>
              <NavLinkStyled to="/profile">
                Profile
              </NavLinkStyled></> : <>
              <NavLinkStyled to="/login">
                Profile
              </NavLinkStyled></>}
          </Item>
          <Item>
            {token ? <>
              <NavLinkStyled to="/jobs">
                Jobs
              </NavLinkStyled></> : <>
              <NavLinkStyled to="/login">
                Jobs
              </NavLinkStyled></>}
          </Item>
          <Item>
            {token ? <>
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
            {token ? <>
              <NavLinkStyled to="/login" onClick={handleClickRemove}>
                Logout
              </NavLinkStyled></> : <>
              <NavLinkStyled to="/login">
                Login
              </NavLinkStyled></>}
          </Item>
        </Menu>
        <NavIcon onClick={() => toggleNav(!toggle)}>
          {toggle ? <>
            <CloseIcon sx={{ fontSize: 40 }} />
          </> : <>
            <Line open={toggle} />
            <Line open={toggle} />
            <Line open={toggle} /></>}

        </NavIcon>
      </Nav>
      <Overlay open={toggle} style={{ zIndex: "1000", overflow: "hidden", marginTop: "-1.2rem" }}>
        <OverlayMenu open={toggle}>
          <Item>
            <NavLinkStyled to="/" onClick={() => toggleNav(!toggle)}>
              Home
            </NavLinkStyled>
          </Item>
          <Item>
            <NavLinkStyled to="/about" onClick={() => toggleNav(!toggle)}>
              About Us
            </NavLinkStyled>
          </Item>
          <Item>
            <NavLinkStyled to="/events" onClick={() => toggleNav(!toggle)}>
              Events
            </NavLinkStyled>
          </Item>
          <Item>
            {token ? <>
              <NavLinkStyled to="/members" onClick={() => toggleNav(!toggle)}>
                Members
              </NavLinkStyled></> : <>
              <NavLinkStyled to="/login" onClick={() => toggleNav(!toggle)}>
                Members
              </NavLinkStyled></>}
          </Item>
          <Item>
            {token ? <>
              <NavLinkStyled to="/profile" onClick={() => toggleNav(!toggle)}>
                Profile
              </NavLinkStyled></> : <>
              <NavLinkStyled to="/login" onClick={() => toggleNav(!toggle)}>
                Profile
              </NavLinkStyled></>}
          </Item>
          <Item>
            {token ? <>
              <NavLinkStyled to="/jobs" onClick={() => toggleNav(!toggle)}>
                Jobs
              </NavLinkStyled></> : <>
              <NavLinkStyled to="/login" onClick={() => toggleNav(!toggle)}>
                Jobs
              </NavLinkStyled></>}
          </Item>
          <Item>
            {token ? <>
              <NavLinkStyled to="/matrimonial" onClick={() => toggleNav(!toggle)}>
                Matrimony
              </NavLinkStyled></> : <>
              <NavLinkStyled to="/login" onClick={() => toggleNav(!toggle)}>
                Matrimony
              </NavLinkStyled></>}
          </Item>
          <Item>
            <NavLinkStyled to="/donate" onClick={() => toggleNav(!toggle)}>
              Donate
            </NavLinkStyled>
          </Item>
          <Item>
            <NavLinkStyled to="/contact" onClick={() => toggleNav(!toggle)}>
              Contact Us
            </NavLinkStyled>
          </Item>
          <Item>
            {token ? <>
              <NavLinkStyled to="/login" onClick={() => { handleClickRemove(); toggleNav(!toggle); }}>
                Logout
              </NavLinkStyled></> : <>
              <NavLinkStyled to="/login" onClick={() => toggleNav(!toggle)}>
                Login
              </NavLinkStyled></>}
          </Item>
        </OverlayMenu>
      </Overlay>
    </>
  );
};

export default Navbar;
