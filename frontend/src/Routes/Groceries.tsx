import React from 'react';
import Drawer from "../Components/Drawer/Drawer";
import {Box, Typography} from "@mui/material";
import SearchBar from "../Components/SearchBar/SearchBar";
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
    const [saleAverage, setSaleAverage] = React.useState('')
    const [priceAverage, setPriceAverage] = React.useState('')

    const groceryItemCallback = (groceryPriceList: searchItemResults[]) => {
        console.log(groceryPriceList)
        setGroceryPrices(groceryPriceList)
    }

    React.useEffect(() => {
        setTimeout(() => {
            console.log("World!");
        }, 1000);
    }, [groceryPrices])

    const calculateAverages = () => {
        let currentNonsell = 0
        let currentCountNonsell = 0
        let currentSale = 0
        let currentCountSell = 0
        groceryPrices.map((item) => {
            if (item.sale) {
                currentSale += parseFloat(String(item.price))
                currentCountSell += 1
            } else {
                currentNonsell += parseFloat(String(item.price))
                currentCountNonsell += 1
            }
        })

        setPriceAverage(currentNonsell ? (Math.round((currentNonsell / currentCountNonsell) * 100) / 100).toString() : 'No current data')
        setSaleAverage(currentSale ? (Math.round((currentSale / currentCountSell) * 100) / 100).toString() : 'No current data')
    }

    React.useEffect(() => {
        calculateAverages()
    }, [groceryPrices])

    return (
        <Box sx={{display: 'flex', flexDirection: 'column'}}>
            <Box sx={{display: 'flex'}}>
                <Drawer/>
            </Box>
            <Box sx={{marginLeft: '300px', marginTop: '2rem'}}>
                <SearchBar searchItemCallback={groceryItemCallback}/>
                {groceryPrices.length > 0 &&
                    <Box sx={{marginBottom: '2rem', marginTop: '2rem', userSelect: 'none'}}>
                        <Typography variant={'h3'}> {groceryPrices[0].name} </Typography>
                        <Box sx={{display: 'flex', justifyContent: 'space-around'}}>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '50%',
                                justifyContent: 'space-around'
                            }}>
                                <Box sx={{display: 'flex', justifyContent: 'space-around', marginBottom: '2rem'}}>
                                    <PriceCard
                                        price={priceAverage == 'No current data' ? priceAverage : `${priceAverage}/pound`}
                                        text={'Average Price:'}/>
                                    <PriceCard
                                        price={saleAverage == 'No current data' ? saleAverage : `${saleAverage}/pound`}
                                        text={'Avg Sale Price:'}/>
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
