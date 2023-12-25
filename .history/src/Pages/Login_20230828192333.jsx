import React, { useState } from 'react'
import { Grid, TextField, Button, InputAdornment, IconButton } from '@mui/material';
import { useFormik } from "formik";
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import NavBar from "../Components/Navbar.jsx"

const validationSchema = yup.object({
    name: yup
        .string('Enter your Full Name')
        .required('Name is required'),
    password: yup
        .string('')
        .required('Paasword is required'),
});

const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {

            console.log(values);
            const formData = new FormData();
            formData.append("username", values.name);
            formData.append("password", values.password);
            fetch("https://vsvgnatisamasta.in/api/login/", {
                method: "POST",
                body: formData,

            })
                .then(response => response.json())
                .then(data => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Successfully Logged In',
                        showConfirmButton: false,
                        timer: 4000
                    })
                    console.log(data);
                    localStorage.setItem("tokenvsv", data.data.token);
                    localStorage.setItem("familyid", data.data.family);
                    navigate(-1);
                })
                .catch((error) => {
                    console.log(error)
                    alert('Error in the Code');
                });
        }
    });

    return (
        <div>

            <NavBar />
            <Grid container spacing={2} style={{ padding: "2rem" }}>
                <Grid item xs={12} md={2} sm={12}></Grid>
                <Grid item xs={12} md={8} sm={12} style={{ marginBottom: "8rem", marginTop: "10rem" }}>
                    <div style={{ fontSize: "3rem", fontWeight: "700" }}>Login</div>
                    <div>
                        <form onSubmit={formik.handleSubmit} >
                            <Grid container spacing={2} marginTop={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        id="name"
                                        name="name"
                                        label="Full Name"
                                        color='success'
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        error={formik.touched.name && Boolean(formik.errors.name)}
                                        helperText={formik.touched.name && formik.errors.name}
                                        sx={{
                                            width: "100%",
                                            '@media (min-width:600px)': {
                                                width: '50%', // Width for sm and md breakpoints
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="password"
                                        name="password"
                                        label="Password"
                                        color='success'
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={handleTogglePassword}>
                                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                        type={showPassword ? 'text' : 'password'}
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        error={formik.touched.password && Boolean(formik.errors.password)}
                                        helperText={formik.touched.password && formik.errors.password}
                                        sx={{
                                            width: "100%",
                                            '@media (min-width:600px)': {
                                                width: '50%', // Width for sm and md breakpoints
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid item xs={12}>
                                        <Button variant="contained" type="submit"
                                            sx={{
                                                width: "100%", height: "3.45rem", fontSize: "1.1rem",
                                                backgroundColor: "#90CFD3", boxShadow: "none", color: "black"
                                                , "&:hover": {
                                                    backgroundColor: "#90CFD3", boxShadow: "none", color: "black",
                                                    fontSize: "1.3rem",
                                                },
                                                '@media (min-width:600px)': {
                                                    width: '50%', // Width for sm and md breakpoints
                                                }
                                            }}>
                                            Submit
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </form>
                        <div style={{ marginTop: "2.5rem", fontSize: "1.3rem" }}>
                            <Link to="/" style={{ textDecoration: "none", color: "black" }}>New user ? Register Now</Link>
                        </div>
                        <div style={{ marginTop: "1rem", fontSize: "1.3rem" }}>
                            <Link to="/" style={{ textDecoration: "none", color: "black" }}>Change passowrd</Link>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} md={2} sm={12}></Grid>
            </Grid>
        </div >
    )
}

export default Login