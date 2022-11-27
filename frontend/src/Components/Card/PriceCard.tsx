import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Box} from "@mui/material";

const PriceCard = () => {

    const wordStyle = {
        textAlign: 'center'
    }

    return (
        <Card sx={{minWidth:'270px', color:'#2F446F'}} raised>
            <CardContent>
                <Box sx={wordStyle}>
                    <Typography gutterBottom variant="h4" component="div">
                        Average Price:
                    </Typography>
                    <Typography gutterBottom variant="h4" component="div">
                        $5.21/pound
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}
export default PriceCard