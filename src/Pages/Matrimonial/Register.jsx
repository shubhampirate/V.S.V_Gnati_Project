import {
    Grid, Modal,
    TextField, Button,
} from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useFormik } from "formik";
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
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

    const handleDownload = (fileUrl) => {
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = true;
        link.click();
    };

    const targetIds = [21, 22, 23, 24, 25];

    const [filteredArray, setFilteredArray] = useState([]);
    const [editname, setEditname] = useState('');
    const [editfather, setEditfather] = useState('');
    const [editgender, setEditgender] = useState('');
    const [editabout, setEditabout] = useState('');
    const [editphone, setEditphone] = useState('');
    const [editdob, setEditdob] = useState('');
    const [editArray, setEditArray] = useState([]);
    const [matriid, setMatriid] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const handleClose = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        loadList();
    }, []);

    const loadList = async () => {
        //const token = localStorage.getItem("token")
        const result = await axios.get('http://jenilsavla.pythonanywhere.com/api/matrimonies?gender=Male', {
            headers: { "Authorization": `Token ebeb63c068b02f00c0797a0c8edc06575c139fbb` },
        });

        const result2 = await axios.get('http://jenilsavla.pythonanywhere.com/api/matrimonies?gender=Female', {
            headers: { "Authorization": `Token ebeb63c068b02f00c0797a0c8edc06575c139fbb` },
        });

        const data1 = result.data.data.matrimonies; // Assuming the API response is an array
        const data2 = result2.data.data.matrimonies; // Assuming the API response is an array

        // Merge the two arrays
        const mergedArray = [...data1, ...data2];

        console.log(mergedArray);
        //setorgArray(result.data.data.matrimonies);

        const filteredList = mergedArray.filter((item) => targetIds.includes(item.id));
        setFilteredArray(filteredList);
        //console.log(filteredList);

    };

    const handledelete = async (id) => {
        console.log(id);
        fetch(`http://jenilsavla.pythonanywhere.com/api/matrimony/${id}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Token ebeb63c068b02f00c0797a0c8edc06575c139fbb`,
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                loadList();
                loadList();
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const handleedit = async (id) => {
        console.log(id);
        setIsOpen(true);
        const result = await axios.get(`http://jenilsavla.pythonanywhere.com/api/matrimony/${id}`, {
            headers: { "Authorization": `Token ebeb63c068b02f00c0797a0c8edc06575c139fbb` },
        });
        console.log(result.data.data);
        setEditArray(result.data.data);
        setEditabout(result.data.data.about);
        setEditfather(result.data.data.fathers_name);
        setEditname(result.data.data.name);
        setEditphone(result.data.data.phone);
        setEditdob(result.data.data.dob);
        setMatriid(result.data.data.id);
    }

    const handleEditsubmit = async () => {
        console.log(editabout, editfather, editgender, editname, editphone);
        const searchData = {
            name: editname,
            fathers_name: editfather,
            gender: editgender.value,
            phone: editphone,
            about: editabout,
            dob: editdob,
        };
        fetch(`http://jenilsavla.pythonanywhere.com/api/matrimony/${matriid}`, {
            method: 'PUT',
            headers: {
                "Authorization": `Token ebeb63c068b02f00c0797a0c8edc06575c139fbb`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(searchData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.error(error);
            });
        loadList();
        loadList();
        setIsOpen(false);
    }

    return (
        <div>
            <Grid container spacing={2} style={{ padding: "2rem" }}>
                <Grid item xs={12} md={2} sm={12}></Grid>
                <Grid item xs={12} md={8} sm={12} style={{ marginBottom: "3rem " }}>
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
            <div style={{ fontSize: "2rem", fontWeight: "700", marginBottom: "2rem" }}>Registered Users</div>
            <Grid item xs={12}>
                <Grid container spacing={2} >
                    <Grid item xs={12} style={{
                        fontSize: "2.3vh", textAlign: "left",
                        paddingLeft: "6%", paddingRight: "3.5%",
                        marginBottom: "2rem"
                    }}>
                        <Table>
                            <Thead>
                                <Tr>
                                    <Th style={{
                                        fontWeight: "600",
                                        backgroundColor: "#C4CFFE",
                                        color: "#000",
                                        border: "1px solid #000",
                                        padding: "0.75rem",
                                        textAlign: "left"
                                    }}>Name</Th>
                                    <Th style={{
                                        fontWeight: "600",
                                        backgroundColor: "#C4CFFE",
                                        color: "#000",
                                        border: "1px solid #000",
                                        padding: "0.75rem",
                                        textAlign: "left"
                                    }}>DOB</Th>
                                    <Th style={{
                                        fontWeight: "600",
                                        backgroundColor: "#C4CFFE",
                                        color: "#000",
                                        border: "1px solid #000",
                                        padding: "0.75rem",
                                        textAlign: "left"
                                    }}>Gender</Th>
                                    <Th style={{
                                        fontWeight: "600",
                                        backgroundColor: "#C4CFFE",
                                        color: "#000",
                                        border: "1px solid #000",
                                        padding: "0.75rem",
                                        textAlign: "left"
                                    }}>Phone</Th>
                                    <Th style={{
                                        fontWeight: "600",
                                        backgroundColor: "#C4CFFE",
                                        color: "#000",
                                        border: "1px solid #000",
                                        padding: "0.75rem",
                                        textAlign: "left"
                                    }}>Father's Name</Th>
                                    <Th style={{
                                        fontWeight: "600",
                                        backgroundColor: "#C4CFFE",
                                        color: "#000",
                                        border: "1px solid #000",
                                        padding: "0.75rem",
                                        textAlign: "left"
                                    }}>Picture</Th>
                                    <Th style={{
                                        fontWeight: "600",
                                        backgroundColor: "#C4CFFE",
                                        color: "#000",
                                        border: "1px solid #000",
                                        padding: "0.75rem",
                                        textAlign: "left"
                                    }}>Biodata</Th>
                                    <Th style={{
                                        fontWeight: "600",
                                        backgroundColor: "#C4CFFE",
                                        color: "#000",
                                        border: "1px solid #000",
                                        padding: "0.75rem",
                                        textAlign: "left"
                                    }}>About</Th>
                                    <Th style={{
                                        fontWeight: "600",
                                        backgroundColor: "#C4CFFE",
                                        color: "#000",
                                        border: "1px solid #000",
                                        padding: "0.75rem",
                                        textAlign: "left"
                                    }}>Action</Th>
                                </Tr>
                            </Thead>
                            {filteredArray.map((item) => {
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
                                            }}>{item.dob}</Td>
                                            <Td style={{
                                                border: "1px solid #000",
                                                padding: "0.75rem",
                                                textAlign: "left"
                                            }}>{item.gender}</Td>
                                            <Td style={{
                                                border: "1px solid #000",
                                                padding: "0.75rem",
                                                textAlign: "left"
                                            }}>{item.phone}</Td>
                                            <Td style={{
                                                border: "1px solid #000",
                                                padding: "0.75rem",
                                                textAlign: "left"
                                            }}>{item.fathers_name}</Td>
                                            <Td style={{
                                                border: "1px solid #000",
                                                padding: "0.75rem",
                                                textAlign: "left"
                                            }} onClick={() => handleDownload(`http://jenilsavla.pythonanywhere.com` + item.picture)}
                                            >Picture</Td>
                                            <Td style={{
                                                border: "1px solid #000",
                                                padding: "0.75rem",
                                                textAlign: "left",
                                                cursor: "pointer"
                                            }} onClick={() => handleDownload(`http://jenilsavla.pythonanywhere.com` + item.biodata)}
                                            >Biodata</Td>
                                            <Td style={{
                                                border: "1px solid #000",
                                                padding: "0.75rem",
                                                textAlign: "left"
                                            }}>{item.about}</Td>
                                            <Td style={{
                                                border: "1px solid #000",
                                                padding: "0.75rem",
                                                textAlign: "left"
                                            }}>
                                                <span onClick={() => handleedit(item.id)}> Edit </span> /
                                                <span onClick={() => handledelete(item.id)}> Delete </span>
                                            </Td>
                                        </Tr>
                                    </Tbody>
                                )
                            })}
                        </Table>
                        <Modal
                            open={isOpen}
                            onClose={handleClose}
                            aria-labelledby="modal-title"
                            style={{ backgroundColor: "white", paddingBottom: "2rem" }}
                        >
                            <div>
                                <div style={{ fontSize: "2rem", fontWeight: "700", backgroundColor: "white" }}>Edit Details</div>
                                <Grid container spacing={2} marginTop={2}
                                    style={{
                                        backgroundColor: "white", paddingLeft: "5%", paddingRight: "3.5%",
                                        paddingBottom: "1.5rem"
                                    }}>
                                    <Grid item xs={12} md={6} sm={12}>
                                        <TextField
                                            id="name_edit"
                                            name="name_edit"
                                            label="Full Name"
                                            value={editname}
                                            onChange={(e) => setEditname(e.target.value)}
                                            sx={{ width: "100%" }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6} sm={12}>
                                        <TextField
                                            id="about_edit"
                                            name="about_edit"
                                            label="About you"
                                            multiline
                                            maxRows={3}
                                            value={editabout}
                                            onChange={(e) => setEditabout(e.target.value)}
                                            sx={{ width: "100%" }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6} sm={12}>
                                        <TextField
                                            id="father_name_edit"
                                            name="father_name_edit"
                                            label="Fathers Name"
                                            value={editfather}
                                            onChange={(e) => setEditfather(e.target.value)}
                                            sx={{ width: "100%" }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6} sm={12}>
                                        <Select
                                            options={gender_options}
                                            value={editgender}
                                            styles={customStyles}
                                            onChange={(selectedOption) => setEditgender(selectedOption)}
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
                                        <TextField
                                            id="dob_edit"
                                            name="dob_edit"
                                            type="date"
                                            value={editdob}
                                            onChange={(e) => setEditdob(e.target.value)}
                                            sx={{ width: "100%" }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={4} sm={12}>
                                        <Grid item xs={12}>
                                            <Button variant="contained" type="submit"
                                                sx={{
                                                    width: "100%", height: "3.45rem", fontSize: "1.1rem",
                                                    backgroundColor: "#C4CFFE", boxShadow: "none", color: "black"
                                                    , "&:hover": {
                                                        backgroundColor: "#C4CFFE", boxShadow: "none", color: "black",
                                                        fontSize: "1.3rem",
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
        </div>
    )
}

export default Login