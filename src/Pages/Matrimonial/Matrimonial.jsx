import React, { useState, useEffect } from 'react'
import { Box, Button, Grid } from '@mui/material'
import mainevent from '../../images/eventsmain.jpg'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Modal } from "react-responsive-modal";
import { Link } from 'react-router-dom';
import girl from "../../images/girl.webp"
import boy from "../../images/boy.webp"
import EventIcon from '@mui/icons-material/Event';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import DescriptionIcon from '@mui/icons-material/Description';
import axios from 'axios';
const Matrimonial = () => {

  const [visible, setVisible] = useState(4);

  const events = ["Male", "Female"]

  const showMore = () => {
    setVisible((preVisible) => preVisible + 4);
  }


  const [loadMale, setLoadMale] = useState([]);
  const [loadFemale, setLoadFemale] = useState([]);
  useEffect(() => {
    loadListMale();
    loadListFemale();
  }, []);

  const loadListMale = async () => {
    //const token = localStorage.getItem("token")
    const result = await axios.get(`http://jenilsavla.pythonanywhere.com/api/matrimonies?gender=Male`, {
      headers: { "Authorization": `Token ebeb63c068b02f00c0797a0c8edc06575c139fbb` },
    });
    setLoadMale(result.data.data.matrimonies);

  };
  console.log(loadMale);
  
  const loadListFemale = async () => {
    //const token = localStorage.getItem("token")
    const result = await axios.get(`http://jenilsavla.pythonanywhere.com/api/matrimonies?gender=Female`, {
      headers: { "Authorization": `Token ebeb63c068b02f00c0797a0c8edc06575c139fbb` },
    });
    setLoadFemale(result.data.data.matrimonies);

  };
  console.log(loadFemale);



  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={2} style={{ paddingLeft: "5%", paddingRight: "2.5%" }}>
            <Grid item xs={12} sx={{ marginTop: "2.5rem" }}>
              <div style={{ fontSize: "3rem", fontWeight: "700" }}>Matrimonial</div>
            </Grid>
            <Grid item xs={12}>
              <div style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>Your life partner search ends here</div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
            <Tabs>
                <TabList style={{ border: "none", fontSize: "1.3rem", marginBottom: "2rem" }}>
                  <Tab style={{ backgroundColor: "transparent", border: "none" }}>Male</Tab>
                  <Tab style={{ backgroundColor: "transparent", border: "none" }}>Female</Tab>
                </TabList>
                {events.map((item1, key) => {
                  return (
                    <>
                      {item1 == "Female" ?
                        <>
                          <TabPanel>
                            <Grid container spacing={2}>
                              {loadFemale.slice(0, visible).map((item) => {
                                return (
                                  <Grid item xs={12} md={4} sm={6} style={{
                                    paddingLeft: "5%", paddingRight: "2.5%",
                                  }}>
                                    <Grid container spacing={2} sx={{ borderRadius: "2vh", padding: "1rem" }}>
                                      <Grid item xs={12}>
                                        <img src={girl}
                                          style={{ width: "100%", height: "35vh", borderRadius: "1.5vh 1.5vh 0vh 0vh" }} />
                                      </Grid>
                                      <Grid item xs={12}
                                        style={{
                                          padding: "1rem", marginLeft: "16px", marginTop: "-0.75rem",
                                          borderRadius: "0vh 0vh 1.5vh 1.5vh", backgroundColor: "#BDB4E9"
                                        }}>
                                        <Grid container spacing={1} sx={{ textAlign: "left", marginTop: "0.5vh" }}>
                                          <Grid item xs={12}>
                                            <div style={{ fontSize: "2rem", fontWeight: "700" }}>{item.name}</div>
                                          </Grid>
                                          <Grid item xs={12}>
                                            <div style={{ fontSize: "1.1rem" }}>{item.about}</div>
                                          </Grid>
                                          <hr style={{ border: "1px solid #E0E1DC", width: "100%", borderRadius: "5px" }} />
                                          <Grid item xs={12}>
                                            <Grid container spacing={2}>
                                              <Grid item xs={2}>
                                                <LocalPhoneIcon style={{ fontSize: "5vh", color: "#E0E1DC" }} />
                                              </Grid>
                                              <Grid item xs={10} >
                                                <div style={{ fontSize: "1.25rem", marginTop: "0.7rem" }}>{item.phone}</div>
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                          <Grid item xs={12}>
                                            <Grid container spacing={2}>
                                              <Grid item xs={2}>
                                                <EventIcon style={{ fontSize: "5vh", color: "#E0E1DC" }} />
                                              </Grid>
                                              <Grid item xs={5} >
                                                <div style={{ fontSize: "1.25rem", marginTop: "0.7rem" }}>{item.dob}</div>
                                              </Grid>
                                              <Grid item xs={5} style={{ marginTop: "0.3rem", textAlign: "right" }}>
                                                <DescriptionIcon style={{
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
                        </> :
                        <>
                          <TabPanel>
                            <Grid container spacing={2}>
                              {loadMale.slice(0, visible).map((item) => {
                                return (
                                  <Grid item xs={12} md={4} sm={6} style={{
                                    paddingLeft: "5%", paddingRight: "2.5%",
                                  }}>
                                    <Grid container spacing={2} sx={{ borderRadius: "2vh", padding: "1rem" }}>
                                      <Grid item xs={12}>
                                        <img src={boy}
                                          style={{ width: "100%", height: "35vh", borderRadius: "1.5vh 1.5vh 0vh 0vh" }} />
                                      </Grid>
                                      <Grid item xs={12}
                                        style={{
                                          padding: "1rem", marginLeft: "16px", marginTop: "-0.75rem",
                                          borderRadius: "0vh 0vh 1.5vh 1.5vh", backgroundColor: "#BDB4E9"
                                        }}>
                                        <Grid container spacing={1} sx={{ textAlign: "left", marginTop: "0.5vh" }}>
                                          <Grid item xs={12}>
                                            <div style={{ fontSize: "2rem", fontWeight: "700" }}>{item.name}</div>
                                          </Grid>
                                          <Grid item xs={12}>
                                            <div style={{ fontSize: "1.1rem" }}>{item.about}</div>
                                          </Grid>
                                          <hr style={{ border: "1px solid #E0E1DC", width: "100%", borderRadius: "5px" }} />
                                          <Grid item xs={12}>
                                            <Grid container spacing={2}>
                                              <Grid item xs={2}>
                                                <LocalPhoneIcon style={{ fontSize: "5vh", color: "#E0E1DC" }} />
                                              </Grid>
                                              <Grid item xs={10} >
                                                <div style={{ fontSize: "1.25rem", marginTop: "0.7rem" }}>{item.phone}</div>
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                          <Grid item xs={12}>
                                            <Grid container spacing={2}>
                                              <Grid item xs={2}>
                                                <EventIcon style={{ fontSize: "5vh", color: "#E0E1DC" }} />
                                              </Grid>
                                              <Grid item xs={5} >
                                                <div style={{ fontSize: "1.25rem", marginTop: "0.7rem" }}>{item.dob}</div>
                                              </Grid>
                                              <Grid item xs={5} style={{ marginTop: "0.3rem", textAlign: "right" }}>
                                                <DescriptionIcon style={{
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
                        </>
                      }</>
                  )
                })}
              </Tabs>
              </Grid>
              </Grid>
          </Grid>
        </Grid>
    </Box>
  )
}

export default Matrimonial