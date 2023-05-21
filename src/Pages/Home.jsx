import React from 'react'
import { Button, Grid } from '@mui/material';
import { Box } from '@mui/system';
import events from "../images/mainpage.jpg";
import jobsite from "../images/jobsite.webp";
import matrimonial from "../images/couple.png";
import family from "../images/family.webp"
const Home = () => {
  return (
    <Box sx={{ paddingLeft: "1.2rem" }}>
      <Grid container spacing={5}>
        <Grid item xs={12} style={{ backgroundImage: `url()`, padding: "8rem 2rem" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} style={{fontSize:"2.5rem"}} >
              Welcome to 
            </Grid>
            <Grid item xs={12} style={{ fontSize: "4.5rem", textAlign: "center", fontWeight: "700" }}>
              V.S.V Gnati Samasta
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4} sm={12}>
          <Grid container spacing={2} sx={{ padding: "0.5rem" }}>
            <Grid item xs={12} style={{ backgroundColor: "#f6f8fa", borderRadius:"2vh" }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sx={{ fontSize: "2rem", fontWeight: "700", marginBottom: "1rem" }}>
                  Family Profile
                </Grid>
                <Grid item xs={12} sx={{ border: "2px solid #E99B01", margin: "0.8rem", width: "10rem", height: "3rem", borderRadius: "1vh" }}>
                  <div style={{ marginTop: "-0.5rem", fontSize: "1.2rem", color: "#E99B01" }}>View all members </div>
                </Grid>
                <Grid item xs={12} sx={{ border: "2px solid #E99B01", margin: "0.8rem", width: "10rem", height: "3rem", borderRadius: "1vh" }}>
                  <div style={{ marginTop: "-0.5rem", fontSize: "1.2rem", color: "#E99B01" }}>Edit Family details </div>
                </Grid>
                <Grid item xs={12} sx={{ border: "2px solid #E99B01", margin: "0.8rem", width: "10rem", height: "3rem", borderRadius: "1vh" }}>
                  <div style={{ marginTop: "-0.5rem", fontSize: "1.2rem", color: "#E99B01" }}>Search Family Details</div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={8} sm={12}>
          <Grid container spacing={2} sx={{ padding: "0.5rem" }}>
            <Grid item xs={12} style={{ backgroundColor: "#f6f8fa", borderRadius:"2vh" }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={7} sm={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sx={{ fontSize: "1.5rem", textAlign: "left" }}>
                      Join Us
                    </Grid>
                    <Grid item xs={12} sx={{ fontSize: "2.3rem", marginTop: "-0.5rem", textAlign: "left", fontWeight: "650" }}>
                      The best Jobsite for your future
                    </Grid>
                    <Grid item xs={12} sx={{ fontSize: "1.5rem", textAlign: "left", marginBottom: "1rem" }}>
                      We help you find the best job to build your future . Search and apply for the latest jobs
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={1}>
                        <Grid item xs={12} md={4} sm={12} sx={{ paddingLeft: "2rem", paddingRight: "0.8rem" }}>
                          <div style={{
                            border: "2px solid #018D8D", height: "2.6rem", borderRadius: "1vh"}}>
                            <div style={{ marginTop: "0.5rem", fontSize: "1.2rem", color: "#018D8D" }}>Register Now </div>
                          </div>
                        </Grid>
                        <Grid item xs={12} md={4} sm={12} sx={{ paddingLeft: "2rem", paddingRight: "0.8rem" }}>
                          <div style={{ border: "2px solid #018D8D", height: "2.6rem", borderRadius: "1vh" }}>
                            <div style={{ marginTop: "0.5rem", fontSize: "1.2rem", color: "#018D8D" }}>View openings </div>
                          </div>
                        </Grid>
                        <Grid item xs={12} md={4} sm={12} sx={{ paddingLeft: "2rem", paddingRight: "0.8rem" }}>
                          <div style={{ border: "2px solid #018D8D", height: "2.6rem", borderRadius: "1vh" }}>
                            <div style={{ marginTop: "0.5rem", fontSize: "1.2rem", color: "#018D8D" }}>Add openings </div>
                          </div>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={5} sm={12}>
                  <img src={jobsite} style={{ width: "100%",marginLeft:"-4%" , marginTop:"-2%", borderRadius:"1vh"}} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <Grid container spacing={2} sx={{ padding: "0.5rem" }}>
            <Grid item xs={12} style={{ backgroundColor: "#f6f8fa", borderRadius:"2vh" }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={7} sm={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sx={{ fontSize: "2.3rem", fontWeight: "700", textAlign: "left" }}>
                      Find the<br />
                      Perfect 'One'<br />
                      Who is made for you
                    </Grid>
                    <Grid item xs={12} style={{ fontSize: "1.3rem", textAlign: "left" }}>
                      Be inspiwhite by real weddings.
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={1}>
                        <Grid item xs={12} md={6} sm={12} sx={{ paddingLeft: "2rem", paddingRight: "0.8rem" }}>
                          <div style={{ border: "2px solid #6A2364", height: "2.6rem", borderRadius: "1vh" }}>
                            <div style={{ marginTop: "0.5rem", fontSize: "1.2rem", color: "#6A2364" }}>Register Now </div>
                          </div>
                        </Grid>
                        <Grid item xs={12} md={6} sm={12} sx={{ paddingLeft: "2rem", paddingRight: "0.8rem" }}>
                          <div style={{ border: "2px solid #6A2364", height: "2.6rem", borderRadius: "1vh" }}>
                            <div style={{ marginTop: "0.5rem", fontSize: "1.2rem", color: "#6A2364" }}>Learn More</div>
                          </div>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={5} sm={12}>
                  <img src={matrimonial} style={{ width: "100%" }} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>

        </Grid>
      </Grid >
    </Box >
  )
}

export default Home