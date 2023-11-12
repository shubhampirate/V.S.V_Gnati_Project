import React from 'react'
import { Grid, TextField, Button, Box } from '@mui/material'
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import wallpaper from "../images/contactUsWallpaper.jpg"
import '../Components/Home.css';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import phone from "../images/phoneNumber.png"
import email from "../images/email.png"
import address from "../images/address.png"

const SUPPORTED_FORMATS = ["image/jpeg", "image/jpg", "image/png"];
const FILE_SIZE = 524288;
const phoneNumberRegEx = /^\d{10}$/;
const PasswordRegEx = /^.*((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;

const validationSchema = yup.object({
  name: yup
    .string()
    .required("Name is required"),

  email: yup.string().email("Enter a Vaid Email").required("Email is Required"),

  message: yup
    .string()
    .required("Message is required"),

  phoneNumber: yup
    .string()
    .matches(phoneNumberRegEx, "Invalid Phone Number")
    .required("Phone number is required"),

});

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'light'
      ? 'rgba(255, 255, 255, .0)'
      : 'rgba(0, 0, 0, .0)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .5)',
}));

const ContactUs = () => {


  const initialValue = {
    name: "",
    email: "",
    phoneNumber: "",
    message: "",
  };

  const handleSubmit = (values, props) => {
    console.log(values);
    alert(JSON.stringify(values));

    props.resetForm();
  };

  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Box>
      <Grid item xs={12} className="contact-section">
        <Grid container p={2} spacing={2}>
          <Grid item xs={12} sm={12} md={7} >
            <Grid container p={2} style={{ marginTop: "-0.025rem" }} className='info-background'>
              <Grid item xs={12} style={{ fontSize: "2rem", marginBottom: "1rem", textAlign: "left", color: "black" }}>
                Contact Us
              </Grid>
              <Grid item xs={12}
                style={{
                  fontSize: "1.2rem", textAlign: "justify",
                  marginBottom: "1rem", color: "black"
                }}>
                Feel a part of our vibrant community by reaching out through our Contact Us page.
                Join us in shaping the future together, whether you have questions, ideas,
                or simply want to connect. We're here to foster a welcoming space where your voice matters
              </Grid>
              <Grid item xs={12} style={{
                marginRight: "2%", textAlign: "justify"
              }}>
                < div >
                  <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}
                    sx={{ backgroundColor: "rgba(206,245,211,0.95)" }}>
                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" >
                      <div>Fostering Collaboration</div>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div>
                        VSV Gnati Samasta strengthens familial bonds within the community by fostering cultural
                        unity and providing a platform for shared traditions among individuals of the same caste.
                      </div>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}
                    sx={{ backgroundColor: "rgba(216,213,237, 0.95)" }}>
                    <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                      <div>Uplifting Lives</div>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div>
                        VSV Gnati Samasta uplifts lives by creating a supportive network within the community,
                        offering educational and skill-building programs, and implementing social initiatives
                        that enhance overall well-being, fostering a positive and empowered environment for its members.
                      </div>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}
                    sx={{ backgroundColor: "rgba(179,182,227,0.95)" }}>
                    <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                      <div>Facilitating Connections</div>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div>
                        VSV Gnati Samasta facilitates stronger connections through regular community meets,
                        providing a platform for members to engage, share experiences, and celebrate shared
                        heritage. These gatherings foster a sense of unity and belonging, strengthening the
                        social fabric of the community.
                      </div>
                    </AccordionDetails>
                  </Accordion>
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={5}>
            <Grid container p={4} className='form-background'>
              <Grid item xs={12}>
                {/* <div style={{ fontSize: "2rem", fontWeight: "700", textAlign: "left", marginBottom: "1rem" }}>Let's Connect</div> */}
                <Box>
                  <Formik
                    initialValues={initialValue}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                  >
                    {(props) => {
                      const { name } = props.values;
                      return (
                        <Form>
                          {/* First Way */}
                          <TextField
                            label="Name"
                            name="name"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            value={name}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            helperText={<ErrorMessage name="name" />}
                            error={props.errors.name && props.touched.name}

                          />
                          {/* Second Way */}
                          <Field
                            as={TextField}
                            label="Email"
                            type="Email"
                            name="email"
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            helperText={<ErrorMessage name="email" />}
                            error={props.errors.email && props.touched.email}
                          />

                          <Field
                            as={TextField}
                            label="Phone Number"
                            name="phoneNumber"
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            helperText={<ErrorMessage name="phoneNumber" />}
                            error={
                              props.errors.phoneNumber && props.touched.phoneNumber
                            }
                          />

                          <TextField
                            label="Message"
                            name="message"
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            multiline
                            rows={3}
                            maxRows={4}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            helperText={<ErrorMessage name="message" />}
                            error={props.errors.message && props.touched.message}

                          />

                          <Button
                            variant="contained"
                            type="submit"
                            color="primary"
                            fullWidth
                            style={{
                              backgroundColor: "#08B499", fontSize: "1.05rem",
                              marginTop: "1rem", height: "2.5rem", boxShadow: "none", cursor: "pointer"
                            }}
                          >
                            Submit
                          </Button>
                        </Form>
                      );
                    }}
                  </Formik>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid >
      <Grid item xs={12}>
        <Grid container p={4} style={{ backgroundColor: "#fff" }}>
          <Grid item xs={12} md={4} sm={4}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <img src={phone} style={{ width: "4.5rem", height: "4.5rem", marginTop: "1rem" }} />
              </Grid>
              <Grid item xs={12} style={{ fontSize: "1.5rem", color: "#5E989C" }}>
                Contact Number
              </Grid>
              <Grid item xs={12} style={{ fontSize: "1.2rem", color: "#5E989C", paddingLeft: "1.5rem", paddingRight: "1.5rem", marginBottom: "2rem" }}>
                <a href="tel:+91 9820537159" style={{ textDecoration: "none", color: "#5E989C", cursor: "pointer" }}>+91 9820537159</a>
                <br /> <a href="tel:+91 9819001855" style={{ textDecoration: "none", color: "#5E989C", cursor: "pointer" }}>+91 9819001855</a>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4} sm={4}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <img src={email} style={{ width: "4.5rem", height: "4.5rem", marginTop: "1rem" }} />
              </Grid>
              <Grid item xs={12} style={{ fontSize: "1.5rem", color: "#6C60A8" }}>
                Email
              </Grid>
              <Grid item xs={12} style={{ fontSize: "1.25rem", color: "#6C60A8", paddingLeft: "1.5rem", paddingRight: "1.5rem", marginBottom: "2rem" }}>
                <a href="mailto:vsvgnati@gmail.com" style={{ textDecoration: "none", color: "#6C60A8", cursor: "pointer" }}>vsvgnati@gmail.com</a>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4} sm={4} >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <img src={address} style={{ width: "4rem", height: "4rem", marginTop: "1rem" }} />
              </Grid>
              <Grid item xs={12} style={{ fontSize: "1.5rem", color: "#4F225E" }}>
                Address
              </Grid>
              <Grid item xs={12} style={{ fontSize: "1.2rem", color: "#4F225E", paddingLeft: "1.5rem", paddingRight: "1.5rem", marginBottom: "2rem" }}>
                803, Natraj Society, Sodawala Lane, Borivali (W), Mumbai - 400092
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <iframe
          title="Google Maps Location"
          width="100%"
          height="400"
          frameBorder="0"
          style={{ border: 0, marginBottom: "-3.8rem" }}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.1169827869567!2d72.8538461!3d19.2337328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b1e294b07269%3A0x991cbbccaf65fb2e!2sNatraj%20society!5e0!3m2!1sen!2sin!4v1691932561651!5m2!1sen!2sin"
          allowFullScreen
        ></iframe>
      </Grid>
    </Box >
  )
}

export default ContactUs