import React from 'react'
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import events from "../Images/events.png";
import jobsite from "../Images/jobsite.png";
import matrimonial from "../Images/matrimonial.png";
const Home = () => {
  return (
    <Box sx={{ paddingLeft: "1.2rem" }}>
      <Grid container spacing={5}>
        <Grid item xs={12} md={4} sm={12}>
          <Grid container spacing={2} sx={{ padding: "0.5rem" }}>
            <Grid item xs={12} style={{ backgroundColor: "white" }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sx={{ fontSize: "2rem", fontWeight: "700", marginBottom: "1rem" }}>
                  Family Profile
                </Grid>
                <Grid item xs={12} sx={{ border: "1px solid black", margin: "0.8rem", width: "10rem", height: "3rem", borderRadius: "1vh" }}>
                  <div style={{ marginTop: "-0.5rem", fontSize: "1.2rem" }}>View all members </div>
                </Grid>
                <Grid item xs={12} sx={{ border: "1px solid black", margin: "0.8rem", width: "10rem", height: "3rem", borderRadius: "1vh" }}>
                  <div style={{ marginTop: "-0.5rem", fontSize: "1.2rem" }}>Edit Family details </div>
                </Grid>
                <Grid item xs={12} sx={{ border: "1px solid black", margin: "0.8rem", width: "10rem", height: "3rem", borderRadius: "1vh" }}>
                  <div style={{ marginTop: "-0.5rem", fontSize: "1.2rem" }}>Search Family Details </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={8} sm={12}>
          <Grid container spacing={2} sx={{ padding: "0.5rem" }}>
            <Grid item xs={12} style={{ backgroundColor: "white" }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={7} sm={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sx={{ fontSize: "1.5rem", textAlign: "left" }}>
                      Join Us
                    </Grid>
                    <Grid item xs={12} sx={{ fontSize: "2.3rem", marginTop: "-0.5rem", textAlign: "left" }}>
                      The best Jobsite for your future
                    </Grid>
                    <Grid item xs={12} sx={{ fontSize: "1.5rem", textAlign: "left", marginBottom: "1rem" }}>
                      We help you find the best job to build your future . Search and apply for the latest jobs
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={1}>
                        <Grid item xs={12} md={4} sm={12} sx={{ paddingLeft: "2rem", paddingRight: "0.8rem" }}>
                          <div style={{ border: "1px solid black", height: "2.6rem", borderRadius: "1vh" }}>
                            <div style={{ marginTop: "0.5rem", fontSize: "1.2rem" }}>Register Now </div>
                          </div>
                        </Grid>
                        <Grid item xs={12} md={4} sm={12} sx={{ paddingLeft: "2rem", paddingRight: "0.8rem" }}>
                          <div style={{ border: "1px solid black", height: "2.6rem", borderRadius: "1vh" }}>
                            <div style={{ marginTop: "0.5rem", fontSize: "1.2rem" }}>View openings </div>
                          </div>
                        </Grid>
                        <Grid item xs={12} md={4} sm={12} sx={{ paddingLeft: "2rem", paddingRight: "0.8rem" }}>
                          <div style={{ border: "1px solid black", height: "2.6rem", borderRadius: "1vh" }}>
                            <div style={{ marginTop: "0.5rem", fontSize: "1.2rem" }}>Add openings </div>
                          </div>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={5} sm={12}>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <Grid container spacing={2} sx={{ padding: "0.5rem" }}>
            <Grid item xs={12} style={{ backgroundColor: "white" }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sx={{ fontSize: "2.5rem", fontWeight: "700", marginBottom: "1rem", textAlign: "left" }}>
                  Upcoming Events
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2} style={{ fontSize: "1.2rem", textAlign: "left" }}>
                    <Grid item xs={1}>

                    </Grid>
                    <Grid item xs={11}>
                      Lorem ipsum dolor sit amet, consectetur  ajsvjsbvjbsbjd
                    </Grid>
                    <Grid item xs={1}>

                    </Grid>
                    <Grid item xs={11}>
                      Lorem ipsum dolor sit amet, consectetur  ajsvjsbvjbsbjd
                    </Grid>
                    <Grid item xs={1}>

                    </Grid>
                    <Grid item xs={11}>
                      Lorem ipsum dolor sit amet, consectetur  ajsvjsbvjbsbjd
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <Grid container spacing={2} sx={{ padding: "0.5rem" }}>
            <Grid item xs={12} style={{ backgroundColor: "white" }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={8} sm={12}>
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
                          <div style={{ border: "1px solid black", height: "2.6rem", borderRadius: "1vh" }}>
                            <div style={{ marginTop: "0.5rem", fontSize: "1.2rem" }}>Register Now </div>
                          </div>
                        </Grid>
                        <Grid item xs={12} md={6} sm={12} sx={{ paddingLeft: "2rem", paddingRight: "0.8rem" }}>
                          <div style={{ border: "1px solid black", height: "2.6rem", borderRadius: "1vh" }}>
                            <div style={{ marginTop: "0.5rem", fontSize: "1.2rem" }}>Learn More </div>
                          </div>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

      </Grid>
    </Box >
  )
}

export default Home