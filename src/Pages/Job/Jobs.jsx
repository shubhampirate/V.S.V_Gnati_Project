/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import PhoneIcon from '@mui/icons-material/Phone';

import "./Job.css";
import axios from "axios";

const Jobs = () => {

  const [load, setLoad] = useState([]);
  const [loadcompany, setCompany] = useState([]);
  const [showMoreCompany, setShowMoreCompany] = useState(false);
  const [jobid, setJobid] = useState([]);
 
  useEffect(() => {
    loadList();
  }, []);



  const loadList = async () => {
    //const token = localStorage.getItem("token")
    const result = await axios.get(
      "http://jenilsavla.pythonanywhere.com/api/jobs",
      {
        headers: {
          Authorization: "Token ebeb63c068b02f00c0797a0c8edc06575c139fbb",
        },
      }
    );
    setLoad(result.data.data.jobs);
  };

  //console.log(load);
  const loadcompanyfunc = async (id) => {
    //const token = localStorage.getItem("token")
    const result = await axios.get(
      `http://jenilsavla.pythonanywhere.com/api/company/${id}`,
      {
        headers: {
          Authorization: "Token ebeb63c068b02f00c0797a0c8edc06575c139fbb",
        },
      }
    );
    setCompany(result.data.data);
  };

  const companyDetails = (id, job) => {
    loadcompanyfunc(id);
    setJobid(job);
    setShowMoreCompany(!showMoreCompany);
  };
  //console.log(loadcompany);

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={2} sx={{ paddingLeft: "5%", paddingRight: "3%", }}>
            <Grid item xs={12} sx={{ marginTop: "2.5rem" }}>
              <div style={{ fontSize: "3rem", fontWeight: "700" }}>
                Job Opportunity
              </div>
            </Grid>
            <Grid item xs={12}>
              <div style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>
                One Step closer to your new Job
              </div>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2} style={{textAlign:"center"}}>
                <Grid item xs={8}>

                </Grid>
                <Grid item xs={4}>

                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {load.map((item) => {
              return (
                <Grid item xs={12} md={4} sm={6} style={{
                  paddingLeft: "5%", paddingRight: "2.5%",
                }}>
                  <Grid container spacing={2} sx={{ borderRadius: "2vh", padding: "1rem" }}>
                    <Grid item xs={12}
                      style={{
                        padding: "1rem", marginLeft: "16px", marginTop: "-0.75rem", color: "#E0E1DC",
                        borderRadius: "1.5vh", backgroundColor: "#018d8d"
                      }}>
                      <Grid container spacing={1} sx={{ textAlign: "left", marginTop: "0.5vh" }}>
                        <Grid item xs={12}>
                          <div style={{ fontSize: "1.1rem" }}>{item.type}</div>
                        </Grid>
                        <Grid item xs={12}>
                          <div style={{ fontSize: "2rem", fontWeight: "700" }}>{item.title}</div>
                        </Grid>
                        <Grid item xs={12}>
                          <Grid container spacing={2}>
                            <Grid item xs={2}>
                              <PhoneIcon style={{ fontSize: "5vh", color: "#E0E1DC" }} />
                            </Grid>
                            <Grid item xs={5} >
                              <div style={{ fontSize: "1.25rem", marginTop: "0.5rem" }}>{item.phone}</div>
                            </Grid>
                            <Grid item xs={5} style={{ marginTop: "0.3rem", textAlign: "right" }}>
                              <HomeWorkIcon style={{
                                fontSize: "3.5vh", color: "#018d8d", cursor: "pointer",
                                backgroundColor: "#90cfd3", padding: "0.25rem", borderRadius: "0.5rem 0rem 0rem 0.5rem"
                              }}
                                onClick={() =>
                                  companyDetails(item.company, item.id)
                                } />
                              <KeyboardDoubleArrowRightIcon style={{
                                fontSize: "3.5vh", color: "#018d8d",
                                backgroundColor: "#90cfd3", padding: "0.25rem", borderRadius: "0rem 0.5rem 0.5rem 0rem"
                              }} />
                            </Grid>
                          </Grid>
                        </Grid>
                        {showMoreCompany && jobid === item.id ? (
                          <>
                            {loadcompany ? (
                              <>
                                <hr style={{
                                  border: "1px solid #E0E1DC", width: "100%",
                                  borderRadius: "5px", marginLeft: "0.5rem"
                                }} />
                                {/*<Grid item xs={12}>
                                  <img src={`http://jenilsavla.pythonanywhere.com` + loadcompany.picture}
                                    style={{ width: "100%", height: "35vh", borderRadius: "1.5vh " }} />
                              </Grid>
                              */}
                                <Grid item xs={12}>
                                  <Grid container spacing={2}>
                                    <Grid item xs={9}>
                                      <div style={{ fontSize: "2rem", fontWeight: "700" }}>{loadcompany.name}</div>
                                    </Grid>
                                    <Grid item xs={3} style={{ textAlign: "right" }}>
                                      <img src={`http://jenilsavla.pythonanywhere.com` + loadcompany.picture}
                                        style={{ width: "5vh", height: "5vh", borderRadius: "0.5vh " }} />
                                    </Grid>
                                  </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                  <Grid container spacing={2}>
                                    <Grid item xs={2}>
                                      <LocationOnIcon style={{ fontSize: "5vh", color: "#E0E1DC" }} />
                                    </Grid>
                                    <Grid item xs={10} >
                                      <div style={{ fontSize: "1.25rem", marginTop: "0.5rem" }}>{loadcompany.address}</div>
                                    </Grid>
                                  </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                  <Grid container spacing={2}>
                                    <Grid item xs={2}>
                                      <EmailIcon style={{ fontSize: "5vh", color: "#E0E1DC" }} />
                                    </Grid>
                                    <Grid item xs={10} >
                                      <div style={{ fontSize: "1.25rem", marginTop: "0.5rem" }}>{loadcompany.email}</div>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </>
                            ) : (
                              <></>
                            )}
                          </>
                        ) : (
                          <></>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              )
            })}
          </Grid>
        </Grid>
      </Grid>
    </Box >
  );
};

export default Jobs;
