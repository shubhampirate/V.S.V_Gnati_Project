/* eslint-disable no-unused-vars */
import {
    Grid, InputAdornment,
    TextField, Button, Box, InputLabel, Select, MenuItem
} from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useFormik } from "formik";
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import PostAddIcon from '@mui/icons-material/PostAdd';
import Swal from 'sweetalert2';
import axios from 'axios';
import AddHomeIcon from '@mui/icons-material/AddHome';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import secureLocalStorage from 'react-secure-storage';
import Loader from '../../Components/Loader';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

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

const CompanyRegister = () => {
    const domain = secureLocalStorage.getItem("domainvsv");
    const token = secureLocalStorage.getItem("tokenvsv");
    const companyId = secureLocalStorage.getItem("companyvsv");

    const [companylogo, setLogo] = useState(null);
    const [editemail, setEditemail] = useState("");
    const [editname, setEditname] = useState("");
    const [editAddress, setEditaddress] = useState("");
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleClose = () => {
        setIsOpen(false);
    };

    const formikCompany = useFormik({
        initialValues: {
            nameCompany: '',
            addressCompany: '',
            emailCompany: '',
            profile: null,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values, companylogo);
            const formData = new FormData();
            formData.append("email", values.emailCompany);
            formData.append("name", values.nameCompany);
            formData.append("address", values.addressCompany);
            formData.append("picture", values.profile);
            fetch(`${domain}/companies/`, {
                method: "POST",
                headers: {
                    "Authorization": `Token ${token}`,
                },
                body: formData,
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status == true) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Successfully Added the Company',
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
                    if (data.status == true) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Re-Login to view the Company Details',
                            showConfirmButton: false,
                            timer: 4000
                        })
                        navigate("/login")
                    }
                    // console.log(data);
                    loadListcompany();
                })
                .catch(() => {

                });
        }
    });


    const handledelete = async (id) => {
        console.log(id);
        fetch(`${domain}/company/${id}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Token ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status == true) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Successfully deleted the Company',
                        showConfirmButton: false,
                        timer: 3000
                    })
                    navigate("/register-job")
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
                loadListcompany();
                loadListcompany();
            })
            .catch((error) => {
                // console.error(error);
            });
    }

    const handleedit = async (id) => {
        // console.log(id);
        setIsOpen(true);
        const result = await axios.get(`${domain}/company/${id}`, {
            headers: { "Authorization": `Token ${token}` },
        });
        // console.log(result.data.data);
        // setEditArray(result.data.data);
        setEditname(result.data.data.name);
        setEditaddress(result.data.data.address);
        setEditemail(result.data.data.email);
    }

    const handleEditsubmit = async (id) => {
        // console.log(id)
        const searchData = {
            name: editname,
            email: editemail,
            address: editAddress,
        };
        fetch(`${domain}/company/${id}`, {
            method: 'PUT',
            headers: {
                "Authorization": `Token ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(searchData),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status == true) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Successfully Updated the Company',
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
                setIsOpen(false);
                // console.log(data);
            })
            .catch((error) => {
                // console.error(error);
            });
        loadListcompany();
        loadListcompany();
        setIsOpen(false);
    }


    const [loadcompany, setLoadCompany] = useState([]);
    useEffect(() => {
        loadListcompany();
    }, []);

    const loadListcompany = async () => {
        const result = await axios.get(`${domain}/company/${companyId}`, {
            headers: { "Authorization": `Token ${token}` },
        });
        setLoadCompany(result.data.data);
        setEditemail(result.data.data.email);
        setEditname(result.data.data.name);
        setEditaddress(result.data.data.address);

    };
    const [show, setShow] = useState(false);
    const showComponent = (e) => { setShow(!show) }

    console.log(loadcompany)
    return (
        <div>
            <Grid container spacing={2} style={{ marginLeft: "-0.5rem", padding: "2%", marginBottom: "-5rem" }}>
                <Grid item xs={12} >
                    <Grid container spacing={2} style={{ marginBottom: "2rem" }}>
                        <Grid container sapcing={2}>
                            <Grid item xs={1}>
                                <AddHomeIcon style={{
                                    fontSize: "5vh", color: "#018d8d", marginLeft: "30%",
                                    paddingLeft: "20%", paddingRight: "2.5%", marginTop: "-5%",
                                    textAlign: "right", cursor: "pointer"
                                }} onClick={showComponent} />
                            </Grid>
                            <Grid item xs={11}>
                                <div
                                    style={{
                                        fontSize: "1.8rem", fontWeight: "500", textAlign: "left", paddingLeft: "5vh",
                                    }}>Company Details</div>
                            </Grid>
                        </Grid>
                    </Grid>
                    {show ?
                        <>
                            <div>
                                <form onSubmit={formikCompany.handleSubmit} >
                                    <Grid container spacing={2} marginTop={2}
                                        sx={{
                                            paddingLeft: "4%", paddingRight: "3.5%", marginBottom: "2rem"
                                        }}>
                                        <Grid item xs={12} md={4} sm={12}>
                                            <TextField
                                                id="nameCompany"
                                                name="nameCompany"
                                                label="Company Name"
                                                color='success'
                                                value={formikCompany.values.nameCompany}
                                                onChange={formikCompany.handleChange}
                                                error={formikCompany.touched.nameCompany && Boolean(formikCompany.errors.nameCompany)}
                                                helperText={formikCompany.touched.nameCompany && formikCompany.errors.nameCompany}
                                                sx={{ width: "100%" }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={4} sm={12}>
                                            <TextField
                                                id="emailCompany"
                                                name="emailCompany"
                                                label="Company's Email ID"
                                                color='success'
                                                value={formikCompany.values.emailCompany}
                                                onChange={formikCompany.handleChange}
                                                error={formikCompany.touched.emailCompany && Boolean(formikCompany.errors.emailCompany)}
                                                helperText={formikCompany.touched.emailCompany && formikCompany.errors.emailCompany}
                                                sx={{ width: "100%" }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={4} sm={12}>
                                            <TextField
                                                type="file"
                                                id="profile"
                                                name="profile"
                                                accept="image/*"
                                                onChange={(event) => formikCompany.setFieldValue('profile', event.currentTarget.files[0])}
                                                onBlur={formikCompany.handleBlur}
                                                sx={{ width: "100%", fontSize: "1.5rem" }}
                                            />
                                            {formikCompany.touched.profile && formikCompany.errors.profile ? (
                                                <div style={{ color: "#d65a5a", fontSize: "13px", textAlign: "left", marginLeft: "15px", marginTop: "2px" }}>
                                                    {formikCompany.errors.profile}
                                                </div>
                                            ) : null}
                                        </Grid>
                                        <Grid item xs={12} md={6} sm={12}>
                                            <TextField
                                                id="addressCompany"
                                                name="addressCompany"
                                                label="Company Address"
                                                color='success'
                                                multiline
                                                maxRows={3}
                                                value={formikCompany.values.addressCompany}
                                                onChange={formikCompany.handleChange}
                                                error={formikCompany.touched.addressCompany && Boolean(formikCompany.errors.addressCompany)}
                                                helperText={formikCompany.touched.addressCompany && formikCompany.errors.addressCompany}
                                                sx={{ width: "100%" }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6} sm={12}>
                                            <Button variant="contained" type="submit"
                                                sx={{
                                                    width: "100%", height: "3.5rem", fontSize: "1.1rem",
                                                    backgroundColor: "#018d8d", boxShadow: "none", color: "white"
                                                    , "&:hover": {
                                                        backgroundColor: "#018d8d", boxShadow: "none", color: "white",
                                                        fontSize: "1.3rem",
                                                    }
                                                }}>
                                                Submit
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </div>
                        </> : <></>
                    }
                    {companyId !== "None" ?
                        <>
                            <Grid item xs={12}>
                                <Grid container spacing={2} >
                                    <Grid item xs={12} style={{
                                        fontSize: "2.3vh", textAlign: "left",
                                        paddingLeft: "5%", paddingRight: "3.5%"
                                    }}>
                                        <Table>
                                            <Thead>
                                                <Tr>
                                                    <Th style={{
                                                        fontWeight: "600",
                                                        backgroundColor: "#018d8d",
                                                        color: "#fff",
                                                        border: "1px solid #000",
                                                        padding: "0.75rem",
                                                        textAlign: "left"
                                                    }}>Name</Th>
                                                    <Th style={{
                                                        fontWeight: "600",
                                                        backgroundColor: "#018d8d",
                                                        color: "#fff",
                                                        border: "1px solid #000",
                                                        padding: "0.75rem",
                                                        textAlign: "left"
                                                    }}>Email</Th>
                                                    <Th style={{
                                                        fontWeight: "600",
                                                        backgroundColor: "#018d8d",
                                                        color: "#fff",
                                                        border: "1px solid #000",
                                                        padding: "0.75rem",
                                                        textAlign: "left"
                                                    }}>Address</Th>
                                                    <Th style={{
                                                        fontWeight: "600",
                                                        backgroundColor: "#018d8d",
                                                        color: "#fff",
                                                        border: "1px solid #000",
                                                        padding: "0.75rem",
                                                        textAlign: "left"
                                                    }}>Action</Th>

                                                </Tr>
                                            </Thead>
                                            {loadcompany.name ? <>
                                                {loadcompany ? <>
                                                    <Tbody>
                                                        <Tr>
                                                            <Td style={{
                                                                border: "1px solid #000",
                                                                padding: "0.75rem",
                                                                textAlign: "left"
                                                            }}>{loadcompany.name}</Td>
                                                            <Td style={{
                                                                border: "1px solid #000",
                                                                padding: "0.75rem",
                                                                textAlign: "left"
                                                            }}>{loadcompany.email}</Td>
                                                            <Td style={{
                                                                border: "1px solid #000",
                                                                padding: "0.75rem",
                                                                textAlign: "left"
                                                            }}>{loadcompany.address}</Td>
                                                            <Td style={{
                                                                border: "1px solid #000",
                                                                padding: "0.75rem",
                                                                textAlign: "left"
                                                            }}>
                                                                <span onClick={() => handleedit(companyId)}> Edit </span> /
                                                                <span onClick={() => handledelete(companyId)}> Delete </span>
                                                            </Td>
                                                        </Tr>
                                                    </Tbody></> : <></>
                                                }</> : <><Loader /></>}
                                        </Table>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </> : <>
                            <div style={{ fontSize: "2.5rem", fontWeight: "700", marginBottom: "2rem" }}>No Company has been registered yet</div>
                        </>}
                    <Modal
                        open={isOpen}
                        onClose={handleClose}
                        center
                    >
                        <div>
                            <div style={{ fontSize: "2rem", fontWeight: "700", backgroundColor: "white" }}>Edit Company Details</div>
                            <Grid container spacing={2} marginTop={2}
                                style={{
                                    paddingBottom: "1.5rem"
                                }}>
                                <Grid item xs={12} md={6} sm={12}>
                                    <TextField
                                        id="name_edit"
                                        name="name_edit"
                                        label="Name"
                                        value={editname}
                                        onChange={(e) => setEditname(e.target.value)}
                                        sx={{ width: "100%" }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} sm={12}>
                                    <TextField
                                        id="address_edit"
                                        name="address_edit"
                                        label="Address"
                                        multiline
                                        maxRows={3}
                                        value={editAddress}
                                        onChange={(e) => setEditaddress(e.target.value)}
                                        sx={{ width: "100%" }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} sm={12}>
                                    <TextField
                                        id="email_edit"
                                        name="email_edit"
                                        label="Email"
                                        value={editemail}
                                        onChange={(e) => setEditemail(e.target.value)}
                                        sx={{ width: "100%" }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} sm={12}>
                                    <Grid item xs={12}>
                                        <Button variant="contained" type="submit"
                                            sx={{
                                                width: "100%", height: "3.45rem", fontSize: "1.1rem",
                                                backgroundColor: "#018d8d", boxShadow: "none", color: "white"
                                                , "&:hover": {
                                                    backgroundColor: "#018d8d", boxShadow: "none", color: "white",
                                                    fontSize: "1.3rem",
                                                }
                                            }} onClick={() => handleEditsubmit(companyId)}>
                                            Submit
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>
                    </Modal>
                </Grid>
            </Grid>
        </div>
    )
}

export default CompanyRegister