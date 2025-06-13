import React, {useState, useEffect} from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    Grid,
    Card,
    CardContent,
    AppBar,
    Toolbar,
    Fade,
    Grow,
    Zoom,
    useTheme,
    alpha
} from '@mui/material';
import {styled, keyframes} from '@mui/material/styles';
import {
    Business as BusinessIcon,
    People as PeopleIcon,
    Visibility as VisibilityIcon,
    Add as AddIcon,
    ChevronRight as ChevronRightIcon,
    FlashOn as FlashOnIcon,
    ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
import {NavLink} from "react-router-dom";

// Animazioni personalizzate
const float = keyframes`
    0%, 100% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-20px);
    }
`;

const pulse = keyframes`
    0%, 100% {
        opacity: 0.3;
    }
    50% {
        opacity: 0.8;
    }
`;

const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

// Componenti styled
const GradientBox = styled(Box)(() => ({
    background: 'linear-gradient(135deg, #0f0f23 0%, #1a0a2e 35%, #16213e 100%)',
    minHeight: '100vh',
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: '-20%',
        right: '-20%',
        width: '40%',
        height: '40%',
        background: 'radial-gradient(circle, rgba(147, 51, 234, 0.3) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: `${pulse} 4s ease-in-out infinite`,
    },
    '&::after': {
        content: '""',
        position: 'absolute',
        bottom: '-20%',
        left: '-20%',
        width: '40%',
        height: '40%',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: `${pulse} 4s ease-in-out infinite 2s`,
    }
}));

const FloatingElement = styled(Box)(() => ({
    position: 'absolute',
    animation: `${float} 6s ease-in-out infinite`,
}));

const RotatingElement = styled(Box)(() => ({
    position: 'absolute',
    animation: `${rotate} 20s linear infinite`,
    border: '2px solid rgba(147, 51, 234, 0.3)',
    borderRadius: '50%',
}));

const GradientButton = styled(Button)(() => ({
    background: 'linear-gradient(45deg, #3b82f6 30%, #8b5cf6 90%)',
    borderRadius: 25,
    border: 0,
    color: 'white',
    height: 56,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(59, 130, 246, .3)',
    transition: 'all 0.3s ease',
    '&:hover': {
        background: 'linear-gradient(45deg, #2563eb 30%, #7c3aed 90%)',
        transform: 'translateY(-2px)',
        boxShadow: '0 6px 10px 4px rgba(59, 130, 246, .4)',
    },
}));

const StepCard = styled(Card)(({active}) => ({
    background: active
        ? 'linear-gradient(135deg, rgba(147, 51, 234, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%)'
        : 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    border: active ? '2px solid #8b5cf6' : '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    transition: 'all 0.5s ease',
    transform: active ? 'scale(1.05)' : 'scale(1)',
    '&:hover': {
        background: 'rgba(255, 255, 255, 0.1)',
        transform: 'scale(1.02)',
    }
}));

const FeatureCard = styled(Card)(() => ({
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    transition: 'all 0.3s ease',
    '&:hover': {
        background: 'rgba(255, 255, 255, 0.1)',
        transform: 'translateY(-5px)',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
    }
}));

