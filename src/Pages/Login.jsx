import React, { useState } from 'react'
import { Grid, TextField, Button, InputAdornment, IconButton } from '@mui/material';
import { useFormik } from "formik";
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import NavBar from "../Components/Navbar.jsx"
import secureLocalStorage from 'react-secure-storage';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import SendIcon from '@mui/icons-material/Send';

const validationSchema = yup.object({
    name: yup
        .string('Enter your Full Name')
        .required('Name is required'),
    password: yup
        .string('')
        .required('Password is required'),
});



const Login = () => {
    secureLocalStorage.setItem("domainvsv", "http://195.35.45.12:8000/api");
    const domain = secureLocalStorage.getItem("domainvsv");
    const navigate = useNavigate();
    const [editoldpass, setEditoldpass] = useState('');
    const [editnewpass, setEditnewpass] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordNew, setShowPasswordNew] = useState(false);
    const [showPasswordOld, setShowPasswordOld] = useState(false);

    const [show, setShow] = useState(false);
    const showComponent = (e) => { setShow(!show) }

    const handleTogglePasswordNew = () => {
        setShowPasswordNew(!showPasswordNew);
    };

    const handleTogglePasswordOld = () => {
        setShowPasswordOld(!showPasswordOld);
    };

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
            // console.log(values);
            const formData = new FormData();
            formData.append("username", values.name.trim());
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
                    secureLocalStorage.setItem("changevsv", data.data.token)
                    secureLocalStorage.setItem("familyidvsv", data.data.family);
                    secureLocalStorage.setItem("companyvsv", data.data.company);
                    secureLocalStorage.setItem("matrimonyvsv", data.data.matrimony);
                    secureLocalStorage.setItem("isadminvsv", data.data.is_admin.toString());

                })
                .catch((error) => {
                });
        }
    });

    const changePass = async () => {

        const pasToken = secureLocalStorage.getItem("changevsv");

        const searchData = {
            old_password: editoldpass,
            new_password: editnewpass,
        };
        fetch(`https://vsvgnatisamasta.in/api/reset-password/`, {
            method: 'POST',
            headers: {
                "Authorization": `Token ${pasToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(searchData),
        })
            .then((response) => response.json())
            .then((data) => {
                // console.log(data);
                if (data.status == true) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Successfully Changed the Password',
                        showConfirmButton: false,
                        timer: 3000
                    })
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: data.message,
                        showConfirmButton: false,
                        timer: 3000
                    })
                }
                showComponent(false);
            })
            .catch((error) => {
                // console.error(error);
            });
    }

    return (
        <div >
            <NavBar />
            <Grid container spacing={2} p={3} className='login_section'>
                <Grid item xs={12} md={12} sm={12}
                    style={{
                        marginTop: "4.5%", paddingTop: "8rem", paddingBottom: "7rem",
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
                        <div style={{ marginTop: "2rem", fontSize: "1.3rem", color: "black", cursor: "pointer" }}
                            onClick={showComponent}>
                            Change password
                        </div>
                        <Modal open={show} onClose={showComponent} center >
                            <h2>Change Password</h2>
                            <Grid container spacing={2} p={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        id="old_password"
                                        name="old_password"
                                        label="Old  Password"
                                        value={editoldpass}
                                        onChange={(e) => setEditoldpass(e.target.value)}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={handleTogglePasswordOld}>
                                                        {showPasswordOld ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                        type={showPasswordOld ? 'text' : 'password'}
                                        sx={{
                                            width: "100%", "& .MuiInputBase-root": {
                                                height: 50,
                                            }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="new_password"
                                        name="new_password"
                                        label="New  Password"
                                        value={editnewpass}
                                        onChange={(e) => setEditnewpass(e.target.value)}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={handleTogglePasswordNew}>
                                                        {showPasswordNew ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                        type={showPasswordNew ? 'text' : 'password'}
                                        sx={{
                                            width: "100%", "& .MuiInputBase-root": {
                                                height: 50,
                                            }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button variant="contained" type="submit"
                                        sx={{
                                            width: "100%", height: "3.1rem", fontSize: "1.1rem",
                                            backgroundColor: "#B8A273", boxShadow: "none", color: "black", "&:hover": {
                                                backgroundColor: "#B8A273", boxShadow: "none", color: "black",
                                                fontSize: "1.3rem", cursor: "pointer"
                                            }
                                        }} onClick={changePass} >
                                        <SendIcon sx={{ color: "black" }} />
                                    </Button>
                                </Grid>
                            </Grid>
                        </Modal>
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


