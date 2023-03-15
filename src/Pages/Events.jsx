import React, { useState } from 'react'
import { Box, Button, Grid } from '@mui/material'
import mainevent from '../Images/eventsmain.jpg'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Carousel from "react-multi-carousel";
import eventsimage from "../Images/events.webp"
const Events = () => {

  const [visible, setVisible] = useState(4);

  const events = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  const showMore = () => {
    setVisible((preVisible) => preVisible + 4);
  }

  const upcoming = [
    { name: "Event Name", venue: "Venue", date: "16-02-2023", desc: "Lorem ipsum dolor sit amet, consectetur  ajsvjsbvjbsbjd Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet, consectetur  ajsvjsbvjbsbjd Lorem ipsum dolor sit amet" },
    { name: "Event Name", venue: "Venue", date: "15-02-2023", desc: "Lorem ipsum dolor sit amet, consectetur  ajsvjsbvjbsbjd Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet, consectetur  ajsvjsbvjbsbjd Lorem ipsum dolor sit amet" },
    { name: "Event Name", venue: "Venue", date: "17-02-2023", desc: "Lorem ipsum dolor sit amet, consectetur  ajsvjsbvjbsbjd Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet, consectetur  ajsvjsbvjbsbjd Lorem ipsum dolor sit amet" },
    { name: "Event Name", venue: "Venue", date: "18-02-2023", desc: "Lorem ipsum dolor sit amet, consectetur  ajsvjsbvjbsbjd Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet, consectetur  ajsvjsbvjbsbjd Lorem ipsum dolor sit amet" },
    { name: "Event Name", venue: "Venue", date: "19-02-2023", desc: "Lorem ipsum dolor sit amet, consectetur  ajsvjsbvjbsbjd Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet, consectetur  ajsvjsbvjbsbjd Lorem ipsum dolor sit amet" },
    { name: "Event Name", venue: "Venue", date: "16-02-2023", desc: "Lorem ipsum dolor sit amet, consectetur  ajsvjsbvjbsbjd Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet, consectetur  ajsvjsbvjbsbjd Lorem ipsum dolor sit amet" },
    { name: "Event Name", venue: "Venue", date: "15-02-2023", desc: "Lorem ipsum dolor sit amet, consectetur  ajsvjsbvjbsbjd Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet, consectetur  ajsvjsbvjbsbjd Lorem ipsum dolor sit amet" },
    { name: "Event Name", venue: "Venue", date: "17-02-2023", desc: "Lorem ipsum dolor sit amet, consectetur  ajsvjsbvjbsbjd Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet, consectetur  ajsvjsbvjbsbjd Lorem ipsum dolor sit amet" },
    { name: "Event Name", venue: "Venue", date: "18-02-2023", desc: "Lorem ipsum dolor sit amet, consectetur  ajsvjsbvjbsbjd Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet, consectetur  ajsvjsbvjbsbjd Lorem ipsum dolor sit amet" },
    { name: "Event Name", venue: "Venue", date: "19-02-2023", desc: "Lorem ipsum dolor sit amet, consectetur  ajsvjsbvjbsbjd Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet, consectetur  ajsvjsbvjbsbjd Lorem ipsum dolor sit amet" }
  ];

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 900 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 900, min: 600 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 600, min: 0 },
      items: 1
    }
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={2} sx={{padding:'0.5rem'}}>
            <Grid item xs={12} sx={{ marginTop: "2.5rem" }}>
              <div style={{ fontSize: "3rem", fontWeight:"700" }}>Events & Functions</div>
            </Grid>
            <Grid item xs={12}>
              <div style={{ fontSize: "2rem", marginBottom:"1.5rem" }}>Unite with your Family and Friends and have a great time</div>
            </Grid>
          </Grid>
        </Grid>
        {/*<Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div style={{ fontSize: "2.5rem" }}>Upcoming Events & Functions</div>
            </Grid>
            <Grid item xs={12}>
              <Carousel
                responsive={responsive}
                removeArrowOnDeviceType={["tablet", "mobile"]}
                infinite={true}
                transitionDuration={500}
                autoPlaySpeed={7000}
                autoPlay={true}
              >
                {upcoming.map((item) => {
                  return (
                    <div style={{ padding: "1rem" }}>
                      <Grid item xs={12}>
                        <Grid container spacing={2} sx={{ borderRadius: "2vh", paddingLeft: "1rem" }}>
                          <Grid item xs={12} style={{ height: "40vh", backgroundColor: "greenyellow", borderRadius: "2vh" }}>
                          </Grid>
                          <Grid item xs={12}>
                            <Grid container spacing={1} sx={{ textAlign: "left" }}>
                              <Grid item xs={6}>
                                <i style={{ fontSize: "1.1rem" }}>{item.date}</i>
                              </Grid>
                              <Grid item xs={6}>
                                <i style={{ fontSize: "1.3rem" }}>Button</i>
                              </Grid>
                              <Grid item xs={12}>
                                <div style={{ fontSize: "2rem", fontWeight: "700" }}>{item.name}</div>
                              </Grid>
                              <Grid item xs={12}>
                                <i style={{ fontSize: "1.3rem" }}>{item.venue}</i>
                              </Grid>
                              <Grid item xs={12}>
                                <div style={{ fontSize: "1.1rem" }}>{item.desc}</div>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </div>
                  )
                })}
              </Carousel>
            </Grid>
          </Grid>
              </Grid>*/}
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Tabs>
                <TabList style={{ border: "none", fontSize: "1.3rem", marginBottom: "2rem" }}>
                  {events.map((item, key) => {
                    return (
                      <Tab style={{ backgroundColor: "transparent", border: "none" }}>{item}</Tab>
                    )
                  })}
                </TabList>
                {events.map((item1, key) => {
                  return (
                    <TabPanel>
                      <Grid container spacing={2}>
                        {upcoming.slice(0, visible).map((item) => {
                          return (
                            <Grid item xs={12} md={3} sm={12}>
                              <Grid container spacing={2} sx={{ borderRadius: "2vh", padding: "1rem" }}>
                                <Grid item xs={12}>
                                  <img src={eventsimage} style={{width:"100%",height:"35vh", borderRadius:"1.5vh"}} />
                                </Grid>
                                <Grid item xs={12}>
                                  <Grid container spacing={1} sx={{ textAlign: "left" }}>
                                    <Grid item xs={12}>
                                      <i style={{ fontSize: "1.1rem" }}>{item.date}</i>
                                    </Grid>
                                    <Grid item xs={12}>
                                      <div style={{ fontSize: "2rem", fontWeight: "700" }}>{item.name}</div>
                                    </Grid>
                                    <Grid item xs={12}>
                                      <i style={{ fontSize: "1.3rem" }}>{item.venue}</i>
                                    </Grid>
                                    <Grid item xs={12}>
                                      <div style={{ fontSize: "1.1rem" }}>{item.desc}</div>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          )
                        })}
                      </Grid>
                    </TabPanel>
                  )
                })}
              </Tabs>
            </Grid>
            <Grid item xs={12} style={{marginBottom:"2rem", marginTop:"1rem"}}>
              <button onClick={showMore} variant="outlined" style={{fontSize:"1.25rem", borderRadius:"1vh"}}>Load More</button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Events