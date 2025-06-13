import React, {useState} from 'react';
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Container,
    IconButton,
    InputAdornment,
    Tab,
    Tabs,
    TextField,
    Typography
} from '@mui/material';
import {Email, Lock, Visibility, VisibilityOff,} from '@mui/icons-material';
import BASE_API_URL from "../config/config.js";
import {setToken} from "../redux/slices/authSlice.js";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

function LoginForm() {
    const dispatch = useDispatch();
    const [tab, setTab] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({ show: false, type: 'success', message: '' });
    const navigate = useNavigate();

    // Form states
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: '',
        rememberMe: false
    });

    const [registerForm, setRegisterForm] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });

    // Validation errors
    const [loginErrors, setLoginErrors] = useState({});
    const [registerErrors, setRegisterErrors] = useState({});

    const handleTabChange = (event, newValue) => {
        setTab(newValue);
        setAlert({ show: false, type: 'success', message: '' });
        setLoginErrors({});
        setRegisterErrors({});
    };

    const handleLoginChange = (field) => (event) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        setLoginForm(prev => ({ ...prev, [field]: value }));

        // Clear error when user starts typing
        if (loginErrors[field]) {
            setLoginErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleRegisterChange = (field) => (event) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        setRegisterForm(prev => ({ ...prev, [field]: value }));

        // Clear error when user starts typing
        if (registerErrors[field]) {
            setRegisterErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validateLogin = () => {
        const errors = {};

        if (!loginForm.email) {
            errors.email = 'Email richiesta';
        } else if (!validateEmail(loginForm.email)) {
            errors.email = 'Email non valida';
        }

        if (!loginForm.password) {
            errors.password = 'Password richiesta';
        } else if (loginForm.password.length < 6) {
            errors.password = 'Password deve essere almeno 6 caratteri';
        }

        setLoginErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const validateRegister = () => {
        const errors = {};

        if (!registerForm.email) {
            errors.email = 'Email richiesta';
        } else if (!validateEmail(registerForm.email)) {
            errors.email = 'Email non valida';
        }

        if (!registerForm.password) {
            errors.password = 'Password richiesta';
        } else if (registerForm.password.length < 8) {
            errors.password = 'Password deve essere almeno 8 caratteri';
        }

        if (!registerForm.confirmPassword) {
            errors.confirmPassword = 'Conferma password richiesta';
        } else if (registerForm.password !== registerForm.confirmPassword) {
            errors.confirmPassword = 'Le password non coincidono';
        }

        setRegisterErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleLogin = async (event) => {
        event.preventDefault();

        if (!validateLogin()) return;

        setLoading(true);

        try {
            // Qui inserisci la tua chiamata API
            const response = await fetch(`${BASE_API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    mail: loginForm.email,
                    password: loginForm.password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setAlert({
                    show: true,
                    type: 'success',
                    message: 'Login effettuato con successo!'
                });

                // Salva il token se necessario
                dispatch(setToken(data.token));

                // Redirect o aggiorna stato app
                // window.location.href = '/dashboard';

            } else {
                setAlert({
                    show: true,
                    type: 'error',
                    message: data.message || 'Credenziali non valide'
                });
            }

        } catch (error) {
            setAlert({
                show: true,
                type: 'error',
                message: 'Errore durante il login. Riprova'
            });
            console.log(error)
        } finally {
            setLoading(false);
        }
        setTimeout(() => {
            navigate('/home');
        }, 500);
    };

    const handleRegister = async (event) => {
        event.preventDefault();

        if (!validateRegister()) return;

        setLoading(true);

        try {
            const response = await fetch(`${BASE_API_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    mail: registerForm.email,
                    password: registerForm.password,
                }),
            });

            if (response.ok) {
                setAlert({
                    show: true,
                    type: 'success',
                    message: 'Registrazione completata con successo!'
                });

                // Reset form
                setRegisterForm({
                    email: '',
                    password: '',
                    confirmPassword: ''
                });

                // Cambia tab al login
                setTab(0);

            } else {
                setAlert({
                    show: true,
                    type: 'error',
                    message: 'Errore durante la registrazione'
                });
            }

        } catch (error) {
            setAlert({
                show: true,
                type: 'error',
                message: 'Errore durante la registrazione. Riprova.'
            });
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container component="main" maxWidth="sm">
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    py: 4
                }}
            >
                <Card
                    sx={{
                        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                        borderRadius: 3,
                        overflow: 'hidden'
                    }}
                >
                    <CardContent sx={{ p: 4 }}>
                        {/* Header */}
                        <Typography
                            variant="h4"
                            component="h1"
                            align="center"
                            gutterBottom
                            sx={{
                                fontWeight: 'bold',
                                color: 'primary.main',
                                mb: 1
                            }}
                        >
                            Benvenuto
                        </Typography>

                        <Typography
                            variant="body2"
                            align="center"
                            color="text.secondary"
                            sx={{ mb: 3 }}
                        >
                            Accedi al tuo account o creane uno nuovo
                        </Typography>

                        {/* Alert */}
                        {alert.show && (
                            <Alert
                                severity={alert.type}
                                sx={{ mb: 3 }}
                                onClose={() => setAlert({ show: false, type: 'success', message: '' })}
                            >
                                {alert.message}
                            </Alert>
                        )}

                        {/* Tabs */}
                        <Tabs
                            value={tab}
                            onChange={handleTabChange}
                            centered
                            sx={{ mb: 3 }}
                            variant="fullWidth"
                        >
                            <Tab label="Accedi" />
                            <Tab label="Registrati" />
                        </Tabs>

                        {/* Login Form */}
                        {tab === 0 && (
                            <Box component="form" onSubmit={handleLogin} noValidate>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    type="email"
                                    value={loginForm.email}
                                    onChange={handleLoginChange('email')}
                                    error={!!loginErrors.email}
                                    helperText={loginErrors.email}
                                    margin="normal"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Email color="action" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                                <TextField
                                    fullWidth
                                    label="Password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={loginForm.password}
                                    onChange={handleLoginChange('password')}
                                    error={!!loginErrors.password}
                                    helperText={loginErrors.password}
                                    margin="normal"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Lock color="action" />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    mt: 2,
                                    mb: 3
                                }}>
                                </Box>

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    size="large"
                                    disabled={loading}
                                    sx={{ mb: 2, py: 1.5 }}
                                >
                                    {loading ? <CircularProgress size={24} /> : 'Accedi'}
                                </Button>

                            </Box>
                        )}

                        {/* Register Form */}
                        {tab === 1 && (
                            <Box component="form" onSubmit={handleRegister} noValidate>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    type="email"
                                    value={registerForm.email}
                                    onChange={handleRegisterChange('email')}
                                    error={!!registerErrors.email}
                                    helperText={registerErrors.email}
                                    margin="normal"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Email color="action" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                                <TextField
                                    fullWidth
                                    label="Password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={registerForm.password}
                                    onChange={handleRegisterChange('password')}
                                    error={!!registerErrors.password}
                                    helperText={registerErrors.password}
                                    margin="normal"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Lock color="action" />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                                <TextField
                                    fullWidth
                                    label="Conferma Password"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={registerForm.confirmPassword}
                                    onChange={handleRegisterChange('confirmPassword')}
                                    error={!!registerErrors.confirmPassword}
                                    helperText={registerErrors.confirmPassword}
                                    margin="normal"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Lock color="action" />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    edge="end"
                                                >
                                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    size="large"
                                    disabled={loading}
                                    sx={{ mt: 3, mb: 2, py: 1.5 }}
                                >
                                    {loading ? <CircularProgress size={24} /> : 'Registrati'}
                                </Button>
                            </Box>
                        )}
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
}

export default LoginForm;
