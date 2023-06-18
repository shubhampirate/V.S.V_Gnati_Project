import React, { useState } from 'react'
import { Grid, Box, Button } from '@mui/material'
import RazorpayModal from './RazorpayModal';
import donate from "../../images/donation.png";

const Donate = () => {

  const [showRazorpay, setShowRazorpay] = useState(false);

  const handleDonation = () => {
    setShowRazorpay(true);
  };


  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={2} style={{ paddingLeft: "5%", paddingRight: "2.5%" }}>
            <Grid item xs={12} sx={{ marginTop: "2.5rem" }}>
              <div style={{ fontSize: "3rem", fontWeight: "700" }}>Donate Today</div>
            </Grid>
            <Grid item xs={12}>
              <img src={donate} style={{ width: "22rem" }} />
            </Grid>
            <Grid item xs={12}>
              <div style={{ fontSize: "1.35rem", marginBottom: "1.5rem", textAlign: "justify", marginRight: "1.2rem" }}>
                Your donation to our society is greatly appreciated.
                It enables us to make a meaningful impact on our community by supporting education,
                healthcare, poverty alleviation, and environmental conservation. Your contribution helps
                uplift the underprivileged, empower marginalized groups, and foster unity. We ensure
                transparency and accountability in handling your donation, and every amount, no matter
                how small, makes a difference. With your support, we can create a better future and
                bring hope to many lives.
              </div>
              <Grid item xs={12}>
                <Button variant="contained" onClick={handleDonation}
                  style={{
                    marginLeft: "-1.1rem", boxShadow: "none", fontWeight: "600", color: "#582c6f",
                    fontSize: "1.3rem", marginBottom: "2.5rem", backgroundColor: "#bdb4e9"
                  }}>
                  Donate Now
                </Button>
                {showRazorpay && <RazorpayModal setShowRazorpay={setShowRazorpay} />}
              </Grid>
              <div style={{ fontSize: "1.7rem", marginBottom: "1.5rem", textAlign: "center", marginRight: "1.2rem" }}>
                Thank you for considering donating to our society.
              </div>
            </Grid>

          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Donate