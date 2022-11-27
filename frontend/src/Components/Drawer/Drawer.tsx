import React from 'react';
import Drawer from '@mui/material/Drawer';
import {Box, Button, Divider, Typography, Icon} from "@mui/material";
import {NavItem} from "./NavItem";
import {ShoppingCart, Dashboard, ConnectingAirports} from '@mui/icons-material/';

const AppDrawer = () => {

    const items = [
        {
            href: '/',
            icon: (<Dashboard fontSize="medium" />),
            title: 'Dashboard'
        },
        {
            href: '/groceries',
            icon: (<ShoppingCart fontSize="medium" />),
            title: 'Groceries'
        },
        {
            href: '/flights',
            icon: (<ConnectingAirports fontSize="medium" />),
            title: 'Flights'
        },
    ];


    const content = (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    marginTop: '1rem'
                }}
            >
                <div>
                    <Box sx={{ px: 2 }}>
                        <Box
                            sx={{
                                alignItems: 'center',
                                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                                cursor: 'pointer',
                                display: 'flex',
                                justifyContent: 'space-between',
                                px: 3,
                                py: '11px',
                                borderRadius: 1
                            }}
                        >
                            <div>
                                <Typography
                                    color="#FFFFFF"
                                    variant="subtitle1"
                                    sx ={{userSelect: 'none'}}
                                >
                                    Welcome Tung
                                </Typography>
                                <Typography
                                    color="neutral.300"
                                    variant="body2"
                                >

                                </Typography>
                            </div>
                            <Icon
                                sx={{
                                    color: '#6B7280',
                                    width: 14,
                                    height: 14
                                }}
                            />
                        </Box>
                    </Box>
                </div>
                <Divider
                    sx={{
                        borderColor: '#2D3748',
                        my: 3
                    }}
                />
                <Box sx={{ flexGrow: 1 }}>
                    {items.map((item) => (
                        <NavItem
                            key={item.title}
                            icon={item.icon}
                            href={item.href}
                            title={item.title}
                        />
                    ))}
                </Box>
                <Divider sx={{ borderColor: '#2D3748' }} />
            </Box>
        </>
    );



    return (
        <Drawer
            anchor="left"
            PaperProps={{
                sx: {
                    backgroundColor: '#111827',
                    color: '#111827',
                    width: 280
                }
            }}
            sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
            variant="permanent"
        >
            {content}
        </Drawer>
    );
};

export default AppDrawer
