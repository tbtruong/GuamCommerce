import { Link,  useLocation } from 'react-router-dom';
import { Box, Button, ListItem, PaletteColor } from '@mui/material';

export const NavItem = (props: any) => {
    const { href, icon, title, ...others } = props;
    const router =  useLocation();
    const active = href ? (router.pathname === href) : false;

    // @ts-ignore
    return (
        <ListItem
            disableGutters
            sx={{
                display: 'flex',
                mb: 0.5,
                py: 0,
                px: 2
            }}
            {...others}
        >
            <Link
                style={{textDecoration: 'none'}}
                to={href}
            >
                <Button
                    component="a"
                    startIcon={icon}
                    disableRipple
                    sx={{
                        ...(active && {backgroundColor: 'rgba(255,255,255, 0.08)'}),
                        borderRadius: 1,
                        color: active ? 'secondary.main' : 'neutral.300',
                        ...(active && {fontWeight: 'fontWeightBold'}),
                        justifyContent: 'flex-start',
                        px: 3,
                        textAlign: 'left',
                        textTransform: 'none',
                        width: '250px',
                        '& .MuiButton-startIcon': {
                            color: active ? 'secondary.main' : '#9CA3AF'
                        },
                        '&:hover': {
                            backgroundColor: 'rgba(255,255,255, 0.08)'
                        }
                    }}
                >
                    <Box sx={{ flexGrow: 1 }}>
                        {title}
                    </Box>
                </Button>
            </Link>
        </ListItem>
    );
};