/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import { Box, Grid, Button } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import PhoneIcon from '@mui/icons-material/Phone';
import Swal from 'sweetalert2';
import { useFormik } from "formik";
import * as yup from 'yup';
import "./Job.css";
import axios from "axios";
import Select from 'react-select';

const Jobs = () => {

  const [load, setLoad] = useState([]);
  const [loadcompany, setCompany] = useState([]);
  const [showMoreCompany, setShowMoreCompany] = useState(false);
  const [jobid, setJobid] = useState([]);

  useEffect(() => {
    loadList();
  }, []);

  const customStyles = {
    control: base => ({
      ...base,
      height: 55,
      minHeight: 55,
      zindex: 15,
      backgroundColor: "transparent"
    }),
    placeholder: (provided, state) => ({
      ...provided,
      textAlign: 'left', // Align the placeholder text to the left
    }),
  };

  const token = localStorage.getItem("tokenvsv")
  const family = localStorage.getItem("familyid")
  const validationSchema = yup.object({
    job_type: yup
      .string()
      .required('Job Type is required'),
  });

  const formik = useFormik({
    initialValues: {
      job_type: null,
    },
    validationSchema: validationSchema,

    onSubmit: (values) => {
      console.log(values);
      fetch("http://jenilsavla.pythonanywhere.com/api/job/0", {
        method: "POST",
        headers: {
          "Authorization": `Token ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: values.job_type
        }),
      })
        .then(response => response.json())
        .then(data => {
          console.log(data.data)
          setLoad(data.data)
        })
        .catch(() => {
          alert('Error in the Code');
        });
    }
  });

  const job_type_options = [
    { value: 'Business', label: 'Business' },
    { value: 'Job', label: 'Job' },
    { value: 'Full-Time', label: 'Full-Time' },
    { value: 'Internship', label: 'Internship' }
  ];

  console.log(load)

  const loadList = async () => {
    const token = localStorage.getItem("tokenvsv")
    const family = localStorage.getItem("familyid")
    if (load.length == 0) {
      //const token = localStorage.getItem("token")
      const result = await axios.get(
        "http://jenilsavla.pythonanywhere.com/api/jobs",
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      setLoad(result.data.data.jobs);
    }
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
              <div>
                <form onSubmit={formik.handleSubmit} >
                  <Grid container spacing={2} style={{ textAlign: "center", marginBottom: "2.5rem" }}>
                    <Grid item xs={12} md={8} sm={8}>
                      <Select
                        id="job_type"
                        name="job_type"
                        placeholder="Job Type"
                        value={job_type_options.find((option) => option.value === formik.values.job_type)}
                        defaultValue={formik.values.job_type}
                        onChange={(selectedOption) => formik.setFieldValue('job_type', selectedOption.value)}
                        options={job_type_options}
                        styles={customStyles}
                      />
                      {formik.touched.job_type && formik.errors.job_type ? (
                        <div style={{ color: "#d65a5a", fontSize: "13px", textAlign: "left", marginLeft: "15px", marginTop: "2px" }}>
                          {formik.errors.job_type}
                        </div>
                      ) : null}
                    </Grid>
                    <Grid item xs={12} md={4} sm={4}>
                      <Button variant="contained" type="submit"
                        sx={{
                          width: "100%", height: "3.5rem", fontSize: "1.1rem",
                          backgroundColor: "#018d8d", boxShadow: "none", color: "white"
                          , "&:hover": {
                            backgroundColor: "#018d8d", boxShadow: "none", color: "white",
                            fontSize: "1.3rem",
                          }
                        }}>
                        Search
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </div>
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
