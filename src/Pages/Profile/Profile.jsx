import {
  Box, Grid, TableBody, TablePagination,
  TableCell, Table, TableRow, TableContainer, TableHead, TextField, Button
} from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useFormik } from "formik";
import * as yup from 'yup';
import axios from 'axios';
import Swal from 'sweetalert2';
import Select from 'react-select';

const columns = [
  { id: 'name', label: 'Family Head & Other Family Members' },
  { id: 'relation', label: 'Relation with Family Head' },
  { id: 'home_address', label: 'Residential Address' },
  { id: 'phone', label: 'Tel No./Mobile No.' },
  { id: 'dob', label: 'Date of Birth' },
  { id: 'education', label: 'Education' },
  { id: 'gotrej', label: 'Gotrej' },
  { id: 'maritial_status', label: 'Marital Status' },
  { id: 'profession_status', label: 'Professional Status (Business/Job)' },
  { id: 'profession_name', label: 'Details of Profession Name & Address' },
];



const Profile = () => {

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchName, setSearchName] = useState('');
  const [searchDistrict, setSearchDistrict] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [professionFilter, setProfessionFilter] = useState('');
  const [maritialFilter, setMaritialFilter] = useState('');
  const [gotrej, setGotrej] = useState('');
  const [load, setLoad] = useState([]);
  const [filterList, setFilterList] = useState([]);

  const customStyles = {
    control: base => ({
      ...base,
      height: 55,
      minHeight: 55,
      zindex: 1000,
      overflow: "unset",
      backgroundColor: "transparent"
    }),
    placeholder: (provided, state) => ({
      ...provided,
      textAlign: 'left', // Align the placeholder text to the left
    }),
  };

  useEffect(() => {
    handleSubmitName();
    loadList();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSubmitName = async () => {
    const searchData = {
      name: searchName,
      district: searchDistrict,
    };
    fetch('http://jenilsavla.pythonanywhere.com/api/members/', {
      method: 'POST',
      headers: {
        "Authorization": `Token ebeb63c068b02f00c0797a0c8edc06575c139fbb`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(searchData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        setLoad(data.data);
        setFilterList(data.data)
      })
      .catch((error) => {
        console.error(error);
      });
    handleFilter();
  }
  /*
  
  
  */

  let filteredlist;
  const handleFilter = () => {
    console.log(professionFilter.value, genderFilter.value, maritialFilter.value, gotrej.value)

    console.log(filteredlist)

    if (professionFilter === ' ' && genderFilter === ' ' && gotrej === ' ' && maritialFilter !== ' ') {
      filteredlist = load.filter((item) =>
        item.maritial_status === maritialFilter.value);
    }

    console.log(filteredlist);
    if (professionFilter === ' ' && genderFilter === ' ' && gotrej !== ' ' && maritialFilter === ' ') {
      filteredlist = load.filter((item) =>
        item.gotrej === gotrej.value);
    }
    console.log(filteredlist);
    if (professionFilter === ' ' && genderFilter === ' ' && gotrej !== ' ' && maritialFilter !== ' ') {
      filteredlist = load.filter((item) =>
        item.gotrej === gotrej.value &&
        item.maritial_status === maritialFilter.value);
    }
    console.log(filteredlist);
    if (professionFilter === ' ' && genderFilter !== ' ' && gotrej === ' ' && maritialFilter === ' ') {
      filteredlist = load.filter((item) =>
        item.gender === genderFilter.value);
    }
    console.log(filteredlist);
    if (professionFilter === ' ' && genderFilter !== ' ' && gotrej === ' ' && maritialFilter !== ' ') {
      filteredlist = load.filter((item) =>
        item.gender === genderFilter.value &&
        item.maritial_status === maritialFilter.value);
    }
    console.log(filteredlist);
    if (professionFilter === ' ' && genderFilter !== ' ' && gotrej !== ' ' && maritialFilter === ' ') {
      filteredlist = load.filter((item) =>
        item.gender === genderFilter.value &&
        item.gotrej === gotrej.value);
    }
    console.log(filteredlist);
    if (professionFilter === ' ' && genderFilter !== ' ' && gotrej !== ' ' && maritialFilter !== ' ') {
      filteredlist = load.filter((item) =>
        item.gender === genderFilter.value &&
        item.gotrej === gotrej.value &&
        item.maritial_status === maritialFilter.value);
    }
    console.log(filteredlist);
    if (professionFilter !== ' ' && genderFilter === ' ' && gotrej === ' ' && maritialFilter === ' ') {
      filteredlist = load.filter((item) =>
        item.profession_name === professionFilter.value);
    }
    console.log(filteredlist);
    if (professionFilter !== '' && genderFilter === '' && gotrej === '' && maritialFilter !== '') {

      filteredlist = load.filter((item) =>
        item.profession_name === professionFilter.value &&
        item.maritial_status === maritialFilter.value);
      localStorage.setItem("vsvfiltersearch", filteredlist);
      console.log(filteredlist)
    }
    console.log(filteredlist);
    if (professionFilter !== ' ' && genderFilter === ' ' && gotrej !== ' ' && maritialFilter === ' ') {
      filteredlist = load.filter((item) =>
        item.profession_name === professionFilter.value &&
        item.gotrej === gotrej.value);
    }
    console.log(filteredlist);
    if (professionFilter !== ' ' && genderFilter === ' ' && gotrej !== ' ' && maritialFilter !== ' ') {
      filteredlist = load.filter((item) =>
        item.profession_name === professionFilter.value &&
        item.gotrej === gotrej.value &&
        item.maritial_status === maritialFilter.value);
    }
    console.log(filteredlist);
    if (professionFilter !== ' ' && genderFilter !== ' ' && gotrej === ' ' && maritialFilter === ' ') {
      filteredlist = load.filter((item) =>
        item.profession_name === professionFilter.value &&
        item.gender === genderFilter.value);
    }
    console.log(filteredlist);
    if (professionFilter !== ' ' && genderFilter !== ' ' && gotrej === ' ' && maritialFilter !== ' ') {
      filteredlist = load.filter((item) =>
        item.profession_name === professionFilter.value &&
        item.gender === genderFilter.value &&
        item.maritial_status === maritialFilter.value);
    }
    console.log(filteredlist);
    if (professionFilter !== ' ' && genderFilter !== ' ' && gotrej !== ' ' && maritialFilter === ' ') {
      filteredlist = load.filter((item) =>
        item.profession_name === professionFilter.value &&
        item.gender === genderFilter.value &&
        item.gotrej === gotrej.value);
    }
    console.log(filteredlist);
    if (professionFilter !== '' && genderFilter !== '' && gotrej !== '' && maritialFilter !== '') {
      // console.log(professionFilter, genderFilter, maritialFilter, searchName, gotrej);
      filteredlist = load.filter((item) =>
        item.profession_name === professionFilter.value &&
        item.gender === genderFilter.value &&
        item.gotrej === gotrej.value &&
        item.maritial_status === maritialFilter.value);
      setFilterList(filteredlist);
    }
    console.log(filteredlist);
    print();

    console.log(filteredlist);

  }
  //console.log(filteredlist)

  const print = async () => {
    console.log(filteredlist);

  }

  //setFilterList(filteredlist);


  const genderOptions = [
    { value: '', label: 'All' },
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
  ];

  // Options for the profession dropdown
  const professionOptions = [
    { value: '', label: 'All' },
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
  ];

  const maritialOptions = [
    { value: '', label: 'All' },
    { value: 'Single', label: 'Single' },
    { value: 'Married', label: 'Married' },
  ];

  // Options for the profession dropdown
  const gotrejOptions = [
    { value: '', label: 'All' },
    { value: 'doctor', label: 'Doctor' },
    { value: 'engineer', label: 'Engineer' },
    { value: 'teacher', label: 'Teacher' },
  ];

  const loadList = async () => {
    if (load.length === 0 && filterList.length === 0) {
      const result = await axios.get("http://jenilsavla.pythonanywhere.com/api/members", {
        headers: { "Authorization": `Token ebeb63c068b02f00c0797a0c8edc06575c139fbb` },
      });
      setLoad(result.data.data);
      setFilterList(result.data.data);
    }
  };


  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={2} style={{ paddingLeft: "5%", paddingRight: "2.5%" }}>
            <Grid item xs={12} sx={{ marginTop: "2.5rem" }}>
              <div style={{ fontSize: "3rem", fontWeight: "700" }}>Search members</div>
            </Grid>
            <Grid item xs={12}>
              <div style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>Connect with your family and friends</div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} style={{ paddingRight: "1rem", paddingLeft: "2rem", marginTop: "1rem" }}>
          <Grid container spacing={2} marginTop={2}>
            <Grid item xs={12} md={2} sm={6}>
              <TextField
                id="search_name"
                name="search_name"
                label="Name"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} md={2} sm={6}>
              <TextField
                id="search_district"
                name="search_district"
                label="District"
                value={searchDistrict}
                onChange={(e) => setSearchDistrict(e.target.value)}
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} md={2} sm={6}>
              <Select
                options={genderOptions}
                value={genderFilter}
                styles={customStyles}
                onChange={(selectedOption) => setGenderFilter(selectedOption)}
              />
            </Grid>
            <Grid item xs={12} md={2} sm={6}>
              <Select
                options={professionOptions}
                value={professionFilter}
                styles={customStyles}
                onChange={(selectedOption) => setProfessionFilter(selectedOption)}
              />
            </Grid>
            <Grid item xs={12} md={2} sm={6}>
              <Select
                options={gotrejOptions}
                value={gotrej}
                styles={customStyles}
                onChange={(selectedOption) => setGotrej(selectedOption)}
              />
            </Grid>
            <Grid item xs={12} md={2} sm={6}>
              <Select
                options={maritialOptions}
                value={maritialFilter}
                styles={customStyles}
                onChange={(selectedOption) => setMaritialFilter(selectedOption)}
              />
            </Grid>
            <Grid item xs={12} md={2} sm={12}>
              <Button variant="contained" type="submit"
                sx={{
                  width: "100%", height: "3.4rem", fontSize: "1.1rem",
                  backgroundColor: "#90CFD3", boxShadow: "none", color: "black"
                  , "&:hover": {
                    backgroundColor: "#90CFD3", boxShadow: "none", color: "black",
                    fontSize: "1.3rem",
                  }
                }} onClick={() => handleSubmitName()}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </Grid>
        {/*table */}
        <Grid item xs={12} style={{ paddingRight: "1rem", paddingLeft: "2rem", marginTop: "1rem" }}>
          <Grid container spacing={2} style={{}}>
            <Grid item xs={12}>
              <TableContainer>
                <Table stickyHeader aria-label="sticky table" style={{ zIndex: "-1000" }}>
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: 120, fontSize: "1.1rem", textAlign: "center" }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {load
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => {
                        return (
                          <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                            {columns.map((column) => {
                              const value = row[column.id];
                              return (
                                <TableCell key={column.id} style={{ fontSize: "1.1rem", textAlign: "center" }}>
                                  {column.format && typeof value === 'number'
                                    ? column.format(value)
                                    : value}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={10}
                component="div"
                count={load.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box >
  )
}

export default Profile