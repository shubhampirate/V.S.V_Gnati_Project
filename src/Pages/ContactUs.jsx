import React from 'react'
import { Grid, TextField, Button } from '@mui/material'
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';
import Looks4Icon from '@mui/icons-material/Looks4';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
const ContactUs = () => {

  var hero = {
    infinite: true,
    speed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10000,
  }

  //const wallp = [wallpaper3, wallpaper, wallpaper2];

  return (
    <div>
      <Grid container style={{ overflowX: "hidden", marginBottom: "-2vh" }}>
        <Grid item xs={12} >
          {/*<Slider {...hero}>
            {wallp.map(item => {
              return (
                <div>
                  <Grid container spacing={2}>
                    <Grid item xs={12} style={{ marginTop: "8vh", height: '70vh', backgroundImage: `url(${item})`, backgroundSize: 'cover', backgroundPositionY: "40%" }}>
                      <Grid container spacing={3}>
                        <Grid item xs={1}></Grid>
                        <Grid item sm={4} xs={6} md={4}
                          style={{
                            backgroundColor: "white", marginTop: "15vh", height: "50vh",
                            borderTop: "10px solid #023e84"
                          }}>
                          <Grid container spacing={2} >
                            <Grid item xs={12} style={{ fontSize: "2.3rem", textAlign: "left", color: "#023e84", fontWeight: "600" }} data-aos="fade-left">
                              COME CONNECT <br />WITH US  </Grid>
                            <Grid item xs={12} style={{ fontSize: "1.5rem", textAlign: "left", color: "#023e84" }}>
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </div>
              )
            })}
          </Slider>*/}
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid container spacing={2} style={{ backgroundColor: "#E2C091" }}>
                <Grid item xs={12} style={{ height: "10vh" }}></Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={8} style={{ backgroundColor: "white" }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} style={{ fontSize: "1.7rem", fontWeight: "600" }}>
                          Vision & Mission
                        </Grid>
                        <Grid item xs={12}>
                          <hr style={{ width: "20vh", height: "0.7vh", backgroundColor: "#E2C091", border: "none" }} />
                        </Grid>
                        <Grid item xs={12} style={{ padding: "5vh" }}>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={2}></Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} style={{ height: "10vh" }}></Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2} >
                <Grid item xs={12} style={{ height: "10vh" }}></Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={8} style={{ backgroundColor: "white" }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} style={{ fontSize: "1.7rem", fontWeight: "600" }}>
                          Our Methodology
                        </Grid>
                        <Grid item xs={12}>
                          <hr style={{ width: "20vh", height: "0.7vh", backgroundColor: "#023E84", border: "none" }} />
                        </Grid>
                        <Grid item xs={12}>
                          <Grid container padding={3} spacing={2}>
                            <Grid item xs={6} style={{ textAlign: "left" }}>
                              <Grid container spacing={3}>
                                <Grid item xs={3}><LooksOneIcon style={{ width: "6vh", height: "6vh" }} /></Grid>
                                <Grid item xs={9} style={{ fontSize: "1.5rem", fontWeight: "600", color: "#023E84", marginTop: "0.5vh" }}>
                                  Social Media Trends
                                </Grid>
                                <Grid item xs={12}>
                                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item xs={6} style={{ textAlign: "left" }}>
                              <Grid container spacing={3}>
                                <Grid item xs={3}><LooksTwoIcon style={{ width: "6vh", height: "6vh" }} /></Grid>
                                <Grid item xs={9} style={{ fontSize: "1.5rem", fontWeight: "600", color: "#023E84", marginTop: "0.5vh" }}>
                                  Flipkart Trends
                                </Grid>
                                <Grid item xs={12}>
                                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item xs={6} style={{ textAlign: "left" }}>
                              <Grid container spacing={3}>
                                <Grid item xs={3}><Looks3Icon style={{ width: "6vh", height: "6vh" }} /></Grid>
                                <Grid item xs={9} style={{ fontSize: "1.5rem", fontWeight: "600", color: "#023E84", marginTop: "0.5vh" }}>
                                  Youtube Influencers
                                </Grid>
                                <Grid item xs={12}>
                                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item xs={6} style={{ textAlign: "left" }}>
                              <Grid container spacing={3}>
                                <Grid item xs={3}><Looks4Icon style={{ width: "6vh", height: "6vh" }} /></Grid>
                                <Grid item xs={9} style={{ fontSize: "1.5rem", fontWeight: "600", color: "#023E84", marginTop: "0.5vh" }}>
                                  Fashion Influencers
                                </Grid>
                                <Grid item xs={12}>
                                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={2}></Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} style={{ height: "10vh" }}></Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <iframe
                scrolling="no"
                marginheight="0"
                marginwidth="0"
                title="DJ Sanghavi College"
                src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Dwarkadas%20J.Sanghavi%20+(Your%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                height="500"
                frameborder="0"
                width="100%"
              >
                <a href="https://www.mapsdirections.info/en/measure-map-radius/">
                  Map radius measure
                </a>
              </iframe>
            </Grid>
            <Grid item xs={12} style={{ marginTop: "-1vh" }}>
              <Grid container spacing={2} style={{ backgroundColor: "#E2C091" }}>
                <Grid item xs={12} style={{ height: "10vh" }}></Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={8} style={{ backgroundColor: "white" }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} style={{ fontSize: "1.7rem", fontWeight: "600" }}>
                          Contact Us
                        </Grid>
                        <Grid item xs={12}>
                          <hr style={{ width: "20vh", height: "0.7vh", backgroundColor: "#E2C091", border: "none" }} />
                        </Grid>
                        <Grid item xs={12} style={{ padding: "5vh" }}>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <Grid container spacing={2} padding={2} style={{ textAlign: "left" }}>
                                <Grid item xs={2}><LocalPhoneIcon style={{ width: "5vh", height: "5vh" }} /></Grid>
                                <Grid item xs={9} style={{ fontSize: "1.3rem", fontWeight: "600", color: "#023E84", marginTop: "0.5vh" }}>
                                  +91 1234567891
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item xs={6}>
                              <Grid container spacing={2} padding={2} style={{ textAlign: "left" }}>
                                <Grid item xs={2}><EmailIcon style={{ width: "5vh", height: "5vh" }} /></Grid>
                                <Grid item xs={9} style={{ fontSize: "1.3rem", fontWeight: "600", color: "#023E84", marginTop: "0.5vh" }}>
                                  info@trensetters.com
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item xs={12}>
                              <Grid container spacing={2}>
                                <Grid item xs={3} style={{ fontSize: "1.2rem", fontWeight: "600", marginTop: "2vh", textAlign: "right" }}>
                                  Enter your Name
                                </Grid>
                                <Grid item xs={9}>
                                  <TextField
                                    placeholder="Your Name"
                                    required
                                    variant="outlined"
                                    name="title"
                                    sx={{ width: "80vh", backgroundColor: "transparent", color: "white", marginBottom: "2vh" }}
                                  />
                                </Grid>
                                <Grid item xs={3} style={{ fontSize: "1.2rem", fontWeight: "600", marginTop: "2vh", textAlign: "right" }}>
                                  Enter your Email
                                </Grid>
                                <Grid item xs={9}>
                                  <TextField
                                    placeholder="Your Email Address"
                                    required
                                    variant="outlined"
                                    name="title"
                                    sx={{ width: "80vh", backgroundColor: "transparent", color: "white", marginBottom: "2vh" }}
                                  />
                                </Grid>
                                <Grid item xs={3} style={{ fontSize: "1.2rem", fontWeight: "600", marginTop: "2vh", textAlign: "right" }}>
                                  Enter your Phone No.
                                </Grid>
                                <Grid item xs={9}>
                                  <TextField
                                    placeholder="Your Phone Number"
                                    required
                                    variant="outlined"
                                    sx={{ width: "80vh", backgroundColor: "transparent", color: "white", marginBottom: "2vh" }}
                                  />
                                </Grid>
                                <Grid item xs={3} style={{ fontSize: "1.2rem", fontWeight: "600", marginTop: "2vh", textAlign: "right" }}>
                                  Enter your Message
                                </Grid>
                                <Grid item xs={9}>
                                  <TextField
                                    placeholder="Your Message"
                                    required
                                    multiline
                                    rows={2}
                                    variant="outlined"
                                    name="title"
                                    sx={{ width: "80vh", backgroundColor: "transparent", color: "white", marginBottom: "2vh" }}
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item xs={12} style={{ textAlign: "left" }}>
                              <Grid container spacing={2}>
                                <Grid item xs={4}></Grid>
                                <Grid item xs={8} style={{ marginLeft: "-2.5vh" }}>
                                  <Button
                                    sx={{
                                      color: "black", fontWeight: "700", backgroundColor: "#E2C091", fontSize: "1rem", width: "20vh",
                                      "&:hover": { backgroundColor: "black", color: "#ffffff", border: "2px solid transparent" }
                                    }}
                                    className="btn">Submit</Button></Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={2}></Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} style={{ height: "10vh" }}></Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default ContactUs