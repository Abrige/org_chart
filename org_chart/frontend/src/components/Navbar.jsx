import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {NavLink, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {clearToken} from "../redux/slices/authSlice.js";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';

const drawerWidth = 240;

const navItems = [
    {label: 'Home', path: '/home'},
    {label: 'Add', path: '/addform'},
    {label: 'About', path: '/about'}
];

function Navbar(props) {
    const {window} = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const username = useSelector(state => state.auth.username);
    const role = useSelector(state => state.auth.role);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{textAlign: 'center'}}>
            <Typography variant="h6" sx={{my: 2}}>
                OrgChart
            </Typography>
            <Divider/>
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.label} disablePadding>
                        <ListItemButton component={NavLink}
                                        to={item.path}
                                        sx={{
                                            textAlign: 'center',
                                        }}>
                            <ListItemText primary={item.label}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar
                component="nav"
                elevation={0}
                sx={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{mr: 2, display: {sm: 'none'}}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Box
                        component={NavLink}
                        to="/home"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            textDecoration: 'none',
                            color: 'inherit',
                            flexGrow: 1,
                        }}
                    >
                        <Box
                            component="img"
                            src="https://picsum.photos/id/237/100/100"
                            alt="Company-Logo"
                            sx={{height: 40, borderRadius: "50%", mr: 1}}
                        />
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{
                                fontWeight: 'bold',
                                color: 'inherit',
                                display: {xs: 'none', sm: 'block'},
                            }}
                        >
                            OrgChart
                        </Typography>
                    </Box>

                    <Box sx={{display: {xs: 'none', sm: 'block'}}}>
                        {navItems.map((item) => (
                            <Button
                                key={item.label}
                                component={NavLink}
                                to={item.path}
                                sx={{
                                    color: '#fff',
                                    ml: 1,
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                        transform: 'translateY(-1px)',
                                    },
                                    transition: 'all 0.2s ease-in-out',
                                }}
                            >
                                {item.label}
                            </Button>
                        ))}
                        {/*bottone per il login che cambia se uno è loggato o no*/}
                        <Button
                            key="Login"
                            startIcon={username ? <LogoutIcon /> : <LoginIcon />}
                            sx={{
                                color: '#fff',
                                ml: 1,
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    transform: 'translateY(-1px)',
                                },
                                transition: 'all 0.2s ease-in-out',
                            }}
                            onClick={() => {
                                // se sei loggato
                                if(username) {
                                    // pulisce il token (cioè ti slogga)
                                    dispatch(clearToken());
                                    navigate("/")
                                }
                                // se non sei loggato
                                else{
                                    // vai al login
                                    navigate('/loginform');
                                }
                            }}
                        >
                            {username ? 'Logout' : 'Login'}
                        </Button>
                        {role === 3 &&
                            <Button
                                key="AdminPanel"
                                component={NavLink}
                                to="/adminpanel"
                                startIcon={<AdminPanelSettingsIcon />}
                                sx={{
                                    color: '#fff',
                                    ml: 1,
                                    background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                                    '&:hover': {
                                        background: 'linear-gradient(45deg, #FF5252, #26C6DA)',
                                        transform: 'translateY(-1px)',
                                        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                                    },
                                    borderRadius: '20px',
                                    px: 2,
                                    fontWeight: 'bold',
                                    transition: 'all 0.2s ease-in-out',
                                }}
                            >
                                Admin Panel
                            </Button>
                        }
                    </Box>
                </Toolbar>
            </AppBar>
            <nav>
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: {xs: 'block', sm: 'none'},
                        '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
            <Box component="main" sx={{p: 3, mb: 2}}>
            </Box>
        </Box>
    );
}

export default Navbar;