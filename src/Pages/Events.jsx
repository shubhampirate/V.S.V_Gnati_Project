/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { Box, Button, Grid } from '@mui/material'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import "../Components/styleEvents.css";


const Events = () => {

  const [visible, setVisible] = useState(12);
  const [len, setLen] = useState('');
  const year = [2023, 2022]

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
      setLoad(response.data.data.events);
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
      if (response.data.data.events.length == 0) {
        console.log("empty")
      }
      setLen(response.data.data.events.length);
      // console.log(len)
      setLoad(response.data.data.events);
    }

  }
  console.log(load);
  console.log(len)


  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} className='events_section'>
          <Grid container spacing={2} style={{ paddingLeft: "3%", paddingRight: "2.5%" }}>
            <Grid item xs={12} sx={{ marginTop: "11%" }}>
              <div style={{ fontSize: "2.5rem", fontWeight: "700" }}>Events Extravaganza</div>
            </Grid>
            <Grid item xs={12} style={{ marginBottom: "11%" }} >
              <div style={{ fontSize: "1.35rem", marginBottom: "1.5rem", marginLeft: "2%" }}>Unite with family and friends as we host a series of joyous gatherings and celebrations
                in honor of V.S.V Gnati Samasta. Experience the magic of togetherness through our heartwarming events that bring laughter,
                connection, and cherished memories. Come be a part of these special occasions that embody the spirit of unity and celebration.</div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Tabs className="component-e-tabs">
                <TabList style={{ border: "none", fontSize: "1.5rem", marginBottom: "2rem" }}>
                  {year.map((item, key) => {
                    return (
                      <Tab
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
                            <>
                              {len !== 0 ?
                                <>
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
                                            <div style={{ fontSize: "1.1rem" }}>{item.about}</div>
                                          </Grid>
                                          <hr style={{ border: "1px solid #018d8d", width: "100%", borderRadius: "5px" }} />
                                          <Grid item xs={12}>
                                            <Grid container spacing={2}>
                                              <Grid item xs={2}>
                                                <LocationOnIcon style={{ fontSize: "5vh", color: "#018d8d" }} />
                                              </Grid>
                                              <Grid item xs={10} >
                                                <div style={{ fontSize: "1.25rem", marginTop: "0.7rem" }}>{item.venue}</div>
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                          <Grid item xs={12}>
                                            <Grid container spacing={2}>
                                              <Grid item xs={2}>
                                                <EventIcon style={{ fontSize: "5vh", color: "#018d8d" }} />
                                              </Grid>
                                              <Grid item xs={5} >
                                                <div style={{ fontSize: "1.25rem", marginTop: "0.7rem" }}>{item.date}</div>
                                              </Grid>
                                              <Grid item xs={5} style={{ marginTop: "0.3rem", textAlign: "right" }}>
                                                <Link to={item.photos_drive}>
                                                  <PhotoCameraIcon style={{
                                                    fontSize: "3.5vh", color: "#E0E1DC",
                                                    backgroundColor: "#018d8d", padding: "0.25rem", borderRadius: "0.5rem 0rem 0rem 0.5rem"
                                                  }} />
                                                  <KeyboardDoubleArrowRightIcon style={{
                                                    fontSize: "3.5vh", color: "#E0E1DC",
                                                    backgroundColor: "#018d8d", padding: "0.25rem", borderRadius: "0rem 0.5rem 0.5rem 0rem"
                                                  }} />
                                                </Link>
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </> :
                                <>
                                  <div style={{ fontSize: "1.5rem" }}>image not there okay hello</div>
                                </>}
                            </>)
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