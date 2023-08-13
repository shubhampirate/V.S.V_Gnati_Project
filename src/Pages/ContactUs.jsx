import React from 'react'
import { Grid, TextField, Button, Box, Paper, Typography } from '@mui/material'

import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";

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
              <div style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>We're here to help you!</div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={8}>
          <Grid container pl={4} pr={4}>
            <Grid item xs={12}>
              <div style={{ fontSize: "2rem", fontWeight: "700", textAlign: "left", marginBottom: "1.25rem" }}>Let's Connect</div>
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
                          style={{ backgroundColor: "#018d8d", fontSize: "1.05rem", marginTop: "1rem" }}
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
        <Grid item xs={12} sm={12} md={4}>
          <Grid container spacing={2} pl={4} pr={4}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <div style={{ textAlign: "left" }}>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      <li style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <PhoneIcon style={{ fontSize: "2rem" }} /> &nbsp;
                        <span style={{ marginLeft: '10px', fontSize: "1.25rem" }}> +1234567890</span>
                      </li>
                      <li style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <EmailIcon style={{ fontSize: "2rem" }} /> &nbsp;
                        <span style={{ marginLeft: '10px', fontSize: "1.25rem" }}> example@example.com</span>
                      </li>
                      <li style={{ display: 'flex', alignItems: 'center' }}>
                        <LocationOnIcon style={{ fontSize: "2rem" }} /> &nbsp;
                        <span style={{ marginLeft: '10px', fontSize: "1.25rem" }}> 803, Natraj Society, Sodawala Lane, Borivali (W), Mumbai - 400092</span>
                      </li>
                      <li>
                        <iframe
                          title="Google Maps Location"
                          width="100%"
                          height="300"
                          frameBorder="0"
                          style={{ border: 0, marginTop: "1.25rem" }}
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.1169827869567!2d72.8538461!3d19.2337328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b1e294b07269%3A0x991cbbccaf65fb2e!2sNatraj%20society!5e0!3m2!1sen!2sin!4v1691932561651!5m2!1sen!2sin"
                          allowFullScreen
                        ></iframe>
                      </li>
                    </ul>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ContactUs