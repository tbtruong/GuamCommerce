import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Box} from "@mui/material";

interface priceCardProps {
    text: string,
    price: string
}

const PriceCard = ({text, price}: priceCardProps) => {

    const wordStyle = {
        textAlign: 'center'
    }

    return (
        <Card sx={{minWidth: '270px', color: '#2F446F'}} raised>
            <CardContent>
                <Box sx={wordStyle}>
                    <Typography gutterBottom variant="h4" component="div">
                        {text}
                    </Typography>
                    <Typography gutterBottom variant="h4" component="div">
                        {price}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}
export default PriceCard