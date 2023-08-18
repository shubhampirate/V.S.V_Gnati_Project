import React from 'react'
import { Button, Grid } from '@mui/material';
import { Box } from '@mui/system';
import "../Components/Home.css";
import hometwo from "../images/hometwo.jpeg";
import homeone from "../images/homeone.jpeg";
import homethree from "../images/homethree.jpg"
import CarouselAd from '../Components/CarouselAd';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { NavLink } from 'react-router-dom';
// import "../Components/Carouselstyles.css"

const Home = () => {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 2000,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
  }
  const data = [
    {
      id: 1,
      imageUrl: homeone,
    },
    {
      id: 2,
      imageUrl: hometwo,
    },
    {
      id: 3,
      imageUrl: homethree,
    },
  ];

  return (
    <Box style={{ paddingLeft: "1rem" }}>

      <Grid container spacing={5}>
        <Grid item xs={12} style={{ marginLeft: "0.5%", marginTop: "2rem" }}>
          <Slider {...settings}>
            {data.map(item => (
              <div key={item.id} className="image-container">
                <img src={item.imageUrl} style={{ width: "98%" }} />
              </div>
            ))}
          </Slider>
        </Grid>
        {/* <Grid item xs={12} className="background-carousel" style={{
          padding: "8rem 0.5rem 8rem 2rem",
           backgroundImage: `url(${hometwo})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          paddingBottom: "20.25%", 
          width: "100%",
          height: "100%",
          marginTop: "2rem",
          position: "relative",
          color: "white"
        }}>
          {/* <Grid container spacing={2} style={{ marginTop: "4.5rem" }}>
            <Grid item xs={12} style={{ fontSize: "3.5rem" }} >
              Shri Visa Soarathia
            </Grid>
            <Grid item xs={12} style={{ fontSize: "4.5rem", textAlign: "center", fontWeight: "700" }}>
              Vanika Gnati Samasta
            </Grid>
          </Grid> 
      </Grid> */}
        <Grid item xs={12} style={{
          padding: "4rem 0.5rem 8rem 2rem",
          // // backgroundImage: `url(${hometwo})`,
          // backgroundSize: 'cover',
          // backgroundRepeat: 'no-repeat',
          // paddingBottom: "20.25%", /* 16:9 aspect ratio */
          // width: "100%",
          // height: "99%",
          // marginTop: "2rem",
          // position: "relative",
          // color: "white"
        }}>
          <Grid container spacing={2} style={{ marginTop: "4.5rem" }}>
            <Grid item xs={12} className='image-text' >
              Shri Visa Soarathia
            </Grid>
            <Grid item xs={12} className='image-text-two'>
              Vanika Gnati Samasta
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} style={{ padding: "2rem", paddingLeft: "4.5rem" }}>
          <CarouselAd />
        </Grid>
        <Grid item xs={12} style={{ fontSize: "3.5rem", textAlign: "center", fontWeight: "700" }}>
          Donation
        </Grid>
        <Grid item xs={12} style={{ marginLeft: "-2%" }}>
          <Grid container spacing={2} style={{ paddingLeft: "5%", paddingRight: "2.5%" }}>
            <Grid item xs={12}>
              <div className='image-container'>
                <img src={hometwo} />
              </div>
            </Grid>
            <Grid item xs={12}>
              <div style={{ fontSize: "1.35rem", marginBottom: "1.5rem", textAlign: "justify", marginRight: "1.2rem", marginBottom: "2rem" }}>
                Your donation to our society is greatly appreciated.
                It enables us to make a meaningful impact on our community by supporting education,
                healthcare, poverty alleviation, and environmental conservation. Your contribution helps
                uplift the underprivileged, empower marginalized groups, and foster unity. We ensure
                transparency and accountability in handling your donation, and every amount, no matter
                how small, makes a difference. With your support, we can create a better future and
                bring hope to many lives. &nbsp; &nbsp;
                <NavLink to="/donate"
                  style={{ fontSize: "1.5rem", color: "#582c6f", textDecoration: "none", borderBottom: "1.5px solid #bdb4e9 " }}>
                  Donate today</NavLink>
              </div>
            </Grid>
          </Grid>
        </Grid>
        {/*<Grid item xs={12} md={4} sm={12}>
          <Grid container spacing={2} sx={{ padding: "0.5rem" }}>
            <Grid item xs={12} style={{ backgroundColor: "#f6f8fa", borderRadius: "2vh" }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sx={{ fontSize: "2rem", fontWeight: "700", marginBottom: "1rem" }}>
                  Family Profile
                </Grid>
                <Grid item xs={12} sx={{
                  border: "2px solid #E99B01", margin: "0.8rem", width: "10rem",
                  height: "3rem", borderRadius: "1vh",
                  color: "#E99B01",
                  "&:hover": {
                    backgroundColor: "#E99B01", color: "black"
                  }
                }}>
                  <div style={{
                    marginTop: "-0.5rem", fontSize: "1.2rem"
                  }}>View all members </div>
                </Grid>
                <Grid item xs={12} sx={{
                  border: "2px solid #E99B01", margin: "0.8rem", width: "10rem",
                  height: "3rem", borderRadius: "1vh",
                  color: "#E99B01",
                  "&:hover": {
                    backgroundColor: "#E99B01", color: "black"
                  }
                }}>
                  <div style={{
                    marginTop: "-0.5rem", fontSize: "1.2rem"
                  }}>Edit Family details </div>
                </Grid>
                <Grid item xs={12} sx={{
                  border: "2px solid #E99B01", margin: "0.8rem", width: "10rem",
                  height: "3rem", borderRadius: "1vh",
                  color: "#E99B01",
                  "&:hover": {
                    backgroundColor: "#E99B01", color: "black"
                  }
                }}>
                  <div style={{
                    marginTop: "-0.5rem", fontSize: "1.2rem"
                  }}>Search Family Details</div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={8} sm={12}>
          <Grid container spacing={2} sx={{ padding: "0.5rem" }}>
            <Grid item xs={12} style={{ backgroundColor: "#f6f8fa", borderRadius: "2vh" }}>
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
                            border: "2px solid #018D8D", height: "2.6rem", borderRadius: "1vh"
                          }}>
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
                  <img src={jobsite} style={{ width: "100%", marginLeft: "-4%", marginTop: "-2%", borderRadius: "1vh" }} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <Grid container spacing={2} sx={{ padding: "0.5rem" }}>
            <Grid item xs={12} style={{ backgroundColor: "#97ddfe", borderRadius: "2vh" }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={5} sm={12}>
                  <img src={events} style={{ width: "78%" }} />
                </Grid>
                <Grid item xs={12} md={7} sm={12}>
                  <Grid container spacing={2} sx={{ marginBottom: "1.2rem" }}>
                    <Grid item xs={12} sx={{ fontSize: "1.5rem", textAlign: "left" }}>
                      <Grid container spacing={2} >
                        <Grid item xs={2}>
                          <CalendarMonthIcon sx={{ fontSize: "2.5rem", marginTop: "-0.5vh", color: "#1A5EB7" }} />
                        </Grid>
                        <Grid item xs={10}>Upcoming Event Name</Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sx={{ fontSize: "1.5rem", fontWeight: "500", textAlign: "left" }}>
                      <Grid container spacing={2} >
                        <Grid item xs={2}>
                          <PinDropIcon sx={{ fontSize: "2.5rem", marginTop: "-0.5vh", color: "#1A5EB7" }} />
                        </Grid>
                        <Grid item xs={10}>Kandivali, Mumbai</Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sx={{ fontSize: "1.5rem", fontWeight: "500", textAlign: "left" }}>
                      <Grid container spacing={2} >
                        <Grid item xs={2}>
                          <ScheduleIcon sx={{ fontSize: "2.5rem", marginTop: "-0.5vh", color: "#1A5EB7" }} />
                        </Grid>
                        <Grid item xs={10}>Monday &nbsp; 22/6/2023</Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={1}>
                        <Grid item xs={12} md={6} sm={12} sx={{ paddingLeft: "2rem", paddingRight: "0.8rem" }}>
                          <div style={{ border: "2px solid #1A5EB7", height: "2.6rem", borderRadius: "1vh" }}>
                            <div style={{ marginTop: "0.5rem", fontSize: "1.2rem", color: "#1A5EB7" }}>View More Events</div>
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
        <Grid item xs={12} md={6} sm={12}>
          <Grid container spacing={2} sx={{ padding: "0.5rem" }}>
            <Grid item xs={12} style={{ backgroundColor: "#f6f8fa", borderRadius: "2vh" }}>
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

        </Grid>*/}
      </Grid >
    </Box >
  )
}

export default Home