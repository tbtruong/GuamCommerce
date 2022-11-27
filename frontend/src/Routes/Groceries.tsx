import React, {useEffect} from 'react';
import Drawer from "../Components/Drawer/Drawer";
import {Box, CssBaseline, Grid, Typography} from "@mui/material";
import SearchBar from "../Components/SearchBar/SearchBar";
import axios from '../Util/Axios'
import LineChart from "../Components/Graph/LineChart";
import Table from "../Components/Graph/Table";
import './Groceries.css'
import PriceCard from "../Components/Card/PriceCard";

export interface searchItemResults {
    sale: string;
    store: string;
    date_purchased: Date;
    price: number;
    name: string;
    description: string;
}


const Dashboard = () => {
    const [groceryPrices, setGroceryPrices] = React.useState<searchItemResults[]>([])


    const groceryItemCallback = (groceryPriceList: searchItemResults[]) => {
        console.log(groceryPriceList)
        setGroceryPrices(groceryPriceList)
    }

    useEffect(() => {

    }, [groceryPrices])

    return (
        <Box sx={{display:'flex', flexDirection:'column'}}>
            <Box sx={{display:'flex'}}>
                <Drawer/>
            </Box>
            <Box sx={{marginLeft: '300px', marginTop: '2rem'}}>
                <SearchBar searchItemCallback={groceryItemCallback}/>
                {groceryPrices.length > 0 &&
                    <Box sx={{marginBottom: '2rem', marginTop: '2rem', userSelect: 'none'}}>
                         <Typography variant={'h3'}> Banana </Typography>
                        <Box sx={{display: 'flex', justifyContent: 'space-around'}}>
                            <Box sx={{display: 'flex', flexDirection: 'column', width: '50%', justifyContent: 'space-around'}}>
                                <Box sx={{display: 'flex', justifyContent: 'space-around', marginBottom: '2rem'}}>
                                     <PriceCard />
                                     <PriceCard />
                                </Box>
                                 <Table groceryPriceList={groceryPrices}/>
                            </Box>
                             <LineChart groceryPriceList={groceryPrices}/>
                        </Box>

                    </Box>
                }
            </Box>
        </Box>
    );
}

export default Dashboard
