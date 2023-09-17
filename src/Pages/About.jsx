import React, { useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import "../Components/Home.css"

const About = () => {
  const trustee = [{ name: "Shriman Vinod G. Malkan", position: "Trust Pramukh" },
  { name: "Shriman Dinesh Dharamshi Shah", position: "MG. Trustee" },
  { name: "Shriman Lalit M. Shah", position: "Trustee" },
  { name: "Shriman Narottam K. Malkan", position: "Trustee" },
  { name: "Shriman Mahendra Chatrabhuj Shah", position: "Trustee" },
  ];

  const mainMember = [{ name: "Shriman Sunil Vrajlal Shah", position: "Pramukh" },
  { name: "Shriman Hiren Harakhchand Shah", position: "Uppramukh" },
  { name: "Shriman Kiran Rakesh Shah", position: "Secretary" },
  { name: "Shriman Rahul Prafulchandra Shah", position: "Secretary" },
  { name: "Shriman Sanjay Maneklal Gandhi", position: "Secretary" },
  { name: "Shrimati Sangeeta Ketan Gandhi", position: "Treasurer" },
  { name: "Shriman Piyush R. Shah", position: "Joint Treasurer" },
  ];

  const members = [{ name: "Shriman Ashwin Pranlal Shah", position: "Committee Member" },
  { name: "Shriman Uday M. Saurashtri", position: "Committee Member" },
  { name: "Shriman Jignesh Naveen Shah", position: "Committee Member" },
  { name: "Shriman Shailesh Kapoorchand Shah", position: "Committee Member" },
  { name: "Shriman Shailesh Chimanlal Parekh", position: "Committee Member" },
  { name: "Shriman Mukesh D. Shah", position: "Committee Member" },
  { name: "Shriman Naresh G. Shah", position: "Committee Member" },
  { name: "Shriman Mehul A. Shah", position: "Committee Member" },
  { name: "Shriman Hasmukh J. Shah", position: "Committee Member" },
  { name: "Shriman Ashwin J. Shah", position: "Committee Member" },
  { name: "Shriman Umesh D. Shah", position: "Committee Member" },
  { name: "Shrimati Dimple Nilesh Mavani", position: "Committee Member" },
  { name: "Shrimati Bhavna K. Shah", position: "Committee Member" },
  { name: "Shriman Pranav K. Parekh", position: "Committee Member" },
  ]

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
            <Grid item xs={12}>
              <Grid container spacing={3} style={{ marginTop: "0.75rem" }}>
                <Grid item xs={12} md={4} sm={12} >
                  <Grid item xs={12} style={{ fontSize: "1.5rem", color: "#222A45", textAlign: "center" }}>
                    Transformation
                  </Grid>
                </Grid>
                <Grid item xs={12} md={4} sm={12} >
                  <Grid item xs={12} style={{ fontSize: "1.5rem", color: "#222A45", textAlign: "center" }}>
                    Technology
                  </Grid>
                </Grid>
                <Grid item xs={12} md={4} sm={12} >
                  <Grid item xs={12} style={{ fontSize: "1.5rem", color: "#222A45", textAlign: "center" }}>
                    Transparency
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <br />
            Transformation thorough Technology and Transparency
            The process begins with election, women members in the committee, use of technology by way of you tube live of Shree Samaudri Mataji (Kuldevi) Bhana, Digital Presentation, Atma Nirbhar VSV Yojana, and latest is this digital app.
            This Digital App and Website which will not only be a Vasti Patrak but also a self-supported portal which can be used as a marriage bureau, job portal, donation collector, communication of activities to gnati at large by all mandals and many more.
          </div>
        </Grid>
        <Grid item xs={12} sx={{ marginTop: "2.5rem" }}>
          <div style={{ fontSize: "2.5rem", fontWeight: "700", textAlign: "right" }}>
            <span className='underline-header' style={{ padding: "0rem 0.5rem " }}>V.S.V Gnati Samsta Activities</span></div>
        </Grid>
        <Grid item xs={12} sx={{ marginBottom: "2.5rem", textAlign: "justify" }}>
          <div style={{ fontSize: "1.25rem", fontWeight: "500" }}>
            Shree Mumbai Visa Sorathiya Vanik Gnati Samast (Varishth Mandal) is the core mandal of Gnati with sole intention of welfare and upliftment of the gnati. The Varishth mandal has main activity of giving Rahat hapta to the needy members of the gnati, Vidhva Sahay, Rehthan Sahay, bought up harmony amongst the ganti members by organising picnic and social gatherings, cultural and traditional program, carry out the Kudevi Shree Samudri Mata Bhana and Patotsav on behalf of the whole gnati for the blessing of Shree Samudri Mata on the whole Gnati, Maintaining Property of Gnati at Kalbadevi & Nathdwara.
            The present committee has added one more program of Atam Nirbahr VSV with the sole intention of making the gnati self-reliant a step of transformation from “Rahat” to “Rah to earn”.
            Visa Sorthiya Vanik has leaped for the first ever major transformation in 2019 when Shree Mumbai Visa Sorathiya Vanik Gnati Samast (Varishth Mandal) has decided to form a committee by way of election giving away the old tradition of selection. The Present Committee elected in 2019 is the first ever elected committee of the GNATI beside that this committee has first ever women members in the committee.          </div>
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12} style={{ fontSize: "2rem", paddingLeft: "10%", paddingRight: "5%" }}>
            <span className='underline'>Connect with the Minds Steering Our Community</span>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <div className="center-table">
            <h2>Trustees</h2>
            <table>
              <thead>
                <tr>
                  <th style={{ width: '60%', textAlign: "left" }}>Name</th>
                  <th style={{ width: '40%', textAlign: "left" }}>Position</th>
                </tr>
              </thead>
              <tbody>
                {trustee.map((item) => {
                  return (
                    <tr>
                      <td style={{ textAlign: 'left' }}>{item.name}</td>
                      <td style={{ textAlign: 'left' }}>{item.position}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className="center-table">
            <h2>Committee Members</h2>
            <table>
              <thead>
                <tr>
                  <th style={{ width: '60%', textAlign: "left" }}>Name</th>
                  <th style={{ width: '40%', textAlign: "left" }}>Position</th>
                </tr>
              </thead>
              <tbody>
                {mainMember.map((item) => {
                  return (
                    <tr>
                      <td style={{ textAlign: 'left' }}>{item.name}</td>
                      <td style={{ textAlign: 'left' }}>{item.position}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className="center-table">
            <table>
              <thead>
                <tr>
                  <th style={{ width: '60%', textAlign: "left" }}>Name</th>
                  <th style={{ width: '40%', textAlign: "left" }}>Position</th>
                </tr>
              </thead>
              <tbody>
                {members.map((item) => {
                  return (
                    <tr>
                      <td style={{ textAlign: 'left' }}>{item.name}</td>
                      <td style={{ textAlign: 'left' }}>{item.position}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default About
