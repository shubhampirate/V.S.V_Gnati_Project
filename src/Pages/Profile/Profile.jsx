import {
  Box, Grid, TableBody, TablePagination,
  TableCell, Table, TableRow, TableContainer, TableHead
} from '@mui/material'
import React,{useState,useEffect} from 'react'
import axios from 'axios';
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
        <Grid item xs={12} style={{ paddingRight: "1rem", paddingLeft: "3rem" }}>
          <Grid container spacing={2} style={{ backgroundColor: "yellow", padding: "2vh" }}>
            <Grid item xs={12}>
              <div style={{ textAlign: "center", fontSize: "2rem", marginBottom: "1rem" }}>
                Search members
              </div>
              <div style={{ fontSize: "1.2rem", textAlign: "center" }}>
                Lorem ipsum dolor sit amet, consectetur  ajsvjsbvjbsbjd Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet, consectetur  ajsvjsbvjbsbjd Lorem ipsum dolor sit amet
              </div>
            </Grid>
          </Grid>
        </Grid>
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
                                <TableCell key={column.id} style={{ fontSize: "1.1rem", textAlign:"center" }}>
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