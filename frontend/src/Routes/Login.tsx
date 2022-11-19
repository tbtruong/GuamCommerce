import React from 'react';
import {Grid} from "@mui/material";
import LoginInput from "../Components/Login/LoginInput";


const Login = () => {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh' }}
        >
            <Grid item xs={3}>
               <LoginInput/>
            </Grid>
        </Grid>
    );
}

export default Login;
