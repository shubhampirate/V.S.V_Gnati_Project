import React from 'react';
import './Footer.css'; // Make sure to link your CSS file correctly
import { Grid } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import logo from "../images/logo.jpeg"
const Footer = () => {
    return (
        <>
            <Grid container spacing={2}>
                <footer className="footer-distributed">

                    <div className="footer-left">

                        <h3>V.S.V Gnati<span>Samsta</span></h3>

                        <p className="footer-links">
                            <Link className="link-1" to="/">Home &nbsp;</Link>
                            <Link to="/about">About Us &nbsp;</Link>
                            <Link to="/events">Events &nbsp;</Link>
                            <Link to="/members">Members &nbsp;</Link>
                            <Link to="/profile">Profile &nbsp;</Link>
                            <Link to="/jobs">Jobs &nbsp;</Link>
                            <Link to="/matrimonial">Matrimony &nbsp;</Link>
                            <Link to="/donate">Donation &nbsp;</Link>
                            <Link to="/contact">Contact Us&nbsp;</Link>
                        </p>

                        <p className="footer-company-name">Shri Visa SoarathiaVanika Gnati Samasta © 2023</p>
                    </div>

                    <div className="footer-center">

                        <div>
                            {/* <i><LocationOnIcon /></i> */}
                            <p style={{ marginBottom: "1.2rem" }}>803, Natraj Society, Sodawala Lane, Borivali (West), Mumbai - 400092</p>
                        </div>

                        <div>
                            {/* <i><PhoneIcon /></i> */}
                            <p style={{ marginBottom: "1.2rem" }}>9820537159 / 9819001855</p>
                        </div>

                        <div>
                            {/* <i><EmailIcon /></i> */}
                            <p style={{ marginBottom: "1.2rem" }}><a href="mailto:support@company.com">vsvgnati@gmail.com</a></p>
                        </div>

                    </div>

                    <div className="footer-right">

                        <p className="footer-company-about">
                            <span>About the company</span>
                            The committee has been formed by on the building blocks of Transformation, Technology and Transperancy
                        </p>

                        <div className="footer-icons">
                            <img src={logo} style={{ width: "8rem" }} />

                            {/* <a href="#"><i className="fa fa-facebook"></i></a>
                            <a href="#"><i className="fa fa-twitter"></i></a>
                            <a href="#"><i className="fa fa-linkedin"></i></a>
                            <a href="#"><i className="fa fa-github"></i></a> */}

                        </div>

                    </div>

                </footer>
            </Grid>
            {/* <Grid container spacing={2} style={{
                marginTop: "2.5rem",
                paddingLeft: "5%", paddingRight: "5%", paddingBottom: "3%", backgroundColor: "#8691b8"
            }}>
                <Grid item xs={12} md={4} sm={6}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} style={{ fontSize: "1.3rem", marginTop: "1rem" }}>
                            About Us
                        </Grid>
                        <Grid item xs={12}>
                            <img src={logo} style={{ width: "5rem" }} />
                        </Grid>
                        <Grid item xs={12} style={{ textAlign: "justify", fontSize: "1.1rem" }}>
                        Shree Mumbai Visa Sorathiya Vanik Gnati Samast has in all around 20 mandals. The core and main Mandal is Shree Mumbai Visa Sorathiya Vanik Gnati Samast (Varishth Mandal) which was established in 1940. 
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={4} sm={6}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} style={{ fontSize: "1.2rem", marginTop: "1rem" }}>
                            Quick Links
                        </Grid>
                        <Grid item xs={12} style={{ textAlign: "center", fontSize: "1.2rem" }}>
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <NavLink to="/"
                                        style={{ textDecoration: "None" }}>
                                        Home</NavLink>
                                </Grid>
                                <Grid item xs={4}>
                                    <NavLink to="/about"
                                        style={{ textDecoration: "None" }}>
                                        About Us</NavLink>
                                </Grid>
                                <Grid item xs={4}>
                                    <NavLink to="/about"
                                        style={{ textDecoration: "None" }}>
                                        Committee</NavLink>
                                </Grid>
                                <Grid item xs={4}>
                                    <NavLink to="/events"
                                        style={{ textDecoration: "None" }}>
                                        Events</NavLink>
                                </Grid>
                                <Grid item xs={4}>
                                    <NavLink to="/donate"
                                        style={{ textDecoration: "None" }}>
                                        Donate</NavLink>
                                </Grid>
                                <Grid item xs={4}>
                                    <NavLink to="/contact"
                                        style={{ textDecoration: "None" }}>
                                        Contact Us</NavLink>
                                </Grid>
                                <Grid item xs={4}>
                                    <NavLink to="/"
                                        style={{ textDecoration: "None" }}>
                                        Jobs</NavLink>
                                </Grid>
                                <Grid item xs={4}>
                                    <NavLink to="/"
                                        style={{ textDecoration: "None" }}>
                                        Matrimony</NavLink>
                                </Grid>
                                <Grid item xs={4}>
                                    <NavLink to="/"
                                        style={{ textDecoration: "None" }}>
                                        Members</NavLink>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid >
                <Grid item xs={12} md={4} sm={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} style={{ fontSize: "1.2rem", marginTop: "1rem" }}>
                            Contact Us
                        </Grid>
                        <Grid item xs={12}>
                            <div style={{ textAlign: "left" }}>
                                <ul style={{ listStyle: 'none', paddingLeft: 10 }}>
                                    <li style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                        <PhoneIcon style={{ fontSize: "1.7rem" }} /> &nbsp;
                                        <span style={{ marginLeft: '10px', fontSize: "1.2rem" }}>   +91 9820537159, +91 9819001855</span>
                                    </li>
                                    <li style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                        <EmailIcon style={{ fontSize: "1.7rem" }} /> &nbsp;
                                        <span style={{ marginLeft: '10px', fontSize: "1.2rem" }}> vsvgnati@gmail.com</span>
                                    </li>
                                    <li style={{ display: 'flex', alignItems: 'center' }}>
                                        <LocationOnIcon style={{ fontSize: "1.7rem" }} /> &nbsp;
                                        <span style={{ marginLeft: '10px', fontSize: "1.2rem" }}> 803, Natraj Society, Sodawala Lane, Borivali (W), Mumbai - 400092</span>
                                    </li>
                                </ul>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>

                    <p>&copy; 2023 Your Company. All rights reserved.</p>
                </Grid>
            </Grid > */}

        </>
    );
}

export default Footer;
