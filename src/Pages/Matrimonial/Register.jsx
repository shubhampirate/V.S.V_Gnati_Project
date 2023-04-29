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
    phone: yup
        .string('Enter your Phone Number')
        .required('Phone Number is required'),
    father_name: yup
        .string(`Enter your Father's Name`)
        .required(`Father's Name is required`),
    date: yup
        .date('Enter your Date of Birth')
        .required('Date of birth is required'),
});

const options = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
];

const Login = () => {
    const [biodata, setBiodata] = useState(null);
    const [gender, setGender] = useState(null);
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            name: '',
            desc: '',
            date: new Date(),
            email: '',
            father_name: '',
            phone: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values, biodata, gender, profile);
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("about", values.desc);
            formData.append("dob", values.date);
            formData.append("phone", values.phone);
            formData.append("fathers_name", values.father_name);
            formData.append("gender", gender.value);
            formData.append("picture", profile);
            formData.append("biodata", biodata);
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
                                        label="Email Addtess"
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
                                        id="profile"
                                        name="profile"
                                        type="file"
                                        sx={{ width: "100%", fontSize: "1.5rem", color: "red" }}
                                        color='success'
                                        onChange={(e) => setProfile(e.target.files[0])}
                                        error={formik.touched.profile && Boolean(formik.errors.profile)}
                                        helperText={formik.touched.profile && formik.errors.profile}
                                    />
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
                                        sx={{ width: "100%", fontSize: "1.5rem", color: "red" }}
                                        color='success'
                                        value={formik.values.date}
                                        onChange={formik.handleChange}
                                        error={formik.touched.date && Boolean(formik.errors.date)}
                                        helperText={formik.touched.date && formik.errors.date}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} sm={12}>
                                    <TextField
                                        id="biodata"
                                        name="biodata"
                                        type="file"
                                        sx={{ width: "100%", fontSize: "1.5rem", color: "red" }}
                                        color='success'
                                        onChange={(e) => setBiodata(e.target.files[0])}
                                        error={formik.touched.biodata && Boolean(formik.errors.biodata)}
                                        helperText={formik.touched.biodata && formik.errors.biodata}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} sm={12}>
                                    <Select
                                        defaultValue={setGender}
                                        onChange={setGender}
                                        options={options}
                                        styles={{ borderColor: "green", height: "3.5rem" }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} sm={12}>
                                    <Button color="success" variant="contained" type="submit"
                                        sx={{ width: "100%", height: "3.5rem", fontSize: "1.1rem" }}>
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>
                            <div style={{ marginTop: "1.1rem", fontSize: "1.1rem" }}>
                                <Link to="/matrimonial" style={{ textDecoration: "none", color: "green" }}>Already Registered</Link>
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