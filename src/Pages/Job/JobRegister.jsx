/* eslint-disable no-unused-vars */
import {
    Grid, InputAdornment, TextField, Button
} from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useFormik } from "formik";
import * as yup from 'yup';
import PostAddIcon from '@mui/icons-material/PostAdd';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Select from 'react-select';
import secureLocalStorage from 'react-secure-storage';
import Loader from '../../Components/Loader';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

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
        .string()
        .required('Job Type is required'),
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

const Jobadmin = () => {
    const domain = secureLocalStorage.getItem("domainvsv");
    const token = secureLocalStorage.getItem("tokenvsv");
    const companyId = secureLocalStorage.getItem("companyvsv");

    const formikJob = useFormik({
        initialValues: {
            details: '',
            job_type: null,
            job_title: '',
            phone: '',
        },
        validationSchema: validationSchemaJob,
        onSubmit: (values) => {
            // console.log(values);
            const formData = new FormData();
            formData.append("title", values.job_title);
            formData.append("type", values.job_type);
            formData.append("details", values.details);
            formData.append("phone", values.phone);
            fetch(`${domain}/jobs/`, {
                method: "POST",
                headers: {
                    "Authorization": `Token ${token}`,
                },
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.status == true) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Successfully added the new Job',
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
                    loadListjob();
                })
                .catch(() => {
                    // alert('Error in the Code');
                });
        }
    });

    const job_type_options = [
        { value: 'Business', label: 'Business' },
        { value: 'Job', label: 'Job' },
        { value: 'Full-Time', label: 'Full-Time' },
        { value: 'Internship', label: 'Internship' }
    ];

    const [editArray, setEditArray] = useState([]);
    const [edittype, setEdittype] = useState('');
    const [edittitle, setEdittitle] = useState('');
    const [editdetail, setEditdetails] = useState('');
    const [editphone, setEditphone] = useState('');
    const [idjob, setidjob] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const handleClose = () => {
        setIsOpen(false);
    };

    const [loadjob, setLoadjob] = useState([]);

    useEffect(() => {
        loadListjob();
    }, []);

    const loadListjob = async () => {
        //const token = localStorage.getItem("token")
        const result = await axios.get(`${domain}/jobs`, {
            headers: { "Authorization": `Token ${token}` },
        });
        // console.log(result.data.data);
        setLoadjob(result.data.data.jobs);

    };
    // console.log(loadjob);

    const handleedit = async (id) => {
        // console.log(id);
        setidjob(id);
        setIsOpen(true);
        const result = await axios.get(`${domain}/job/${id}`, {
            headers: { "Authorization": `Token ${token}` },
        });
        // console.log(result.data.data);
        setEditArray(result.data.data);
        setEdittype(result.data.data.type);
        setEdittitle(result.data.data.title);
        setEditphone(result.data.data.phone);
        setEditdetails(result.data.data.details);
    }

    const handledelete = async (id) => {
        // console.log(id);
        fetch(`${domain}/job/${id}`, {
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
                loadListjob();
                loadListjob();
                setIsOpen(false);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const handleEditsubmit = async () => {
        const searchData = {
            title: edittitle,
            type: edittype.value,
            phone: editphone,
            details: editdetail,
        };
        fetch(`${domain}/job/${idjob}`, {
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
                        title: 'Successfully updated Job details',
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
            })
            .catch((error) => {
                console.error(error);
            });
        loadListjob();
        loadListjob();
        setIsOpen(false);
    }

    const [showJob, setShowJob] = useState(false);
    const showComponentJob = (e) => { setShowJob(!showJob) }

    return (
        <div>
            <Grid container spacing={2} style={{ marginLeft: "-0.5rem", padding: "2%" }}>
                <Grid item xs={12} style={{ marginBottom: "1rem" }}>
                    <Grid container spacing={2}>
                        <Grid container sapcing={2}>
                            <Grid item xs={1}>
                                <DomainAddIcon style={{
                                    fontSize: "5vh", color: "#018d8d", marginLeft: "30%",
                                    paddingLeft: "20%", paddingRight: "2.5%", marginTop: "-5%",
                                    textAlign: "right", cursor: "pointer"
                                }} onClick={showComponentJob} />
                            </Grid>
                            <Grid item xs={11}>
                                <div
                                    style={{
                                        fontSize: "1.8rem", fontWeight: "500", textAlign: "left", paddingLeft: "5vh",
                                    }}>Job Details</div>
                            </Grid>
                        </Grid>
                    </Grid>
                    {showJob ?
                        <>
                            <div>
                                <form onSubmit={formikJob.handleSubmit} >
                                    <Grid container spacing={2} marginTop={2}
                                        sx={{
                                            paddingLeft: "4%", paddingRight: "3.5%"
                                        }}>
                                        <Grid item xs={12} md={4} sm={12}>
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
                                        <Grid item xs={12} md={4} sm={12}>
                                            <Select
                                                id="job_type"
                                                name="job_type"
                                                placeholder="Job Type"
                                                value={job_type_options.find((option) => option.value === formikJob.values.job_type)}
                                                defaultValue={formikJob.values.job_type}
                                                onChange={(selectedOption) => formikJob.setFieldValue('job_type', selectedOption.value)}
                                                options={job_type_options}
                                                styles={customStyles}
                                            />
                                            {formikJob.touched.job_type && formikJob.errors.job_type ? (
                                                <div style={{ color: "#d65a5a", fontSize: "13px", textAlign: "left", marginLeft: "15px", marginTop: "2px" }}>
                                                    {formikJob.errors.job_type}
                                                </div>
                                            ) : null}
                                        </Grid>
                                        <Grid item xs={12} md={4} sm={12}>
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
                                        <Grid item xs={12} md={6} sm={12}>
                                            <Button variant="contained" type="submit"
                                                sx={{
                                                    width: "100%", height: "3.5rem", fontSize: "1.1rem",
                                                    backgroundColor: "#018d8d", boxShadow: "none", color: "white"
                                                    , "&:hover": {
                                                        backgroundColor: "#018d8d", boxShadow: "none", color: "white",
                                                        fontSize: "1.3rem", cursor: "pointer"
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
                </Grid>
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
                                        }}>Job Name</Th>
                                        <Th style={{
                                            fontWeight: "600",
                                            backgroundColor: "#018d8d",
                                            color: "#fff",
                                            border: "1px solid #000",
                                            padding: "0.75rem",
                                            textAlign: "left"
                                        }}>Job Type</Th>
                                        <Th style={{
                                            fontWeight: "600",
                                            backgroundColor: "#018d8d",
                                            color: "#fff",
                                            border: "1px solid #000",
                                            padding: "0.75rem",
                                            textAlign: "left"
                                        }}>Job Number</Th>
                                        <Th style={{
                                            fontWeight: "600",
                                            backgroundColor: "#018d8d",
                                            color: "#fff",
                                            border: "1px solid #000",
                                            padding: "0.75rem",
                                            textAlign: "left"
                                        }}>Job Details</Th>
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
                                {companyId ? <>
                                    {loadjob.length ? <>
                                        {loadjob.map((item) => {
                                            return (
                                                <>

                                                    <Tbody>
                                                        <Tr>
                                                            <Td style={{
                                                                border: "1px solid #000",
                                                                padding: "0.75rem",
                                                                textAlign: "left"
                                                            }}>{item.title}</Td>
                                                            <Td style={{
                                                                border: "1px solid #000",
                                                                padding: "0.75rem",
                                                                textAlign: "left"
                                                            }}>{item.type}</Td>
                                                            <Td style={{
                                                                border: "1px solid #000",
                                                                padding: "0.75rem",
                                                                textAlign: "left"
                                                            }}>{item.phone}</Td>
                                                            <Td style={{
                                                                border: "1px solid #000",
                                                                padding: "0.75rem",
                                                                textAlign: "left"
                                                            }}>{item.details}</Td>
                                                            <Td style={{
                                                                border: "1px solid #000",
                                                                padding: "0.75rem",
                                                                textAlign: "left"
                                                            }}>
                                                                <div >
                                                                    <EditIcon onClick={() => handleedit(item.id)}
                                                                        style={{ color: "#018d8d", cursor: "pointer" }} />
                                                                    &nbsp; &nbsp;
                                                                    <DeleteIcon onClick={() => handledelete(item.id)}
                                                                        style={{ color: "#018d8d", cursor: "pointer" }} />
                                                                </div>
                                                            </Td>
                                                        </Tr>
                                                    </Tbody>
                                                </>
                                            )
                                        })}
                                    </> : <><Grid container spacing={2}>
                                        <Grid item xs={12} style={{ fontSize: "1.25rem" }}>
                                            No Job has been posted yet
                                        </Grid>
                                    </Grid></>}
                                </> : <>
                                    <div style={{ fontSize: "2.5rem", fontWeight: "700", marginBottom: "2rem" }}>No Company has Registered yet</div>
                                </>}
                            </Table>
                            <Modal
                                open={isOpen}
                                onClose={handleClose}
                                center
                            >
                                <div>
                                    <div style={{ fontSize: "2rem", fontWeight: "700", backgroundColor: "white" }}>Edit Job Details</div>
                                    <Grid container spacing={2} marginTop={2}
                                        style={{
                                            backgroundColor: "white"
                                        }}>
                                        <Grid item xs={12} md={6} sm={12}>
                                            <TextField
                                                id="title_edit"
                                                name="tile_edit"
                                                label="Title"
                                                value={edittitle}
                                                onChange={(e) => setEdittitle(e.target.value)}
                                                sx={{ width: "100%" }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6} sm={12}>
                                            <TextField
                                                id="detail_edit"
                                                name="detail_edit"
                                                label="Details"
                                                multiline
                                                maxRows={3}
                                                value={editdetail}
                                                onChange={(e) => setEditdetails(e.target.value)}
                                                sx={{ width: "100%" }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={4} sm={12}>
                                            <Select
                                                options={job_type_options}
                                                value={edittype}
                                                styles={customStyles}
                                                onChange={(selectedOption) => setEdittype(selectedOption)}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={4} sm={12}>
                                            <TextField
                                                id="phone_edit"
                                                name="phone_edit"
                                                label="Mobile Number"
                                                value={editphone}
                                                onChange={(e) => setEditphone(e.target.value)}
                                                sx={{ width: "100%" }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={4} sm={12}>
                                            <Grid item xs={12}>
                                                <Button variant="contained" type="submit"
                                                    sx={{
                                                        width: "100%", height: "3.45rem", fontSize: "1.1rem",
                                                        backgroundColor: "#018d8d", boxShadow: "none", color: "#fff"
                                                        , "&:hover": {
                                                            backgroundColor: "#018d8d", boxShadow: "none", color: "#fff",
                                                            fontSize: "1.3rem", cursor: "pointer"
                                                        }
                                                    }} onClick={() => handleEditsubmit()}>
                                                    Submit
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </div>
                            </Modal>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div >
    )
}

export default Jobadmin

