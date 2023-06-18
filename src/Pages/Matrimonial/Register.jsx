import {
    Grid,
    TextField, Button,
} from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useFormik } from "formik";
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import Swal from 'sweetalert2';
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
        .string('Enter a short Description about you')
        .required('A small description about you is required'),
    email: yup
        .string('Enter your email address')
        .email('Enter a valid email address')
        .required('Email address is required'),
    gender: yup
        .string()
        .required('Gender is required'),
    phone: yup
        .string('Enter your Phone Number')
        .required('Phone Number is required'),
    father_name: yup
        .string(`Enter your Father's Name`)
        .required(`Father's Name is required`),
    date: yup
        .date()
        .required('Date of birth is required'),
    biodata: yup
        .mixed()
        .test('fileType', 'Invalid file format. Only PDFs are allowed.', (value) => {
            if (value && value.length) {
                const fileType = value[0].type;
                return fileType === 'application/pdf';
            }
            return true;
        })
        .required('Biodata is required'),
    profile: yup
        .mixed()
        .test('fileType', 'Invalid file format. Only images are allowed.', (value) => {
            if (value && value.length) {
                const fileType = value[0].type;
                return fileType.startsWith('image/');
            }
            return true;
        })
        .required('Profile picture is required'),
});

const gender_options = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
];

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

const Login = () => {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            name: '',
            desc: '',
            date: '',
            email: '',
            father_name: '',
            phone: '',
            gender: null,
            biodata: null,
            profile: null,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values);
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("about", values.desc);
            formData.append("dob", values.date);
            formData.append("phone", values.phone);
            formData.append("fathers_name", values.father_name);
            formData.append("gender", values.gender);
            formData.append("picture", values.profile);
            formData.append("biodata", values.biodata);
            fetch("http://jenilsavla.pythonanywhere.com/api/matrimonies/", {
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
                })
                .catch(() => {
                    alert('Error in the Code');
                });
        }
    });





    return (
        <div>
            <Grid container spacing={2} style={{ padding: "2rem" }}>
                <Grid item xs={12} md={2} sm={12}></Grid>
                <Grid item xs={12} md={8} sm={12} style={{ marginBottom: "8rem " }}>
                    <div style={{ fontSize: "3rem", fontWeight: "700" }}>Matrimonial</div>
                    <div>
                        <form onSubmit={formik.handleSubmit} >
                            <Grid container spacing={2} marginTop={2}>
                                <Grid item xs={12} md={6} sm={12}>
                                    <TextField
                                        id="name"
                                        name="name"
                                        label="Full Name"
                                        color='success'
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        error={formik.touched.name && Boolean(formik.errors.name)}
                                        helperText={formik.touched.name && formik.errors.name}
                                        sx={{ width: "100%" }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} sm={12}>
                                    <TextField
                                        id="email"
                                        name="email"
                                        label="Email Address"
                                        color='success'
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        error={formik.touched.email && Boolean(formik.errors.email)}
                                        helperText={formik.touched.email && formik.errors.email}
                                        sx={{ width: "100%" }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} sm={12}>
                                    <TextField
                                        id="desc"
                                        name="desc"
                                        label="About you"
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
                                        type="file"
                                        id="profile"
                                        name="profile"
                                        accept="image/*"
                                        onChange={(event) => formik.setFieldValue('profile', event.currentTarget.files[0])}
                                        onBlur={formik.handleBlur}
                                        sx={{ width: "100%", fontSize: "1.5rem" }}
                                    />
                                    {formik.touched.profile && formik.errors.profile ? (
                                        <div style={{ color: "#d65a5a", fontSize: "13px", textAlign: "left", marginLeft: "15px", marginTop: "2px" }}>
                                            {formik.errors.profile}
                                        </div>
                                    ) : null}
                                </Grid>
                                <Grid item xs={12} md={6} sm={12}>
                                    <TextField
                                        id="father_name"
                                        name="father_name"
                                        label="Fathers Name"
                                        color='success'
                                        value={formik.values.father_name}
                                        onChange={formik.handleChange}
                                        error={formik.touched.father_name && Boolean(formik.errors.father_name)}
                                        helperText={formik.touched.father_name && formik.errors.father_name}
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
                                <Grid item xs={12} md={6} sm={12}>
                                    <TextField
                                        id="date"
                                        name="date"
                                        type="date"
                                        placeholder='Date of Birth'
                                        sx={{ width: "100%", fontSize: "1.5rem", color: "red" }}
                                        color='success'
                                        value={formik.values.date}
                                        onChange={formik.handleChange}
                                    />
                                    {formik.touched.date && formik.errors.date ? (
                                        <div style={{ color: "#d65a5a", fontSize: "13px", textAlign: "left", marginLeft: "15px", marginTop: "2px" }}>
                                            {formik.errors.date}
                                        </div>
                                    ) : null}
                                </Grid>
                                <Grid item xs={12} md={6} sm={12}>
                                    <TextField
                                        type="file"
                                        id="biodata"
                                        name="biodata"
                                        accept=".pdf"
                                        onChange={(event) => formik.setFieldValue('biodata', event.currentTarget.files[0])}
                                        onBlur={formik.handleBlur}
                                        sx={{ width: "100%", fontSize: "1.5rem" }}
                                    />
                                    {formik.touched.biodata && formik.errors.biodata ? (
                                        <div style={{ color: "#d65a5a", fontSize: "13px", textAlign: "left", marginLeft: "15px", marginTop: "2px" }}>
                                            {formik.errors.biodata}
                                        </div>
                                    ) : null}
                                    {/*<TextField
                                        id="biodata"
                                        name="biodata"
                                        type="file"
                                        sx={{ width: "100%", fontSize: "1.5rem", color: "red" }}
                                        color='success'
                                        onChange={(e) => setBiodata(e.target.files[0])}
                                        error={formik.touched.biodata && Boolean(formik.errors.biodata)}
                                        helperText={formik.touched.biodata && formik.errors.biodata}
                                    />*/}
                                </Grid>
                                <Grid item xs={12} md={6} sm={12}>
                                    <Select
                                        id="gender"
                                        name="gender"
                                        placeholder="Gender"
                                        value={gender_options.find((option) => option.value === formik.values.gender)}
                                        defaultValue={formik.values.gender}
                                        onChange={(selectedOption) => formik.setFieldValue('gender', selectedOption.value)}
                                        options={gender_options}
                                        styles={customStyles}
                                    />
                                    {formik.touched.gender && formik.errors.gender ? (
                                        <div style={{ color: "#d65a5a", fontSize: "13px", textAlign: "left", marginLeft: "15px", marginTop: "2px" }}>
                                            {formik.errors.gender}
                                        </div>
                                    ) : null}
                                </Grid>
                                <Grid item xs={12} md={6} sm={12}>
                                    <Grid item xs={12}>
                                        <Button variant="contained" type="submit"
                                            sx={{
                                                width: "100%", height: "3.45rem", fontSize: "1.1rem",
                                                backgroundColor: "#C4CFFE", boxShadow: "none", color: "black"
                                                , "&:hover": {
                                                    backgroundColor: "#C4CFFE", boxShadow: "none", color: "black",
                                                    fontSize: "1.3rem",
                                                }
                                            }}>
                                            Submit
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <div style={{ marginTop: "2rem", fontSize: "1.3rem" }}>
                                <Link to="/matrimonial" style={{ textDecoration: "none", color: "black" }}>Already Registered ? Back to Matrimonial Page</Link>
                            </div>
                        </form>
                    </div>
                </Grid>
                <Grid item xs={12} md={2} sm={12}></Grid>
            </Grid>
        </div>
    )
}

export default Login