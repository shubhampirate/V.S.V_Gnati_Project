import React, { useState } from 'react'
import { Grid, TextField, Button, InputAdornment, IconButton } from '@mui/material';
import { useFormik } from "formik";
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import NavBar from "../Components/Navbar.jsx"
import secureLocalStorage from 'react-secure-storage';
import bg from "../images/loginPage.webp"

const backgroundImageStyle = {
    backgroundImage: `url(${bg})`,
    backgroundSize: 'cover', // Adjust the background size as needed
    backgroundRepeat: 'no-repeat', // Adjust the background repeat as needed
    // Other background-related CSS properties can be added here
    width: '100%',
    height: '100%',
};

const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Adjust opacity as needed (0.5 means 50% opacity)
};

const validationSchema = yup.object({
    name: yup
        .string('Enter your Full Name')
        .required('Name is required'),
    password: yup
        .string('')
        .required('Password is required'),
});

const Login = () => {
    secureLocalStorage.setItem("domainvsv", "http://jenilsavla.pythonanywhere.com/api");
    const domain = secureLocalStorage.getItem("domainvsv");
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
            fetch(`${domain}/login/`, {
                method: "POST",
                body: formData,

            })
                .then(response => response.json())
                .then(data => {
                    if (data.status == true) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Successfully Logged In',
                            showConfirmButton: false,
                            timer: 3000
                        })
                        navigate(-1);
                    }
                    else {
                        Swal.fire({
                            icon: 'error',
                            title: data.message,
                            showConfirmButton: false,
                            timer: 3000
                        })

                    }
                    // console.log(data);
                    secureLocalStorage.setItem("tokenvsv", data.data.token);
                    secureLocalStorage.setItem("familyidvsv", data.data.family);
                    secureLocalStorage.setItem("companyvsv", data.data.company);
                    secureLocalStorage.setItem("matrimonyvsv", data.data.matrimony);
                    secureLocalStorage.setItem("isadminvsv", data.data.is_admin.toString());

                })
                .catch((error) => {
                    console.log(error)
                    alert('Error in the Code');
                });
        }
    });

    return (
        <div >
            <NavBar />
            <Grid container spacing={2} p={3} className='login_section'>
                <Grid item xs={12} md={12} sm={12}
                    style={{
                        marginTop: "2.5%", paddingTop: "7rem", paddingBottom: "7rem",
                    }}>
                    <div style={{ fontSize: "3rem", fontWeight: "700", color: "black" }}>Login</div>
                    <div>
                        <form onSubmit={formik.handleSubmit} >
                            <Grid container spacing={2} marginTop={2} pr={1}>
                                <Grid item xs={12}>
                                    <TextField
                                        id="name"
                                        name="name"
                                        label="Username"
                                        color='success'
                                        // autoComplete='off'
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        error={formik.touched.name && Boolean(formik.errors.name)}
                                        helperText={formik.touched.name && formik.errors.name}
                                        sx={{
                                            width: "100%",
                                            '@media (min-width:600px)': {
                                                width: '50%', // Width for sm and md breakpoints
                                            },
                                            backgroundColor: "rgb(255,255,255,0.8)"
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
                                            backgroundColor: "rgb(255,255,255,0.8)"
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid item xs={12}>
                                        <Button variant="contained" type="submit"
                                            sx={{
                                                width: "100%", height: "3.45rem", fontSize: "1.1rem",
                                                backgroundColor: "#B8A273", boxShadow: "none", color: "black"
                                                , "&:hover": {
                                                    backgroundColor: "#B8A273", boxShadow: "none", color: "black",
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

export const gettoken = () => secureLocalStorage.getItem("tokenvsv");
export const getfamilyId = () => secureLocalStorage.getItem("familyidvsv");
export const getcompany = () => secureLocalStorage.getItem("companyvsv");
export const getmatrimony = () => secureLocalStorage.getItem("matrimonyvsv");
export const getadmin = () => secureLocalStorage.getItem("isadminvsv");
export const getdomain = () => secureLocalStorage.getItem("domainvsv");

export default Login


