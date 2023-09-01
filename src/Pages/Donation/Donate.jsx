import React, { useState } from 'react'
import { Grid, Box, Button } from '@mui/material'
import RazorpayModal from './RazorpayModal';
import donate from "../../images/donation.jpg";
import CountUp from 'react-countup';
import members from "../../images/members.png"
import globe from "../../images/globe.png"
import happiness from "../../images/happiness.png"
import donateus from "../../images/donateToday.avif"
import "../../Components/styleEvents.css"

const Donate = () => {

  const [showRazorpay, setShowRazorpay] = useState(false);

  const handleDonation = () => {
    setShowRazorpay(true);
  };


  return (
    <Box>
      <Grid container spacing={2} >
        <Grid item xs={12}>
          <Grid container spacing={2} style={{ marginTop: "-2rem" }}>
            <Grid item xs={12} sm={12} md={8} style={{
              backgroundImage: `url(${donate})`,
              marginTop: "2rem",
              backgroundSize: 'cover',
              // backgroundPosition: 'center',
              backgroundPositionY: "85%",
              backgroundPositionX: "50%",
              height: '500px',
            }}>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Grid container sapcing={2}>
                <Grid item xs={12}
                  style={{ fontSize: "3rem", textAlign: "left", paddingLeft: "7%", paddingRight: "10%", marginTop: "2.2rem", marginBottom: "1rem" }}>
                  <span className='underline-header' >Dontation</span>
                </Grid>
                <Grid item xs={12} style={{ fontSize: "1.15rem", textAlign: "justify", paddingLeft: "7%", paddingRight: "10%" }}>
                  Enriching the spirit of giving, your support for V.S.V Gnati Samsta is a beacon of hope, fostering progress and unity within
                  our community. Together, we sow the seeds of positive change through your generous donations, uniting to create transformations
                  that echo across generations and paving the way for a brighter future. Joining hands in the pursuit of betterment, we empower
                  our community's growth, cultivating a legacy of unity and positive change with each meaningful contribution. With your
                  support, we weave a tapestry of hope, shaping a vibrant tomorrow for all.
                </Grid>
                <Grid item xs={12} style={{
                  fontSize: "3rem", textAlign: "left", paddingLeft: "7%", paddingRight: "10%",
                  marginBottom: "2rem"
                }}>
                  <Button sx={{
                    color: "black", fontWeight: "650", border: "2px solid black",
                    "&:hover": {
                      backgroundColor: "#BDB4E9"
                    },
                  }} onClick={handleDonation} >Donate Today</Button>
                  {showRazorpay && <RazorpayModal setShowRazorpay={setShowRazorpay} />}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container p={4} style={{ backgroundColor: "white", marginBottom: "1rem" }}>
              <Grid item xs={12} md={4} sm={6}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <img src={members} style={{ width: "4.5rem", height: "4.5rem", marginTop: "1rem" }} />
                  </Grid>
                  <Grid item xs={12} style={{ fontSize: "1.5rem", color: "#5E989C" }}>
                    Connecting over <CountUp end={10000} duration={10} /> + Members
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={4} sm={6}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <img src={globe} style={{ width: "4.5rem", height: "4.5rem", marginTop: "1rem" }} />
                  </Grid>
                  <Grid item xs={12} style={{ fontSize: "1.5rem", color: "#6C60A8" }}>
                    Spread across <CountUp end={30} duration={10} /> + Countries across the globe
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={4} sm={6} >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <img src={happiness} style={{ width: "4rem", height: "4rem", marginTop: "1rem" }} />
                  </Grid>
                  <Grid item xs={12} style={{ fontSize: "1.5rem", color: "#4F225E" }}>
                    Spreading happiness since past <CountUp end={50} duration={10} /> + years
                  </Grid>
                </Grid>
              </Grid>

            </Grid>
          </Grid>
          {/* <Grid item xs={12}>
            <Button variant="contained" onClick={handleDonation}
              style={{
                marginLeft: "-1.1rem", boxShadow: "none", fontWeight: "600", color: "#582c6f",
                fontSize: "1.3rem", marginBottom: "2.5rem", backgroundColor: "#bdb4e9"
              }}>
              Donate Now
            </Button>
            {showRazorpay && <RazorpayModal setShowRazorpay={setShowRazorpay} />}
          </Grid> */}
        </Grid>
      </Grid>
    </Box >
  )
}

export default Donate