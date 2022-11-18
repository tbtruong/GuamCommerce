import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {ShoppingCart} from '@mui/icons-material/';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const ResponsiveAppBar = () => {

    const containerStyles = {
        margin: 0,
        maxWidth: '100%'
    }

    const shoppingCartStyle = {
        display: {xs: 'none', md: 'flex'},
        mr: 1,
    }

    const typographyStyle = {
        mr: 2,
        display: {xs: 'none', md: 'flex'},
        fontFamily: 'monospace',
        fontWeight: 700,
        letterSpacing: '.3rem',
        color: 'inherit',
        textDecoration: 'none',
        justifyContent: 'flex-start'
    }

    const boxStyle = {
        flexGrow: 1,
        display: {xs: 'none', md: 'flex'},
        justifyContent: 'flex-end'
    }

    const pageButtonStyle = {
        my: 2, color: 'white',
        display: 'block'
    }

    return (
        <AppBar position="static">
            <Container sx={containerStyles} maxWidth={false}>
                <Toolbar disableGutters>
                    <ShoppingCart sx={shoppingCartStyle}/>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={typographyStyle}
                    >
                        GROCERY SHOPPER
                    </Typography>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default ResponsiveAppBar;
