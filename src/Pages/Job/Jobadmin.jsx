/* eslint-disable no-unused-vars */
import {
    Grid, InputAdornment,
    TextField, Button, InputLabel, Select, MenuItem
} from '@mui/material'
import React from 'react'
import JobRegister from './JobRegister';
import CompanyRegister from './CompanyRegister';

const Jobadmin = () => {
    
    return (
        <div>
            <Grid container spacing={2} style={{ marginLeft: "-1.5rem", padding: "2rem" }}>
                <Grid item xs={12}  style={{ marginBottom: "8rem " }}>
                    <CompanyRegister/>
                </Grid>
                <Grid item xs={12} >
                    <JobRegister/>
                </Grid>
            </Grid>
        </div>
    )
}

export default Jobadmin