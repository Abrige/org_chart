import {Button, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";
import Box from "@mui/material/Box";
import {useSelector} from "react-redux";

export default function AdminPanel() {

    const role = useSelector(state => state.auth.role);

    if (role !== 3) return (<div>Non sei autorizzato</div>)

    return (
        <Box
            sx={{
                minHeight: '70vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
            }}
        >
            {/* Header Section */}
            <Box
                sx={{
                    textAlign: 'center',
                    marginBottom: '4rem',
                    animation: 'fadeInDown 0.8s ease-out',
                }}
            >
                <Typography
                    variant="h1"
                    sx={{
                        fontSize: {xs: '3rem', md: '4.5rem'},
                        fontWeight: 800,
                        background: 'linear-gradient(45deg, #fff, #f0f0f0)',
                        backgroundClip: 'text',
                        textShadow: '0 4px 8px rgba(0,0,0,0.3)',
                        marginBottom: '1rem',
                        letterSpacing: '-0.02em',
                    }}
                >
                    Admin Panel
                </Typography>

                <Typography
                    variant="h5"
                    sx={{
                        color: 'rgba(85,85,85,0.8)',
                        fontWeight: 300,
                        fontSize: {xs: '1.2rem', md: '1.5rem'},
                        letterSpacing: '0.05em',
                    }}
                >
                    Gestisci le tue operazioni
                </Typography>
            </Box>

            {/* Buttons Container */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: {xs: 3, md: 6},
                    flexDirection: {xs: 'column', md: 'row'},
                    animation: 'fadeInUp 0.8s ease-out 0.3s both',
                }}
            >
                <Button
                    component={NavLink}
                    to="/history"
                    variant="contained"
                    sx={{
                        fontSize: '2.5rem',
                        fontWeight: 'bold',
                        padding: '20px 40px',
                        borderRadius: '25px',
                        background: 'linear-gradient(45deg, #FF6B6B, #FF8E53)',
                        color: 'white',
                        boxShadow: '0 8px 25px rgba(255, 107, 107, 0.4)',
                        textTransform: 'none',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        border: 'none',
                        minWidth: '200px',
                        position: 'relative',
                        overflow: 'hidden',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: '-100%',
                            width: '100%',
                            height: '100%',
                            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                            transition: 'left 0.5s',
                        },
                        '&:hover': {
                            transform: 'translateY(-5px) scale(1.05)',
                            boxShadow: '0 15px 35px rgba(255, 107, 107, 0.6)',
                            background: 'linear-gradient(45deg, #FF8E53, #FF6B6B)',
                            '&::before': {
                                left: '100%',
                            },
                        },
                        '&:active': {
                            transform: 'translateY(-2px) scale(1.02)',
                        }
                    }}
                >
                    History
                </Button>

                <Button
                    component={NavLink}
                    to="/requests"
                    variant="contained"
                    sx={{
                        fontSize: '2.5rem',
                        fontWeight: 'bold',
                        padding: '20px 40px',
                        borderRadius: '25px',
                        background: 'linear-gradient(45deg, #4ECDC4, #44A08D)',
                        color: 'white',
                        boxShadow: '0 8px 25px rgba(78, 205, 196, 0.4)',
                        textTransform: 'none',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        border: 'none',
                        minWidth: '200px',
                        position: 'relative',
                        overflow: 'hidden',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: '-100%',
                            width: '100%',
                            height: '100%',
                            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                            transition: 'left 0.5s',
                        },
                        '&:hover': {
                            transform: 'translateY(-5px) scale(1.05)',
                            boxShadow: '0 15px 35px rgba(78, 205, 196, 0.6)',
                            background: 'linear-gradient(45deg, #44A08D, #4ECDC4)',
                            '&::before': {
                                left: '100%',
                            },
                        },
                        '&:active': {
                            transform: 'translateY(-2px) scale(1.02)',
                        }
                    }}
                >
                    Requests
                </Button>
            </Box>

            {/* Decorative elements */}
            <Box
                sx={{
                    position: 'absolute',
                    top: '10%',
                    right: '10%',
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.1)',
                    animation: 'float 6s ease-in-out infinite',
                    zIndex: -1,
                }}
            />

            <Box
                sx={{
                    position: 'absolute',
                    bottom: '15%',
                    left: '15%',
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.08)',
                    animation: 'float 8s ease-in-out infinite reverse',
                    zIndex: -1,
                }}
            />

            {/* CSS Animations */}
            <style jsx>{`
                @keyframes fadeInDown {
                    from {
                        opacity: 0;
                        transform: translate3d(0, -50px, 0);
                    }
                    to {
                        opacity: 1;
                        transform: translate3d(0, 0, 0);
                    }
                }

                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translate3d(0, 50px, 0);
                    }
                    to {
                        opacity: 1;
                        transform: translate3d(0, 0, 0);
                    }
                }

                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-20px);
                    }
                }
            `}</style>
        </Box>
    );
}