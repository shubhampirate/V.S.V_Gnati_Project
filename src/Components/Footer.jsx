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
                            <p style={{ marginBottom: "1.2rem" }}>803, Natraj Society, Sodawala Lane, Borivali (West), Mumbai - 400092</p>
                        </div>
                        <div>
                            <p style={{ marginBottom: "1.2rem" }}>9820537159 / 9819001855</p>
                        </div>
                        <div>
                            {/* <i><EmailIcon /></i> */}
                            <p style={{ marginBottom: "1.2rem" }}><a href="mailto:support@company.com">vsvgnati@gmail.com</a></p>
                        </div>
                    </div>
                    <div className="footer-right">
                        <p className="footer-company-about">
                            <span>About the Committee</span>
                            The committee has been formed by on the building blocks of Transformation, Technology and Transperancy
                        </p>
                        <div className="footer-icons">
                            <img src={logo} style={{ width: "8rem" }} />
                        </div>
                    </div>
                </footer>
            </Grid>
        </>
    );
}

export default Footer;
