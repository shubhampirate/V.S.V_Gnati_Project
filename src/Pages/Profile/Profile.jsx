import { Grid, TextField, Button, FormHelperText } from '@mui/material'
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
import secureLocalStorage from 'react-secure-storage';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import SendIcon from '@mui/icons-material/Send';


const Profile = () => {

    const domain = secureLocalStorage.getItem("domainvsv");
    const token = secureLocalStorage.getItem("tokenvsv");
    const familyId = secureLocalStorage.getItem("familyidvsv");

    const validationSchema = yup.object({
        occupation: yup
            .string('Enter your Occupation')
            .required('Occupation is required'),
        member: yup
            .string('Enter Member Id')
            .required('Member Id is required'),
    });

    const validationSchemaAdditionalAddress = yup.object({
        additional_address: yup
            .string('Enter your Additional Address')
            .required('Additional Address is required'),
    });

    const validationSchemamember = yup.object({
        name: yup
            .string('Enter your Name')
            .required('Name is required'),
        native_village: yup
            .string('Enter your Native Village')
            .required('Native Village is required'),
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
        { value: 'Widow', label: 'Widow' },
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
        { value: "Spouse", label: 'Spouse' },
        { value: 'Mother', label: 'Mother' },
        { value: "Brother", label: 'Brother' },
        { value: 'Grandmother', label: 'Grandmother' },
        { value: 'Grandson', label: 'Grandson' },
        { value: 'Granddaughter', label: 'Granddaughter' },
        { value: "Sister", label: 'Sister' },
        { value: 'Son', label: 'Son' },
        { value: "Father", label: 'Father' },
        { value: 'Grandfather', label: 'Grandfather' },
        { value: 'Daughter', label: 'Daughter' },
        { value: "Daughter-in-law", label: 'Daughter-in-law' },
        { value: 'Son-in-law', label: 'Son-in-law' },
    ]

    const [showAddOccupation, setShowAddOccupation] = useState(false);
    // const showAddOccupationComponent = () => setShowAddOccupation(true);
    const showAddOccupationComponent = () => setShowAddOccupation(!showAddOccupation);
    const closeAddOccupationComponent = () => setShowAddOccupation(false)

    const [showAddAdditionalAddress, setShowAddAdditionalAddress] = useState(false);
    // const showAddAdditionalAddressComponent = () => setShowAddAdditionalAddress(true);
    const showAddAdditionalAddressComponent = () => setShowAddAdditionalAddress(!showAddAdditionalAddress);
    const closeAddAdditionalAddressComponent = () => setShowAddAdditionalAddress(false)


    const [showmember, setShowmember] = useState(false);
    const showComponentmember = (e) => { setShowmember(!showmember) }

    const [showGotrejEdit, setShowGotrejEdit] = useState(false);
    // const showGotrejEditComponent = () => setShowGotrejEdit(true);
    const showGotrejEditComponent = () => setShowGotrejEdit(!showGotrejEdit);
    const closeGotrejEditComponent = () => setShowGotrejEdit(false);

    const [showHomeEdit, setShowHomeedit] = useState(false);
    // const showHomeEditComponent = () => setShowHomeedit(true);
    const showHomeEditComponent = () => setShowHomeedit(!showHomeEdit);
    const closeHomeEditComponent = () => setShowHomeedit(false);


    const [showNativeEdit, setShowNativeedit] = useState(false);
    // const showEditNativeComponent = () => setShowNativeedit(true)
    const showEditNativeComponent = () => setShowNativeedit(!showNativeEdit);
    const closeEditNativeComponent = () => setShowNativeedit(false)

    const [showOccupationEdit, setShowOccupationedit] = useState(false);
    // const showEditOccupationComponent = () => setShowOccupationedit(true)
    const showEditOccupationComponent = () => setShowOccupationedit(!showOccupationEdit);
    const closeEditOccupationComponent = () => setShowOccupationedit(false)


    const [showAdditionalAddressEdit, setShowAdditionalAddressedit] = useState(false);
    // const showEditAdditionalAddressComponent = () => setShowAdditionalAddressedit(true)
    const showEditAdditionalAddressComponent = () => setShowAdditionalAddressedit(!showAdditionalAddressEdit);
    const closeEditAdditionalAddressComponent = () => setShowAdditionalAddressedit(false)

    const [homeedit, setHomeedit] = useState('');
    const [gotrejedit, setGotrejedit] = useState('');
    const [nativeedit, setNativeedit] = useState('');
    const [occedit, setOccuedit] = useState('');
    const [addAddressEdit, setAddAddressEdit] = useState('');
    const [memedit, setMemid] = useState('');
    const [useridocc, setUseridocc] = useState('');
    const [useridAddress, setUseridAddress] = useState('');
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
            fetch(`${domain}/family/${familyId}`, {
                method: "POST",
                headers: {
                    "Authorization": `Token ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ occupation_address: values.occupation, member: values.member }),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.status == true) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Successfully Added Occupation details',
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
                    loadList();
                    setShowAddOccupation(false);
                })
                .catch(() => {
                    // alert('Error in the Code');
                });
        }
    });

    const formikmember = useFormik({
        initialValues: {
            name: '',
            relation: null,
            date: '',
            native_village: '',
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
            fetch(`${domain}/add-member/${familyId}`, {
                method: "POST",
                headers: {
                    "Authorization": `Token ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: values.name,
                    relation: values.relation,
                    dob: values.date,
                    native_village: values.native_village,
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
                .then((response) => response.json())
                .then((data) => {
                    // console.log(data);
                    if (data.status == true) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Successfully added Member details',
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
                    loadList();
                    setShowmember(false);
                })
                .catch((error) => {
                    // console.error(error);
                });
        }
    });

    const formikaddress = useFormik({
        initialValues: {
            additional_address: '',
        },
        validationSchema: validationSchemaAdditionalAddress,
        onSubmit: (values) => {
            console.log(values);
            fetch(`${domain}/family-address/${familyId}`, {
                method: "POST",
                headers: {
                    "Authorization": `Token ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ additional_address: values.additional_address }),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.status == true) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Successfully Added Address details',
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
                    loadList();
                    setShowAddAdditionalAddress(false);
                })
                .catch(() => {
                    // alert('Error in the Code');
                });
        }
    });

    const [load, setLoad] = useState([]);
    const [loadoccupation, setLoadOccupation] = useState([]);
    const [loadAdditionalAddress, setLoadAdditionalAddress] = useState([]);
    const [loadmember, setLoadmember] = useState([]);
    useEffect(() => {
        loadList();
    }, []);

    const loadList = async () => {

        const result = await axios.get(`${domain}/family/${familyId}`, {
            headers: { "Authorization": `Token ${token}` },
        });
        console.log(result.data.data)
        setLoad(result.data.data);
        setLoadOccupation(result.data.data.occupations);
        setLoadmember(result.data.data.members);
        setLoadAdditionalAddress(result.data.data.additional_address);
    };
    //console.log(loadmember);

    const handlehomedit = async () => {
        console.log(homeedit, load.gotrej, load.native_village);
        const searchData = {
            home_address: homeedit,
            gotrej: load.gotrej,
            native_village: load.native_village,
            occupations: [],
            additional_address: [],
        };
        fetch(`${domain}/family/${familyId}`, {
            method: 'PUT',
            headers: {
                "Authorization": `Token ${token}`,
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
                        title: 'Successfully Edited the details',
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
                loadList();
                loadList();
                showHomeEditComponent(false);
            })
            .catch((error) => {
                // console.error(error);
            });
    }

    const handlegotrejedit = async () => {
        console.log(load.home_address, gotrejedit, load.native_village);
        const searchData = {
            home_address: load.home_address,
            gotrej: gotrejedit,
            native_village: load.native_village,
            occupations: [],
            additional_address: [],
        };
        fetch(`${domain}/family/${familyId}`, {
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
                        title: 'Successfully Edited the details',
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
                loadList();
                loadList();
                showGotrejEditComponent(false);
            })
            .catch((error) => {
                // console.error(error);
            });
    }

    const handlenativedit = async () => {
        console.log(nativeedit)
        const searchData = {
            home_address: load.home_address,
            gotrej: load.gotrej,
            native_village: nativeedit,
            occupations: [],
            additional_address: [],
        };
        fetch(`${domain}/family/${familyId}`, {
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
                        title: 'Successfully Edited the details',
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
                loadList();
                loadList();
                showEditNativeComponent(false);
            })
            .catch((error) => {
                // console.error(error);
            });
    }

    const handleDelete = async (id) => {
        console.log(id);
        const searchData = {
            username: id,
        };
        fetch(`${domain}/add-member/${familyId}`, {
            method: 'DELETE',
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
                        title: 'Successfully deleted the details',
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
                loadList();
                loadList();
                // setShowOccupationedit(false);
            })
            .catch((error) => {
                // console.error(error);
            });
    }

    const handleDeleteoccupation = async (deleteId) => {
        console.log(deleteId);
        fetch(`${domain}/family/${deleteId}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Token ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                // console.log(data);
                if (data.status == true) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Successfully deleted the details',
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
                loadList();
                loadList();
            })
            .catch((error) => {
                // console.error(error);
            });
    }

    const handleDeleteAdditionalAddress = async (deleteIdAdd) => {
        console.log(deleteIdAdd);
        fetch(`${domain}/family-address/${deleteIdAdd}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Token ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                // console.log(data);
                if (data.status == true) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Successfully deleted the details',
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
                loadList();
                loadList();
            })
            .catch((error) => {
                // console.error(error);
            });
    }

    const handleeditoccupation = async (iduser) => {
        console.log(iduser);
        // setUseridocc(iduser);
        const searchData = {
            home_address: load.home_address,
            gotrej: load.gotrej,
            native_village: load.native_village,
            additional_address: [],
            occupations: [
                {
                    id: useridocc,
                    occupation_address: occedit,
                    member: memedit
                }
            ]
        };
        fetch(`${domain}/family/${familyId}`, {
            method: 'PUT',
            headers: {
                "Authorization": `Token ${token}`,
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
                        title: 'Successfully Edited the details',
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
                loadList();
                loadList();
                showEditOccupationComponent(false);
            })
            .catch((error) => {
                // console.error(error);
            });
    }

    const handleEditAdditionalAddress = async (addressId) => {
        console.log(addressId);
        // setUseridocc(iduser);
        const searchData = {
            home_address: load.home_address,
            gotrej: load.gotrej,
            native_village: load.native_village,
            occupations: [],
            additional_address: [
                {
                    id: addressId,
                    additional_address: addAddressEdit,
                }
            ]
        };
        fetch(`${domain}/family/${familyId}`, {
            method: 'PUT',
            headers: {
                "Authorization": `Token ${token}`,
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
                        title: 'Successfully Edited the details',
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
                loadList();
                loadList();
                showEditAdditionalAddressComponent(false);
            })
            .catch((error) => {
                // console.error(error);
            });
    }

    const handleeditmember = async (editId) => {
        console.log(editId);
        setUsernamemem(editId);
        const result = await axios.get(`${domain}/add-member/${editId}`, {
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
        setIsOpen(true);
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
        fetch(`${domain}/add-member/${familyId}`, {
            method: 'PUT',
            headers: {
                "Authorization": `Token ${token}`,
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
                        title: 'Successfully Edited the details',
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
                loadList();
                loadList();
            })
            .catch((error) => {
                // console.error(error);
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

    console.log(load);


    return (
        <div>
            <Grid container spacing={2} style={{ marginBottom: "2rem" }}>
                {load ? <>
                    <Grid item xs={12} sx={{ marginBottom: "3rem" }}>

                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <Grid container spacing={2} style={{ textAlign: "left" }} p={3}>
                            <Grid item xs={12} style={{ fontSize: "1.75rem", marginBottom: "1rem" }}>
                                <span className='underline-header' > Celebrate Family with Us! <br /> Welcome to Your Family Profile Page </span>
                            </Grid>
                            <Grid item xs={12} style={{ fontSize: "1.75rem" }}>
                                <Grid container>
                                    <Grid item xs={10} style={{ marginTop: "0.25rem", textDecoration: "underline" }} >
                                        Home Address
                                    </Grid>
                                    <Grid item xs={2}>
                                        <AddHomeIcon style={{
                                            fontSize: "5vh", color: "#90CFD3",
                                            textAlign: "left"
                                        }} onClick={showHomeEditComponent} />
                                    </Grid>
                                    <Modal open={showHomeEdit} onClose={closeHomeEditComponent} center >
                                        <h2>Edit Home Address</h2>
                                        <Grid container spacing={2} p={2}>
                                            <Grid item xs={10} style={{ marginLeft: "-1rem" }}>
                                                <TextField
                                                    id="home_address"
                                                    name="home_address"
                                                    label="Home Address"
                                                    value={homeedit}
                                                    onChange={(e) => setHomeedit(e.target.value)}
                                                    sx={{
                                                        width: "100%", "& .MuiInputBase-root": {
                                                            height: 50,
                                                        }
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={2}>
                                                <Button variant="contained" type="submit"
                                                    sx={{
                                                        width: "100%", height: "3.1rem", fontSize: "1.1rem",
                                                        backgroundColor: "#90CFD3", boxShadow: "none", color: "black", "&:hover": {
                                                            backgroundColor: "#90CFD3", boxShadow: "none", color: "black",
                                                            fontSize: "1.3rem"
                                                        }
                                                    }} onClick={handlehomedit} onClose={closeHomeEditComponent}>
                                                    <SendIcon sx={{ color: "#018D8D" }} />
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Modal>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} style={{ fontSize: "1.5rem" }}>
                                {load.home_address}
                            </Grid>
                            <Grid item xs={12} style={{ fontSize: "1.75rem" }}>
                                <Grid container>
                                    <Grid item xs={10} style={{ marginTop: "0.25rem", textDecoration: "underline" }} >
                                        Gotrej
                                    </Grid>
                                    <Grid item xs={2}>
                                        <PostAddIcon style={{
                                            fontSize: "5vh", color: "#90CFD3",
                                            textAlign: "left"
                                        }} onClick={showGotrejEditComponent} />
                                    </Grid>

                                    <Modal open={showGotrejEdit} onClose={closeGotrejEditComponent} center >
                                        <h2>Edit Gotrej</h2>
                                        <Grid container spacing={2} p={2}>
                                            <Grid item xs={10} style={{ marginLeft: "-1rem" }}>
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
                                            <Grid item xs={2}>
                                                <Button variant="contained" type="submit"
                                                    sx={{
                                                        width: "100%", height: "3.1rem", fontSize: "1.1rem",
                                                        backgroundColor: "#90CFD3", boxShadow: "none", color: "black", "&:hover": {
                                                            backgroundColor: "#90CFD3", boxShadow: "none", color: "black",
                                                            fontSize: "1.3rem"
                                                        }
                                                    }} onClick={handlegotrejedit} onClose={closeGotrejEditComponent}>
                                                    <SendIcon sx={{ color: "#018D8D" }} />
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Modal>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} style={{ fontSize: "1.5rem" }}>
                                {load.gotrej}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <Grid container spacing={2} style={{ textAlign: "left" }} p={3}>
                            <Grid item xs={12} style={{ fontSize: "1.75rem" }}>
                                <Grid container>
                                    <Grid item xs={10} style={{ marginTop: "0.25rem", textDecoration: "underline" }} >
                                        Native Village
                                    </Grid>
                                    <Grid item xs={2}>
                                        <AddBusinessIcon style={{
                                            fontSize: "5vh", color: "#90CFD3",
                                            textAlign: "left"
                                        }} onClick={showEditNativeComponent} />
                                    </Grid>
                                    <Modal open={showNativeEdit} onClose={closeEditNativeComponent} center >
                                        <h2>Edit Native Village</h2>
                                        <Grid container spacing={2} p={2}>
                                            <Grid item xs={10} style={{ marginLeft: "-1rem" }}>
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
                                            <Grid item xs={2}>
                                                <Button variant="contained" type="submit"
                                                    sx={{
                                                        width: "100%", height: "3.1rem", fontSize: "1.1rem",
                                                        backgroundColor: "#90CFD3", boxShadow: "none", color: "black", "&:hover": {
                                                            backgroundColor: "#90CFD3", boxShadow: "none", color: "black",
                                                            fontSize: "1.3rem"
                                                        }
                                                    }} onClick={handlenativedit} onClose={closeEditNativeComponent}>
                                                    <SendIcon sx={{ color: "#018D8D" }} />
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Modal>
                                </Grid>
                            </Grid>
                            <Grid item xs={10} style={{ fontSize: "1.5rem" }}>
                                {load.native_village}
                            </Grid>
                            <Grid item xs={12} style={{ fontSize: "1.75rem" }}>
                                <Grid container>
                                    <Grid item xs={10} style={{ marginTop: "0.25rem", textDecoration: "underline" }} >
                                        Additional Home Adress
                                    </Grid>
                                    <Grid item xs={2}>
                                        <AddHomeIcon style={{
                                            fontSize: "5vh", color: "#90CFD3",
                                            textAlign: "left"
                                        }} onClick={showAddAdditionalAddressComponent} />
                                    </Grid>
                                    <Modal open={showAddAdditionalAddress} onClose={closeAddAdditionalAddressComponent} center >
                                        <h2>Add Address</h2>
                                        <form onSubmit={formikaddress.handleSubmit}>
                                            <Grid container spacing={2} p={2}>
                                                <Grid item xs={10} style={{ marginLeft: "-1rem" }}>
                                                    <TextField
                                                        id="additional_address"
                                                        name="additional_address"
                                                        label="Address"
                                                        color='success'
                                                        value={formikaddress.values.additional_address}
                                                        onChange={formikaddress.handleChange}
                                                        error={formikaddress.touched.additional_address && Boolean(formikaddress.errors.additional_address)}
                                                        helperText={formikaddress.touched.additional_address && formikaddress.errors.additional_address}
                                                        sx={{
                                                            width: "100%", "& .MuiInputBase-root": {
                                                                height: 50
                                                            }
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <Button variant="contained" type="submit"
                                                        sx={{
                                                            width: "100%", height: "3.1rem", fontSize: "1.1rem",
                                                            backgroundColor: "#90CFD3", boxShadow: "none", color: "black", "&:hover": {
                                                                backgroundColor: "#90CFD3", boxShadow: "none", color: "black",
                                                                fontSize: "1.3rem"
                                                            }
                                                        }} onClose={closeAddAdditionalAddressComponent}>
                                                        <SendIcon sx={{ color: "#018D8D" }} />
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </form>
                                    </Modal>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} style={{ fontSize: "1.5rem", marginTop: "1rem" }}>
                                {loadAdditionalAddress.map((item) => {
                                    return (
                                        <Grid container spacing={2} >
                                            <Grid item xs={8}>
                                                <div
                                                    style={{
                                                        fontSize: "1.5rem",
                                                        textAlign: "left",
                                                    }}>{item.id}. &nbsp;{item.additional_address}</div>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <EditIcon style={{ fontSize: "4vh", color: "#018d8d" }}
                                                    onClick={() => { showEditAdditionalAddressComponent(); setUseridAddress(item.id) }} />
                                            </Grid>
                                            <Grid item xs={2}>
                                                <DeleteIcon style={{ fontSize: "4vh", color: "#018d8d" }}
                                                    onClick={() => handleDeleteAdditionalAddress(item.id)} />
                                            </Grid>
                                        </Grid>
                                    )
                                })
                                }
                            </Grid>
                            <Modal open={showAdditionalAddressEdit} onClose={closeEditAdditionalAddressComponent} center >
                                <h2>Edit Additional Address</h2>
                                <Grid container spacing={2} marginTop={1}
                                    sx={{ marginTop: "-3%" }} p={2}>
                                    <Grid item xs={10} style={{ marginLeft: "-1rem" }}>
                                        <TextField
                                            id="additional_address"
                                            name="additional_address"
                                            label="Address"
                                            color='success'
                                            value={addAddressEdit}
                                            onChange={(e) => setAddAddressEdit(e.target.value)}
                                            sx={{
                                                width: "100%", "& .MuiInputBase-root": {
                                                    height: 50
                                                }
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Button variant="contained" type="submit"
                                            sx={{
                                                width: "100%", height: "3.1rem", fontSize: "1.1rem",
                                                backgroundColor: "#90CFD3", boxShadow: "none", color: "black", "&:hover": {
                                                    backgroundColor: "#90CFD3", boxShadow: "none", color: "black",
                                                    fontSize: "1.3rem"
                                                }
                                            }} onClick={() => handleEditAdditionalAddress(useridAddress)}
                                            onClose={closeEditAdditionalAddressComponent}>
                                            <SendIcon sx={{ color: "#018D8D" }} />
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Modal>
                            <Grid item xs={12} style={{ fontSize: "1.75rem" }}>
                                <Grid container>
                                    <Grid item xs={10} style={{ marginTop: "0.25rem", textDecoration: "underline" }} >
                                        Occupation Address
                                    </Grid>
                                    <Grid item xs={2}>
                                        <AddBusinessIcon style={{
                                            fontSize: "5vh", color: "#90CFD3",
                                            textAlign: "left"
                                        }} onClick={showAddOccupationComponent} />
                                    </Grid>
                                    <Modal open={showAddOccupation} onClose={closeAddOccupationComponent} center >
                                        <h2>Add Occupation</h2>
                                        <form onSubmit={formik.handleSubmit} >
                                            <Grid container spacing={2} marginTop={1}
                                                sx={{ marginTop: "-3%" }}>
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
                                                        }} onClose={closeEditOccupationComponent}>
                                                        <SendIcon sx={{ color: "#018D8D" }} />
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </form>
                                    </Modal>
                                    <Grid item xs={12} style={{ fontSize: "1.5rem", marginTop: "1rem" }}>
                                        {loadoccupation.map((item) => {
                                            return (
                                                <Grid container spacing={2} >
                                                    <Grid item xs={8}>
                                                        <div
                                                            style={{
                                                                fontSize: "1.5rem",
                                                                textAlign: "left",
                                                            }}>{item.member}. &nbsp;{item.occupation_address}</div>
                                                    </Grid>
                                                    <Grid item xs={2}>
                                                        <EditIcon style={{ fontSize: "4vh", color: "#018d8d" }}
                                                            onClick={() => { showEditOccupationComponent(); setUseridocc(item.id) }} />
                                                    </Grid>
                                                    <Grid item xs={2}>
                                                        <DeleteIcon style={{ fontSize: "4vh", color: "#018d8d" }}
                                                            onClick={() => handleDeleteoccupation(item.id)} />
                                                    </Grid>
                                                </Grid>
                                            )
                                        })
                                        }
                                    </Grid>
                                    <Modal open={showOccupationEdit} onClose={closeEditOccupationComponent} center >
                                        <h2>Edit Occupation</h2>
                                        <Grid container spacing={2} marginTop={1}
                                            sx={{ marginTop: "-3%" }}>
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
                                                    }} onClick={() => handleeditoccupation(useridocc)} onClose={closeEditOccupationComponent}>
                                                    <SendIcon sx={{ color: "#018D8D" }} />
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Modal>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </> : <></>}
                <Grid item xs={12} md={6} sm={12}>
                    <Grid container spacing={2} sx={{ marginTop: "2%" }} p={3}>
                        <Grid item xs={2}>
                            <GroupAddIcon style={{
                                fontSize: "6vh", color: "#90CFD3",
                                paddingRight: "2.5%", marginTop: "-5%",
                                textAlign: "right", cursor: "pointer"
                            }} onClick={showComponentmember} />
                        </Grid>
                        <Grid item xs={10}>
                            <div
                                style={{
                                    fontSize: "2rem", fontWeight: "500", textAlign: "left", textDecoration: "underline"
                                }}>Add Members</div>
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
                                    style={{ paddingLeft: "3%", paddingRight: "3.5%" }}>
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
                                        <Grid item xs={12} md={3} sm={12}>
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
                                        <Grid item xs={12} md={3} sm={6}>
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
                                        <Grid item xs={12} md={3} sm={6}>
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
                                        <Grid item xs={12} md={3} sm={12}>
                                            <TextField
                                                id="native_village"
                                                name="native_village"
                                                label="Native Village"
                                                color='success'
                                                value={formikmember.values.native_village}
                                                onChange={formikmember.handleChange}
                                                error={formikmember.touched.native_village && Boolean(formikmember.errors.native_village)}
                                                helperText={formikmember.touched.native_village && formikmember.errors.native_village}
                                                sx={{ width: "100%" }}
                                            />
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
                        style={{ paddingLeft: "1.5%", paddingRight: "1.5%", marginTop: "-3rem" }}>
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
                                                            <div style={{ fontSize: "1rem", marginTop: "0.7rem" }}>{item1.education}</div>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={2}>
                                                            <EmailIcon style={{ fontSize: "4.75vh", color: "#018d8d" }} />
                                                        </Grid>
                                                        <Grid item xs={10} md={4} sm={4}>
                                                            <div style={{ fontSize: "1rem", marginTop: "0.7rem" }}>{item1.email_address}</div>
                                                        </Grid>

                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={2}>
                                                            <HomeWorkIcon style={{ fontSize: "4.75vh", color: "#018d8d" }} />
                                                        </Grid>
                                                        <Grid item xs={4} >
                                                            <div style={{ fontSize: "1.05rem", marginTop: "0.7rem" }}>{item1.profession_name}</div>
                                                        </Grid>
                                                        <Grid item xs={2}>
                                                            <LocalPhoneIcon style={{ fontSize: "4.75vh", color: "#018d8d" }} />
                                                        </Grid>
                                                        <Grid item xs={4} >
                                                            <div style={{ fontSize: "1.05rem", marginTop: "0.7rem" }}>{item1.phone}</div>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={2}>
                                                            <BloodtypeIcon style={{ fontSize: "4.75vh", color: "#018d8d" }} />
                                                        </Grid>
                                                        <Grid item xs={4} >
                                                            <div style={{ fontSize: "1.05rem", marginTop: "0.7rem" }}>{item1.blood_group}</div>
                                                        </Grid>
                                                        {item1.gender == "Male" ? <>
                                                            <Grid item xs={2}>
                                                                <ManIcon style={{ fontSize: "4.75vh", color: "#018d8d" }} />
                                                            </Grid>

                                                            <Grid item xs={4}>
                                                                <div style={{ fontSize: "1.05rem", marginTop: "0.7rem" }}>{item1.gender}</div>
                                                            </Grid>
                                                        </> : <>
                                                            <Grid item xs={2}>
                                                                <WomanIcon style={{ fontSize: "4.75vh", color: "#018d8d" }} />
                                                            </Grid>

                                                            <Grid item xs={4}>
                                                                <div style={{ fontSize: "1.05rem", marginTop: "0.7rem" }}>{item1.gender}</div>
                                                            </Grid></>}
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={2}>
                                                            <PersonIcon style={{ fontSize: "4.75vh", color: "#018d8d" }} />
                                                        </Grid>
                                                        <Grid item xs={4} >
                                                            <div style={{ fontSize: "1.05rem", marginTop: "0.7rem" }}>{item1.maritial_status}</div>
                                                        </Grid>
                                                        <Grid item xs={2}>
                                                            <WorkIcon style={{ fontSize: "4.75vh", color: "#018d8d" }} />
                                                        </Grid>
                                                        <Grid item xs={4} >
                                                            <div style={{ fontSize: "1.05rem", marginTop: "0.7rem" }}>{item1.profession_status}</div>
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
                center
            >
                <div>
                    <div style={{ fontSize: "2rem", fontWeight: "700", backgroundColor: "white" }}>Edit Details</div>
                    <Grid container spacing={2} marginTop={2}
                        style={{
                            backgroundColor: "white",
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
                                placeholder="Gender"
                                styles={customStyles}
                                onChange={(selectedOption) => setEditgender(selectedOption)}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} sm={12}>
                            <Select
                                options={profession_name_options}
                                value={editprofname}
                                placeholder="Profession Name"
                                styles={customStyles}
                                onChange={(selectedOption) => setEditprofname(selectedOption)}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} sm={12}>
                            <Select
                                options={profession_status_options}
                                value={editprofstatus}
                                placeholder="Profession Status"
                                styles={customStyles}
                                onChange={(selectedOption) => setEditprofstatus(selectedOption)}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} sm={12}>
                            <Select
                                options={relation_options}
                                value={editrelation}
                                placeholder="Relation with Head"
                                styles={customStyles}
                                onChange={(selectedOption) => setEditrelation(selectedOption)}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} sm={12}>
                            <Select
                                options={blood_group_options}
                                value={editbg}
                                placeholder="Blood Group"
                                styles={customStyles}
                                onChange={(selectedOption) => setEditbg(selectedOption)}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} sm={12}>
                            <Select
                                options={maritial_status_options}
                                value={editmaritialstatus}
                                placeholder="Maritial Status"
                                styles={customStyles}
                                onChange={(selectedOption) => setEditmaritialstatus(selectedOption)}
                            />
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
                                        backgroundColor: "#018D8D", boxShadow: "none", color: "white"
                                        , "&:hover": {
                                            backgroundColor: "#018D8D", boxShadow: "none", color: "white",
                                            fontSize: "1.3rem",
                                        }
                                    }} onClick={() => handleeditaddmember()}
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

export default Profile
