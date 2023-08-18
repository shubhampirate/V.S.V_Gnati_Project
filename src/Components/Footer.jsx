import React from 'react';
import './Footer.css'; // Make sure to link your CSS file correctly
import { Grid } from '@mui/material';
import { NavLink } from 'react-router-dom';

import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import logo from "../images/logo.jpeg"
const Footer = () => {
    return (
        <>
            <Grid container spacing={2} style={{
                marginTop: "2.5rem",
                paddingLeft: "5%", paddingRight: "5%", paddingBottom: "3%", backgroundColor: "whitesmoke"
            }}>
                <Grid item xs={12} md={4} sm={6}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} style={{ fontSize: "1.3rem", marginTop: "1rem" }}>
                            About Us
                        </Grid>
                        <Grid item xs={12}>
                            <img src={logo} style={{ width: "7.5rem" }} />
                        </Grid>
                        <Grid item xs={12} style={{ textAlign: "justify", fontSize: "1.15rem" }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={4} sm={6}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} style={{ fontSize: "1.3rem", marginTop: "1rem" }}>
                            Quick Links
                        </Grid>
                        <Grid item xs={12} style={{ textAlign: "center", fontSize: "1.3rem" }}>
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
                        <Grid item xs={12} style={{ fontSize: "1.3rem", marginTop: "1rem" }}>
                            Contact Us
                        </Grid>
                        <Grid item xs={12}>
                            <div style={{ textAlign: "left" }}>
                                <ul style={{ listStyle: 'none', paddingLeft: 10 }}>
                                    <li style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                        <PhoneIcon style={{ fontSize: "1.7rem" }} /> &nbsp;
                                        <span style={{ marginLeft: '10px', fontSize: "1.25rem" }}> +1234567890</span>
                                    </li>
                                    <li style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                        <EmailIcon style={{ fontSize: "1.7rem" }} /> &nbsp;
                                        <span style={{ marginLeft: '10px', fontSize: "1.25rem" }}> example@example.com</span>
                                    </li>
                                    <li style={{ display: 'flex', alignItems: 'center' }}>
                                        <LocationOnIcon style={{ fontSize: "1.7rem" }} /> &nbsp;
                                        <span style={{ marginLeft: '10px', fontSize: "1.25rem" }}> 803, Natraj Society, Sodawala Lane, Borivali (W), Mumbai - 400092</span>
                                    </li>
                                    {/* <li>
                                        <iframe
                                            title="Google Maps Location"
                                            width="100%"
                                            height="300"
                                            frameBorder="0"
                                            style={{ border: 0, marginTop: "1.25rem" }}
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.1169827869567!2d72.8538461!3d19.2337328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b1e294b07269%3A0x991cbbccaf65fb2e!2sNatraj%20society!5e0!3m2!1sen!2sin!4v1691932561651!5m2!1sen!2sin"
                                            allowFullScreen
                                        ></iframe>
                                    </li> */}
                                </ul>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>

                    <p>&copy; 2023 Your Company. All rights reserved.</p>
                </Grid>
            </Grid >
        </>
    );
}

export default Footer;
