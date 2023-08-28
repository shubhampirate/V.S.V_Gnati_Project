// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
// import "./Navbar.css";
// import MenuIcon from '@mui/icons-material/Menu';
// import EmergencyShareIcon from '@mui/icons-material/EmergencyShare';
// import Swal from "sweetalert2";
// import logo from "../images/logo.jpeg"
// const Navbar = () => {
//   const [click, setClick] = useState(false);
//   const tokenid = localStorage.getItem("tokenvsv");
//   const success = () => {
//     const token = localStorage.getItem("token")
//     fetch(`http://womenhackathon.pythonanywhere.com/family/sms/`, {
//       method: "POST",
//       headers: { "Authorization": `Bearer ${token}` },
//     })
//       .then((result) => {
//         console.log(result)
//         Swal.fire({
//           icon: 'success',
//           title: 'The alert message is shared with all your contacts',
//           showConfirmButton: false,
//           timer: 3000
//         })
//       })
//       .catch(() => {
//         alert('Error in the Code');
//       });
//   }

//   const handleClick = () => setClick(!click);

//   const handleClickRemove = () => {
//     setClick(!click);
//     localStorage.removeItem("tokenvsv");
//     localStorage.removeItem("family");
//   }

//   return (
//     <>
//       <nav className="navbar">
//         <div className="nav-container">
//           <NavLink exact to="/" className="nav-logo" style={{ textAlign: "left" }}>
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
//                 About Us
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
//                   to="/register-matrimony"
//                   activeClassName="active"
//                   className="nav-links"
//                   onClick={handleClick}
//                 >
//                   + Matrimonial
//                 </NavLink>
//               </li> : <li className="nav-item">
//                 <NavLink
//                   exact
//                   to="/login"
//                   activeClassName="active"
//                   className="nav-links"
//                   onClick={handleClick}
//                 >
//                   + Matrimonial
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

//             {tokenid ?
//               <li className="nav-item">
//                 <NavLink
//                   exact
//                   to="/register-job"
//                   activeClassName="active"
//                   className="nav-links"
//                   onClick={handleClick}
//                 >
//                   + Jobs
//                 </NavLink>
//               </li> : <li className="nav-item">
//                 <NavLink
//                   exact
//                   to="/login"
//                   activeClassName="active"
//                   className="nav-links"
//                   onClick={handleClick}
//                 >
//                   + Jobs
//                 </NavLink>
//               </li>}
//             {/* <li className="nav-item">
//               <NavLink
//                 exact
//                 to="/family"
//                 activeClassName="active"
//                 className="nav-links"
//                 onClick={handleClick}
//               >
//                 Members
//               </NavLink>
//             </li> */}





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
//                 Contact Us
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

import * as React from 'react';
import { makeStyles } from '@mui/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Logo from "../images/logo.jpeg"
import AddIcon from '@mui/icons-material/Add';

const useStyles = makeStyles((theme) => ({
  menuList: {
    width: "92vw",
  },
  customFonts: {
    fontFamily: "PT Sans, sans-serif",
  },
}));

const pages = ['Home', 'About Us', 'Events', 'Search', 'Jobs', 'Committee', 'Matrimony', 'Contact Us'];
const settings = ['Family', 'Logout'];

function ResponsiveAppBar() {
  const classes = useStyles();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElSubMenu, setAnchorElSubMenu] = React.useState(null);
  const [subMenuPage, setSubMenuPage] = React.useState('');

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenSubMenu = (event, page) => {
    setSubMenuPage(page);
    setAnchorElSubMenu(event.currentTarget);
  };

  const handleCloseSubMenu = () => {
    setSubMenuPage('');
    setAnchorElSubMenu(null);
  };

  return (

    <AppBar position="static" style={{ backgroundColor: "white", color: "black" }}>
      <Container maxWidth="xl" >
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="black"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
              classes={{ list: classes.menuList }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <div sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}>
            <img src={Logo} style={{ width: "98%", height: "60px", marginTop: "5%" }} />
          </div>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          />
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'black', display: 'block', fontWeight: "650", textTransform: "none", fontSize: "1rem" }}
                className={{ root: classes.customFonts }}
              >
                {page === "Matrimony" || page === "Jobs" ? (
                  <div onClick={(event) => handleOpenSubMenu(event, page)}>
                    {page} &nbsp;
                    <IconButton
                      size="small"
                      aria-label="open submenu"

                    >
                      <AddIcon />
                    </IconButton>
                  </div>
                ) : (
                  <>{page}</>
                )}
              </Button>


            ))}
          </Box>
          {/* Submenu */}

          <Menu
            id="submenu-appbar"
            anchorEl={anchorElSubMenu}
            open={Boolean(anchorElSubMenu) && subMenuPage === 'Matrimony'}
            onClose={handleCloseSubMenu}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left', // Adjust this to your desired horizontal position
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left', // Adjust this to your desired horizontal position
            }}
          >
            <MenuItem onClick={handleCloseSubMenu}>Matrimony</MenuItem>
            <MenuItem onClick={handleCloseSubMenu}>Add Matrimony</MenuItem>
          </Menu>

          <Menu
            id="submenu-appbar"
            anchorEl={anchorElSubMenu}
            open={Boolean(anchorElSubMenu) && subMenuPage === 'Jobs'}
            onClose={handleCloseSubMenu}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left', // Adjust this to your desired horizontal position
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left', // Adjust this to your desired horizontal position
            }}
          >
            <MenuItem onClick={handleCloseSubMenu}>Jobs</MenuItem>
            <MenuItem onClick={handleCloseSubMenu}>Add Jobs</MenuItem>
          </Menu>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              classes={{ list: classes.menuList }}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;