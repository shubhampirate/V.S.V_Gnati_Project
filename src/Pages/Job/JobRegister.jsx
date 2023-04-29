/* eslint-disable no-unused-vars */
import {
    Grid, InputAdornment,
    TextField, Button, InputLabel, Select, MenuItem
} from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useFormik } from "formik";
import * as yup from 'yup';
import PostAddIcon from '@mui/icons-material/PostAdd';
import Swal from 'sweetalert2';
import axios from 'axios';
import '../../Components/Table.css'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';


const validationSchemaJob = yup.object({
    details: yup
        .string('Enter a short Description about your Job')
        .required('Job description is required'),
    phone: yup
        .string('Enter your Phone Number')
        .required('Phone Number is required'),
    job_title: yup
        .string('Enter Job Title you')
        .required('Job Title is required'),

    job_type: yup
        .string('Enter Job Type')
        .required('Job Type is required'),
});

const Jobadmin = () => {
    const formikJob = useFormik({
        initialValues: {
            details: '',
            job_type: '',
            job_title: '',
            phone: '',
        },
        validationSchema: validationSchemaJob,
        onSubmit: (values) => {
            console.log(values);
            const formData = new FormData();
            formData.append("title", values.job_title);
            formData.append("type", values.job_type);
            formData.append("details", values.details);
            formData.append("phone", values.phone);
            fetch("http://jenilsavla.pythonanywhere.com/api/jobs/", {
                method: "POST",
                headers: {
                    "Authorization": "Token ebeb63c068b02f00c0797a0c8edc06575c139fbb",
                },
                body: formData,
            })
                .then((result) => {
                    console.log(result)
                    Swal.fire({
                        icon: 'success',
                        title: 'Successfully Added the Job',
                        showConfirmButton: false,
                        timer: 4000
                    })
                    loadListjob();
                })
                .catch(() => {
                    alert('Error in the Code');
                });
        }
    });

    const [visible, setVisible] = useState(4);

    const showMore = () => {
        setVisible((preVisible) => preVisible + 4);
    }

    const [loadjob, setLoadjob] = useState([]);
    useEffect(() => {
        loadListjob();
    }, []);

    const loadListjob = async () => {
        //const token = localStorage.getItem("token")
        const result = await axios.get("http://jenilsavla.pythonanywhere.com/api/jobs", {
            headers: { "Authorization": `Token ebeb63c068b02f00c0797a0c8edc06575c139fbb` },
        });
        setLoadjob(result.data.data.jobs);

    };
    console.log(loadjob);

    const [showJob, setShowJob] = useState(false);
    const showComponentJob = (e) => { setShowJob(!showJob) }
    return (
        <div>
            <Grid container spacing={2} style={{ marginLeft: "-0.5rem", padding: "2%" }}>
                <Grid item xs={12} style={{ marginBottom: "1rem" }}>
                    <Grid container spacing={2}>
                        <Grid item xs={10}>
                            <div style={{ fontSize: "2.7rem", textAlign: "left"}} className="top-marg">
                                Add New Job Details
                            </div>
                        </Grid>
                        <Grid item xs={2} sx={{ textAlign: "right" }}>
                            <PostAddIcon sx={{ fontSize: "3rem", cursor: "pointer" }} onClick={showComponentJob} />
                        </Grid>
                    </Grid>
                    {showJob ?
                        <>
                            <div>
                                <form onSubmit={formikJob.handleSubmit} >
                                    <Grid container spacing={2} marginTop={2}>
                                        <Grid item xs={12} md={6} sm={12}>
                                            <TextField
                                                id="job_title"
                                                name="job_title"
                                                label="Job Title"
                                                color='success'
                                                value={formikJob.values.job_title}
                                                onChange={formikJob.handleChange}
                                                error={formikJob.touched.job_title && Boolean(formikJob.errors.job_title)}
                                                helperText={formikJob.touched.job_title && formikJob.errors.job_title}
                                                sx={{ width: "100%" }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6} sm={12}>
                                            <TextField
                                                id="job_type"
                                                name="job_type"
                                                label="Job Type"
                                                color='success'
                                                value={formikJob.values.job_type}
                                                onChange={formikJob.handleChange}
                                                error={formikJob.touched.job_type && Boolean(formikJob.errors.job_type)}
                                                helperText={formikJob.touched.job_type && formikJob.errors.job_type}
                                                sx={{ width: "100%" }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                id="details"
                                                name="details"
                                                label="Job Details"
                                                color='success'
                                                multiline
                                                maxRows={3}
                                                value={formikJob.values.details}
                                                onChange={formikJob.handleChange}
                                                error={formikJob.touched.details && Boolean(formikJob.errors.details)}
                                                helperText={formikJob.touched.details && formikJob.errors.details}
                                                sx={{ width: "100%" }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6} sm={12}>
                                            <TextField
                                                id="phone"
                                                name="phone"
                                                label="Mobile Number"
                                                color='success'
                                                value={formikJob.values.phone}
                                                onChange={formikJob.handleChange}
                                                error={formikJob.touched.phone && Boolean(formikJob.errors.phone)}
                                                helperText={formikJob.touched.phone && formikJob.errors.phone}
                                                sx={{ width: "100%" }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6} sm={12}>
                                            <Button color="success" variant="contained" type="submit"
                                                sx={{ width: "100%", height: "3.5rem", fontSize: "1.1rem" }}>
                                                Submit
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </div>
                        </> : <></>
                    }
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2} >
                        <Grid item xs={12} style={{ fontSize: "1.5rem", textAlign: "left" }}>
                            <Table>
                                <Thead>
                                    <Tr>
                                        <Th style={{
                                            fontWeight: "bold",
                                            backgroundColor: "#000",
                                            color: "#fff",
                                            border: "1px solid #000",
                                            padding: "0.75rem",
                                            textAlign: "left"
                                        }}>Job Name</Th>
                                        <Th style={{
                                            fontWeight: "bold",
                                            backgroundColor: "#000",
                                            color: "#fff",
                                            border: "1px solid #000",
                                            padding: "0.75rem",
                                            textAlign: "left"
                                        }}>Job Type</Th>
                                        <Th style={{
                                            fontWeight: "bold",
                                            backgroundColor: "#000",
                                            color: "#fff",
                                            border: "1px solid #000",
                                            padding: "0.75rem",
                                            textAlign: "left"
                                        }}>Job Number</Th>
                                        <Th style={{
                                            fontWeight: "bold",
                                            backgroundColor: "#000",
                                            color: "#fff",
                                            border: "1px solid #000",
                                            padding: "0.75rem",
                                            textAlign: "left"
                                        }}>Job Details</Th>
                                    </Tr>
                                </Thead>
                                {loadjob.map((item) => {
                                    return (
                                        <Tbody>
                                            <Tr>
                                                <Td style={{
                                                    border: "1px solid #000",
                                                    padding: "0.75rem",
                                                    textAlign: "left"
                                                }}>{item.title}</Td>
                                                <Td style={{
                                                    border: "1px solid #000",
                                                    padding: "0.75rem",
                                                    textAlign: "left"
                                                }}>{item.type}</Td>
                                                <Td style={{
                                                    border: "1px solid #000",
                                                    padding: "0.75rem",
                                                    textAlign: "left"
                                                }}>{item.phone}</Td>
                                                <Td style={{
                                                    border: "1px solid #000",
                                                    padding: "0.75rem",
                                                    textAlign: "left"
                                                }}>{item.details}</Td>
                                            </Tr>
                                        </Tbody>
                                    )
                                })}
                            </Table>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div >
    )
}

export default Jobadmin