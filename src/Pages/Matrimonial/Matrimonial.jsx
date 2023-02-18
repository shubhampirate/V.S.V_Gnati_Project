import React, { useState } from 'react'
import { Box, Button, Grid } from '@mui/material'
import mainevent from '../../Images/eventsmain.jpg'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Modal } from "react-responsive-modal";
import { Link } from 'react-router-dom';
const Matrimonial = () => {

  const [visible, setVisible] = useState(4);

  const events = ["him", "her"]

  const showMore = () => {
    setVisible((preVisible) => preVisible + 4);
  }

  const upcoming = [
    { name: "Shubham Shah", link: "Link", date: "16-02-2023", desc: "Lorem ipsum dolor sit amet, consectetur  ajsvjsbvjbsbjd Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet, consectetur  ajsvjsbvjbsbjd Lorem ipsum dolor sit amet" },
    { name: "Shubham Shah", link: "Link", date: "15-02-2023", desc: "Lorem ipsum dolor sit amet, consectetur  ajsvjsbvjbsbjd Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet, consectetur  ajsvjsbvjbsbjd Lorem ipsum dolor sit amet" },
    { name: "Shubham Shah", link: "Link", date: "17-02-2023", desc: "Lorem ipsum dolor sit amet, consectetur  ajsvjsbvjbsbjd Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet, consectetur  ajsvjsbvjbsbjd Lorem ipsum dolor sit amet" },
    { name: "Shubham Shah", link: "Link", date: "18-02-2023", desc: "Lorem ipsum dolor sit amet, consectetur  ajsvjsbvjbsbjd Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet, consectetur  ajsvjsbvjbsbjd Lorem ipsum dolor sit amet" },
    { name: "Shubham Shah", link: "Link", date: "19-02-2023", desc: "Lorem ipsum dolor sit amet, consectetur  ajsvjsbvjbsbjd Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet, consectetur  ajsvjsbvjbsbjd Lorem ipsum dolor sit amet" },
    { name: "Shubham Shah", link: "Link", date: "16-02-2023", desc: "Lorem ipsum dolor sit amet, consectetur  ajsvjsbvjbsbjd Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet, consectetur  ajsvjsbvjbsbjd Lorem ipsum dolor sit amet" },
    { name: "Shubham Shah", link: "Link", date: "15-02-2023", desc: "Lorem ipsum dolor sit amet, consectetur  ajsvjsbvjbsbjd Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet, consectetur  ajsvjsbvjbsbjd Lorem ipsum dolor sit amet" },
    { name: "Shubham Shah", link: "Link", date: "17-02-2023", desc: "Lorem ipsum dolor sit amet, consectetur  ajsvjsbvjbsbjd Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet, consectetur  ajsvjsbvjbsbjd Lorem ipsum dolor sit amet" },
    { name: "Shubham Shah", link: "Link", date: "18-02-2023", desc: "Lorem ipsum dolor sit amet, consectetur  ajsvjsbvjbsbjd Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet, consectetur  ajsvjsbvjbsbjd Lorem ipsum dolor sit amet" },
    { name: "Shubham Shah", link: "Link", date: "19-02-2023", desc: "Lorem ipsum dolor sit amet, consectetur  ajsvjsbvjbsbjd Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet, consectetur  ajsvjsbvjbsbjd Lorem ipsum dolor sit amet" }
  ];

  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);



  return (
    <Box>
      <Grid container spacing={2} style={{}}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ marginTop: "2rem" }}>
              <div style={{ fontSize: "2.5rem" }}>Unite with your Family and Friends and have a great time</div>
            </Grid>
            <Grid item xs={12}>
              <div style={{ fontSize: "1.5rem" }}>
                Lorem ipsum dolor sit amet, consectetur  ajsvjsbvjbsbjd Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet, consectetur  ajsvjsbvjbsbjd Lorem ipsum dolor sit amet
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={7} sm={12}>
          <img src={mainevent} style={{ height: "50vh", width: "90%", borderRadius: "5vh" }} />
        </Grid>
        <Grid item xs={12} md={5} sm={12}>
          <Grid container spacing={2} style={{ fontSize: "1.2rem", textAlign: "left", marginTop: "2rem", paddingLeft: "1rem" }}>
            <Grid item xs={12}>
              Lorem ipsum dolor sit amet, consectetur  ajsvjsbvjbsbjd Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet, consectetur  ajsvjsbvjbsbjd Lorem ipsum dolor sit amet
            </Grid>
            <Grid item xs={12}>
              <Button>
                <Link to="/matrimonial/register">Register</Link>
              </Button>
            </Grid>
            <Grid item xs={12}>
              Lorem ipsum dolor sit amet, consectetur  ajsvjsbvjbsbjd Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet, consectetur  ajsvjsbvjbsbjd Lorem ipsum dolor sit amet
            </Grid>
            <Grid item xs={12}>
              <Button>Update</Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div style={{ fontSize: "2.5rem" }}>Matrimonial</div>
            </Grid>
            <Grid item xs={12}>
              <Tabs>
                <TabList style={{ border: "none", fontSize: "1.3rem", marginBottom: "2rem" }}>
                  <Tab style={{ backgroundColor: "transparent", border: "none" }}>HIM</Tab>
                  <Tab style={{ backgroundColor: "transparent", border: "none" }}>HER</Tab>
                </TabList>
                {events.map((item1, key) => {
                  return (
                    <TabPanel>
                      <Grid container spacing={2} sx={{ paddingLeft: "1rem" }}>
                        {upcoming.slice(0, visible).map((item) => {
                          return (
                            <Grid item xs={12} md={3} sm={6}>
                              <Grid container spacing={2} sx={{ borderRadius: "2vh", padding: "1rem" }}>
                                <Grid item xs={12} style={{ height: "30vh", backgroundColor: "greenyellow", borderRadius: "2vh" }}>
                                </Grid>
                                <Grid item xs={12}>
                                  <Grid container spacing={1} sx={{ textAlign: "left" }}>
                                    <Grid item xs={12}>
                                      <div style={{ fontSize: "2rem", fontWeight: "700" }}>{item.name} - {item1}</div>
                                    </Grid>
                                    <Grid item xs={12}>
                                      <div style={{ fontSize: "1.1rem" }}>{item.date}</div>
                                    </Grid>
                                    <Grid item xs={12}>
                                      <div style={{ fontSize: "1.1rem" }}>{item.desc}</div>
                                    </Grid>
                                    <Grid item xs={12}>
                                      <u style={{ fontSize: "1.3rem" }}>{item.link}</u>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          )
                        })}
                        <Grid item xs={12}>
                          <Button onClick={showMore} variant="outlined">Load mOre</Button>
                        </Grid>
                      </Grid>
                    </TabPanel>
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