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
const CompanyRegister = () => {
    const [companylogo, setLogo] = useState(null);
    const navigate = useNavigate();
    const formik = useFormik({
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
        const result = await axios.get("http://jenilsavla.pythonanywhere.com/api/companies", {
            headers: { "Authorization": `Token ebeb63c068b02f00c0797a0c8edc06575c139fbb` },
        });
        setLoadCompany(result.data.data.companies.slice(-1));

    };
    console.log(loadcompany);

    const [show, setShow] = useState(false);
    const showComponent = (e) => { setShow(!show) }
    return (
        <div>
            <Grid container spacing={2} style={{ marginLeft: "-0.5rem", padding: "2%" ,marginBottom:"-5rem"}}>
                <Grid item xs={12}>
                    <Grid container spacing={2} style={{marginBottom:"1rem"}}>
                        <Grid item xs={10}>
                            <div style={{ fontSize: "2.7rem", textAlign: "left" }} className="top-marg">
                                Add / Edit Company Details
                            </div>
                        </Grid>
                        <Grid item xs={2} sx={{ textAlign: "right" }}>
                            <PostAddIcon sx={{ fontSize: "3rem", cursor: "pointer" }} onClick={showComponent} />
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} >
                        <Grid item xs={12} style={{ fontSize: "1.25rem", textAlign: "left" }}>
                            <Table>
                                <Thead>
                                    <Tr>
                                        <Th>Company Name</Th>
                                        <Th>Company Email</Th>
                                        <Th>Company Address</Th>
                                    </Tr>
                                </Thead>
                                {loadcompany.map((item) => {
                                    return (
                                        <Tbody>
                                            <Tr>
                                                <Td>{item.name}</Td>
                                                <Td>{item.email}</Td>
                                                <Td>{item.address}</Td>
                                            </Tr>
                                        </Tbody>
                                    )
                                })}
                            </Table>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default CompanyRegister