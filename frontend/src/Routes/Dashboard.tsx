import React from 'react';
import Drawer from "../Components/Drawer/Drawer";
import {Box, CssBaseline, Grid, Typography} from "@mui/material";
import SearchBar from "../Components/SearchBar/SearchBar";
import ReactCSSTransitionGroup from 'react-transition-group';
import Dialog from "../Components/Dialog/Dialog";

const Dashboard = () => {
  return (
      <Box sx={{display:'flex', flexDirection:'row'}}>
        <Box sx={{display:'flex'}}>
          <Drawer/>
        </Box>
        <Grid container sx={{marginLeft:'280px'}}>
              <Grid item xs={112} gridRow={12}>
                {/*<Box sx={{paddingLeft: '300px'}}>*/}
                <SearchBar searchItemCallback={()=>console.log('hello')}/>
                  <Dialog></Dialog>
              </Grid>
        </Grid>
      </Box>
  );
}

export default Dashboard;
