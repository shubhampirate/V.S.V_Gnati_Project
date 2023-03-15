import {
    Grid, InputAdornment,
    TextField, Button, InputLabel, Select, MenuItem
} from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useFormik } from "formik";
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import PostAddIcon from '@mui/icons-material/PostAdd';

const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png"
];

const validationSchema = yup.object({
    nameCompany: yup
        .string('Enter your Full Name')
        .required('Name is required'),
    emailCompany: yup
        .string('Enter your email address')
        .email('Enter a valid email address')
        .required('Email address is required'),
    addressCompany: yup
        .string('Enter your Company Address you')
        .required('Company Address is required'),
    /*details: yup
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
        .required('Job Type is required'),*/
});
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
    const [logo, setLogo] = useState(null);
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            nameCompany: '',
            addressCompany: '',
            emailCompany: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values, logo);
            navigate('/jobs')
        }
    });
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
            navigate('/jobs')
        }
    });
    const [show, setShow] = useState(false);
    const showComponent = (e) => { setShow(!show) }
    const [showJob, setShowJob] = useState(false);
    const showComponentJob = (e) => { setShowJob(!showJob) }
    return (
        <div>
            <Grid container spacing={2} style={{ marginLeft: "-1.5rem", padding: "2rem" }}>
                <Grid item xs={12} md={6} sm={12} style={{ marginBottom: "8rem " }}>
                    <Grid container spacing={2}>
                        <Grid item xs={10}>
                            <div style={{ fontSize: "2.7rem", textAlign: "left", paddingLeft: "1rem" }} className="top-marg">
                                Add New Company
                            </div>
                        </Grid>
                        <Grid item xs={2} sx={{ textAlign: "right" }}>
                            <PostAddIcon sx={{ fontSize: "3rem", cursor: "pointer" }} onClick={showComponent} />
                        </Grid>
                    </Grid>
                    {show ?
                        <>
                            <div>
                                <form onSubmit={formik.handleSubmit} style={{ marginLeft: "1.2rem" }}>
                                    <Grid container spacing={2} marginTop={2}>
                                        <Grid item xs={12}>
                                            <TextField
                                                id="nameCompany"
                                                name="nameCompany"
                                                label="Company Name"
                                                color='success'
                                                value={formik.values.nameCompany}
                                                onChange={formik.handleChange}
                                                error={formik.touched.nameCompany && Boolean(formik.errors.nameCompany)}
                                                helperText={formik.touched.nameCompany && formik.errors.nameCompany}
                                                sx={{ width: "100%" }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                id="emailCompany"
                                                name="emailCompany"
                                                label="Company Email Address"
                                                color='success'
                                                value={formik.values.emailCompany}
                                                onChange={formik.handleChange}
                                                error={formik.touched.emailCompany && Boolean(formik.errors.emailCompany)}
                                                helperText={formik.touched.emailCompany && formik.errors.emailCompany}
                                                sx={{ width: "100%" }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                id="addressCompany"
                                                name="addressCompany"
                                                label="Company Address"
                                                color='success'
                                                multiline
                                                maxRows={3}
                                                value={formik.values.addressCompany}
                                                onChange={formik.handleChange}
                                                error={formik.touched.addressCompany && Boolean(formik.errors.addressCompany)}
                                                helperText={formik.touched.addressCompany && formik.errors.addressCompany}
                                                sx={{ width: "100%" }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6} sm={12}>
                                            <TextField
                                                id="logo"
                                                name="logo"
                                                type="file"
                                                sx={{ width: "100%", fontSize: "1.5rem", color: "red" }}
                                                color='success'
                                                onChange={(e) => setLogo(e.target.files[0])}
                                                error={formik.touched.logo && Boolean(formik.errors.logo)}
                                                helperText={formik.touched.logo && formik.errors.logo}
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
                        </> : <></>}
                </Grid>
                <Grid item xs={12} md={6} sm={12} style={{ marginBottom: "8rem " }}>
                    <Grid container spacing={2}>
                        <Grid item xs={10}>
                            <div style={{ fontSize: "2.7rem", textAlign: "left", paddingLeft: "1rem" }} className="top-marg">
                                Add New job
                            </div>
                        </Grid>
                        <Grid item xs={2} sx={{ textAlign: "right" }}>
                            <PostAddIcon sx={{ fontSize: "3rem", cursor: "pointer" }} onClick={showComponentJob} />
                        </Grid>
                    </Grid>
                    {showJob ?
                        <>
                            <div>
                                <form onSubmit={formikJob.handleSubmit} style={{ marginLeft: "1.2rem" }}>
                                    <Grid container spacing={2} marginTop={2}>
                                        <Grid item xs={12}>
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
                                        <Grid item xs={12}>
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
                        </> : <></>}
                </Grid>
            </Grid>
        </div>
    )
}

export default Jobadmin