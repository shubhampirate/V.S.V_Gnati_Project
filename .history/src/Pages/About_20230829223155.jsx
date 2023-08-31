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
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#f0f0f0',
    padding: '10px 20px',
    boxSizing: 'border-box',
    flexWrap: 'wrap', // Allow flex items to wrap on smaller screens
  };

  const wordStyle = {
    flex: '1 1 calc(33.33% - 20px)', // Equal width for larger screens
    minWidth: '100px', // Minimum width to prevent excessive shrinking
    textAlign: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '5px', // Add spacing between words
  };
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
                Shree Mumbai Visa Sorathiya Vanik Gnati Samast has in all around 20 mandals. The core and main Mandal is Shree Mumbai Visa Sorathiya Vanik Gnati Samast (Varishth Mandal) which was established in 1940. The other mandals are Srvodaya Madal, Mahila Mandal, Porbandar Boarding Mandal, Pragati Mitra Mandal, Kandivli Yuvak Mandal, Navchetan Mandal, Navyug Mandal, Goregaon Mandal,……. . All mandals carry out different activities of religious functions like Kuldevi Shree Samudrimata Bhana, Bhagwat Saptah, Mala Pehramani, picnics, Rahat by way of Vidhva Sahay, Rehtahan Sahay, Rahta Haptah, Sikhsan Sahay, Note Book Distributions, get-together and social gathering, cultural and traditional program
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
         Being the Varishth Mandal it is prime duty to bring transparency in the functioning of Gnati. The upliftment of Gnati and take the gnati to the next level by participation of more and more gnatijan and bring them in the main stream of the gnati. Further, it is our duty to align the youth of the gnati to the mainstream and participate in the ganti activiely.  
The Committee has been formed with main focus on 3T 
<hr />
<hr />
{/* <hr /> */}

<Grid item xs={12}>
          <Grid container spacing={3}>
           
            <Grid item xs={12} md={4} sm={12} style={{ backgroundColor: "#CEF5D3" }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  {/* <img src={Culture} style={{ width: "4.5rem", height: "4.5rem" }} /> */}
                </Grid>
                <Grid item xs={12} style={{ fontSize: "1.5rem", color: "#222A45" }}>
                  Culture
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={4} sm={12} style={{ backgroundColor: "#DFFCD9" }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  {/* <img src={education} style={{ width: "4.5rem", height: "4.5rem" }} /> */}
                </Grid>
                <Grid item xs={12} style={{ fontSize: "1.5rem", color: "#005500" }}>
                  Education
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={4} sm={12} style={{ backgroundColor: "#D8D5ED" }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  {/* <img src={global} style={{ width: "4.5rem", height: "4.5rem" }} /> */}
                </Grid>
                <Grid item xs={12} style={{ fontSize: "1.5rem", color: "#4F225E" }}>
                  Global Network
                </Grid>
                <Grid item xs={12} style={{ fontSize: "1rem", color: "#4F225E", paddingLeft: "1.5rem", paddingRight: "1.5rem", marginBottom: "2rem" }}>
                  Connecting Hearts Worldwide<br /> Bridging Cultures, Creating Bonds.
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
{/* 
<h4>•	Transformation</h4>
<h4>•	Technology</h4>
<h4>•	Transparency</h4>
<div style={containerStyle}>
      <h1 style={wordStyle}>Transformation</h1>
      <h1 style={wordStyle}>Transformation</h1>
      <h1 style={wordStyle}></h1>
    </div>
     */}

Transformation thorough Technology and Transparency
The process begins with election, women members in the committee, use of technology by way of you tube live of Shree Samaudri Mataji (Kuldevi) Bhana, Digital Presentation, Atma Nirbhar VSV Yojana, and latest is this digital app. 

This Digital App and Website which will not only be a Vasti Patrak but also a self-supported portal which can be used as a marriage bureau, job portal, donation collector, communication of activities to gnati at large by all mandals and many more.
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
