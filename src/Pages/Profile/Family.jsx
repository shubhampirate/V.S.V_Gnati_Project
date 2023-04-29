import { Grid, TextField, Button } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useFormik } from "formik";
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import PostAddIcon from '@mui/icons-material/PostAdd';
import Swal from 'sweetalert2';
import axios from 'axios';
import Select from 'react-select';
const Family = () => {

    const validationSchema = yup.object({
        occupation: yup
            .string('Enter your Occupation')
            .required('Occupation is required'),
    });

    const validationSchemamember = yup.object({
        name: yup
            .string('Enter your Name')
            .required('Name is required'),
        relation: yup
            .string('Enter your Relation')
            .required('Relation is required'),
        education: yup
            .string('Enter your Education')
            .required('Education is required'),
        profession_status: yup
            .string('Enter your Profession Status')
            .required('Profession Status is required'),
        profession_name: yup
            .string('Enter your Profesion Name')
            .required('Profession Name is required'),
        native_village: yup
            .string('Enter your Native Village')
            .required('Native Village is required'),
        phone: yup
            .string('Enter your Phone Number')
            .required('Phone Number is required'),
        date: yup
            .date('Enter your Date of Birth')
            .required('Date of birth is required'),
    });
    const blood_group_options = [
        { value: 'A+', label: 'A+' },
        { value: 'A-', label: 'A-' },
        { value: 'B+', label: 'B+' },
        { value: 'B-', label: 'B-' },
        { value: 'AB+', label: 'AB+' },
        { value: 'AB-', label: 'AB-' },
        { value: 'O+', label: 'O+' },
        { value: 'O-', label: 'O-' },
    ];
    const gender_options = [
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' },
    ];

    const maritial_status_options = [
        { value: 'Single', label: 'Single' },
        { value: 'Married', label: 'Married' },
    ];
    const [show, setShow] = useState(false);
    const showComponent = (e) => { setShow(!show) }
    const [showmember, setShowmember] = useState(false);
    const showComponentmember = (e) => { setShowmember(!showmember) }
    const [gender, setGender] = useState(null);
    const [blood, setBlood] = useState(null);
    const [maritial, setMaritial] = useState(null);
    const formik = useFormik({
        initialValues: {
            occupation: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values);
            const formData = new FormData();
            formData.append("occupation_address", values.occupation);
            fetch("http://jenilsavla.pythonanywhere.com/api/family/1", {
                method: "POST",
                headers: {
                    "Authorization": "Token ebeb63c068b02f00c0797a0c8edc06575c139fbb",
                },
                body: formData,
            })
                .then((result) => {
                    console.log(result);
                    Swal.fire({
                        icon: 'success',
                        title: 'Successfully Added the Company',
                        showConfirmButton: false,
                        timer: 4000
                    })
                    loadList();
                })
                .catch(() => {
                    alert('Error in the Code');
                });
        }
    });

    const formikmember = useFormik({
        initialValues: {
            name: '',
            relation: '',
            date: new Date(),
            phone: '',
            profession_name:'',
            profession_status:'',
            education:'',
            native_village:'',
        },
        validationSchema: validationSchemamember,
        onSubmit: (values) => {
            console.log(values,blood.value,gender.value,maritial.value);
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("relation", values.relation);
            formData.append("dob", "2023-02-05");
            formData.append("phone", values.phone);
            formData.append("education", values.education);
            formData.append("maritial_status", maritial.value);
            formData.append("blood_group", blood.value);
            formData.append("native_village", values.native_village);
            formData.append("profession_name", values.profession_name);
            formData.append("profession_status", values.profession_status);
            formData.append("gender", gender.value);
            fetch("http://jenilsavla.pythonanywhere.com/api/add-member/1", {
                method: "POST",
                headers: {
                    "Authorization": "Token ebeb63c068b02f00c0797a0c8edc06575c139fbb",
                },
                body: formData,
            })
                .then((result) => {
                    console.log(result);
                    Swal.fire({
                        icon: 'success',
                        title: 'Successfully Added the Company',
                        showConfirmButton: false,
                        timer: 4000
                    })
                    loadList();
                })
                .catch(() => {
                    alert('Error in the Code');
                });
        }
    });

    const [load, setLoad] = useState([]);
    const [loadoccupation, setLoadOccupation] = useState([]);
    const [loadmember, setLoadmember] = useState([]);
    useEffect(() => {
        loadList();
    }, []);

    const loadList = async () => {
        //const token = localStorage.getItem("token")
        const result = await axios.get(`http://jenilsavla.pythonanywhere.com/api/family/1`, {
            headers: { "Authorization": `Token ebeb63c068b02f00c0797a0c8edc06575c139fbb` },
        });
        setLoad(result.data.data);
        setLoadOccupation(result.data.data.occupations);
        setLoadmember(result.data.data.members);

    };
    //console.log(loadmember);
    const customStyles = {
        control: base => ({
            ...base,
            height: 55,
            minHeight: 55
        })
    };

    return (
        <div>
            <Grid container spacing={2} sx={{ padding: "3rem" }}>
                {load ? <>
                    <Grid item xs={12} sx={{ fontSize: "3rem", textAlign: "left" }}>
                        Family {load.id} &nbsp;&nbsp;&nbsp;
                        <span style={{ fontSize: "2rem", textAlign: "left" }}>{load.gotrej}</span>
                    </Grid>
                    <Grid item xs={12} md={6} sm={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sx={{ fontSize: "1.75rem", textAlign: "left" }}>
                                Home Address
                            </Grid>
                            <Grid item xs={12} sx={{ fontSize: "1.25rem", textAlign: "left" }}>
                                {load.home_address}
                            </Grid>
                        </Grid>
                    </Grid>
                </>
                    : <></>}
                <Grid item xs={12} md={6} sm={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={10} sx={{ fontSize: "1.75rem", textAlign: "left" }}>
                            Occupation Address
                        </Grid>
                        <Grid item xs={2} sx={{ textAlign: "right", marginTop: "-0.5rem" }}>
                            <PostAddIcon sx={{ fontSize: "2.5rem", cursor: "pointer" }} onClick={showComponent} />
                        </Grid>
                        <Grid item xs={12}>
                            {show ?
                                <>
                                    <div>
                                        <form onSubmit={formik.handleSubmit} >
                                            <Grid container spacing={2} marginTop={1}>
                                                <Grid item xs={12} md={9} sm={12}>
                                                    <TextField
                                                        id="occupation"
                                                        name="occupation"
                                                        label="Occupation"
                                                        color='success'
                                                        value={formik.values.occupation}
                                                        onChange={formik.handleChange}
                                                        error={formik.touched.occupation && Boolean(formik.errors.occupation)}
                                                        helperText={formik.touched.occupation && formik.errors.occupation}
                                                        sx={{ width: "100%" }}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} md={3} sm={12}>
                                                    <Button color="success" variant="contained" type="submit"
                                                        sx={{ width: "100%", height: "3.45rem", fontSize: "1.1rem" }}>
                                                        Submit
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </form>
                                    </div>
                                </> : <></>}
                        </Grid>
                        {loadoccupation.map((item) => {
                            return (
                                <Grid item xs={12} sx={{ fontSize: "1.25rem", textAlign: "left", marginLeft: "0.25rem" }}>
                                    {item.id}. &nbsp;{item.occupation_address}
                                </Grid>
                            )
                        })
                        }
                    </Grid>
                </Grid>
                <Grid item xs={10} sx={{ fontSize: "2rem", textAlign: "left" }}>
                    Members
                </Grid>
                <Grid item xs={2} sx={{ textAlign: "right", marginTop: "-0.5rem" }}>
                    <PostAddIcon sx={{ fontSize: "2.5rem", cursor: "pointer" }} onClick={showComponentmember} />
                </Grid>
                <Grid item xs={12}><hr /></Grid>
                <Grid item xs={12}>
                    {showmember ?
                        <>
                            <div>
                                <form onSubmit={formikmember.handleSubmit} >
                                    <Grid container spacing={2} marginTop={1}>
                                        <Grid item xs={12} md={4} sm={12}>
                                            <TextField
                                                id="name"
                                                name="name"
                                                label="name"
                                                color='success'
                                                value={formikmember.values.name}
                                                onChange={formikmember.handleChange}
                                                error={formikmember.touched.name && Boolean(formikmember.errors.name)}
                                                helperText={formikmember.touched.name && formikmember.errors.name}
                                                sx={{ width: "100%" }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={4} sm={6}>
                                            <TextField
                                                id="relation"
                                                name="relation"
                                                label="relation"
                                                color='success'
                                                value={formikmember.values.relation}
                                                onChange={formikmember.handleChange}
                                                error={formikmember.touched.relation && Boolean(formikmember.errors.relation)}
                                                helperText={formikmember.touched.relation && formikmember.errors.relation}
                                                sx={{ width: "100%" }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={4} sm={6}>
                                            <Select
                                                defaultValue={setGender}
                                                onChange={setGender}
                                                options={gender_options}
                                                styles={customStyles}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={4} sm={12}>
                                            <TextField
                                                id="education"
                                                name="education"
                                                label="education"
                                                color='success'
                                                value={formikmember.values.education}
                                                onChange={formikmember.handleChange}
                                                error={formikmember.touched.education && Boolean(formikmember.errors.education)}
                                                helperText={formikmember.touched.education && formikmember.errors.education}
                                                sx={{ width: "100%" }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={4} sm={6}>
                                            <TextField
                                                id="phone"
                                                name="phone"
                                                label="phone"
                                                color='success'
                                                value={formikmember.values.phone}
                                                onChange={formikmember.handleChange}
                                                error={formikmember.touched.phone && Boolean(formikmember.errors.phone)}
                                                helperText={formikmember.touched.phone && formikmember.errors.phone}
                                                sx={{ width: "100%" }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={4} sm={6}>
                                            <Select
                                                defaultValue={setBlood}
                                                onChange={setBlood}
                                                options={blood_group_options}
                                                styles={customStyles}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={4} sm={12}>
                                            <TextField
                                                id="native_village"
                                                name="native_village"
                                                label="native_village"
                                                color='success'
                                                value={formikmember.values.native_village}
                                                onChange={formikmember.handleChange}
                                                error={formikmember.touched.native_village && Boolean(formikmember.errors.native_village)}
                                                helperText={formikmember.touched.native_village && formikmember.errors.native_village}
                                                sx={{ width: "100%" }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={4} sm={12}>
                                            <Select
                                                defaultValue={setMaritial}
                                                onChange={setMaritial}
                                                options={maritial_status_options}
                                                styles={customStyles}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={4} sm={12}>
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
                                                id="profession_status"
                                                name="profession_status"
                                                label="profession_status"
                                                color='success'
                                                value={formikmember.values.profession_status}
                                                onChange={formikmember.handleChange}
                                                error={formikmember.touched.profession_status && Boolean(formikmember.errors.profession_status)}
                                                helperText={formikmember.touched.profession_status && formikmember.errors.profession_status}
                                                sx={{ width: "100%" }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6} sm={12}>
                                            <TextField
                                                id="profession_name"
                                                name="profession_name"
                                                label="profession_name"
                                                color='success'
                                                value={formikmember.values.profession_name}
                                                onChange={formikmember.handleChange}
                                                error={formikmember.touched.profession_name && Boolean(formikmember.errors.profession_name)}
                                                helperText={formikmember.touched.profession_name && formikmember.errors.profession_name}
                                                sx={{ width: "100%" }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={12} sm={12}>
                                            <Button color="success" variant="contained" type="submit"
                                                sx={{ width: "100%", height: "3.45rem", fontSize: "1.1rem" }}>
                                                Submit
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </div>
                        </> : <>&nbsp;</>}
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={12}>
                        {loadmember.map((item1) => {
                            return (
                                <Grid item xs={12} md={4} sm={12}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sx={{ fontSize: "1.75rem", textAlign: "left" }}>
                                            {item1.name} &nbsp;
                                            <span style={{ fontSize: "1.25rem", textAlign: "left" }}>
                                                {item1.relation} &nbsp; {item1.blood_group}
                                            </span>
                                        </Grid>
                                        <Grid item xs={12} sx={{ fontSize: "1.25rem", textAlign: "left", marginTop: "-0.75rem" }}>
                                            {item1.native_village}
                                        </Grid>
                                        <Grid item xs={12} sx={{ fontSize: "1.25rem", textAlign: "left", marginTop: "-0.75rem" }}>
                                            +91 {item1.phone}
                                        </Grid>
                                        <Grid item xs={12} sx={{ fontSize: "1.25rem", textAlign: "left", marginTop: "-0.75rem" }}>
                                            {item1.dob} &nbsp; {item1.maritial_status}
                                        </Grid>
                                        <Grid item xs={12} sx={{ fontSize: "1.25rem", textAlign: "left", marginTop: "-0.75rem" }}>
                                            {item1.profession_status}
                                        </Grid>
                                        <Grid item xs={12} sx={{ fontSize: "1.25rem", textAlign: "left", marginTop: "-0.75rem" }}>
                                            {item1.profession_name}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default Family