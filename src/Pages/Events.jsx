/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { Box, Button, Grid } from '@mui/material'
import mainevent from '../Images/eventsmain.jpg'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import axios from 'axios'
const Events = () => {

  const [visible, setVisible] = useState(12);
  const year = [2023, 2022, 2021, 2020]

  const [load, setLoad] = useState([]);
  useEffect(() => {
    loadList();
  }, []);

  const loadList = async (id) => {
    console.log(id)
    if (id == undefined) {
      const config = {
        method: 'post',
        url: `http://jenilsavla.pythonanywhere.com/api/event/2023`,
        headers: {
          'Authorization': `Token ebeb63c068b02f00c0797a0c8edc06575c139fbb`
        }
      };
      const response = await axios(config);
      console.log(response.data.data.events);
      setLoad(response.data.data.events)
    }
    else {
      const config = {
        method: 'post',
        url: `http://jenilsavla.pythonanywhere.com/api/event/${id}`,
        headers: {
          'Authorization': `Token ebeb63c068b02f00c0797a0c8edc06575c139fbb`
        }
      };
      const response = await axios(config);
      console.log(response.data.data.events);
      setLoad(response.data.data.events)
    }

  }
  console.log(load);


  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={2} style={{ paddingLeft: "5%", paddingRight: "2.5%" }}>
            <Grid item xs={12} sx={{ marginTop: "2.5rem" }}>
              <div style={{ fontSize: "3rem", fontWeight: "700" }}>Events & Functions</div>
            </Grid>
            <Grid item xs={12}>
              <div style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>Unite with your Family and Friends and have a great time</div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Tabs>
                <TabList style={{ border: "none", fontSize: "1.5rem", marginBottom: "2rem" }}>
                  {year.map((item, key) => {
                    return (
                      <Tab style={{ backgroundColor: "transparent", border: "none" }}
                        onClick={() =>
                          loadList(item)
                        }>{item}</Tab>
                    )
                  })}
                </TabList>
                {year.map((series) => {
                  return (
                    <TabPanel>
                      <Grid container spacing={2}>
                        {load.map((item) => {
                          return (
                            <Grid item xs={12} md={4} sm={6} style={{
                              paddingLeft: "5%", paddingRight: "2.5%",
                            }}>
                              <Grid container spacing={2} sx={{ borderRadius: "2vh", padding: "1rem" }}>
                                <Grid item xs={12}>
                                  <img src={`http://jenilsavla.pythonanywhere.com` + item.picture}
                                    style={{ width: "100%", height: "35vh", borderRadius: "1.5vh 1.5vh 0vh 0vh" }} />
                                </Grid>
                                <Grid item xs={12}
                                  style={{
                                    padding: "1rem", marginLeft: "16px", marginTop: "-0.75rem",
                                    borderRadius: "0vh 0vh 1.5vh 1.5vh", backgroundColor: "#90CFD3"
                                  }}>
                                  <Grid container spacing={1} sx={{ textAlign: "left", marginTop: "0.5vh" }}>
                                    <Grid item xs={12}>
                                      <div style={{ fontSize: "2rem", fontWeight: "700" }}>{item.name}</div>
                                    </Grid>
                                    <Grid item xs={12}>
                                      <div style={{ fontSize: "1.1rem" }}>lorem-ipsum.paragraph</div>
                                    </Grid>
                                    <hr style={{ border: "1px solid #E0E1DC", width: "100%", borderRadius: "5px" }} />
                                    <Grid item xs={12}>
                                      <Grid container spacing={2}>
                                        <Grid item xs={2}>
                                          <LocationOnIcon style={{ fontSize: "5vh", color: "#E0E1DC" }} />
                                        </Grid>
                                        <Grid item xs={10} >
                                          <div style={{ fontSize: "1.25rem", marginTop: "0.7rem" }}>{item.venue}</div>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                      <Grid container spacing={2}>
                                        <Grid item xs={2}>
                                          <EventIcon style={{ fontSize: "5vh", color: "#E0E1DC" }} />
                                        </Grid>
                                        <Grid item xs={5} >
                                          <div style={{ fontSize: "1.25rem", marginTop: "0.7rem" }}>{item.date}</div>
                                        </Grid>
                                        <Grid item xs={5} style={{ marginTop: "0.3rem", textAlign: "right" }}>
                                          <PhotoCameraIcon style={{
                                            fontSize: "3.5vh", color: "#E0E1DC",
                                            backgroundColor: "grey", padding: "0.25rem", borderRadius: "0.5rem 0rem 0rem 0.5rem"
                                          }} />
                                          <KeyboardDoubleArrowRightIcon style={{
                                            fontSize: "3.5vh", color: "#E0E1DC",
                                            backgroundColor: "grey", padding: "0.25rem", borderRadius: "0rem 0.5rem 0.5rem 0rem"
                                          }} />
                                        </Grid>
                                      </Grid>
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
          </Grid>
        </Grid>
      </Grid>
    </Box >
  )
}

export default Events