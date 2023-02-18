import {
  Box, Grid, TableBody, TablePagination,
  TableCell, Table, TableRow, TableContainer, TableHead
} from '@mui/material'
import React from 'react'

const columns = [
  { id: 'name', label: 'Family Head & Other Family Members' },
  { id: 'relation', label: 'Relation with Family Head' },
  { id: 'address', label: 'Residential Address' },
  { id: 'mobile', label: 'Tel No./Mobile No.' },
  { id: 'birth', label: 'Date of Birth' },
  { id: 'education', label: 'Education' },
  { id: 'gotrej', label: 'Gotrej' },
  { id: 'marital', label: 'Marital Status' },
  { id: 'profession', label: 'Professional Status (Business/Job)' },
  { id: 'details', label: 'Details of Profession Name & Address' },
];

const rows = [
  {
    name: "qwert", relation: "qwert", address: "qwert", mobile: "qwert", birth: "qwert",
    education: "qwert", gotrej: "qwert", marital: "qwert", profession: "qwert", details: "qwert"
  },
  {
    name: "qwert", relation: "qwert", address: "qwert", mobile: "qwert", birth: "qwert",
    education: "qwert", gotrej: "qwert", marital: "qwert", profession: "qwert", details: "qwert"
  },
  {
    name: "qwert", relation: "qwert", address: "qwert", mobile: "qwert", birth: "qwert",
    education: "qwert", gotrej: "qwert", marital: "qwert", profession: "qwert", details: "qwert"
  },
  {
    name: "qwert", relation: "qwert", address: "qwert", mobile: "qwert", birth: "qwert",
    education: "qwert", gotrej: "qwert", marital: "qwert", profession: "qwert", details: "qwert"
  },
  {
    name: "qwert", relation: "qwert", address: "qwert", mobile: "qwert", birth: "qwert",
    education: "qwert", gotrej: "qwert", marital: "qwert", profession: "qwert", details: "qwert"
  },
  {
    name: "qwert", relation: "qwert", address: "qwert", mobile: "qwert", birth: "qwert",
    education: "qwert", gotrej: "qwert", marital: "qwert", profession: "qwert", details: "qwert"
  },
  {
    name: "qwert", relation: "qwert", address: "qwert", mobile: "qwert", birth: "qwert",
    education: "qwert", gotrej: "qwert", marital: "qwert", profession: "qwert", details: "qwert"
  },
  {
    name: "qwert", relation: "qwert", address: "qwert", mobile: "qwert", birth: "qwert",
    education: "qwert", gotrej: "qwert", marital: "qwert", profession: "qwert", details: "qwert"
  },
  {
    name: "qwert", relation: "qwert", address: "qwert", mobile: "qwert", birth: "qwert",
    education: "qwert", gotrej: "qwert", marital: "qwert", profession: "qwert", details: "qwert"
  },
  {
    name: "qwert", relation: "qwert", address: "qwert", mobile: "qwert", birth: "qwert",
    education: "qwert", gotrej: "qwert", marital: "qwert", profession: "qwert", details: "qwert"
  },
  {
    name: "qwert", relation: "qwert", address: "qwert", mobile: "qwert", birth: "qwert",
    education: "qwert", gotrej: "qwert", marital: "qwert", profession: "qwert", details: "qwert"
  },
  {
    name: "qwert", relation: "qwert", address: "qwert", mobile: "qwert", birth: "qwert",
    education: "qwert", gotrej: "qwert", marital: "qwert", profession: "qwert", details: "qwert"
  },
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
                    {rows
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
                count={rows.length}
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