import {
    Grid, InputAdornment,
    TextField, Button, InputLabel, Select, MenuItem
} from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useFormik } from "formik";
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';


const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png"
];

const validationSchema = yup.object({
    name: yup
        .string('Enter your Full Name')
        .required('Name is required'),
    desc: yup
        .string('Enter a short Description about your Job')
        .required('Job description is required'),
    email: yup
        .string('Enter your email address')
        .email('Enter a valid email address')
        .required('Email address is required'),
    phone: yup
        .string('Enter your Phone Number')
        .required('Phone Number is required'),
    job_title: yup
        .string('Enter Job Title you')
        .required('Job Title is required'),
    address: yup
        .string('Enter your Company Address you')
        .required('Company Address is required'),
    job_type: yup
        .string('Enter Job Type')
        .required('Job Type is required'),
});

const Jobadmin = () => {
    const [biodata, setBiodata] = useState(null)
    const [logo, setLogo] = useState(null);
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            name: '',
            desc: '',
            address: '',
            email: '',
            job_type: '',
            job_title: '',
            phone: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values, biodata, logo);
            navigate('/jobs')
        }
    });

    return (
        <div>
            <Grid container spacing={2} style={{ marginLeft: "-1.5rem" }}>
                <Grid item xs={12} md={2} sm={12}></Grid>
                <Grid item xs={12} md={8} sm={12} style={{ marginBottom: "8rem " }}>
                    <div style={{ fontSize: "2.7rem" }} className="top-marg">
                        Add new job
                    </div>
                    <div>
                        <form onSubmit={formik.handleSubmit} style={{ marginLeft: "1.2rem" }}>
                            <Grid container spacing={2} marginTop={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        id="name"
                                        name="name"
                                        label="Company Name"
                                        color='success'
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        error={formik.touched.name && Boolean(formik.errors.name)}
                                        helperText={formik.touched.name && formik.errors.name}
                                        sx={{ width: "100%" }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="email"
                                        name="email"
                                        label="Company Email Address"
                                        color='success'
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        error={formik.touched.email && Boolean(formik.errors.email)}
                                        helperText={formik.touched.email && formik.errors.email}
                                        sx={{ width: "100%" }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="desc"
                                        name="desc"
                                        label="Job Details"
                                        color='success'
                                        multiline
                                        maxRows={3}
                                        value={formik.values.desc}
                                        onChange={formik.handleChange}
                                        error={formik.touched.desc && Boolean(formik.errors.desc)}
                                        helperText={formik.touched.desc && formik.errors.desc}
                                        sx={{ width: "100%" }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} sm={12}>
                                    <TextField
                                        id="job_title"
                                        name="job_title"
                                        label="Job Title"
                                        color='success'
                                        value={formik.values.job_title}
                                        onChange={formik.handleChange}
                                        error={formik.touched.job_title && Boolean(formik.errors.job_title)}
                                        helperText={formik.touched.job_title && formik.errors.job_title}
                                        sx={{ width: "100%" }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} sm={12}>
                                    <TextField
                                        id="phone"
                                        name="phone"
                                        label="Mobile Number"
                                        color='success'
                                        value={formik.values.phone}
                                        onChange={formik.handleChange}
                                        error={formik.touched.phone && Boolean(formik.errors.phone)}
                                        helperText={formik.touched.phone && formik.errors.phone}
                                        sx={{ width: "100%" }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="job_type"
                                        name="job_type"
                                        label="Job Type"
                                        color='success'
                                        value={formik.values.job_type}
                                        onChange={formik.handleChange}
                                        error={formik.touched.job_type && Boolean(formik.errors.job_type)}
                                        helperText={formik.touched.job_type && formik.errors.job_type}
                                        sx={{ width: "100%" }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="address"
                                        name="address"
                                        label="Company Address"
                                        color='success'
                                        multiline
                                        maxRows={3}
                                        value={formik.values.address}
                                        onChange={formik.handleChange}
                                        error={formik.touched.address && Boolean(formik.errors.address)}
                                        helperText={formik.touched.address && formik.errors.address}
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
                </Grid>
                <Grid item xs={12} md={2} sm={12}></Grid>
            </Grid>
        </div>
    )
}

export default Jobadmin