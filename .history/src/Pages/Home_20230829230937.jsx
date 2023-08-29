import React, { useState, useEffect } from 'react'
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
import Culture from '../images/diversity.png'
import global from '../images/globalNetwork.png'
import charity from '../images/donationTwo.png'
import education from '../images/education.png'
import donationHome from '../images/donationHome.jpg'

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

  const imageUrls = [
    homeone,
    hometwo,
    homethree,
    // Add more image URLs here
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % imageUrls.length
      );
    }, 10000); // Change image every 10 seconds

    return () => clearInterval(interval);
  }, []);


  return (
    <Box>

      <Grid container spacing={5}>
        <Grid item xs={12}>
          <div className="image-container-overlay">
            <div className="image-overlay" style={{ backgroundImage: `url(${imageUrls[currentImageIndex]})` }}>
              <div className="overlay"></div>
              <div className="text-overlay"> Shri Visa Soarathia</div>
              <div className="text-overlay-2">Vanika Gnati Samasta</div>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} style={{ padding: "1rem", paddingLeft: "3.5rem", marginBottom: "2rem", marginTop: "2rem" }}>
          <CarouselAd />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12} style={{ fontSize: "2rem", marginBottom: "3rem", paddingLeft: "10%", paddingRight: "5%", marginTop: "-2rem" }}>
              <span className='underline'>Our community comes together to achieve these goals.</span>
            </Grid>
            <Grid item xs={12} md={3} sm={6} style={{ backgroundColor: "#CEF5D3" }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <img src={Culture} style={{ width: "4.5rem", height: "4.5rem" }} />
                </Grid>
                <Grid item xs={12} style={{ fontSize: "1.5rem", color: "#222A45" }}>
                  Culture
                </Grid>
                <Grid item xs={12} style={{ fontSize: "1rem", color: "#222A45", paddingLeft: "1.5rem", paddingRight: "1.5rem", marginBottom: "2rem" }}>
                  Fostering Unity Through Cultural Diversity<br /> Celebrating Traditions, Enriching Lives
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={3} sm={6} style={{ backgroundColor: "#DFFCD9" }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <img src={education} style={{ width: "4.5rem", height: "4.5rem" }} />
                </Grid>
                <Grid item xs={12} style={{ fontSize: "1.5rem", color: "#005500" }}>
                  Education
                </Grid>
                <Grid item xs={12} style={{ fontSize: "1rem", color: "#005500", paddingLeft: "1.5rem", paddingRight: "1.5rem", marginBottom: "2rem" }}>
                  Illuminating Minds, Empowering Futures<br /> Nurturing Education for All.
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={3} sm={6} style={{ backgroundColor: "#D8D5ED" }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <img src={global} style={{ width: "4.5rem", height: "4.5rem" }} />
                </Grid>
                <Grid item xs={12} style={{ fontSize: "1.5rem", color: "#4F225E" }}>
                  Global Network
                 </Grid>
                <Grid item xs={12} style={{ fontSize: "1rem", color: "#4F225E", paddingLeft: "1.5rem", paddingRight: "1.5rem", marginBottom: "2rem" }}>
                  Connecting Hearts Worldwide<br /> Bridging Cultures, Creating Bonds.
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={3} sm={6} style={{ backgroundColor: "#B3B6E3" }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <img src={charity} style={{ width: "4.5rem", height: "4.5rem" }} />
                </Grid>
                <Grid item xs={12} style={{ fontSize: "1.5rem", color: "#4F225E" }}>
                  Charity
                </Grid>
                <Grid item xs={12} style={{ fontSize: "1rem", color: "#4F225E", paddingLeft: "1.5rem", paddingRight: "1.5rem", marginBottom: "2rem" }}>
                  Compassion in Action<br /> Changing Lives Through Caring Hearts.
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4}>
              <Grid container sapcing={2}>
                <Grid item xs={12}
                  style={{ fontSize: "3rem", textAlign: "left", paddingLeft: "10%", paddingRight: "10%", marginTop: "2rem", marginBottom: "1rem" }}>
                  <span className='underline-header' style={{ padding: "0rem 0.5rem " }}>Dontation</span>
                </Grid>
                <Grid item xs={12} style={{ fontSize: "1.15rem", textAlign: "justify", paddingLeft: "12%", paddingRight: "10%" }}>
                  Your donation to our society is greatly appreciated.
                  It enables us to make a meaningful impact on our community by supporting education,
                  healthcare, poverty alleviation, and environmental conservation. Your contribution helps
                  uplift the underprivileged, empower marginalized groups, and foster unity. We ensure
                  transparency and accountability in handling your donation, and every amount, no matter
                  how small, makes a difference. With your support, we can create a better future and
                  bring hope to many lives.
                </Grid>
                <Grid item xs={12} style={{
                  fontSize: "3rem", textAlign: "left", paddingLeft: "10%", paddingRight: "10%",
                  marginBottom: "2rem"
                }}>
                  <Button sx={{
                    color: "black", fontWeight: "650", border: "2px solid black",
                    "&:hover": {
                      backgroundColor: "#BDB4E9"
                    },
                  }}>Donate Today</Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={8} style={{
              backgroundImage: `url(${donationHome})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '500px',
            }}>

            </Grid>
          </Grid>
        </Grid>
      </Grid >
    </Box >
  )
}

export default Home