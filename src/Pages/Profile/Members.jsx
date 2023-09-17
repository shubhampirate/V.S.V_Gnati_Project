import {
  Box, Grid, TableBody, TablePagination,
  TableCell, Table, TableRow, TableContainer, TableHead, TextField, Button, FormHelperText
} from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useFormik } from "formik";
import * as yup from 'yup';
import axios from 'axios';
import Swal from 'sweetalert2';
import Select from 'react-select';
import secureLocalStorage from 'react-secure-storage';
import Loader from '../../Components/Loader';

const columns = [
  { id: 'name', label: 'Family Head & Other Family Members' },
  { id: 'relation', label: 'Relation with Family Head' },
  { id: 'home_address', label: 'Residential Address' },
  { id: 'phone', label: 'Tel No./Mobile No.' },
  { id: 'dob', label: 'Date of Birth' },
  { id: 'gender', label: 'Gender' },
  { id: 'education', label: 'Education' },
  { id: 'gotrej', label: 'Gotrej' },
  { id: 'maritial_status', label: 'Marital Status' },
  { id: 'profession_status', label: 'Professional Status (Business/Job)' },
  { id: 'profession_name', label: 'Details of Profession Name & Address' },
];



const Members = () => {

  const domain = secureLocalStorage.getItem("domainvsv");
  const token = secureLocalStorage.getItem("tokenvsv");

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchName, setSearchName] = useState('');
  const [searchDistrict, setSearchDistrict] = useState('');
  const [searchMaxage, setSearchMaxAge] = useState('');
  const [searchMinage, setSearchMinAge] = useState('');
  const [genderFilter, setGenderFilter] = useState(null);
  const [professionFilter, setProfessionFilter] = useState(null);
  const [maritialFilter, setMaritialFilter] = useState(null);
  const [gotrej, setGotrej] = useState(null);
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
    //handleSubmitName();
    loadList();
    handleSubmitName();
    // print();

  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  const handleSubmitName = async () => {
    // handlenamedistrict();
    // console.log("2- load list", searchName, load);
    handleFilter();
  }



  const handleFilter = () => {
    //console.log("3-", gotrej, maritialFilter, genderFilter, professionFilter, searchName, searchDistrict);

    const filteredValues = load.filter((item) => {
      let isFilter1Match = true;
      let isFilter2Match = true;
      let isFilter3Match = true;
      let isFilter4Match = true;
      let isFilter5Match = true;
      let isFilter6Match = true;
      let isFilter7Match = true;

      const searchTermLower = searchName.toLowerCase().trim();
      const nameLower = item.name.toLowerCase();

      if (searchName !== null) {
        const searchWords = searchTermLower.split(' ');
        isFilter5Match = searchWords.some((word) => nameLower.includes(word));
      }

      const serachDistrictLower = searchDistrict.toLowerCase().trim();
      const districtlower = item.home_address.toLowerCase();

      if (searchDistrict !== null) {
        const searchDistWords = serachDistrictLower.split(' ');
        isFilter6Match = searchDistWords.some((word) => districtlower.includes(word));
      }


      if (gotrej !== null) {
        if (gotrej.value !== '') {
          isFilter1Match = item.gotrej.toLowerCase().includes(gotrej.value.toLowerCase());
        }
      }

      if (maritialFilter !== null) {
        if (maritialFilter.value !== '') {
          isFilter4Match = item.maritial_status.toLowerCase().includes(maritialFilter.value.toLowerCase());
        }
      }

      if (genderFilter !== null) {
        if (genderFilter.value !== '') {
          const lowercasedGender = item.gender.toLowerCase();
          const lowercasedFilter = genderFilter.value.toLowerCase();
          if (lowercasedFilter === 'male') {
            isFilter2Match = lowercasedGender === 'male';
          } else if (lowercasedFilter === 'female') {
            isFilter2Match = lowercasedGender === 'female';
          } else {
            isFilter2Match = true;
          }
        }
      }

      if (professionFilter !== null) {
        if (professionFilter.value !== '') {
          isFilter3Match = item.profession_name.toLowerCase().includes(professionFilter.value.toLowerCase());
        }
      }


      if (searchMinage !== null || searchMaxage !== null) {
        if (searchMaxage !== '' || searchMinage !== '') {
          const birthYear = new Date(item.dob).getFullYear();
          const currentYear = new Date().getFullYear();
          const age = currentYear - birthYear;
          isFilter7Match = (age >= searchMinage && age <= searchMaxage);
        }
      };



      return isFilter1Match && isFilter2Match && isFilter3Match && isFilter4Match && isFilter5Match && isFilter6Match && isFilter7Match;
    });

    setFilterList(filteredValues);

    // console.log("4- Filtered List", filteredValues);
  };

  function formatDateToDDMMYYYY(dateString) {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return "Invalid Date";
      }

      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();

      return `${day}-${month}-${year}`;
    } catch (error) {
      console.error("Error parsing date:", error);
      return "Invalid Date";
    }
  }

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
    { value: 'Business Agent', label: 'Business Agent' },
    { value: 'Other', label: 'Other' },
  ];

  const maritialOptions = [
    { value: '', label: 'All' },
    { value: 'Single', label: 'Single' },
    { value: 'Married', label: 'Married' },
    { value: 'Widow', label: 'Widow' },
  ];

  // Options for the profession dropdown
  const gotrejOptions = [
    { value: 'Prashnavada', label: 'Prashnavada' },
    { value: 'Loaje', label: 'Loaje' },
    { value: 'Jamkhambaria', label: 'Jamkhambaria' },
    { value: 'Lodhava', label: 'Lodhava' },
    { value: 'Kotada', label: 'Kotada' },
    { value: 'Kodinar', label: 'Kodinar' },
    { value: 'Badalpara', label: 'Badalpara' },
    { value: 'Kashyap', label: 'Kashyap' },
    { value: 'Raimethiya', label: 'Raimethiya' },
  ];

  const loadList = async () => {
    if (load.length === 0 && filterList.length === 0) {
      const result = await axios.get(`${domain}/members`, {
        headers: { "Authorization": `Token ${token}` },
      });
      setLoad(result.data.data);
      setFilterList(result.data.data);
    }
  };

  // console.log(filterList)

  return (
    <Box>
      <Grid container spacing={2} style={{ marginBottom: "2rem" }}>
        <Grid item xs={12}>
          <Grid item xs={12} className='members_section'>
            <Grid container spacing={2} style={{ paddingLeft: "3%", paddingRight: "2.5%" }}>
              <Grid item xs={12} sx={{ marginTop: "11%" }}>
                <div style={{ fontSize: "2.5rem", fontWeight: "700" }}>Search Members</div>
              </Grid>
              <Grid item xs={12} style={{ marginBottom: "11%" }} >
                <div style={{ fontSize: "1.35rem", marginBottom: "1.5rem", marginLeft: "2%" }}>
                  At V.s.V Gnati Samsta, our mission is to bridge the gaps and bring families closer together.
                  With our dedicated search and connection services, we make it effortless to reconnect with your family members,
                  whether they're near or far. Let us help you rekindle those special bonds and create new memories that will last a lifetime.
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>

        </Grid>
        <Grid item xs={12} style={{ paddingRight: "1rem", paddingLeft: "2rem", marginTop: "1rem" }}>
          <Grid container spacing={2} marginTop={2} p={2}>
            <Grid item xs={12} md={3} sm={6}>
              <TextField
                id="search_name"
                name="search_name"
                label="Name"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} md={3} sm={6}>
              <TextField
                id="search_district"
                name="search_district"
                label="District"
                value={searchDistrict}
                onChange={(e) => setSearchDistrict(e.target.value)}
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} md={3} sm={6}>
              <Select
                options={professionOptions}
                value={professionFilter}
                placeholder="Profession Name"
                styles={customStyles}
                onChange={(selectedOption) => setProfessionFilter(selectedOption)}
              />
            </Grid>
            <Grid item xs={12} md={3} sm={6}>
              <Select
                options={genderOptions}
                value={genderFilter}
                placeholder="Gender"
                styles={customStyles}
                onChange={(selectedOption) => setGenderFilter(selectedOption)}
              />
            </Grid>
            <Grid item xs={12} md={3} sm={6}>
              <Select
                options={gotrejOptions}
                value={gotrej}
                placeholder="Gotrej"
                styles={customStyles}
                onChange={(selectedOption) => setGotrej(selectedOption)}
              />
            </Grid>
            <Grid item xs={12} md={3} sm={6}>
              <Select
                options={maritialOptions}
                value={maritialFilter}
                placeholder="Maritial Status"
                styles={customStyles}
                onChange={(selectedOption) => setMaritialFilter(selectedOption)}
              />
            </Grid>
            <Grid item xs={12} md={3} sm={6}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    id="search_min_age"
                    name="search_min_age"
                    label="Minimum Age"
                    value={searchMinage}
                    type="number"
                    onChange={(e) => setSearchMinAge(e.target.value)}
                    sx={{ width: "100%" }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="search_max_age"
                    name="search_max_age"
                    label="Maximum Age"
                    value={searchMaxage}
                    type="number"
                    onChange={(e) => setSearchMaxAge(e.target.value)}
                    sx={{ width: "100%" }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={3} sm={6}>
              <Button variant="contained" type="submit"
                sx={{
                  width: "100%", height: "3.4rem", fontSize: "1.1rem",
                  backgroundColor: "#EACD90", boxShadow: "none", color: "black"
                  , "&:hover": {
                    backgroundColor: "#EACD90", boxShadow: "none", color: "black",
                    fontSize: "1.3rem",
                  }
                }} onClick={() => handleSubmitName()}>
                Filter Data
              </Button>
            </Grid>
          </Grid>
        </Grid>
        {/*table */}
        <Grid item xs={12} style={{ paddingRight: "1rem", paddingLeft: "2rem", marginTop: "1rem" }}>
          <Grid container spacing={2} p={2}>
            <Grid item xs={12}>
              <TableContainer> {/*stickyHeader aria-label="sticky table"*/}
                <Table style={{ zIndex: "-1000" }}>
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: 120, fontSize: "1.1rem", textAlign: "center", backgroundColor: "#EACD90", border: "1px solid black" }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filterList.length ? <>
                      {filterList
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => {
                          return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                              {columns.map((column) => {
                                const value = row[column.id];
                                return (
                                  <TableCell key={column.id} style={{ fontSize: "1.1rem", textAlign: "center", border: "1px solid #EACD90" }}>
                                    {column.id === 'dob' ? (
                                      // Format the date here, assuming 'dateColumn' is the column ID for the date
                                      formatDateToDDMMYYYY(value)
                                    ) : column.format && typeof value === 'number' ? (
                                      column.format(value)
                                    ) : (
                                      value
                                    )}
                                  </TableCell>
                                );
                              })}
                            </TableRow>
                          );
                        })}</> : <><Loader /></>}

                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={10}
                component="div"
                count={filterList.length}
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

export default Members