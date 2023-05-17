import { Grid, TextField, Button } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useFormik, ErrorMessage } from "formik";
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import PostAddIcon from '@mui/icons-material/PostAdd';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import PersonIcon from '@mui/icons-material/Person';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import DescriptionIcon from '@mui/icons-material/Description';
import WomanIcon from '@mui/icons-material/Woman';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import ManIcon from '@mui/icons-material/Man';
import WorkIcon from '@mui/icons-material/Work';
import EventIcon from '@mui/icons-material/Event';
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
        gender: yup
            .string()
            .required('Gender is required'),
        blood_group: yup
            .string()
            .required('Blood Group is required'),
        maritial_status: yup
            .string()
            .required('Maritial Status is required'),
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
            date: '',
            phone: '',
            profession_name: '',
            profession_status: '',
            education: '',
            native_village: '',
            gender: null,
            blood_group: null,
            maritial_status: null,
        },
        validationSchema: validationSchemamember,
        onSubmit: (values) => {
            console.log(values);
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("relation", values.relation);
            formData.append("dob", "2023-02-05");
            formData.append("phone", values.phone);
            formData.append("education", values.education);
            formData.append("maritial_status", values.maritial_status);
            formData.append("blood_group", values.blood_group);
            formData.append("native_village", values.native_village);
            formData.append("profession_name", values.profession_name);
            formData.append("profession_status", values.profession_status);
            formData.append("gender", values.gender);
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
            minHeight: 55,
            zindex: 15,
            backgroundColor: "transparent"
        })
    };

    return (
        <div>
            <Grid container spacing={2}>
                {load ? <>
                    <Grid item xs={12} sx={{ fontSize: "3rem", textAlign: "left" }}
                        style={{ paddingLeft: "5%", paddingRight: "2.5%" }}>
                        Family {load.id} &nbsp;&nbsp;&nbsp;
                        <span style={{ fontSize: "2rem", textAlign: "left" }}>{load.gotrej}</span>
                    </Grid>
                    <Grid item xs={12} md={6} sm={12}
                        style={{ paddingLeft: "5%", paddingRight: "2.5%" }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sx={{ fontSize: "1.75rem", textAlign: "left" }}>
                                Home Address
                            </Grid>
                            <Grid item xs={12} sx={{ fontSize: "1.15rem", textAlign: "left" }}>
                                {load.home_address}
                            </Grid>
                        </Grid>
                    </Grid>
                </>
                    : <></>}
                <Grid item xs={12} md={6} sm={12} style={{ paddingLeft: "5%", paddingRight: "2.5%" }}>
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
                                <Grid item xs={12} sx={{ fontSize: "1.15rem", textAlign: "left", marginLeft: "0.25rem" }}>
                                    {item.id}. &nbsp;{item.occupation_address}
                                </Grid>
                            )
                        })
                        }
                    </Grid>
                </Grid>
                <Grid item xs={10} sx={{ fontSize: "2rem", textAlign: "left" }}
                    style={{ paddingLeft: "5%", paddingRight: "2.5%" }}>
                    Members
                </Grid>
                <Grid item xs={2} sx={{ textAlign: "right", marginTop: "-0.5rem" }}
                    style={{ paddingLeft: "5%", paddingRight: "2.5%" }}>
                    <PostAddIcon sx={{ fontSize: "2.5rem", cursor: "pointer" }} onClick={showComponentmember} />
                </Grid>
                <Grid item xs={12}><hr /></Grid>
                <Grid item xs={12} style={{ paddingLeft: "5%", paddingRight: "2.5%" }}>
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
                                                id="gender"
                                                name="gender"
                                                value={gender_options.find((option) => option.value === formikmember.values.gender)}
                                                defaultValue={formikmember.values.gender}
                                                onChange={(selectedOption) => formikmember.setFieldValue('gender', selectedOption.value)}
                                                options={gender_options}
                                                styles={customStyles}
                                            />
                                            {formikmember.touched.gender && formikmember.errors.gender ? (
                                                <div style={{ color: "#d65a5a", fontSize: "13px", textAlign: "left", marginLeft: "15px", marginTop: "2px" }}>
                                                    {formikmember.errors.gender}
                                                </div>
                                            ) : null}
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
                                                id="blood_group"
                                                name="blood_group"
                                                value={blood_group_options.find((option) => option.value === formikmember.values.blood_group)}
                                                defaultValue={formikmember.values.blood_group}
                                                onChange={(selectedOption) => formikmember.setFieldValue('blood_group', selectedOption.value)}
                                                options={blood_group_options}
                                                styles={customStyles}
                                            />
                                            {formikmember.touched.blood_group && formikmember.errors.blood_group ? (
                                                <div style={{ color: "#d65a5a", fontSize: "13px", textAlign: "left", marginLeft: "15px", marginTop: "2px" }}>
                                                    {formikmember.errors.blood_group}
                                                </div>
                                            ) : null}
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
                                                id="maritial_status"
                                                name="maritial_status"
                                                value={maritial_status_options.find((option) => option.value === formikmember.values.maritial_status)}
                                                defaultValue={formikmember.values.maritial_status}
                                                onChange={(selectedOption) => formikmember.setFieldValue('maritial_status', selectedOption.value)}
                                                options={maritial_status_options}
                                                styles={customStyles}
                                            />
                                            {formikmember.touched.maritial_status && formikmember.errors.maritial_status ? (
                                                <div style={{ color: "#d65a5a", fontSize: "13px", textAlign: "left", marginLeft: "15px", marginTop: "2px" }}>
                                                    {formikmember.errors.maritial_status}
                                                </div>
                                            ) : null}
                                        </Grid>
                                        <Grid item xs={12} md={4} sm={12}>
                                            <TextField
                                                id="date"
                                                name="date"
                                                type="date"
                                                sx={{ width: "100%", fontSize: "1.5rem", color: "red" }}
                                                color='success'
                                                value={formikmember.values.date}
                                                onChange={formikmember.handleChange}
                                            //error={formikmember.touched.date && Boolean(formikmember.errors.date)}
                                            //helperText={formikmember.touched.date && formikmember.errors.date}
                                            //InputLabelProps={{
                                            //  shrink: true,
                                            //}}
                                            />
                                            {formikmember.touched.date && formikmember.errors.date ? (
                                                <div style={{ color: "#d65a5a", fontSize: "13px", textAlign: "left", marginLeft: "15px", marginTop: "2px" }}>
                                                    {formikmember.errors.date}
                                                </div>
                                            ) : null}
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
                    <Grid container spacing={12}
                        style={{ paddingLeft: "2%", paddingRight: "2.5%", marginTop: "1vh" }}>
                        {loadmember.map((item1) => {
                            return (
                                <Grid item xs={12} md={4} sm={6}>
                                    <Grid container spacing={2} sx={{ borderRadius: "2vh", padding: "1rem" }}>
                                        <Grid item xs={12}
                                            style={{
                                                padding: "1rem", marginLeft: "16px", marginTop: "-0.75rem",
                                                borderRadius: "1.4.75vh", backgroundColor: "#90CFD3"
                                            }}>
                                            <Grid container spacing={1} sx={{ textAlign: "left", marginTop: "0.4.75vh" }}>
                                                <Grid item xs={12}>
                                                    <div style={{ fontSize: "2rem", fontWeight: "700" }}>{item1.name}</div>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <div style={{ fontSize: "1.1rem" }}>{item1.relation}</div>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <div style={{ fontSize: "1.1rem", textAlign:"right" }}>{item1.dob}</div>
                                                </Grid>
                                                <hr style={{ border: "1px solid #E0E1DC", width: "100%", borderRadius: "5px" }} />
                                                <Grid item xs={12}>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={2}>
                                                            <WorkIcon style={{ fontSize: "4.75vh", color: "#E0E1DC" }} />
                                                        </Grid>
                                                        <Grid item xs={10} >
                                                            <div style={{ fontSize: "1.15rem", marginTop: "0.7rem" }}>{item1.education}</div>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={2}>
                                                            <HomeWorkIcon style={{ fontSize: "4.75vh", color: "#E0E1DC" }} />
                                                        </Grid>
                                                        <Grid item xs={4} >
                                                            <div style={{ fontSize: "1.15rem", marginTop: "0.7rem" }}>{item1.profession_name}</div>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={2}>
                                                            <LocationOnIcon style={{ fontSize: "4.75vh", color: "#E0E1DC" }} />
                                                        </Grid>
                                                        <Grid item xs={10} md={4} sm={4}>
                                                            <div style={{ fontSize: "1.15rem", marginTop: "0.7rem" }}>{item1.native_village}</div>
                                                        </Grid>
                                                        <Grid item xs={2}>
                                                            <LocalPhoneIcon style={{ fontSize: "4.75vh", color: "#E0E1DC" }} />
                                                        </Grid>
                                                        <Grid item xs={4} >
                                                            <div style={{ fontSize: "1.15rem", marginTop: "0.7rem" }}>{item1.phone}</div>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={2}>
                                                            <BloodtypeIcon style={{ fontSize: "4.75vh", color: "#E0E1DC" }} />
                                                        </Grid>
                                                        <Grid item xs={4} >
                                                            <div style={{ fontSize: "1.15rem", marginTop: "0.7rem" }}>{item1.blood_group}</div>
                                                        </Grid>
                                                        {item1.gender == "Male" ? <>
                                                            <Grid item xs={2}>
                                                                <ManIcon style={{ fontSize: "4.75vh", color: "#E0E1DC" }} />
                                                            </Grid>

                                                            <Grid item xs={4}>
                                                                <div style={{ fontSize: "1.15rem", marginTop: "0.7rem" }}>{item1.gender}</div>
                                                            </Grid>
                                                        </> : <>
                                                            <Grid item xs={2}>
                                                                <WomanIcon style={{ fontSize: "4.75vh", color: "#E0E1DC" }} />
                                                            </Grid>

                                                            <Grid item xs={4}>
                                                                <div style={{ fontSize: "1.15rem", marginTop: "0.7rem" }}>{item1.gender}</div>
                                                            </Grid></>}
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={2}>
                                                            <PersonIcon style={{ fontSize: "4.75vh", color: "#E0E1DC" }} />
                                                        </Grid>
                                                        <Grid item xs={4} >
                                                            <div style={{ fontSize: "1.15rem", marginTop: "0.7rem" }}>{item1.maritial_status}</div>
                                                        </Grid>
                                                        <Grid item xs={2}>
                                                            <WorkIcon style={{ fontSize: "4.75vh", color: "#E0E1DC" }} />
                                                        </Grid>
                                                        <Grid item xs={4} >
                                                            <div style={{ fontSize: "1.15rem", marginTop: "0.7rem" }}>{item1.profession_status}</div>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                
                                            </Grid>
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