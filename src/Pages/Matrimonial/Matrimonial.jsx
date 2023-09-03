import React, { useState, useEffect } from 'react'
import { Box, Button, Grid } from '@mui/material'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Modal } from "react-responsive-modal";
import { Link } from 'react-router-dom';
import "./styleMatrimony.css"
import girl from "../../images/girl.webp"
import boy from "../../images/boy.webp"
import EventIcon from '@mui/icons-material/Event';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import DescriptionIcon from '@mui/icons-material/Description';
import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';
import Loader from '../../Components/Loader';

const Matrimonial = () => {
  const domain = secureLocalStorage.getItem("domainvsv");
  const token = secureLocalStorage.getItem("tokenvsv");
  const events = ["Male", "Female"]

  const handleDownload = (fileUrl) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = true;
    link.click();
  };


  const [loadMale, setLoadMale] = useState([]);
  const [loadFemale, setLoadFemale] = useState([]);

  useEffect(() => {
    loadListMale();
    loadListFemale();
  }, []);

  const loadListMale = async () => {
    const result = await axios.get(`${domain}/matrimonies?gender=Male`, {
      headers: { "Authorization": `Token ${token}` },
    });
    setLoadMale(result.data.data.matrimonies);

  };
  console.log(loadMale);

  const loadListFemale = async () => {

    const result = await axios.get(`${domain}/matrimonies?gender=Female`, {
      headers: { "Authorization": `Token ${token}` },
    });
    setLoadFemale(result.data.data.matrimonies);

  };
  console.log(loadFemale);



  return (
    <Box>
      <Grid container spacing={2} style={{ marginBottom: "2rem" }}>
        <Grid item xs={12} className='marriage_section'>
          <Grid container spacing={2} style={{ paddingLeft: "4%", paddingRight: "2.5%" }}>
            <Grid item xs={12} sx={{ marginTop: "11%" }}>
              <div style={{ fontSize: "2.5rem", fontWeight: "700" }}>Matrimonial Bliss</div>
            </Grid>
            <Grid item xs={12}>
              <div style={{ fontSize: "1.35rem", marginBottom: "1.5rem", marginLeft: "2%" }}>Embrace the beauty of companionship and step into a world of possibilities with our matrimonial services.
                <br />Discover meaningful connections and start your journey towards a lifelong partnership filled with love and togetherness.</div>
            </Grid>
            <Grid item xs={12} style={{ marginBottom: "11%" }}>
              <div>
                <Link to="/register-matrimony">
                  <Button
                    sx={{
                      color: '#582C6F',
                      fontSize: "1.25rem",
                      fontFamily: "PT Sans",
                      backgroundColor: 'transparent',
                      border: '2px solid #582C6F',
                      '&:hover': {
                        backgroundColor: '#582C6F',
                        color: 'white'
                      }
                    }}>
                    Register
                  </Button>
                </Link>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Tabs className="component-m-tabs">
                <TabList style={{ border: "none", fontSize: "1.3rem", marginBottom: "2rem" }}>
                  <Tab >Male</Tab>
                  <Tab >Female</Tab>
                </TabList>
                {events.map((item1, key) => {
                  return (
                    <>
                      {item1 == "Female" ?
                        <>
                          <TabPanel>

                            <Grid container spacing={2}>
                              {loadFemale ? <>
                                {loadFemale.map((item) => {
                                  return (
                                    <Grid item xs={12} md={4} sm={6} style={{
                                      paddingLeft: "5%", paddingRight: "2.5%",
                                    }}>
                                      <Grid container spacing={2} sx={{ borderRadius: "2vh", padding: "1rem" }}>
                                        {item.picture == null ? <>
                                          <Grid item xs={12}>
                                            <img src={girl}
                                              style={{ width: "100%", height: "35vh", borderRadius: "1.5vh 1.5vh 0vh 0vh" }} />
                                          </Grid>
                                        </> : <>
                                          <Grid item xs={12}>
                                            <img src={`http://jenilsavla.pythonanywhere.com` + item.picture}
                                              style={{ width: "100%", height: "43vh", borderRadius: "1.5vh 1.5vh 0vh 0vh" }} />
                                          </Grid>
                                        </>}
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
                                            <hr style={{ border: "1px solid #582C6F", width: "100%", borderRadius: "5px" }} />
                                            <Grid item xs={12}>
                                              <Grid container spacing={2}>
                                                <Grid item xs={2}>
                                                  <LocalPhoneIcon style={{ fontSize: "5vh", color: "#582C6F" }} />
                                                </Grid>
                                                <Grid item xs={10} >
                                                  <div style={{ fontSize: "1.25rem", marginTop: "0.7rem" }}>{item.phone}</div>
                                                </Grid>
                                              </Grid>
                                            </Grid>
                                            <Grid item xs={12}>
                                              <Grid container spacing={2}>
                                                <Grid item xs={2}>
                                                  <EventIcon style={{ fontSize: "5vh", color: "#582C6F" }} />
                                                </Grid>
                                                <Grid item xs={5} >
                                                  <div style={{ fontSize: "1.25rem", marginTop: "0.7rem" }}>{item.dob}</div>
                                                </Grid>
                                                <Grid item xs={5} style={{ marginTop: "0.3rem", textAlign: "right", cursor: "pointer" }}
                                                  onClick={() => handleDownload(`http://jenilsavla.pythonanywhere.com` + item.biodata)}>
                                                  <DescriptionIcon style={{
                                                    fontSize: "3.5vh", color: "#582C6F",
                                                    backgroundColor: "#C4CFFE", padding: "0.25rem", borderRadius: "0.5rem 0rem 0rem 0.5rem",
                                                  }} />
                                                  <KeyboardDoubleArrowRightIcon style={{
                                                    fontSize: "3.5vh", color: "#582C6F",
                                                    backgroundColor: "#C4CFFE", padding: "0.25rem", borderRadius: "0rem 0.5rem 0.5rem 0rem"
                                                  }} />
                                                </Grid>
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  )
                                })}</> : <><Loader /></>}
                            </Grid>
                          </TabPanel>
                        </> :
                        <>
                          <TabPanel>
                            <Grid container spacing={2}>
                              {loadMale.length ? <>
                                {loadMale.map((item) => {
                                  return (
                                    <Grid item xs={12} md={4} sm={6} style={{
                                      paddingLeft: "5%", paddingRight: "2.5%",
                                    }}>
                                      <Grid container spacing={2} sx={{ borderRadius: "2vh", padding: "1rem" }}>
                                        {item.picture == null ? <>
                                          <Grid item xs={12}>
                                            <img src={boy}
                                              style={{ width: "100%", height: "43vh", borderRadius: "1.5vh 1.5vh 0vh 0vh" }} />
                                          </Grid>
                                        </> : <>
                                          <Grid item xs={12}>
                                            <img src={`http://jenilsavla.pythonanywhere.com` + item.picture}
                                              style={{ width: "100%", height: "43vh", borderRadius: "1.5vh 1.5vh 0vh 0vh" }} />
                                          </Grid>
                                        </>}
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
                                            <hr style={{ border: "1px solid #582C6F", width: "100%", borderRadius: "5px" }} />
                                            <Grid item xs={12}>
                                              <Grid container spacing={2}>
                                                <Grid item xs={2}>
                                                  <LocalPhoneIcon style={{ fontSize: "5vh", color: "#582C6F" }} />
                                                </Grid>
                                                <Grid item xs={10} >
                                                  <div style={{ fontSize: "1.25rem", marginTop: "0.7rem" }}>{item.phone}</div>
                                                </Grid>
                                              </Grid>
                                            </Grid>
                                            <Grid item xs={12}>
                                              <Grid container spacing={2}>
                                                <Grid item xs={2}>
                                                  <EventIcon style={{ fontSize: "5vh", color: "#582C6F" }} />
                                                </Grid>
                                                <Grid item xs={5} >
                                                  <div style={{ fontSize: "1.25rem", marginTop: "0.7rem" }}>{item.dob}</div>
                                                </Grid>
                                                <Grid item xs={5} style={{ marginTop: "0.3rem", textAlign: "right", cursor: "pointer" }}
                                                  onClick={() => handleDownload(`http://jenilsavla.pythonanywhere.com` + item.biodata)}>
                                                  <DescriptionIcon style={{
                                                    fontSize: "3.5vh", color: "#582C6F",
                                                    backgroundColor: "#C4CFFE", padding: "0.25rem", borderRadius: "0.5rem 0rem 0rem 0.5rem"
                                                  }} />
                                                  <KeyboardDoubleArrowRightIcon style={{
                                                    fontSize: "3.5vh", color: "#582C6F",
                                                    backgroundColor: "#C4CFFE", padding: "0.25rem", borderRadius: "0rem 0.5rem 0.5rem 0rem"
                                                  }} />
                                                </Grid>
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  )
                                })}</> : <><Loader /></>}

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