import { Grid, TextField, Button, Modal, FormHelperText } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useFormik, ErrorMessage, } from "formik";
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import HomeIcon from '@mui/icons-material/Home';
import WomanIcon from '@mui/icons-material/Woman';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import AddHomeIcon from '@mui/icons-material/AddHome';
import ManIcon from '@mui/icons-material/Man';
import WorkIcon from '@mui/icons-material/Work';
import PostAddIcon from '@mui/icons-material/PostAdd';
import EditIcon from '@mui/icons-material/Edit';
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import EmailIcon from '@mui/icons-material/Email';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import axios from 'axios';
import Select from 'react-select';
const Family = () => {
    const token = localStorage.getItem("tokenvsv")
    const family = localStorage.getItem("familyid")
    const validationSchema = yup.object({
        occupation: yup
            .string('Enter your Occupation')
            .required('Occupation is required'),
        member: yup
            .string('Enter Member Id')
            .required('Member Id is required'),
    });

    const validationSchemamember = yup.object({
        name: yup
            .string('Enter your Name')
            .required('Name is required'),
        relation: yup
            .string('')
            .required('Relation is required'),
        education: yup
            .string('Enter your Education')
            .required('Education is required'),
        profession_status: yup
            .string()
            .required('Profession Status is required'),
        profession_name: yup
            .string('')
            .required('Profession Name is required'),
        email_address: yup
            .string()
            .email('Invalid emailaddress')
            .required('Email address is required'),
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
    const profession_status_options = [
        { value: 'Business', label: 'Business' },
        { value: 'Job', label: 'Job' },
        { value: 'Student', label: 'Student' },
        { value: 'N/A', label: 'N/A' }
    ];


    const profession_name_options = [
        { value: 'CA', label: 'CA' },
        { value: 'Engineer', label: 'Engineer' },
        { value: 'Student', label: 'Student' },
        { value: 'Doctor', label: 'Doctor' },
        { value: 'Architect', label: 'Architect' },
        { value: 'Lawyer', label: 'Lawyer' },
        { value: 'Professor/Teacher', label: 'Professor/Teacher' },
        { value: 'Journalist', label: 'Journalist' },
        { value: 'Banker', label: 'Banker' },
        { value: 'Other', label: 'Other' },
    ]

    const relation_options = [
        { value: "Self", label: 'Self' },
        { value: 'Mother', label: 'Mother' },
        { value: "Brother", label: 'Brother' },
        { value: 'Grandmother', label: 'Grandmother' },
        { value: "Sister", label: 'Sister' },
        { value: 'Son', label: 'Son' },
        { value: "Father", label: 'Father' },
        { value: 'Grandfather', label: 'Grandfather' },
        { value: 'Daughter', label: 'Daughter' },
        { value: "Daughter-in-law", label: 'Daughter-in-law' },
        { value: 'Son-in-law', label: 'Son-in-law' },
    ]

    const [show, setShow] = useState(false);
    const showComponent = (e) => { setShow(!show) }
    const [showmember, setShowmember] = useState(false);
    const showComponentmember = (e) => { setShowmember(!showmember) }
    const [showEdit, setShowedit] = useState(false);
    const showEditComponent = (e) => { setShowedit(!showEdit) }
    const [showHomeEdit, setShowHomeedit] = useState(false);
    const showHomeEditComponent = (e) => { setShowHomeedit(!showHomeEdit) }
    const [showNativeEdit, setShowNativeedit] = useState(false);
    const showEditNativeComponent = (e) => { setShowNativeedit(!showNativeEdit) }
    const [showOccupationEdit, setShowOccupationedit] = useState(false);
    const showEditOccupationComponent = (e) => { setShowOccupationedit(!showOccupationEdit) }
    const [homeedit, setHomeedit] = useState('');
    const [gotrejedit, setGotrejedit] = useState('');
    const [nativeedit, setNativeedit] = useState('');
    const [occedit, setOccuedit] = useState('');
    const [memedit, setMemid] = useState('');
    const [useridocc, setUseridocc] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [editphone, setEditphone] = useState('');
    const [editname, setEditname] = useState('');
    const [editrelation, setEditrelation] = useState('');
    const [editdob, setEditdob] = useState('');
    const [editeducation, setEditeducation] = useState('');
    const [editprofstatus, setEditprofstatus] = useState('');
    const [editprofname, setEditprofname] = useState('');
    const [editgender, setEditgender] = useState('');
    const [editbg, setEditbg] = useState('');
    const [editemail, setEditemail] = useState('');
    const [editmaritialstatus, setEditmaritialstatus] = useState('');
    const [usernamemem, setUsernamemem] = useState('');

    const handleClose = () => {
        setIsOpen(false);
    };

    const formik = useFormik({
        initialValues: {
            occupation: '',
            member: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values);
            fetch(`http://jenilsavla.pythonanywhere.com/api/family/${family}`, {
                method: "POST",
                headers: {
                    "Authorization": `Token ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ occupation_address: values.occupation, member: values.member }),
            })
                .then((result) => {
                    console.log(result);
                    /*Swal.fire({
                        icon: 'success',
                        title: 'Successfully Added the Company',
                        showConfirmButton: false,
                        timer: 4000
                    })*/
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
            relation: null,
            date: '',
            phone: '',
            profession_name: null,
            profession_status: '',
            education: '',
            email_address: '',
            gender: null,
            blood_group: null,
            maritial_status: null,
            profession_status: null,
        },
        validationSchema: validationSchemamember,
        onSubmit: (values) => {
            console.log(values);
            /*const formData = new FormData();
            formData.append("name", values.name);
            formData.append("relation", values.relation);
            formData.append("dob", values.date);
            formData.append("phone", values.phone);
            formData.append("education", values.education);
            formData.append("maritial_status", values.maritial_status);
            formData.append("blood_group", values.blood_group);
            formData.append("email_address", values.email_address);
            formData.append("profession_name", values.profession_name);
            formData.append("profession_status", values.profession_status);
            formData.append("gender", values.gender);*/
            fetch(`http://jenilsavla.pythonanywhere.com/api/add-member/${family}`, {
                method: "POST",
                headers: {
                    "Authorization": `Token ${token}`,
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify({
                    name: values.name,
                    relation: values.relation,
                    dob: values.date,
                    phone: values.phone,
                    education: values.education,
                    maritial_status: values.maritial_status,
                    blood_group: values.blood_group,
                    email_address: values.email_address,
                    profession_name: values.profession_name,
                    profession_status: values.profession_status,
                    gender: values.gender

                }),
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
        const token = localStorage.getItem("tokenvsv")
        const family = localStorage.getItem("familyid")
        const result = await axios.get(`http://jenilsavla.pythonanywhere.com/api/family/${family}`, {
            headers: { "Authorization": `Token ${token}` },
        });
        setLoad(result.data.data);
        setLoadOccupation(result.data.data.occupations);
        setLoadmember(result.data.data.members);
    };
    //console.log(loadmember);

    const handlehomedit = async () => {
        console.log(homeedit)
        const searchData = {
            home_address: homeedit,
            gotrej: load.gotrej,
            native_village: load.native_village,
            occupations: [],
        };
        fetch(`http://jenilsavla.pythonanywhere.com/api/family/${family}`, {
            method: 'PUT',
            headers: {
                "Authorization": `Token ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(searchData),
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

    const handlegotrejedit = async () => {
        console.log(gotrejedit)
        const searchData = {
            home_address: load.home_address,
            gotrej: gotrejedit,
            native_village: load.native_village,
            occupations: [],
        };
        fetch(`http://jenilsavla.pythonanywhere.com/api/family/${family}`, {
            method: 'PUT',
            headers: {
                "Authorization": `Token ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(searchData),
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

    const handlenativedit = async () => {
        console.log(nativeedit)
        const searchData = {
            home_address: load.home_address,
            gotrej: load.gotrej,
            native_village: nativeedit,
            occupations: [],
        };
        fetch(`http://jenilsavla.pythonanywhere.com/api/family/${family}`, {
            method: 'PUT',
            headers: {
                "Authorization": `Token ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(searchData),
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

    const handleDelete = async (id) => {
        console.log(id);
        const searchData = {
            username: id,
        };
        fetch(`http://jenilsavla.pythonanywhere.com/api/add-member/${family}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Token ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(searchData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                loadList();
                loadList();
                setShowOccupationedit(false);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const handleDeleteoccupation = async (id) => {
        console.log(id);
        fetch(`http://jenilsavla.pythonanywhere.com/api/family/${id}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Token ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                loadList();
                loadList();
                setShowOccupationedit(false);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const handleeditoccupation = async (iduser) => {
        console.log(iduser);
        setUseridocc(iduser);
        const searchData = {
            occupations: [
                {
                    id: useridocc,
                    occupation_address: occedit,
                    member: memedit
                }
            ]
        };
        fetch(`http://jenilsavla.pythonanywhere.com/api/family/${family}`, {
            method: 'PUT',
            headers: {
                "Authorization": `Token ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(searchData),
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

    const handleeditmember = async (id) => {
        console.log(id);
        setUsernamemem(id);
        setIsOpen(true);
        const result = await axios.get(`http://jenilsavla.pythonanywhere.com/api/add-member/${id}`, {
            headers: { "Authorization": `Token ${token}`, },
        });
        console.log(result.data.data);
        setEditbg(result.data.data.blood_group);
        setEditdob(result.data.data.dob);
        setEditeducation(result.data.data.education);
        setEditname(result.data.data.name);
        setEditrelation(result.data.data.relation);
        setEditemail(result.data.data.email_address);
        setEditprofname(result.data.data.profession_name);
        setEditphone(result.data.data.phone);
        setEditgender(result.data.data.gender);
        setEditmaritialstatus(result.data.data.maritial_status);
        setEditprofstatus(result.data.data.profession_status);

    }

    const handleeditaddmember = async () => {

        const searchData = {
            username: usernamemem,
            phone: editphone,
            name: editname,
            relation: editrelation.value,
            dob: editdob,
            education: editeducation,
            profession_status: editprofstatus.value,
            profession_name: editprofname.value,
            gender: editgender.value,
            blood_group: editbg.value,
            maritial_status: editmaritialstatus.value,
            email_address: editemail
        };
        fetch(`http://jenilsavla.pythonanywhere.com/api/add-member/${family}`, {
            method: 'PUT',
            headers: {
                "Authorization": `Token ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(searchData),
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

    //console.log(load);


    return (
        <div>
            <Grid container spacing={2} style={{ marginBottom: "2rem" }}>
                {load ? <>
                    <Grid item xs={12} sx={{ marginTop: "2.5rem", marginBottom: "3rem" }}>
                        <div style={{ fontSize: "3rem", fontWeight: "700" }}>Family {load.id}</div>
                    </Grid>
                    <Grid item xs={12} md={6} sm={12}>

                        <Grid container spacing={2}>
                            <Grid item xs={2}>
                                <AddHomeIcon style={{
                                    fontSize: "6vh", color: "#90CFD3", marginLeft: "15%",
                                    paddingLeft: "10%", paddingRight: "2.5%", marginTop: "-5%",
                                    textAlign: "right"
                                }} onClick={showHomeEditComponent} />
                            </Grid>
                            <Grid item xs={8}>
                                <div
                                    style={{
                                        fontSize: "2rem", fontWeight: "500", textAlign: "left"
                                    }}>Home Address</div>
                            </Grid>
                            <Grid item xs={12} sx={{ marginBottom: "2.5rem", marginTop: "0.5rem" }}>
                                {showHomeEdit ?
                                    <>
                                        <Grid container spacing={2} marginTop={1}
                                            sx={{

                                                paddingLeft: "7%", paddingRight: "3.5%", marginTop: "-2.5%",
                                            }}>
                                            <Grid item xs={12} md={9} sm={12}>
                                                <TextField
                                                    id="home_address"
                                                    name="home_address"
                                                    label="Home Address"
                                                    value={homeedit}
                                                    onChange={(e) => setHomeedit(e.target.value)}
                                                    sx={{
                                                        width: "100%", "& .MuiInputBase-root": {
                                                            height: 50
                                                        }
                                                    }}

                                                />
                                            </Grid>
                                            <Grid item xs={12} md={3} sm={12}>
                                                <Button variant="contained" type="submit"
                                                    sx={{
                                                        width: "100%", height: "3.1rem", fontSize: "1.1rem",
                                                        backgroundColor: "#90CFD3", boxShadow: "none", color: "black", "&:hover": {
                                                            backgroundColor: "#90CFD3", boxShadow: "none", color: "black",
                                                            fontSize: "1.3rem"
                                                        }
                                                    }} onClick={handlehomedit}>
                                                    Submit
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </> : <>

                                    </>}
                                <div
                                    style={{
                                        fontSize: "1.5rem",
                                        paddingLeft: "7%",
                                        paddingRight: "2.5%",
                                        textAlign: "left",
                                        paddingTop: "1rem",
                                    }}>{load.home_address}</div>
                            </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                            <Grid item xs={2}>
                                <PostAddIcon style={{
                                    fontSize: "6vh", color: "#90CFD3", marginLeft: "15%",
                                    paddingLeft: "10%", paddingRight: "2.5%", marginTop: "-5%",
                                    textAlign: "right"
                                }} onClick={showEditComponent} />
                            </Grid>
                            <Grid item xs={8}>
                                <div
                                    style={{
                                        fontSize: "2rem", fontWeight: "500", textAlign: "left"
                                    }}>Gotrej</div>
                            </Grid>
                            <Grid item xs={12} sx={{ marginBottom: "2.5rem", marginTop: "0.5rem" }}>
                                {showEdit ?
                                    <>
                                        <Grid container spacing={2} marginTop={1}
                                            sx={{

                                                paddingLeft: "7%", paddingRight: "3.5%", marginTop: "-2.5%",
                                            }}>
                                            <Grid item xs={12} md={9} sm={12}>
                                                <TextField
                                                    id="gotrej"
                                                    name="gotrej"
                                                    label="Gotrej"
                                                    value={gotrejedit}
                                                    onChange={(e) => setGotrejedit(e.target.value)}
                                                    sx={{
                                                        width: "100%", "& .MuiInputBase-root": {
                                                            height: 50
                                                        }
                                                    }}

                                                />
                                            </Grid>
                                            <Grid item xs={12} md={3} sm={12}>
                                                <Button variant="contained" type="submit"
                                                    sx={{
                                                        width: "100%", height: "3.1rem", fontSize: "1.1rem",
                                                        backgroundColor: "#90CFD3", boxShadow: "none", color: "black", "&:hover": {
                                                            backgroundColor: "#90CFD3", boxShadow: "none", color: "black",
                                                            fontSize: "1.3rem"
                                                        }
                                                    }} onClick={handlegotrejedit}>
                                                    Submit
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </> : <>

                                    </>}
                                <div
                                    style={{
                                        fontSize: "1.5rem",
                                        paddingLeft: "7%",
                                        paddingRight: "2.5%",
                                        textAlign: "left",
                                        paddingTop: "1rem",
                                    }}>{load.gotrej}</div>
                            </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                            <Grid item xs={2}>
                                <AddBusinessIcon style={{
                                    fontSize: "6vh", color: "#90CFD3", marginLeft: "15%",
                                    paddingLeft: "10%", paddingRight: "2.5%", marginTop: "-5%",
                                    textAlign: "right"
                                }} onClick={showEditNativeComponent} />
                            </Grid>
                            <Grid item xs={8}>
                                <div
                                    style={{
                                        fontSize: "2rem", fontWeight: "500", textAlign: "left"
                                    }}>Native Village</div>
                            </Grid>
                            <Grid item xs={12} sx={{ marginBottom: "2.5rem", marginTop: "0.5rem" }}>
                                {showNativeEdit ?
                                    <>
                                        <Grid container spacing={2} marginTop={1}
                                            sx={{

                                                paddingLeft: "7%", paddingRight: "3.5%", marginTop: "-2.5%",
                                            }}>
                                            <Grid item xs={12} md={9} sm={12}>
                                                <TextField
                                                    id="native_village"
                                                    name="native_village"
                                                    label="Native Village"
                                                    value={nativeedit}
                                                    onChange={(e) => setNativeedit(e.target.value)}
                                                    sx={{
                                                        width: "100%", "& .MuiInputBase-root": {
                                                            height: 50
                                                        }
                                                    }}

                                                />
                                            </Grid>
                                            <Grid item xs={12} md={3} sm={12}>
                                                <Button variant="contained" type="submit"
                                                    sx={{
                                                        width: "100%", height: "3.1rem", fontSize: "1.1rem",
                                                        backgroundColor: "#90CFD3", boxShadow: "none", color: "black", "&:hover": {
                                                            backgroundColor: "#90CFD3", boxShadow: "none", color: "black",
                                                            fontSize: "1.3rem"
                                                        }
                                                    }} onClick={handlenativedit}>
                                                    Submit
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </> : <>

                                    </>}
                                <div
                                    style={{
                                        fontSize: "1.5rem",
                                        paddingLeft: "7%",
                                        paddingRight: "2.5%",
                                        textAlign: "left",
                                        paddingTop: "1rem",
                                    }}>{load.native_village}</div>
                            </Grid>
                        </Grid>
                    </Grid>
                </>
                    : <></>}
                <Grid item xs={12} md={6} sm={12} style={{ paddingLeft: "5%", paddingRight: "2.5%" }}>
                    <Grid container spacing={2}>
                        <Grid item xs={2}>
                            <AddHomeWorkIcon style={{
                                fontSize: "6vh", color: "#90CFD3", marginLeft: "15%",
                                paddingLeft: "10%", paddingRight: "2.5%", marginTop: "-5%",
                                textAlign: "right", cursor: "pointer"
                            }} onClick={showComponent} />
                        </Grid>
                        <Grid item xs={8}>
                            <div
                                style={{
                                    fontSize: "2rem", fontWeight: "500", textAlign: "left"
                                }}>Occupation</div>
                        </Grid>
                        <Grid item xs={12}>
                            {show ?
                                <>
                                    <div>
                                        <form onSubmit={formik.handleSubmit} >
                                            <Grid container spacing={2} marginTop={1}
                                                sx={{

                                                    paddingLeft: "6%", paddingRight: "2.5%", marginTop: "-3%",
                                                    marginBottom: "2rem"
                                                }}>
                                                <Grid item xs={12} md={7} sm={12}>
                                                    <TextField
                                                        id="occupation"
                                                        name="occupation"
                                                        label="Occupation"
                                                        color='success'
                                                        value={formik.values.occupation}
                                                        onChange={formik.handleChange}
                                                        error={formik.touched.occupation && Boolean(formik.errors.occupation)}
                                                        helperText={formik.touched.occupation && formik.errors.occupation}
                                                        sx={{
                                                            width: "100%", "& .MuiInputBase-root": {
                                                                height: 50
                                                            }
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} md={3} sm={12}>
                                                    <TextField
                                                        id="member"
                                                        name="member"
                                                        label="Member"
                                                        color='success'
                                                        value={formik.values.member}
                                                        onChange={formik.handleChange}
                                                        error={formik.touched.member && Boolean(formik.errors.member)}
                                                        helperText={formik.touched.member && formik.errors.member}
                                                        sx={{
                                                            width: "100%", "& .MuiInputBase-root": {
                                                                height: 50
                                                            }
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} md={2} sm={12}>
                                                    <Button variant="contained" type="submit"
                                                        sx={{
                                                            width: "100%", height: "3.1rem", fontSize: "1.1rem",
                                                            backgroundColor: "#90CFD3", boxShadow: "none", color: "black", "&:hover": {
                                                                backgroundColor: "#90CFD3", boxShadow: "none", color: "black",
                                                                fontSize: "1.3rem"
                                                            }
                                                        }}>
                                                        Submit
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </form>
                                    </div>
                                </> : <></>}
                        </Grid>
                        {showOccupationEdit ?
                            <>
                                <Grid container spacing={2} marginTop={1}
                                    sx={{
                                        paddingLeft: "7.5%", paddingRight: "2.5%", marginTop: "-3%",
                                        marginBottom: "2rem"
                                    }}>
                                    <Grid item xs={12} md={7} sm={12}>
                                        <TextField
                                            id="occupation"
                                            name="occupation"
                                            label="Occupation"
                                            color='success'
                                            value={occedit}
                                            onChange={(e) => setOccuedit(e.target.value)}
                                            sx={{
                                                width: "100%", "& .MuiInputBase-root": {
                                                    height: 50
                                                }
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={3} sm={12}>
                                        <TextField
                                            id="member"
                                            name="member"
                                            label="Member"
                                            color='success'
                                            value={memedit}
                                            onChange={(e) => setMemid(e.target.value)}
                                            sx={{
                                                width: "100%", "& .MuiInputBase-root": {
                                                    height: 50
                                                }
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={2} sm={12}>
                                        <Button variant="contained" type="submit"
                                            sx={{
                                                width: "100%", height: "3.1rem", fontSize: "1.1rem",
                                                backgroundColor: "#90CFD3", boxShadow: "none", color: "black", "&:hover": {
                                                    backgroundColor: "#90CFD3", boxShadow: "none", color: "black",
                                                    fontSize: "1.3rem"
                                                }
                                            }} onClick={() => handleeditoccupation(useridocc)}>
                                            Edit
                                        </Button>
                                    </Grid>
                                </Grid>
                            </> : <>

                            </>
                        }
                        {loadoccupation.map((item) => {
                            return (

                                <Grid container spacing={2} style={{ paddingLeft: "4%" }}>
                                    <Grid item xs={8}>
                                        <div
                                            style={{
                                                fontSize: "1.5rem",
                                                paddingLeft: "6%",
                                                paddingRight: "2.5%",
                                                textAlign: "left",
                                            }}>{item.id}. &nbsp;{item.occupation_address} &nbsp; - &nbsp;{item.member}</div>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <EditIcon style={{ fontSize: "4.75vh", color: "#018d8d", textAlign: "right" }}
                                            onClick={() => { showEditOccupationComponent(); handleeditoccupation(item.id) }} />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <DeleteIcon style={{ fontSize: "4.75vh", color: "#018d8d", textAlign: "right" }}
                                            onClick={() => handleDeleteoccupation(item.id)} />
                                    </Grid>

                                </Grid>

                            )
                        })
                        }
                    </Grid>
                </Grid>
                <Grid item xs={12} md={6} sm={12}>
                    <Grid container spacing={2} sx={{ marginTop: "2%" }}>
                        <Grid item xs={2}>
                            <GroupAddIcon style={{
                                fontSize: "6vh", color: "#90CFD3", marginLeft: "15%",
                                paddingLeft: "15%", paddingRight: "2.5%", marginTop: "-5%",
                                textAlign: "right", cursor: "pointer"
                            }} onClick={showComponentmember} />
                        </Grid>
                        <Grid item xs={10}>
                            <div
                                style={{
                                    fontSize: "2rem", fontWeight: "500", textAlign: "left"
                                }}>Members</div>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={6} sm={12}>
                </Grid>
                <Grid item xs={12}>
                    {showmember ?
                        <>
                            <div>
                                <form onSubmit={formikmember.handleSubmit}
                                    style={{ paddingLeft: "4%", paddingRight: "3.5%" }}>
                                    <Grid container spacing={2} marginTop={1}>
                                        <Grid item xs={12} md={3} sm={12}>
                                            <TextField
                                                id="name"
                                                name="name"
                                                label="First Middle Last Name"
                                                color='success'
                                                value={formikmember.values.name}
                                                onChange={formikmember.handleChange}
                                                error={formikmember.touched.name && Boolean(formikmember.errors.name)}
                                                helperText={formikmember.touched.name && formikmember.errors.name}
                                                sx={{ width: "100%" }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={3} sm={6}>
                                            <TextField
                                                id="phone"
                                                name="phone"
                                                label="Phone Number"
                                                color='success'
                                                value={formikmember.values.phone}
                                                onChange={formikmember.handleChange}
                                                error={formikmember.touched.phone && Boolean(formikmember.errors.phone)}
                                                helperText={formikmember.touched.phone && formikmember.errors.phone}
                                                sx={{ width: "100%" }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={3} sm={6}>
                                            <Select
                                                id="gender"
                                                name="gender"
                                                placeholder="Gender"
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
                                        <Grid item xs={12} md={3} sm={12}>
                                            <TextField
                                                id="date"
                                                name="date"
                                                type="date"
                                                placeholder='Date of Birth'
                                                sx={{ width: "100%", fontSize: "1.5rem", color: "red" }}
                                                color='success'
                                                value={formikmember.values.date}
                                                onChange={formikmember.handleChange}
                                            />
                                            {formikmember.touched.date && formikmember.errors.date ? (
                                                <div style={{ color: "#d65a5a", fontSize: "13px", textAlign: "left", marginLeft: "15px", marginTop: "2px" }}>
                                                    {formikmember.errors.date}
                                                </div>
                                            ) : null}
                                        </Grid>
                                        <Grid item xs={12} md={3} sm={12}>
                                            <TextField
                                                id="education"
                                                name="education"
                                                label="Education"
                                                color='success'
                                                value={formikmember.values.education}
                                                onChange={formikmember.handleChange}
                                                error={formikmember.touched.education && Boolean(formikmember.errors.education)}
                                                helperText={formikmember.touched.education && formikmember.errors.education}
                                                sx={{ width: "100%" }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={3} sm={6}>
                                            <Select
                                                id="relation"
                                                name="relation"
                                                placeholder="Relation with Head"
                                                value={relation_options.find((option) => option.value === formikmember.values.relation)}
                                                defaultValue={formikmember.values.relation}
                                                onChange={(selectedOption) => formikmember.setFieldValue('relation', selectedOption.value)}
                                                options={relation_options}
                                                styles={customStyles}
                                            />
                                            {formikmember.touched.relation && formikmember.errors.relation ? (
                                                <div style={{ color: "#d65a5a", fontSize: "13px", textAlign: "left", marginLeft: "15px", marginTop: "2px" }}>
                                                    {formikmember.errors.relation}
                                                </div>
                                            ) : null}
                                        </Grid>
                                        <Grid item xs={12} md={3} sm={6}>
                                            <Select
                                                id="blood_group"
                                                name="blood_group"
                                                placeholder="Blood Group"
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
                                        <Grid item xs={12} md={3} sm={12}>
                                            <Select
                                                id="maritial_status"
                                                name="maritial_status"
                                                placeholder="Maritial Status"
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
                                                id="email_address"
                                                name="email_address"
                                                label="Email"
                                                color='success'
                                                value={formikmember.values.email_address}
                                                onChange={formikmember.handleChange}
                                                error={formikmember.touched.email_address && Boolean(formikmember.errors.email_address)}
                                                helperText={formikmember.touched.email_address && formikmember.errors.email_address}
                                                sx={{ width: "100%" }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={4} sm={12}>
                                            <Select
                                                id="profession_name"
                                                name="profession_name"
                                                placeholder="Profession name"
                                                value={profession_name_options.find((option) => option.value === formikmember.values.profession_name)}
                                                defaultValue={formikmember.values.profession_name}
                                                onChange={(selectedOption) => formikmember.setFieldValue('profession_name', selectedOption.value)}
                                                options={profession_name_options}
                                                styles={customStyles}
                                            />
                                            {formikmember.touched.profession_name && formikmember.errors.profession_name ? (
                                                <div style={{ color: "#d65a5a", fontSize: "13px", textAlign: "left", marginLeft: "15px", marginTop: "2px" }}>
                                                    {formikmember.errors.profession_name}
                                                </div>
                                            ) : null}
                                        </Grid>
                                        <Grid item xs={12} md={4} sm={12}>
                                            <Select
                                                id="profession_status"
                                                name="profession_status"
                                                placeholder="Profession Status"
                                                value={profession_status_options.find((option) => option.value === formikmember.values.profession_status)}
                                                defaultValue={formikmember.values.profession_status}
                                                onChange={(selectedOption) => formikmember.setFieldValue('profession_status', selectedOption.value)}
                                                options={profession_status_options}
                                                styles={customStyles}
                                            />
                                            {formikmember.touched.profession_status && formikmember.errors.profession_status ? (
                                                <div style={{ color: "#d65a5a", fontSize: "13px", textAlign: "left", marginLeft: "15px", marginTop: "2px" }}>
                                                    {formikmember.errors.profession_status}
                                                </div>
                                            ) : null}
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button variant="contained" type="submit"
                                                sx={{
                                                    width: "100%", height: "3rem", fontSize: "1.1rem",
                                                    backgroundColor: "#90CFD3", boxShadow: "none", color: "black", marginTop: "2vh"
                                                    , "&:hover": {
                                                        backgroundColor: "#90CFD3", boxShadow: "none", color: "black",
                                                        fontSize: "1.3rem",
                                                    }
                                                }}>
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
                        style={{ paddingLeft: "2.5%", paddingRight: "2.5%", marginTop: "-1.5rem" }}>
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
                                                <Grid item xs={8}>
                                                    <div style={{ fontSize: "2rem", fontWeight: "700" }}>{item1.name}</div>
                                                </Grid>
                                                <Grid item xs={2} style={{ textAlign: "right" }}>
                                                    <EditIcon style={{ fontSize: "4.75vh", color: "#018d8d", textAlign: "right" }}
                                                        onClick={() => handleeditmember(item1.username)} />
                                                </Grid>
                                                <Grid item xs={2} style={{ textAlign: "right" }}>
                                                    <DeleteIcon style={{ fontSize: "4.75vh", color: "#018d8d", textAlign: "right" }}
                                                        onClick={() => handleDelete(item1.username)} />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <div style={{ fontSize: "1.1rem" }}>{item1.relation}</div>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <div style={{ fontSize: "1.1rem", textAlign: "right" }}>{item1.dob}</div>
                                                </Grid>
                                                <hr style={{ border: "1px solid #018d8d", width: "100%", borderRadius: "5px" }} />
                                                <Grid item xs={12}>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={2}>
                                                            <WorkIcon style={{ fontSize: "4.75vh", color: "#018d8d" }} />
                                                        </Grid>
                                                        <Grid item xs={10} >
                                                            <div style={{ fontSize: "1.15rem", marginTop: "0.7rem" }}>{item1.education}</div>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={2}>
                                                            <EmailIcon style={{ fontSize: "4.75vh", color: "#018d8d" }} />
                                                        </Grid>
                                                        <Grid item xs={10} md={4} sm={4}>
                                                            <div style={{ fontSize: "1.15rem", marginTop: "0.7rem" }}>{item1.email_address}</div>
                                                        </Grid>

                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={2}>
                                                            <HomeWorkIcon style={{ fontSize: "4.75vh", color: "#018d8d" }} />
                                                        </Grid>
                                                        <Grid item xs={4} >
                                                            <div style={{ fontSize: "1.15rem", marginTop: "0.7rem" }}>{item1.profession_name}</div>
                                                        </Grid>
                                                        <Grid item xs={2}>
                                                            <LocalPhoneIcon style={{ fontSize: "4.75vh", color: "#018d8d" }} />
                                                        </Grid>
                                                        <Grid item xs={4} >
                                                            <div style={{ fontSize: "1.15rem", marginTop: "0.7rem" }}>{item1.phone}</div>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={2}>
                                                            <BloodtypeIcon style={{ fontSize: "4.75vh", color: "#018d8d" }} />
                                                        </Grid>
                                                        <Grid item xs={4} >
                                                            <div style={{ fontSize: "1.15rem", marginTop: "0.7rem" }}>{item1.blood_group}</div>
                                                        </Grid>
                                                        {item1.gender == "Male" ? <>
                                                            <Grid item xs={2}>
                                                                <ManIcon style={{ fontSize: "4.75vh", color: "#018d8d" }} />
                                                            </Grid>

                                                            <Grid item xs={4}>
                                                                <div style={{ fontSize: "1.15rem", marginTop: "0.7rem" }}>{item1.gender}</div>
                                                            </Grid>
                                                        </> : <>
                                                            <Grid item xs={2}>
                                                                <WomanIcon style={{ fontSize: "4.75vh", color: "#018d8d" }} />
                                                            </Grid>

                                                            <Grid item xs={4}>
                                                                <div style={{ fontSize: "1.15rem", marginTop: "0.7rem" }}>{item1.gender}</div>
                                                            </Grid></>}
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={2}>
                                                            <PersonIcon style={{ fontSize: "4.75vh", color: "#018d8d" }} />
                                                        </Grid>
                                                        <Grid item xs={4} >
                                                            <div style={{ fontSize: "1.15rem", marginTop: "0.7rem" }}>{item1.maritial_status}</div>
                                                        </Grid>
                                                        <Grid item xs={2}>
                                                            <WorkIcon style={{ fontSize: "4.75vh", color: "#018d8d" }} />
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
            <Modal
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="modal-title"
                style={{ backgroundColor: "white", paddingBottom: "2rem", overflow: "scroll" }}
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
                                id="education"
                                name="education"
                                label="Education"
                                multiline
                                maxRows={3}
                                value={editeducation}
                                onChange={(e) => setEditeducation(e.target.value)}
                                sx={{ width: "100%" }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} sm={12}>
                            <TextField
                                id="email_id"
                                name="email_id"
                                type="email"
                                label="Email Address"
                                value={editemail}
                                onChange={(e) => setEditemail(e.target.value)}
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
                            <FormHelperText>
                                Edit Gender
                            </FormHelperText>
                        </Grid>
                        <Grid item xs={12} md={6} sm={12}>
                            <Select
                                options={profession_name_options}
                                value={editprofname}
                                styles={customStyles}
                                onChange={(selectedOption) => setEditprofname(selectedOption)}
                            />
                            <FormHelperText>
                                Edit Profession Name
                            </FormHelperText>
                        </Grid>
                        <Grid item xs={12} md={6} sm={12}>
                            <Select
                                options={profession_status_options}
                                value={editprofstatus}
                                styles={customStyles}
                                onChange={(selectedOption) => setEditprofstatus(selectedOption)}
                            />
                            <FormHelperText>
                                Edit Profession Status
                            </FormHelperText>
                        </Grid>
                        <Grid item xs={12} md={6} sm={12}>
                            <Select
                                options={relation_options}
                                value={editrelation}
                                styles={customStyles}
                                onChange={(selectedOption) => setEditrelation(selectedOption)}
                            />
                            <FormHelperText>
                                Edit Relation
                            </FormHelperText>
                        </Grid>
                        <Grid item xs={12} md={6} sm={12}>
                            <Select
                                options={blood_group_options}
                                value={editbg}
                                styles={customStyles}
                                onChange={(selectedOption) => setEditbg(selectedOption)}
                            />
                            <FormHelperText>
                                Edit BloodGroup
                            </FormHelperText>
                        </Grid>
                        <Grid item xs={12} md={6} sm={12}>
                            <Select
                                options={maritial_status_options}
                                value={editmaritialstatus}
                                styles={customStyles}
                                onChange={(selectedOption) => setEditmaritialstatus(selectedOption)}
                            />
                            <FormHelperText>
                                Maritial Status
                            </FormHelperText>
                        </Grid>
                        <Grid item xs={12} md={6} sm={12}>
                            <TextField
                                id="phone_edit"
                                name="phone_edit"
                                label="Mobile Number"
                                value={editphone}
                                onChange={(e) => setEditphone(e.target.value)}
                                sx={{ width: "100%" }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} sm={12}>
                            <TextField
                                id="dob_edit"
                                name="dob_edit"
                                type="date"
                                value={editdob}
                                onChange={(e) => setEditdob(e.target.value)}
                                sx={{ width: "100%" }}
                            />
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
                                    }} onClick={() => handleeditaddmember()}
                                    onClose={handleClose}
                                >
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </Modal>
        </div >
    )
}

export default Family
