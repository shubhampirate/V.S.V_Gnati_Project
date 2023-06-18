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
    const [companylogo, setLogo] = useState(null);
    const navigate = useNavigate();
    const formikCompany = useFormik({
        initialValues: {
            nameCompany: '',
            addressCompany: '',
            emailCompany: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values, companylogo);
            const formData = new FormData();
            formData.append("email", values.emailCompany);
            formData.append("name", values.nameCompany);
            formData.append("address", values.addressCompany);
            formData.append("picture", companylogo);
            fetch("http://jenilsavla.pythonanywhere.com/api/companies/", {
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
                        title: 'Successfully Added the Company',
                        showConfirmButton: false,
                        timer: 4000
                    })
                    loadListcompany();
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

    const [loadcompany, setLoadCompany] = useState([]);
    useEffect(() => {
        loadListcompany();
    }, []);

    const loadListcompany = async () => {
        const result = await axios.get("http://jenilsavla.pythonanywhere.com/api/company/1", {
            headers: { "Authorization": `Token ebeb63c068b02f00c0797a0c8edc06575c139fbb` },
        });
        setLoadCompany(result.data.data.companies);

    };
    console.log(loadcompany);

    const [show, setShow] = useState(false);
    const showComponent = (e) => { setShow(!show) }
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
                                        <Grid item xs={12} md={6} sm={12}>
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
                                        <Grid item xs={12} md={6} sm={12}>
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
                                        </Tr>
                                    </Thead>
                                    {loadcompany.map((item) => {
                                        return (
                                            <Tbody>
                                                <Tr>
                                                    <Td style={{
                                                        border: "1px solid #000",
                                                        padding: "0.75rem",
                                                        textAlign: "left"
                                                    }}>{item.name}</Td>
                                                    <Td style={{
                                                        border: "1px solid #000",
                                                        padding: "0.75rem",
                                                        textAlign: "left"
                                                    }}>{item.email}</Td>
                                                    <Td style={{
                                                        border: "1px solid #000",
                                                        padding: "0.75rem",
                                                        textAlign: "left"
                                                    }}>{item.address}</Td>
                                                </Tr>
                                            </Tbody>
                                        )
                                    })}
                                </Table>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default CompanyRegister