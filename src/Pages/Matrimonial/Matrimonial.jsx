import React, { useState, useEffect } from 'react'
import { Box, Button, Grid } from '@mui/material'
import mainevent from '../../Images/eventsmain.jpg'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Modal } from "react-responsive-modal";
import { Link } from 'react-router-dom';
import girl from "../../Images/girl.webp"
import boy from "../../Images/boy.webp"
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
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div style={{ fontSize: "3rem", fontWeight: "700" }}>Matrimonial</div>
            </Grid>
            <Grid item xs={12} sx={{ marginTop: "-1rem" }}>
              <div style={{ fontSize: "2rem", fontWeight: "600" }}>Your life partner search ends here</div>
            </Grid>
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
                                  <Grid item xs={12} md={3} sm={6}>
                                    <Grid container spacing={2} sx={{ borderRadius: "2vh", padding: "1rem" }}>
                                      <Grid item xs={12} style={{ height: "35vh" }}>
                                        <img src={girl} style={{ width: "100%", borderRadius: "1.5vh" }} />
                                      </Grid>
                                      <Grid item xs={12}>
                                        <Grid container spacing={1} sx={{ textAlign: "left" }}>
                                          <Grid item xs={12}>
                                            <div style={{ fontSize: "2rem", fontWeight: "700", marginTop: "0.5rem" }}>{item.name}</div>
                                          </Grid>
                                          <Grid item xs={12} md={6} sm={12}>
                                            <div style={{ fontSize: "1.1rem" }}>{item.fathers_name}</div>
                                          </Grid>
                                          <Grid item xs={12} md={6} sm={12}>
                                            <div style={{ fontSize: "1.1rem" }}>+91 {item.phone}</div>
                                          </Grid>
                                          <Grid item xs={12}>
                                            <div style={{ fontSize: "1.1rem" }}>{item.dob}</div>
                                          </Grid>
                                          <Grid item xs={12}>
                                            <div style={{ fontSize: "1.1rem" }}>{item.about}</div>
                                          </Grid>
                                          <Grid item xs={12}>
                                            <div style={{ fontSize: "1.1rem" }}>{item.biodata}</div>
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                )
                              })}
                              <Grid item xs={12} style={{ marginBottom: "2rem", marginTop: "1rem" }}>
                                <button onClick={showMore} variant="outlined" style={{ fontSize: "1.25rem", borderRadius: "1vh" }}>Load More</button>
                              </Grid>
                            </Grid>
                          </TabPanel>
                        </> :
                        <>
                          <TabPanel>
                            <Grid container spacing={2}>
                              {loadMale.slice(0, visible).map((item) => {
                                return (
                                  <Grid item xs={12} md={3} sm={6}>
                                    <Grid container spacing={2} sx={{ borderRadius: "2vh", padding: "1rem" }}>
                                      <Grid item xs={12} style={{ height: "35vh" }}>
                                        <img src={boy} style={{ width: "100%", borderRadius: "1.5vh" }} />
                                      </Grid>
                                      <Grid item xs={12}>
                                        <Grid container spacing={1} sx={{ textAlign: "left" }}>
                                          <Grid item xs={12}>
                                            <div style={{ fontSize: "2rem", fontWeight: "700", marginTop: "0.5rem" }}>{item.name}</div>
                                          </Grid>
                                          <Grid item xs={12} md={6} sm={12}>
                                            <div style={{ fontSize: "1.1rem" }}>{item.fathers_name}</div>
                                          </Grid>
                                          <Grid item xs={12} md={6} sm={12}>
                                            <div style={{ fontSize: "1.1rem" }}>+91 {item.phone}</div>
                                          </Grid>
                                          <Grid item xs={12}>
                                            <div style={{ fontSize: "1.1rem" }}>{item.dob}</div>
                                          </Grid>
                                          <Grid item xs={12}>
                                            <div style={{ fontSize: "1.1rem" }}>{item.about}</div>
                                          </Grid>
                                          <Grid item xs={12}>
                                            <u style={{ fontSize: "1.3rem" }}>{item.biodata}</u>
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                )
                              })}
                              <Grid item xs={12} style={{ marginBottom: "2rem", marginTop: "1rem" }}>
                                <button onClick={showMore} variant="outlined" style={{ fontSize: "1.25rem", borderRadius: "1vh" }}>Load More</button>
                              </Grid>
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

    </Box >
  )
}

export default Matrimonial