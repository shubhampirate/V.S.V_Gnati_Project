/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { Box, Button, Grid, TextField } from '@mui/material'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../Components/styleEvents.css";
import secureLocalStorage from 'react-secure-storage';
import Loader from '../Components/Loader';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useFormik, ErrorMessage, } from "formik";
import * as yup from 'yup';
import Swal from 'sweetalert2';

const Events = () => {

  const domain = secureLocalStorage.getItem("domainvsv");
  const token = secureLocalStorage.getItem("tokenvsv");
  const isAdmin = secureLocalStorage.getItem("isadminvsv");

  console.log(domain, token, isAdmin);
  // const isAdmin = useState(true);

  const [len, setLen] = useState('');
  const year = [2023, 2022];
  const [eventId, setEventId] = useState('');
  const [editAbout, setEditabout] = useState('');
  const [editName, setEditName] = useState('');
  const [editStartTime, setEditStartTime] = useState('');
  const [editDate, setEditDate] = useState('');
  const [editEndTime, setEditEndTime] = useState('');
  const [editVenue, setEditVenue] = useState('');
  const [editPhotos, setEditPhotos] = useState('');

  const [showAddEvent, setShowAddEvent] = useState(false);
  // const showAddEventComponent = () => setShowAddEvent(true);
  const showAddEventComponent = () => setShowAddEvent(!showAddEvent);
  const closeAddEventComponent = () => setShowAddEvent(false)

  const [showEditEvent, setShowEditEvent] = useState(false);
  // const showEditEventComponent = () => setShowEditEvent(true);
  const showEditEventComponent = () => setShowEditEvent(!showEditEvent);
  const closeEditEventComponent = () => setShowEditEvent(false);



  const validationSchema = yup.object({
    start_time: yup
      .date('Enter Start Time of Event')
      .required('Start Time of Event is required'),
    date: yup
      .date('Enter Event Date')
      .required('Date of Event is required'),
    end_time: yup
      .date('Enter End Time of Event')
      .required('End Time of Event is required'),
    name: yup
      .string('Enter Event name')
      .required('Event name is required'),
    about: yup
      .string('Enter about Event')
      .required('Some Description is required'),
    venue: yup
      .string('Enter Venue')
      .required('Venue is required'),
    photos_drive: yup
      .string('Enter Photos Drive')
      .required('Photos Drive is required'),
    picture: yup
      .mixed()
      .test('fileType', 'Invalid file format. Only images are allowed.', (value) => {
        if (value && value.length) {
          const fileType = value[0].type;
          return fileType.startsWith('image/');
        }
        return true;
      })
      .required('Picture is required'),

  });

  const formik = useFormik({
    initialValues: {
      name: '',
      picture: null,
      about: '',
      venue: '',
      start_time: '',
      end_time: '',
      photos_drive: '',
      date: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      console.log(values.picture)
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('about', values.about);
      formData.append('start_time', values.start_time);
      formData.append('end_time', values.end_time);
      formData.append('venue', values.venue);
      formData.append('picture', values.picture);
      formData.append('date', values.date);
      formData.append('photos_drive', values.photos_drive);

      fetch(`${domain}/events/`, {
        method: "POST",
        headers: {
          "Authorization": `Token ${token}`,
        },
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          if (data.status == true) {
            Swal.fire({
              icon: 'success',
              title: 'Successfully added Events Details',
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
          setShowAddEvent(false);
        })
        .catch((error) => {
          // console.error(error);
        });
    }
  });


  const handleEventDetails = async (editId) => {
    const result = await axios.get(`${domain}/event/${eventId}`, {
      headers: { "Authorization": `Token ${token}`, },
    });
    console.log(result.data.data);
    setEditDate(result.data.data.date);
    setEditEndTime(result.data.data.end_time);
    setEditName(result.data.data.name);
    setEditStartTime(result.data.data.start_time);
    setEditVenue(result.data.data.venue);
    setEditabout(result.data.data.about);
    setEditPhotos(result.data.data.photos_drive);
    setShowEditEvent(true);
  }

  const handleEventSubmit = async () => {
    handleEventDetails(eventId);
    const searchData = {
      name: editName,
      about: editAbout,
      start_time: editStartTime,
      end_time: editEndTime,
      venue: editVenue,
      date: editDate,
      photos_drive: editPhotos,
    };

    console.log(searchData, eventId);
    fetch(`${domain}/event/${eventId}`, {
      method: 'PUT',
      headers: {
        "Authorization": `Token ${token}`,
        'Content-Type': 'application/json'
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
        showEditEventComponent(false);
      })
      .catch((error) => {
        // console.error(error);
      });
  }

  const handleDeleteEvent = async (id) => {
    console.log(id);
    fetch(`${domain}/event/${id}`, {
      method: 'DELETE',
      headers: {
        "Authorization": `Token ${token}`,
        'Content-Type': 'application/json',
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status == true) {
          Swal.fire({
            icon: 'success',
            title: 'Successfully deleted the Event details',
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


  const [load, setLoad] = useState([]);
  useEffect(() => {
    loadList();
  }, []);

  const loadList = async (id) => {
    if (id == undefined) {
      const config = {
        method: 'post',
        url: `${domain}/event/2023`,
        headers: {
          'Authorization': `Token ${token}`
        }
      };
      const response = await axios(config);
      console.log(response.data.data.events);
      setLoad(response.data.data.events);
    }
    else {
      const config = {
        method: 'post',
        url: `${domain}/event/${id}`,
        headers: {
          'Authorization': `Token ${token}`
        }
      };
      const response = await axios(config);
      console.log(response.data.data.events);
      if (response.data.data.events.length == 0) {
        console.log("empty")
      }
      setLen(response.data.data.events.length);
      // console.log(len)
      setLoad(response.data.data.events);
    }

  }

  return (
    <Box>
      <Grid container spacing={2} style={{ marginBottom: "2rem" }}>
        <Grid item xs={12} className='events_section'>
          <Grid container spacing={2} style={{ paddingLeft: "3%", paddingRight: "2.5%" }}>
            <Grid item xs={12} sx={{ marginTop: "11%" }}>
              <div style={{ fontSize: "2.5rem", fontWeight: "700" }}>Events Extravaganza</div>
            </Grid>
            {isAdmin == "true" ? <>
              <Grid item xs={12}>
                <div style={{ fontSize: "1.35rem", marginBottom: "1.5rem", marginLeft: "2%" }}>Unite with family and friends as we host a series of joyous gatherings and celebrations
                  in honor of V.S.V Gnati Samasta. Experience the magic of togetherness through our heartwarming events that bring laughter,
                  connection, and cherished memories. Come be a part of these special occasions that embody the spirit of unity and celebration.</div>
              </Grid>
              <Grid item xs={12} style={{ marginBottom: "11%" }}>
                <div>
                  <Button
                    sx={{
                      color: '#fff',
                      fontSize: "1.25rem",
                      fontFamily: "PT Sans",
                      backgroundColor: 'transparent',
                      border: '2px solid #fff',
                      cursor: "pointer",
                      '&:hover': {
                        backgroundColor: '#fff',
                        color: 'black'
                      }
                    }} onClick={showAddEventComponent}>
                    Add Events
                  </Button>
                </div>
              </Grid>
              <Modal open={showAddEvent} onClose={closeAddEventComponent} center >
                <h2>Add Events</h2>
                <form onSubmit={formik.handleSubmit} >
                  <Grid container spacing={2} p={2}>
                    <Grid item xs={12} style={{ marginLeft: "-1rem" }}>
                      <TextField
                        id="name"
                        name="name"
                        label="Event Name"
                        color="success"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                        sx={{ width: '100%', fontSize: "1.5rem" }}
                      />
                    </Grid>
                    <Grid item xs={12} style={{ marginLeft: "-1rem" }}>
                      <TextField
                        id="about"
                        name="about"
                        label="About Event"
                        color="success"
                        value={formik.values.about}
                        onChange={formik.handleChange}
                        error={formik.touched.about && Boolean(formik.errors.about)}
                        helperText={formik.touched.about && formik.errors.about}
                        sx={{ width: '100%', fontSize: "1.5rem" }}
                      />
                    </Grid>
                    <Grid item xs={12} style={{ marginLeft: "-1rem" }}>
                      <TextField
                        id="venue"
                        name="venue"
                        label="Event Venue"
                        color="success"
                        value={formik.values.venue}
                        onChange={formik.handleChange}
                        error={formik.touched.venue && Boolean(formik.errors.venue)}
                        helperText={formik.touched.venue && formik.errors.venue}
                        sx={{ width: '100%', fontSize: "1.5rem" }}
                      />
                    </Grid>
                    <Grid item xs={12} style={{ marginLeft: "-1rem" }}>
                      <TextField
                        id="date"
                        name="date"
                        type="date"
                        label="Date of Event"
                        sx={{ width: "100%", fontSize: "1.5rem", color: "red" }}
                        color='success'
                        value={formik.values.date}
                        onChange={formik.handleChange}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      {formik.touched.date && formik.errors.date ? (
                        <div style={{ color: "#d65a5a", fontSize: "13px", textAlign: "left", marginLeft: "15px", marginTop: "2px" }}>
                          {formik.errors.date}
                        </div>
                      ) : null}
                    </Grid>
                    <Grid item xs={12} style={{ marginLeft: "-1rem" }}>
                      <TextField
                        id="start_time"
                        name="start_time"
                        type="datetime-local"
                        label="Start Time"
                        sx={{ width: "100%", fontSize: "1.5rem", color: "red" }}
                        color='success'
                        value={formik.values.start_time}
                        onChange={formik.handleChange}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      {formik.touched.start_time && formik.errors.start_time ? (
                        <div style={{ color: "#d65a5a", fontSize: "13px", textAlign: "left", marginLeft: "15px", marginTop: "2px" }}>
                          {formik.errors.start_time}
                        </div>
                      ) : null}
                    </Grid>
                    <Grid item xs={12} style={{ marginLeft: "-1rem" }}>
                      <TextField
                        id="end_time"
                        name="end_time"
                        type="datetime-local"
                        label="End Time"
                        sx={{ width: "100%", fontSize: "1.5rem", color: "red" }}
                        color='success'
                        value={formik.values.end_time}
                        onChange={formik.handleChange}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      {formik.touched.end_time && formik.errors.end_time ? (
                        <div style={{ color: "#d65a5a", fontSize: "13px", textAlign: "left", marginLeft: "15px", marginTop: "2px" }}>
                          {formik.errors.end_time}
                        </div>
                      ) : null}
                    </Grid>
                    <Grid item xs={12} style={{ marginLeft: "-1rem" }}>
                      <TextField
                        id="photos_drive"
                        name="photos_drive"
                        label="Event Photos Drive Link"
                        color="success"
                        value={formik.values.photos_drive}
                        onChange={formik.handleChange}
                        error={formik.touched.photos_drive && Boolean(formik.errors.photos_drive)}
                        helperText={formik.touched.photos_drive && formik.errors.photos_drive}
                        sx={{ width: '100%', fontSize: "1.5rem" }}
                      />
                    </Grid>
                    <Grid item xs={12} style={{ marginLeft: "-1rem" }}>
                      <TextField
                        type="file"
                        id="picture"
                        name="picture"
                        label="Events Picture"
                        accept="image/*"
                        onChange={(event) => formik.setFieldValue('picture', event.currentTarget.files[0])}
                        onBlur={formik.handleBlur}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        sx={{ width: "100%", fontSize: "1.5rem" }}
                      />
                      {formik.touched.picture && formik.errors.picture ? (
                        <div style={{ color: "#d65a5a", fontSize: "13px", textAlign: "left", marginLeft: "15px", marginTop: "2px" }}>
                          {formik.errors.picture}
                        </div>
                      ) : null}
                    </Grid>
                    <Grid item xs={12} style={{ marginLeft: "-1rem" }}>
                      <Button variant="contained" type="submit"
                        sx={{
                          width: "100%", height: "3.45rem", fontSize: "1.1rem",
                          backgroundColor: "#C4CFFE", boxShadow: "none", color: "black"
                          , "&:hover": {
                            backgroundColor: "#C4CFFE", boxShadow: "none", color: "black",
                            fontSize: "1.3rem", cursor: "pointer"
                          }
                        }}>
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Modal>
            </> : <>
              <Grid item xs={12} style={{ marginBottom: "11%" }}>
                <div style={{ fontSize: "1.35rem", marginBottom: "1.5rem", marginLeft: "2%" }}>Unite with family and friends as we host a series of joyous gatherings and celebrations
                  in honor of V.S.V Gnati Samasta. Experience the magic of togetherness through our heartwarming events that bring laughter,
                  connection, and cherished memories. Come be a part of these special occasions that embody the spirit of unity and celebration.</div>
              </Grid></>}

          </Grid>
        </Grid>
        {token ? <><Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Tabs className="component-e-tabs">
                <TabList style={{ border: "none", fontSize: "1.5rem", marginBottom: "2rem" }}>
                  {year.map((item, key) => {
                    return (
                      <Tab
                        onClick={() =>
                          loadList(item)
                        }>{item}</Tab>
                    )
                  })}
                </TabList>
                {year.map((series) => {
                  return (
                    <TabPanel>
                      <Grid container spacing={2}>
                        {load.length ? <>{load.map((item) => {
                          return (
                            <>
                              {len !== 0 ?
                                <>
                                  <Grid item xs={12} md={4} sm={6} style={{
                                    paddingLeft: "5%", paddingRight: "2.5%",
                                  }}>
                                    <Grid container spacing={2} sx={{ borderRadius: "2vh", padding: "1rem" }}>
                                      <Grid item xs={12}>
                                        <img src={`http://jenilsavla.pythonanywhere.com` + item.picture}
                                          style={{ width: "100%", height: "43vh", borderRadius: "1.5vh 1.5vh 0vh 0vh" }} />
                                      </Grid>
                                      <Grid item xs={12}
                                        style={{
                                          padding: "1rem", marginLeft: "16px", marginTop: "-0.75rem",
                                          borderRadius: "0vh 0vh 1.5vh 1.5vh", backgroundColor: "#90CFD3"
                                        }}>
                                        <Grid container spacing={1} sx={{ textAlign: "left", marginTop: "0.5vh" }}>
                                          {isAdmin == "true" ? <>
                                            <Grid item xs={8}>
                                              <div style={{ fontSize: "2rem", fontWeight: "700" }}>{item.name}</div>
                                            </Grid>
                                            <Grid item xs={2} style={{ textAlign: "right" }}>
                                              <EditIcon style={{ fontSize: "4vh", color: "#018d8d", cursor: "pointer" }}
                                                onClick={() => { handleEventDetails(); showEditEventComponent(); setEventId(item.id) }} />
                                            </Grid>
                                            <Grid item xs={2} style={{ textAlign: "right" }}>
                                              <DeleteIcon style={{ fontSize: "4vh", color: "#018d8d", cursor: "pointer" }}
                                                onClick={() => handleDeleteEvent(item.id)} />
                                            </Grid>
                                          </> : <>
                                            <Grid item xs={12}>
                                              <div style={{ fontSize: "2rem", fontWeight: "700" }}>{item.name}</div>
                                            </Grid>
                                          </>
                                          }
                                          <Grid item xs={12}>
                                            <div style={{ fontSize: "1.1rem" }}>{item.about}</div>
                                          </Grid>
                                          <hr style={{ border: "1px solid #018d8d", width: "100%", borderRadius: "5px" }} />
                                          <Grid item xs={12}>
                                            <Grid container spacing={2}>
                                              <Grid item xs={2}>
                                                <LocationOnIcon style={{ fontSize: "5vh", color: "#018d8d" }} />
                                              </Grid>
                                              <Grid item xs={10} >
                                                <div style={{ fontSize: "1.25rem", marginTop: "0.7rem" }}>{item.venue}</div>
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                          <Grid item xs={12}>
                                            <Grid container spacing={2}>
                                              <Grid item xs={2}>
                                                <EventIcon style={{ fontSize: "5vh", color: "#018d8d" }} />
                                              </Grid>
                                              <Grid item xs={5} >
                                                <div style={{ fontSize: "1.25rem", marginTop: "0.7rem" }}>{item.date}</div>
                                              </Grid>
                                              <Grid item xs={5} style={{ marginTop: "0.3rem", textAlign: "right" }}>
                                                <Link to={item.photos_drive}>
                                                  <PhotoCameraIcon style={{
                                                    fontSize: "3.5vh", color: "#E0E1DC", cursor: "pointer",
                                                    backgroundColor: "#018d8d", padding: "0.25rem", borderRadius: "0.5rem 0rem 0rem 0.5rem"
                                                  }} />
                                                  <KeyboardDoubleArrowRightIcon style={{
                                                    fontSize: "3.5vh", color: "#E0E1DC", cursor: "pointer",
                                                    backgroundColor: "#018d8d", padding: "0.25rem", borderRadius: "0rem 0.5rem 0.5rem 0rem"
                                                  }} />
                                                </Link>
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </> :
                                <>
                                </>}
                            </>)
                        })}</> : <><Loader /></>}
                      </Grid>
                    </TabPanel>
                  )
                })}
              </Tabs>
            </Grid>
          </Grid>
        </Grid></> :
          <><Grid container spacing={2}>
            <Grid item xs={12}>
              <div style={{ fontSize: "2rem", fontWeight: "700", marginBottom: "4rem", marginTop: "4rem" }}>
                <Link to="/login">Login</Link> to view the events</div>
            </Grid>
          </Grid>
          </>}
      </Grid>
      <Modal open={showEditEvent} onClose={closeEditEventComponent} center >
        <h2>Edit Event Details</h2>
        <Grid container spacing={2} p={2}>
          <Grid item xs={12} style={{ marginLeft: "-1rem" }}>
            <TextField
              id="name"
              name="name"
              label="Event Name"
              color="success"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              sx={{ width: '100%', fontSize: "1.5rem" }}
            />
          </Grid>
          <Grid item xs={12} style={{ marginLeft: "-1rem" }}>
            <TextField
              id="about"
              name="about"
              label="About Event"
              color="success"
              value={editAbout}
              onChange={(e) => setEditabout(e.target.value)}
              sx={{ width: '100%', fontSize: "1.5rem" }}
            />
          </Grid>
          <Grid item xs={12} style={{ marginLeft: "-1rem" }}>
            <TextField
              id="venue"
              name="venue"
              label="Event Venue"
              color="success"
              value={editVenue}
              onChange={(e) => setEditVenue(e.target.value)}
              sx={{ width: '100%', fontSize: "1.5rem" }}
            />
          </Grid>
          <Grid item xs={12} style={{ marginLeft: "-1rem" }}>
            <TextField
              id="date"
              name="date"
              type="date"
              label="Date of Event"
              sx={{ width: "100%", fontSize: "1.5rem", color: "red" }}
              color='success'
              value={editDate}
              onChange={(e) => setEditDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} style={{ marginLeft: "-1rem" }}>
            <TextField
              id="start_time"
              name="start_time"
              type="datetime-local"
              label="Start Time"
              sx={{ width: "100%", fontSize: "1.5rem", color: "red" }}
              color='success'
              value={editStartTime}
              onChange={(e) => setEditStartTime(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} style={{ marginLeft: "-1rem" }}>
            <TextField
              id="end_time"
              name="end_time"
              type="datetime-local"
              label="End Time"
              sx={{ width: "100%", fontSize: "1.5rem", color: "red" }}
              color='success'
              value={editEndTime}
              onChange={(e) => setEditEndTime(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} style={{ marginLeft: "-1rem" }}>
            <TextField
              id="photos_drive"
              name="photos_drive"
              label="Event Photos Drive Link"
              color="success"
              value={editPhotos}
              onChange={(e) => setEditPhotos(e.target.value)}
              sx={{ width: '100%', fontSize: "1.5rem" }}
            />
          </Grid>
          <Grid item xs={12} style={{ marginLeft: "-1rem" }}>
            <Button variant="contained" type="submit"
              sx={{
                width: "100%", height: "3.45rem", fontSize: "1.1rem",
                backgroundColor: "#C4CFFE", boxShadow: "none", color: "black"
                , "&:hover": {
                  backgroundColor: "#C4CFFE", boxShadow: "none", color: "black",
                  fontSize: "1.3rem", cursor: "pointer"
                }
              }} onClick={handleEventSubmit} onClose={closeEditEventComponent}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Modal>
    </Box >
  )
}

export default Events