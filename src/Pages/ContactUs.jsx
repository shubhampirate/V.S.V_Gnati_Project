import React from 'react'
import { Grid, TextField, Button, Box } from '@mui/material'
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';
import Looks4Icon from '@mui/icons-material/Looks4';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
const ContactUs = () => {


  //const wallp = [wallpaper3, wallpaper, wallpaper2];

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={2} style={{ paddingLeft: "5%", paddingRight: "2.5%" }}>
            <Grid item xs={12} sx={{ marginTop: "2.5rem" }}>
              <div style={{ fontSize: "3rem", fontWeight: "700" }}>Conatct Us</div>
            </Grid>
            <Grid item xs={12}>
              <div style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>Your life partner search ends here</div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ContactUs