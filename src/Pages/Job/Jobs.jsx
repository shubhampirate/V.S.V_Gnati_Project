import React, { useState } from 'react'
import { Box, Grid, Button } from '@mui/material'
import Carousel from "react-multi-carousel";
import jobimage from "../../Images/jobimage.webp"
const Jobs = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  const [visible, setVisible] = useState(4);

  const showMore = () => {
    setVisible((preVisible) => preVisible + 4);
  }

  const upcoming = [
    { name: "Job Title", type: "job type", company: "Company Name", address: "address", email: "dsfhsgj@gmail.com", phone: "98745162309", desc: "Lorem ipsum dolor sit amet, consectetur  ajsvjsbvjbsbjd Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet, consectetur  ajsvjsbvjbsbjd Lorem ipsum dolor sit amet" },
    { name: "Job Title", type: "job type", company: "Company Name", address: "address", email: "dsfhsgj@gmail.com", phone: "98745162309", desc: "Lorem ipsum dolor sit amet, consectetur  ajsvjsbvjbsbjd Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet, consectetur  ajsvjsbvjbsbjd Lorem ipsum dolor sit amet" },
    { name: "Job Title", type: "job type", company: "Company Name", address: "address", email: "dsfhsgj@gmail.com", phone: "98745162309", desc: "Lorem ipsum dolor sit amet, consectetur  ajsvjsbvjbsbjd Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet, consectetur  ajsvjsbvjbsbjd Lorem ipsum dolor sit amet" },
    { name: "Job Title", type: "job type", company: "Company Name", address: "address", email: "dsfhsgj@gmail.com", phone: "98745162309", desc: "Lorem ipsum dolor sit amet, consectetur  ajsvjsbvjbsbjd Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet, consectetur  ajsvjsbvjbsbjd Lorem ipsum dolor sit amet" },
    { name: "Job Title", type: "job type", company: "Company Name", address: "address", email: "dsfhsgj@gmail.com", phone: "98745162309", desc: "Lorem ipsum dolor sit amet, consectetur  ajsvjsbvjbsbjd Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet, consectetur  ajsvjsbvjbsbjd Lorem ipsum dolor sit amet" },
    { name: "Job Title", type: "job type", company: "Company Name", address: "address", email: "dsfhsgj@gmail.com", phone: "98745162309", desc: "Lorem ipsum dolor sit amet, consectetur  ajsvjsbvjbsbjd Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet, consectetur  ajsvjsbvjbsbjd Lorem ipsum dolor sit amet" },
    { name: "Job Title", type: "job type", company: "Company Name", address: "address", email: "dsfhsgj@gmail.com", phone: "98745162309", desc: "Lorem ipsum dolor sit amet, consectetur  ajsvjsbvjbsbjd Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet, consectetur  ajsvjsbvjbsbjd Lorem ipsum dolor sit amet" },
    { name: "Job Title", type: "job type", company: "Company Name", address: "address", email: "dsfhsgj@gmail.com", phone: "98745162309", desc: "Lorem ipsum dolor sit amet, consectetur  ajsvjsbvjbsbjd Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet, consectetur  ajsvjsbvjbsbjd Lorem ipsum dolor sit amet" },
    { name: "Job Title", type: "job type", company: "Company Name", address: "address", email: "dsfhsgj@gmail.com", phone: "98745162309", desc: "Lorem ipsum dolor sit amet, consectetur  ajsvjsbvjbsbjd Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet, consectetur  ajsvjsbvjbsbjd Lorem ipsum dolor sit amet" },
    { name: "Job Title", type: "job type", company: "Company Name", address: "address", email: "dsfhsgj@gmail.com", phone: "98745162309", desc: "Lorem ipsum dolor sit amet, consectetur  ajsvjsbvjbsbjd Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet, consectetur  ajsvjsbvjbsbjd Lorem ipsum dolor sit amet" }
  ];

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={2} sx={{ padding: '0.5rem' }}>
            <Grid item xs={12} sx={{ marginTop: "2.5rem" }}>
              <div style={{ fontSize: "3rem", fontWeight: "700" }}>Job Opportunity</div>
            </Grid>
            <Grid item xs={12}>
              <div style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>One Step closer to your new Job</div>
            </Grid>
            {/*<Grid item xs={12} md={8} sm={12}>
              <div style={{ textAlign: "left", fontSize: "2rem", marginBottom: "1rem" }}>
                One Step closer to your new Job
              </div>
              <div style={{ fontSize: "1.5rem", textAlign: "left" }}>
                Lorem ipsum dolor sit amet, consectetur  ajsvjsbvjbsbjd Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet, consectetur  ajsvjsbvjbsbjd Lorem ipsum dolor sit amet
              </div>
            </Grid>
            <Grid item xs={12} md={4} sm={12} style={{ padding: "0.5rem" }}>
              <Carousel
                responsive={responsive}
                removeArrowOnDeviceType={["tablet", "mobile"]}
                infinite={true}
                transitionDuration={500}
                autoPlaySpeed={10000}
                autoPlay={true}
                arrows={false}
              >
                <div style={{ height: "30vh", width: "100%", backgroundColor: "greenyellow" }}>Item 1</div>
                <div style={{ height: "30vh", width: "100%", backgroundColor: "greenyellow" }}>Item 2</div>
                <div style={{ height: "30vh", width: "100%", backgroundColor: "greenyellow" }}>Item 3</div>
                <div style={{ height: "30vh", width: "100%", backgroundColor: "greenyellow" }}> Item 4</div>
              </Carousel>
            </Grid>*/}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {upcoming.slice(0, visible).map((item) => {
              return (
                <Grid item xs={12} md={3} sm={12}>
                  <Grid container spacing={2} sx={{ borderRadius: "2vh", padding: "1rem" }}>
                    <Grid item xs={12}>
                      <img src={jobimage} style={{ width: "100%", height: "35vh", borderRadius: "1.5vh" }} />
                    </Grid>
                    <Grid item xs={12}>
                      <Grid item xs={12}>
                        <Grid container spacing={1} sx={{ textAlign: "left" }}>
                          <Grid item xs={12}>
                            <div style={{ fontSize: "2rem", fontWeight: "700" }}>{item.name} &nbsp;
                              <span style={{ fontSize: "1.5rem", fontWeight: "400" }}> {item.type}</span>
                            </div>
                          </Grid>
                          <Grid item xs={12}>
                            <div style={{ fontSize: "1.1rem" }}>{item.company}</div>
                          </Grid>
                          <Grid item xs={12}>
                            <div style={{ fontSize: "1.1rem", marginTop: "-0.4rem" }}>{item.email}</div>
                          </Grid>
                          <Grid item xs={12}>
                            <div style={{ fontSize: "1.1rem", marginTop: "-0.4rem" }}>+91 {item.phone}</div>
                          </Grid>
                          <Grid item xs={12}>
                            <div style={{ fontSize: "1.1rem" }}>{item.desc}</div>
                          </Grid>
                          <Grid item xs={12}>
                            <u style={{ fontSize: "1.3rem" }}>{item.address}</u>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              )
            })}
          </Grid>
          <Grid item xs={12} style={{ marginBottom: "2rem", marginTop: "1rem" }}>
            <button onClick={showMore} variant="outlined" style={{ fontSize: "1.25rem", borderRadius: "1vh" }}>Load More</button>
          </Grid>
        </Grid >
        {/*<Grid item xs={12}>
          <Grid container spacing={2}>
            {upcoming.slice(0, visible).map((item) => {
              return (
                <Grid item xs={12} md={3} sm={6}>
                  <Grid container spacing={2} sx={{ borderRadius: "2vh", padding: "1rem" }}>
                    <Grid item xs={12} style={{ height: "30vh", backgroundColor: "greenyellow", borderRadius: "2vh" }}>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={1} sx={{ textAlign: "left" }}>
                        <Grid item xs={12}>
                          <div style={{ fontSize: "2rem", fontWeight: "700" }}>{item.name},
                            <span style={{ fontSize: "1.5rem", fontWeight: "400" }}> {item.type}</span>
                          </div>
                        </Grid>
                        <Grid item xs={12}>
                          <div style={{ fontSize: "1.1rem" }}>{item.company}</div>
                        </Grid>
                        <Grid item xs={12}>
                          <div style={{ fontSize: "1.1rem", marginTop: "-0.4rem" }}>{item.email}</div>
                        </Grid>
                        <Grid item xs={12}>
                          <div style={{ fontSize: "1.1rem", marginTop: "-0.4rem" }}>+91 {item.phone}</div>
                        </Grid>
                        <Grid item xs={12}>
                          <div style={{ fontSize: "1.1rem" }}>{item.desc}</div>
                        </Grid>
                        <Grid item xs={12}>
                          <u style={{ fontSize: "1.3rem" }}>{item.address}</u>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <button
                        style={{ backgroundColor: "transparent", borderColor: "red", borderRadius: "0.5vh", width: "100%" }}>
                        Apply Now</button>
                    </Grid>
                  </Grid>
                </Grid>
              )
            })}
            <Grid item xs={12}>
              <Button onClick={showMore} variant="outlined">Load mOre</Button>
            </Grid>
          </Grid>
        </Grid> */}
      </Grid >
    </Box >
  )
}

export default Jobs