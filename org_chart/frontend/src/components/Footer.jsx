import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {NavLink} from "react-router-dom";
import EmailIcon from '@mui/icons-material/Email';
import CopyrightIcon from '@mui/icons-material/Copyright';
import CookieIcon from '@mui/icons-material/Cookie';

const navItems = [
    { label: 'Contact Us', path: '/contact', icon: <EmailIcon /> },
    { label: 'MIT License', path: 'https://mit-license.org/', external: true, icon: <CopyrightIcon /> },
    { label: 'Cookie Policy', path: '/cookie', icon: <CookieIcon /> },
];

function Footer() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', mt: 'auto', width: '100%' }}>
            <Box
                component="footer"
                sx={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: '#fff',
                    py: 2,
                    px: { xs: 2, sm: 4 },
                    boxShadow: '0 -4px 20px rgba(0,0,0,0.1)',
                }}
            >
                <Toolbar
                    sx={{
                        px: 0,
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        minHeight: '64px !important'
                    }}
                >
                    <Box
                        component={NavLink}
                        to="/"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            textDecoration: 'none',
                            color: 'inherit',
                            mb: { xs: 2, sm: 0 },
                            transition: 'all 0.2s ease-in-out',
                            '&:hover': {
                                transform: 'translateY(-1px)',
                                filter: 'brightness(1.1)',
                            },
                        }}
                    >
                        <Box
                            component="img"
                            src="https://picsum.photos/id/237/100/100"
                            alt="Company-Logo"
                            sx={{
                                height: 48,
                                borderRadius: "50%",
                                mr: 2,
                                border: '2px solid rgba(255,255,255,0.2)',
                                transition: 'all 0.2s ease-in-out',
                            }}
                        />
                        <Box>
                            <Typography
                                variant="h5"
                                sx={{
                                    fontWeight: 'bold',
                                    display: { xs: 'none', sm: 'block' },
                                    lineHeight: 1.2,
                                }}
                            >
                                OrgChart
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    opacity: 0.8,
                                    display: { xs: 'none', sm: 'block' },
                                    fontSize: '0.875rem',
                                }}
                            >
                                &copy; {new Date().getFullYear()} All rights reserved
                            </Typography>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            gap: { xs: 1, sm: 0 },
                            alignItems: { xs: 'stretch', sm: 'center' },
                            width: { xs: '100%', sm: 'auto' }
                        }}
                    >
                        {navItems.map((item) => (
                            <Button
                                key={item.label}
                                component={item.external ? 'a' : NavLink}
                                to={item.external ? undefined : item.path}
                                href={item.external ? item.path : undefined}
                                target={item.external ? '_blank' : undefined}
                                rel={item.external ? 'noopener noreferrer' : undefined}
                                startIcon={item.icon}
                                sx={{
                                    color: '#fff',
                                    ml: { xs: 0, sm: 2 },
                                    textTransform: 'none',
                                    fontSize: '0.95rem',
                                    fontWeight: 500,
                                    borderRadius: '25px',
                                    px: 3,
                                    py: 1,
                                    minWidth: 'auto',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                                    },
                                    transition: 'all 0.3s ease-in-out',
                                    border: '1px solid rgba(255,255,255,0.2)',
                                }}
                            >
                                {item.label}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </Box>
        </Box>
    );
}

export default Footer;