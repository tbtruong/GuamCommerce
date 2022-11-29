import React from 'react';
import Drawer from "../Components/Drawer/Drawer";
import {Box, CssBaseline, Dialog, Grid, Typography} from "@mui/material";
import addGroceryDialog from "../Components/Dialog/AddGroceryDialog";
import DeleteGroceryDialog from "../Components/Dialog/DeleteGroceryDialog";
import AddGroceryDialog from "../Components/Dialog/AddGroceryDialog";
import Table from "../Components/Graph/Table";
import axios from "../Util/Axios";
import {searchItemResults} from "./Groceries";

const Dashboard = () => {

    const [groceries, setGroceries] = React.useState<searchItemResults[]>([])

    const handleGroceriesCallback = (groceryList: searchItemResults[]) => {
        setGroceries(groceryList)
    }


    React.useEffect( () => {
        setTimeout(() => {
            axios.get('/groceries/getAll', {
                headers: {
                    jwt_token: localStorage.token
                }}).then((resp) => {
                setGroceries(resp.data)
            })
        }, 1000)
    }, [])


  return (
      <Box sx={{display:'flex', flexDirection:'row'}}>
        <Box sx={{display:'flex'}}>
          <Drawer/>
        </Box>
          <Box sx={{marginLeft: '300px', display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'flex-end'}}>
              <Box sx={{marginBottom: '5rem', display: 'flex', width: '100%', justifyContent: 'space-evenly', marginTop: '5rem'}}>
              <DeleteGroceryDialog groceryCallback={handleGroceriesCallback}/>
              <AddGroceryDialog groceryCallback={handleGroceriesCallback}/>
              </Box>
              <Box sx={{width: '97%', marginRight: '2rem', marginLeft: '2rem', marginTop: '5rem'}}>
                <Table groceryPriceList={groceries}/>
              </Box>
          </Box>
      </Box>
  );
}

export default Dashboard;