const OrgChartLanding = () => {
    const theme = useTheme();
    const [isVisible, setIsVisible] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        setIsVisible(true);
        const interval = setInterval(() => {
            setCurrentStep(prev => (prev + 1) % 3);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const steps = [
        {
            icon: BusinessIcon,
            text: "Crea la tua azienda",
            color: theme.palette.primary.main,
            description: "Setup rapido e intuitivo"
        },
        {
            icon: AddIcon,
            text: "Aggiungi dipendenti",
            color: theme.palette.success.main,
            description: "Gestione semplificata"
        },
        {
            icon: VisibilityIcon,
            text: "Visualizza la gerarchia",
            color: theme.palette.secondary.main,
            description: "Vista chiara e dinamica"
        }
    ];

    const features = [
        {icon: FlashOnIcon, title: "Veloce", desc: "Setup in minuti", color: "#f59e0b"},
        {icon: PeopleIcon, title: "Intuitivo", desc: "Facile da usare", color: "#10b981"},
        {icon: BusinessIcon, title: "Scalabile", desc: "Cresce con te", color: "#8b5cf6"}
    ];

    return (
        <GradientBox>
            {/* Elementi decorativi */}
            <RotatingElement
                sx={{
                    top: '20%',
                    left: '10%',
                    width: 100,
                    height: 100,
                    zIndex: 1
                }}
            />
            <FloatingElement
                sx={{
                    top: '60%',
                    right: '10%',
                    width: 80,
                    height: 80,
                    background: 'rgba(59, 130, 246, 0.1)',
                    borderRadius: 2,
                    zIndex: 1
                }}
            />

            {/* Header */}
            <AppBar position="static" sx={{background: 'transparent', boxShadow: 'none'}}>
                <Toolbar>
                    <Fade in={isVisible} timeout={1000}>
                        <Box sx={{display: 'flex', alignItems: 'center', flexGrow: 1}}>
                            <Box
                                sx={{
                                    width: 40,
                                    height: 40,
                                    background: 'linear-gradient(45deg, #3b82f6 30%, #8b5cf6 90%)',
                                    borderRadius: 2,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mr: 2
                                }}
                            >
                                <BusinessIcon sx={{color: 'white'}}/>
                            </Box>
                            <Typography
                                variant="h4"
                                sx={{
                                    fontWeight: 'bold',
                                    background: 'linear-gradient(45deg, #60a5fa, #a78bfa)',
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >
                                Org Chart
                            </Typography>
                        </Box>
                    </Fade>
                </Toolbar>
            </AppBar>

            <Container maxWidth="lg" sx={{position: 'relative', zIndex: 2}}>
                {/* Hero Section */}
                <Box sx={{textAlign: 'center', py: 8}}>
                    <Grow in={isVisible} timeout={1000} style={{transitionDelay: '300ms'}}>
                        <Typography
                            variant="h1"
                            sx={{
                                fontSize: {xs: '3rem', md: '6rem'},
                                fontWeight: 900,
                                mb: 2,
                                background: 'linear-gradient(45deg, #60a5fa, #a78bfa, #f472b6)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                lineHeight: 1.1
                            }}
                        >
                            Gerarchia
                        </Typography>
                    </Grow>

                    <Grow in={isVisible} timeout={1000} style={{transitionDelay: '500ms'}}>
                        <Typography
                            variant="h1"
                            sx={{
                                fontSize: {xs: '3rem', md: '6rem'},
                                fontWeight: 900,
                                mb: 4,
                                color: 'white',
                                lineHeight: 1.1
                            }}
                        >
                            Dinamica
                        </Typography>
                    </Grow>

                    <Fade in={isVisible} timeout={1000} style={{transitionDelay: '700ms'}}>
                        <Typography
                            variant="h5"
                            sx={{
                                color: 'rgba(255, 255, 255, 0.8)',
                                mb: 6,
                                maxWidth: 800,
                                mx: 'auto',
                                lineHeight: 1.6
                            }}
                        >
                            Visualizza e gestisci la struttura della tua azienda in modo semplice e intuitivo
                        </Typography>
                    </Fade>

                    {/* Steps Section */}
                    <Fade in={isVisible} timeout={1000} style={{transitionDelay: '900ms'}}>
                        <Grid container spacing={4} sx={{mb: 6}} justifyContent="center">
                            {steps.map((step, index) => (
                                <Grid item xs={12} md={4} key={index}>
                                    <StepCard active={currentStep === index}>
                                        <CardContent sx={{textAlign: 'center', py: 4}}>
                                            <Zoom in={currentStep === index} timeout={500}>
                                                <Box
                                                    sx={{
                                                        width: 80,
                                                        height: 80,
                                                        borderRadius: '50%',
                                                        background: currentStep === index
                                                            ? `linear-gradient(45deg, ${step.color}, ${alpha(step.color, 0.7)})`
                                                            : 'rgba(255, 255, 255, 0.1)',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        mx: 'auto',
                                                        mb: 3,
                                                        transition: 'all 0.3s ease'
                                                    }}
                                                >
                                                    <step.icon
                                                        sx={{
                                                            fontSize: 36,
                                                            color: 'white'
                                                        }}
                                                    />
                                                </Box>
                                            </Zoom>
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    color: 'white',
                                                    fontWeight: 'bold',
                                                    mb: 1
                                                }}
                                            >
                                                {step.text}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: 'rgba(255, 255, 255, 0.7)'
                                                }}
                                            >
                                                {step.description}
                                            </Typography>
                                        </CardContent>
                                    </StepCard>
                                </Grid>
                            ))}
                        </Grid>
                    </Fade>

                    {/* CTA Buttons */}
                    <Fade in={isVisible} timeout={1000} style={{transitionDelay: '1100ms'}}>
                        <Box sx={{display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap'}}>
                            <GradientButton
                                component={NavLink}
                                to={"/home"}
                                size="large"
                                endIcon={<ChevronRightIcon/>}
                                sx={{fontSize: '1.1rem'}}
                            >
                                Vai al sito
                            </GradientButton>
                            <Button
                                component={NavLink}
                                to={"/about"}
                                variant="outlined"
                                size="large"
                                sx={{
                                    borderColor: 'rgba(255, 255, 255, 0.3)',
                                    color: 'white',
                                    borderRadius: 25,
                                    px: 4,
                                    fontSize: '1.1rem',
                                    '&:hover': {
                                        borderColor: '#8b5cf6',
                                        color: '#a78bfa',
                                        background: 'rgba(139, 92, 246, 0.1)'
                                    }
                                }}
                            >
                                Scopri di più
                            </Button>
                        </Box>
                    </Fade>
                </Box>

                {/* Features Section */}
                <Box sx={{pb: 8, display: 'flex', justifyContent: 'center' }}>
                    <Grid container spacing={4}>
                        {features.map((feature, index) => (
                            <Grid item xs={12} md={4} key={index}>
                                <Grow
                                    in={isVisible}
                                    timeout={1000}
                                    style={{transitionDelay: `${1300 + index * 200}ms`}}
                                >
                                    <FeatureCard>
                                        <CardContent sx={{textAlign: 'center', py: 4}}>
                                            <Box
                                                sx={{
                                                    width: 60,
                                                    height: 60,
                                                    borderRadius: '50%',
                                                    background: `linear-gradient(45deg, ${feature.color}, ${alpha(feature.color, 0.7)})`,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    mx: 'auto',
                                                    mb: 3
                                                }}
                                            >
                                                <feature.icon sx={{fontSize: 30, color: 'white'}}/>
                                            </Box>
                                            <Typography
                                                variant="h6"
                                                sx={{color: 'white', fontWeight: 'bold', mb: 1}}
                                            >
                                                {feature.title}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{color: 'rgba(255, 255, 255, 0.7)'}}
                                            >
                                                {feature.desc}
                                            </Typography>
                                        </CardContent>
                                    </FeatureCard>
                                </Grow>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>
        </GradientBox>
    );
};

export default OrgChartLanding;