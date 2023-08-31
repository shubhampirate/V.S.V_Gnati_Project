import React from 'react'
import { Grid } from '@mui/material'
import "../Components/Home.css"
import avatar from "../images/couple.png"
import profile from "../images/profile.png"
import position from "../images/position.png"
import photo from "../images/photo.webp";

const data = [{
  name: "Shubham Shah",
  position: "Secretary",
}, {
  name: "Shubham Shah",
  position: "Secretary",
}, {
  name: "Shubham Shah",
  position: "Secretary",
}, {
  name: "Shubham Shah",
  position: "Secretary",
}, {
  name: "Shubham Shah",
  position: "Secretary",
}, {
  name: "Shubham Shah",
  position: "Secretary",
}, {
  name: "Shubham Shah",
  position: "Secretary",
},
]

const dataSub = [{
  name: "Shubham Shah",
  position: "Secretary",
}, {
  name: "Shubham Shah",
  position: "Secretary",
}, {
  name: "Shubham Shah",
  position: "Secretary",
}, {
  name: "Shubham Shah",
  position: "Secretary",
}, {
  name: "Shubham Shah",
  position: "Secretary",
}, {
  name: "Shubham Shah",
  position: "Secretary",
}, {
  name: "Shubham Shah",
  position: "Secretary",
}, {
  name: "Shubham Shah",
  position: "Secretary",
}, {
  name: "Shubham Shah",
  position: "Secretary",
}, {
  name: "Shubham Shah",
  position: "Secretary",
}, {
  name: "Shubham Shah",
  position: "Secretary",
}, {
  name: "Shubham Shah",
  position: "Secretary",
}, {
  name: "Shubham Shah",
  position: "Secretary",
}, {
  name: "Shubham Shah",
  position: "Secretary",
}, {
  name: "Shubham Shah",
  position: "Secretary",
}, {
  name: "Shubham Shah",
  position: "Secretary",
}, {
  name: "Shubham Shah",
  position: "Secretary",
}, {
  name: "Shubham Shah",
  position: "Secretary",
}, {
  name: "Shubham Shah",
  position: "Secretary",
},
]

const About = () => {
  return (
    <div>
      <Grid container spacing={2} sx={{ padding: "3% 5%", }}>
        <Grid item xs={12} sx={{ marginTop: "2.5rem" }}>
          <div style={{ fontSize: "2.5rem", fontWeight: "700", textAlign: "right" }}>
            <span className='underline-header' style={{ padding: "0rem 0.5rem " }}>V.S.V Gnati Samsta History</span></div>
        </Grid>
        <Grid item xs={12} sx={{ marginBottom: "2.5rem", textAlign: "justify" }}>
          <div style={{ fontSize: "1.25rem", fontWeight: "500" }}>
          Visa Sorthiya Vanik is a Ganti of people from “Sorath” part in Gujrat. The main origin of the gnati is from Sorath and being parted from Pancha, Dasha and then become Visa. The Gantijan are following mainly the “Vaishnav” Religion. The Gnati was originated in Gujrat and spread into two geographical areas over there viz., “Ghed” & “Naghed”.  The Gnatijan moved to cities and abroad in search of job, education and better opportunities. And now the gnati is spread across the globe. The VSV Gnati has overall 2500 plus families all over the world. The maximum gnatijans are now living in Mumbai and in Gujrat/Saurashtra. Over 1650 families of gnatijans are living in Mumbai and majority of them are staying in Kandivali. Shree Mumbai Visa Sorathiya Vanik Gnati Samast (Varishth Mandal) was established in 1940.
          </div>
        </Grid>
        <Grid item xs={12}>
          <Grid container className='about_us_section'>
            <Grid item xs={12} sm={12} md={8}>
              <Grid item xs={12} sx={{ marginTop: "2.5rem" }}>
                <div style={{ fontSize: "2.5rem", fontWeight: "700", textAlign: "left" }}>
                  <span>About V.S.V Gnati Samsta</span></div>
              </Grid>
              <Grid item xs={12} sx={{ marginBottom: "2.5rem", textAlign: "justify", marginTop: "1.5rem" }}>
                <div style={{ fontSize: "1.25rem", fontFamily: "sans-serif" }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                  ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                  voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                  non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                  ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                  voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                  non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </div>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={4}></Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ marginTop: "2.5rem" }}>
          <div style={{ fontSize: "2.5rem", fontWeight: "700", textAlign: "left" }}>
            <span className='underline-header' style={{ padding: "0rem 0.5rem " }}>V.S.V Gnati Samsta Vision</span></div>
        </Grid>
        <Grid item xs={12} sx={{ marginBottom: "2.5rem", textAlign: "justify" }}>
          <div style={{ fontSize: "1.25rem", fontWeight: "500" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
            non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
            non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </div>
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12} style={{ fontSize: "2rem", marginBottom: "3rem", paddingLeft: "10%", paddingRight: "5%" }}>
            <span className='underline'>Connect with the Minds Steering Our Community</span>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {data.map((item) => {
              return (
                <Grid item xs={12} sm={6} md={3}>
                  <div className="row">
                    <div className="folded_corner" style={{ textAlign: "left" }}>
                      <img src={photo} alt="Frontend Development" style={{ width: "100%", height: "80%" }} />
                      <Grid item xs={12}><h2>Shubham Shah</h2></Grid>
                      <Grid item xs={12} style={{ marginTop: "-1rem" }}><h3>Secretary</h3></Grid>
                    </div>
                  </div>
                </Grid>)
            })}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {dataSub.map((item) => {
              return (
                <Grid item xs={12} sm={6} md={3}>
                  <div className="row">
                    <div className="folded_corner_sub" style={{ textAlign: "left" }}>
                      <Grid item xs={12}><h2>Shubham Shah</h2></Grid>
                      <Grid item xs={12} style={{ marginTop: "-1rem" }}><h3>Secretary</h3></Grid>
                    </div>
                  </div>
                </Grid>)
            })}
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default About
