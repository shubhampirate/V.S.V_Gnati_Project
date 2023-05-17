import {
  Box, Grid, TableBody, TablePagination,
  TableCell, Table, TableRow, TableContainer, TableHead, TextField, Button
} from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useFormik } from "formik";
import * as yup from 'yup';
import axios from 'axios';
import Swal from 'sweetalert2';
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const validationSchemaJob = yup.object({
    search_name: yup
        .string('Enter Job Title you')
        .required('Job Title is required'),
});

    const formikJob = useFormik({
        initialValues: {
            search_name: '',
        },
        validationSchema: validationSchemaJob,
        onSubmit: (values) => {
            console.log(values);
            const formData = new FormData();
            formData.append("name", values.search_name);
            fetch("http://jenilsavla.pythonanywhere.com/api/members/", {
                method: "POST",
                headers: {
                    "Authorization": "Token ebeb63c068b02f00c0797a0c8edc06575c139fbb",
                },
                body: formData,
            })
                .then((result) => {
                    console.log(JSON.stringify(result.data))
                    Swal.fire({
                        icon: 'success',
                        title: 'Successfully Added the Job',
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
  useEffect(() => {
    loadList();
  }, []);

  const loadList = async () => {
    //const token = localStorage.getItem("token")
    const result = await axios.get("http://jenilsavla.pythonanywhere.com/api/members", {
      headers: { "Authorization": `Token ebeb63c068b02f00c0797a0c8edc06575c139fbb` },
    });
    setLoad(result.data.data);

  };
  console.log(load);

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={2} style={{ paddingLeft: "5%", paddingRight: "2.5%" }}>
            <Grid item xs={12} sx={{ marginTop: "2.5rem" }}>
              <div style={{ fontSize: "3rem", fontWeight: "700" }}>Search members</div>
            </Grid>
            <Grid item xs={12}>
              <div style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>Your life partner search ends here</div>
            </Grid>
          </Grid>
        </Grid>
        {/*<Grid item xs={12} style={{ paddingRight: "1rem", paddingLeft: "2rem", marginTop: "1rem" }}>
          <form onSubmit={formikJob.handleSubmit} >
            <Grid container spacing={2} marginTop={2}>
              <Grid item xs={12} md={3} sm={12}>
                <TextField
                  id="search_name"
                  name="search_name"
                  label="Name"
                  color='success'
                  value={formikJob.values.search_name}
                  onChange={formikJob.handleChange}
                  error={formikJob.touched.search_name && Boolean(formikJob.errors.search_name)}
                  helperText={formikJob.touched.search_name && formikJob.errors.search_name}
                  sx={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={12} md={2} sm={12}>
                <Button color="success" variant="contained" type="submit"
                  sx={{ width: "100%", height: "3.5rem", fontSize: "1.1rem" }}>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>

        </Grid>*/}
        {/*table */}
        <Grid item xs={12} style={{ paddingRight: "1rem", paddingLeft: "2rem", marginTop: "1rem" }}>
          <Grid container spacing={2} style={{}}>
            <Grid item xs={12}>
              <TableContainer>
                <Table stickyHeader aria-label="sticky table">
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
    </Box>
  )
}

export default Profile