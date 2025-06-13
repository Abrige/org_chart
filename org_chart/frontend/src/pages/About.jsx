import {useLocation} from "react-router-dom";
import React from "react";
import {
    Container,
    Typography,
    Box,
    Link,
    Divider,
    Paper,
    Stack,
    Avatar,
    Grid,
    Tooltip,
    Chip,
    Button,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BusinessIcon from "@mui/icons-material/Business";
import LanguageIcon from "@mui/icons-material/Language";
import SendIcon from "@mui/icons-material/Send";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import SchoolIcon from "@mui/icons-material/School";
import SecurityIcon from "@mui/icons-material/Security";
import CookieIcon from "@mui/icons-material/Cookie";
import InfoIcon from "@mui/icons-material/Info";
import DeveloperModeIcon from "@mui/icons-material/DeveloperMode";

function About() {

    const location = useLocation()

    // ########## ABOUT PAGE ##########
    if (location.pathname === "/about") {
        return (
            <>
                <Box sx={{
                    minHeight: '100vh',
                    background: '#1a1d29',
                    py: 6
                }}>
                    <Container maxWidth="md">
                        {/* Hero Section */}
                        <Box textAlign="center" sx={{mb: 6, color: 'white'}}>
                            <BusinessIcon sx={{fontSize: 80, mb: 3, opacity: 0.9}}/>
                            <Typography variant="h2" gutterBottom sx={{fontWeight: 'bold', mb: 2}}>
                                Org Chart Management
                            </Typography>
                            <Typography variant="h5" sx={{opacity: 0.9, mb: 4, maxWidth: 600, mx: 'auto'}}>
                                Sistema per la gestione delle gerarchie aziendali
                            </Typography>
                            <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap">
                                <Chip label="Progetto Aziendale"
                                      sx={{bgcolor: 'rgba(255,255,255,0.2)', color: 'white'}}/>
                                <Chip label="React + Spring Boot"
                                      sx={{bgcolor: 'rgba(255,255,255,0.2)', color: 'white'}}/>
                                <Chip label="In Sviluppo" sx={{
                                    bgcolor: 'rgba(250,2,2,0.8)',
                                    color: 'white',
                                    border: '1px solid white',
                                    borderColor: "black"
                                }}/>
                            </Stack>
                        </Box>

                        {/* Main Content */}
                        <Paper elevation={8} sx={{p: {xs: 4, md: 6}, borderRadius: 4, mb: 4}}>
                            <Typography variant="h4" gutterBottom color="primary" textAlign="center" sx={{mb: 4}}>
                                Il Progetto
                            </Typography>

                            <Typography variant="body1" paragraph
                                        sx={{fontSize: '1.2rem', lineHeight: 1.8, textAlign: 'center', mb: 4}}>
                                <strong>Org Chart Management</strong> è una piattaforma web innovativa sviluppata
                                durante il mio stage presso
                                <strong> Telematica Informatica</strong>, azienda di consulenza IT con sede a Torino.
                                Il progetto si prefigge di permettere alle aziende di visualizzare e gestire le proprie
                                strutture organizzative
                                in modo intuitivo e professionale, creando uno spazio dove poter caricare e visualizzare
                                in modo gratuito le gerarchie della propria
                                azienda e quella di altri. In modo da favorire la ricerca di una <strong>specifica
                                risorsa</strong> all'interno del team.
                            </Typography>

                            <Typography variant="body1" paragraph
                                        sx={{fontSize: '1.1rem', lineHeight: 1.7, textAlign: 'center', mb: 4}}>
                                Il progetto prevede funzionalità complete per la creazione di account aziendali,
                                la gestione dei dipendenti, l'assegnazione di ruoli e la definizione di gerarchie
                                complesse.
                                <strong> Attualmente il sistema è in fase di sviluppo</strong> e molte delle
                                funzionalità pianificate
                                sono in corso di implementazione per sviluppi futuri.
                            </Typography>

                            <Box sx={{
                                mt: 4,
                                p: 4,
                                bgcolor: 'primary.main',
                                color: 'white',
                                borderRadius: 3,
                                textAlign: 'center'
                            }}>
                                <Typography variant="h6" gutterBottom>
                                    🎯 Obiettivi del Progetto
                                </Typography>
                                <Typography variant="body1" sx={{lineHeight: 1.6}}>
                                    • Gestione multi-azienda con account separati<br/>
                                    • Creazione dinamica di organigrammi interattivi<br/>
                                    • Sistema di ruoli e permessi avanzato<br/>
                                    • Interfaccia responsive e moderna<br/>
                                    • Dashboard analytics per risorse umane
                                </Typography>
                            </Box>
                        </Paper>

                        {/* Tech Stack */}
                        <Paper elevation={8} sx={{p: {xs: 4, md: 6}, borderRadius: 4, mb: 4}}>
                            <Typography variant="h4" gutterBottom color="primary" textAlign="center" sx={{mb: 4}}>
                                Stack Tecnologico
                            </Typography>

                            <Grid container spacing={4} justifyContent="center">
                                {[
                                    {
                                        name: "Spring Boot",
                                        icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/spring/spring-original.svg",
                                        desc: "Backend API RESTful"
                                    },
                                    {
                                        name: "Hibernate",
                                        icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/hibernate/hibernate-plain.svg",
                                        desc: "ORM Framework"
                                    },
                                    {
                                        name: "MySQL",
                                        icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg",
                                        desc: "Database Relazionale"
                                    },
                                    {
                                        name: "React JS",
                                        icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg",
                                        desc: "Frontend UI Library"
                                    },
                                    {
                                        name: "Material UI",
                                        icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/materialui/materialui-original.svg",
                                        desc: "Design System"
                                    }
                                ].map((tech, index) => (
                                    <Grid item xs={6} sm={4} md={2.4} key={index}>
                                        <Box textAlign="center" sx={{
                                            p: 2,
                                            transition: 'transform 0.3s ease',
                                            '&:hover': {transform: 'translateY(-8px)'}
                                        }}>
                                            <Avatar
                                                alt={tech.name}
                                                src={tech.icon}
                                                sx={{width: 64, height: 64, mx: "auto", mb: 2}}
                                            />
                                            <Typography variant="body1" fontWeight="bold"
                                                        gutterBottom>{tech.name}</Typography>
                                            <Typography variant="body2" color="text.secondary">{tech.desc}</Typography>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </Paper>

                        {/* Developer Info */}
                        <Paper elevation={8} sx={{p: {xs: 4, md: 6}, borderRadius: 4, mb: 4}}>
                            <Typography variant="h4" gutterBottom color="primary" textAlign="center" sx={{mb: 4}}>
                                Lo Sviluppatore
                            </Typography>

                            <Box textAlign="center" sx={{mb: 4}}>
                                <DeveloperModeIcon sx={{fontSize: 60, color: 'primary.main', mb: 2}}/>
                                <Typography variant="h5" gutterBottom fontWeight="bold">
                                    Mattia Brizi
                                </Typography>
                                <Typography variant="h6" color="text.secondary" gutterBottom>
                                    Backend Developer
                                </Typography>
                            </Box>

                            <Stack spacing={3} alignItems="center" sx={{maxWidth: 500, mx: 'auto'}}>
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <SchoolIcon color="primary"/>
                                    <Typography variant="body1">
                                        Università di Camerino (UNICAM)
                                    </Typography>
                                </Stack>

                                <Stack direction="row" spacing={2} alignItems="center">
                                    <GitHubIcon color="primary"/>
                                    <Link href="https://github.com/Abrige" target="_blank" rel="noopener"
                                          underline="hover" variant="body1">
                                        @Abrige
                                    </Link>
                                </Stack>

                                <Stack direction="row" spacing={2} alignItems="center">
                                    <EmailIcon color="primary"/>
                                    <Link href="mailto:mattiabrizi94@gmail.com" underline="hover" variant="body1">
                                        mattiabrizi94@gmail.com
                                    </Link>
                                </Stack>
                            </Stack>
                        </Paper>

                        {/* Company Info */}
                        <Paper elevation={8} sx={{p: {xs: 4, md: 6}, borderRadius: 4}}>
                            <Typography variant="h4" gutterBottom color="primary" textAlign="center" sx={{mb: 4}}>
                                Telematica Informatica
                            </Typography>

                            <Box textAlign="center" sx={{mb: 4}}>
                                <BusinessIcon sx={{fontSize: 60, color: 'primary.main', mb: 2}}/>
                                <Typography variant="h6" gutterBottom>
                                    Azienda di Consulenza Informatica
                                </Typography>
                                <Typography variant="body1" color="text.secondary" sx={{maxWidth: 600, mx: 'auto'}}>
                                    Specializzata in soluzioni digitali e consulenza IT.
                                </Typography>
                            </Box>

                            <Stack spacing={3} alignItems="center" sx={{maxWidth: 500, mx: 'auto'}}>
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <LocationOnIcon color="primary"/>
                                    <Box textAlign="left">
                                        <Typography variant="body1" fontWeight="bold">Sede</Typography>
                                        <Typography variant="body1">
                                            Corso Galileo Ferraris 77, Torino
                                        </Typography>
                                    </Box>
                                </Stack>

                                <Stack direction="row" spacing={2} alignItems="center">
                                    <LanguageIcon color="primary"/>
                                    <Link href="https://www.telematicainformatica.it/" target="_blank"
                                          underline="hover" variant="body1">
                                        www.telematicainformatica.it
                                    </Link>
                                </Stack>
                            </Stack>
                        </Paper>

                        {/* Footer */}
                        <Box sx={{mt: 6, textAlign: 'center', py: 3}}>
                            <Typography variant="body2" sx={{color: 'white', opacity: 0.8}}>
                                © {new Date().getFullYear()} Org Chart Management – Proprietà di Telematica Informatica
                                S.r.l. e Mattia Brizi
                            </Typography>
                        </Box>
                    </Container>
                </Box>
            </>
        );
    }
    // ########## CONTACT PAGE ##########
    if (location.pathname === "/contact") {
        return (
            <>
                <Box sx={{
                    minHeight: '100vh',
                    background: '#1a1d29',
                    py: 6
                }}>
                    <Container maxWidth="md">
                        {/* Header */}
                        <Box textAlign="center" sx={{mb: 6, color: 'white'}}>
                            <SendIcon sx={{fontSize: 80, mb: 3, opacity: 0.9}}/>
                            <Typography variant="h2" gutterBottom sx={{fontWeight: 'bold'}}>
                                Contatti
                            </Typography>
                            <Typography variant="h5" sx={{opacity: 0.9, maxWidth: 600, mx: 'auto'}}>
                                Hai domande sul progetto Org Chart Management? Contattaci per informazioni!
                            </Typography>
                        </Box>

                        {/* Developer Contact */}
                        <Paper elevation={8} sx={{p: {xs: 4, md: 6}, borderRadius: 4, mb: 4}}>
                            <Typography variant="h4" gutterBottom color="primary" textAlign="center" sx={{mb: 4}}>
                                Sviluppatore
                            </Typography>

                            <Box textAlign="center" sx={{mb: 4}}>
                                <DeveloperModeIcon sx={{fontSize: 60, color: 'primary.main', mb: 2}}/>
                                <Typography variant="h5" gutterBottom fontWeight="bold">Mattia Brizi</Typography>
                                <Typography variant="body1" color="text.secondary" sx={{mb: 3}}>
                                    Backend Developer responsabile dello sviluppo di Org Chart Management
                                </Typography>
                            </Box>

                            <Stack spacing={3} sx={{maxWidth: 400, mx: 'auto'}}>
                                <Button
                                    variant="outlined"
                                    size="large"
                                    startIcon={<EmailIcon/>}
                                    href="mailto:mattiabrizi94@gmail.com"
                                    fullWidth
                                    sx={{
                                        py: 2,
                                        justifyContent: 'flex-start',
                                        '&:hover': {transform: 'translateY(-2px)'},
                                        transition: 'transform 0.2s ease'
                                    }}
                                >
                                    mattiabrizi94@gmail.com
                                </Button>

                                <Button
                                    variant="outlined"
                                    size="large"
                                    startIcon={<GitHubIcon/>}
                                    href="https://github.com/Abrige"
                                    target="_blank"
                                    fullWidth
                                    sx={{
                                        py: 2,
                                        justifyContent: 'flex-start',
                                        '&:hover': {transform: 'translateY(-2px)'},
                                        transition: 'transform 0.2s ease'
                                    }}
                                >
                                    GitHub: @Abrige
                                </Button>

                                <Button
                                    variant="outlined"
                                    size="large"
                                    startIcon={<LinkedInIcon/>}
                                    href="https://linkedin.com/in/mattia-brizi"
                                    target="_blank"
                                    fullWidth
                                    sx={{
                                        py: 2,
                                        justifyContent: 'flex-start',
                                        '&:hover': {transform: 'translateY(-2px)'},
                                        transition: 'transform 0.2s ease'
                                    }}
                                >
                                    LinkedIn Profile
                                </Button>
                            </Stack>
                        </Paper>

                        {/* Company Contact */}
                        <Paper elevation={8} sx={{p: {xs: 4, md: 6}, borderRadius: 4}}>
                            <Typography variant="h4" gutterBottom color="primary" textAlign="center" sx={{mb: 4}}>
                                Telematica Informatica
                            </Typography>

                            <Box textAlign="center" sx={{mb: 4}}>
                                <BusinessIcon sx={{fontSize: 60, color: 'primary.main', mb: 2}}/>
                                <Typography variant="h6" gutterBottom>Azienda Ospitante</Typography>
                                <Typography variant="body1" color="text.secondary" sx={{maxWidth: 500, mx: 'auto'}}>
                                    Consulenza informatica e soluzioni digitali.
                                </Typography>
                            </Box>

                            <Stack spacing={3} alignItems="center" sx={{maxWidth: 500, mx: 'auto'}}>
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <LocationOnIcon color="primary" sx={{fontSize: 32}}/>
                                    <Box textAlign="left">
                                        <Typography variant="body1" fontWeight="bold">Sede Legale</Typography>
                                        <Typography variant="body1">
                                            Corso Galileo Ferraris 77<br/>
                                            10128 Torino (TO), Italia
                                        </Typography>
                                    </Box>
                                </Stack>

                                <Stack direction="row" spacing={2} alignItems="center">
                                    <LanguageIcon color="primary" sx={{fontSize: 32}}/>
                                    <Box textAlign="left">
                                        <Typography variant="body1" fontWeight="bold">Sito Web</Typography>
                                        <Link href="https://www.telematicainformatica.it/" target="_blank"
                                              variant="body1">
                                            www.telematicainformatica.it
                                        </Link>
                                    </Box>
                                </Stack>
                            </Stack>
                        </Paper>

                        {/* Footer */}
                        <Box sx={{mt: 6, textAlign: 'center', py: 3}}>
                            <Typography variant="body2" sx={{color: 'white', opacity: 0.8}}>
                                © {new Date().getFullYear()} Org Chart Management – Sviluppato da Mattia Brizi per
                                Telematica Informatica
                            </Typography>
                        </Box>
                    </Container>
                </Box>
            </>
        );
    }

    if (location.pathname === "/cookie") {
        return (
            <>
                <Box sx={{
                    minHeight: '100vh',
                    background: '#1a1d29',
                    py: 6
                }}>
                    <Container maxWidth="md">
                        {/* Header */}
                        <Box textAlign="center" sx={{mb: 6, color: 'white'}}>
                            <CookieIcon sx={{fontSize: 80, mb: 3, opacity: 0.9}}/>
                            <Typography variant="h2" gutterBottom sx={{fontWeight: 'bold'}}>
                                Cookie Policy
                            </Typography>
                            <Typography variant="h5" sx={{opacity: 0.9, maxWidth: 600, mx: 'auto'}}>
                                Informazioni sui cookie per Org Chart Management
                            </Typography>
                        </Box>

                        {/* Cookie Info */}
                        <Paper elevation={8} sx={{p: {xs: 4, md: 6}, borderRadius: 4, mb: 4}}>
                            <Typography variant="h4" gutterBottom color="primary" textAlign="center" sx={{mb: 4}}>
                                Cosa sono i Cookie
                            </Typography>

                            <Typography variant="body1" paragraph
                                        sx={{fontSize: '1.1rem', lineHeight: 1.7, textAlign: 'center', mb: 4}}>
                                I cookie sono piccoli file di testo che vengono memorizzati sul tuo dispositivo quando
                                visiti un sito web.
                                Vengono utilizzati per migliorare l'esperienza dell'utente, fornire funzionalità
                                personalizzate
                                e garantire il corretto funzionamento delle applicazioni web.
                            </Typography>

                            <Box sx={{
                                p: 4,
                                bgcolor: 'info.light',
                                borderRadius: 3,
                                textAlign: 'center',
                                mb: 4
                            }}>
                                <InfoIcon sx={{fontSize: 48, color: 'info.main', mb: 2}}/>
                                <Typography variant="h6" gutterBottom color="info.main">
                                    Stato Attuale dei Cookie
                                </Typography>
                                <Typography variant="body1" sx={{lineHeight: 1.6}}>
                                    <strong>Org Chart Management</strong> attualmente non implementa cookie di alcun
                                    tipo.
                                    L'applicazione funziona senza memorizzare informazioni sui dispositivi degli utenti.
                                </Typography>
                            </Box>

                            <Typography variant="body1" paragraph
                                        sx={{fontSize: '1.1rem', lineHeight: 1.7, textAlign: 'center'}}>
                                In caso di futuri sviluppi della piattaforma, eventuali cookie verranno implementati
                                esclusivamente per migliorare l'esperienza utente e garantire funzionalità essenziali
                                come l'autenticazione e le preferenze personalizzate.
                            </Typography>
                        </Paper>

                        {/* Future Implementation */}
                        <Paper elevation={8} sx={{p: {xs: 4, md: 6}, borderRadius: 4, mb: 4}}>
                            <Typography variant="h4" gutterBottom color="primary" textAlign="center" sx={{mb: 4}}>
                                Sviluppi Futuri
                            </Typography>

                            <Typography variant="body1" paragraph
                                        sx={{fontSize: '1.1rem', lineHeight: 1.7, textAlign: 'center', mb: 4}}>
                                Nel caso in cui dovessimo implementare cookie in versioni future dell'applicazione,
                                verranno utilizzati esclusivamente per:
                            </Typography>

                            <Box sx={{
                                p: 4,
                                bgcolor: 'success.light',
                                borderRadius: 3,
                                textAlign: 'center'
                            }}>
                                <SecurityIcon sx={{fontSize: 48, color: 'success.main', mb: 2}}/>
                                <Typography variant="body1" sx={{lineHeight: 1.8}}>
                                    • <strong>Cookie di sessione:</strong> Per mantenere l'utente autenticato<br/>
                                    • <strong>Cookie funzionali:</strong> Per salvare preferenze dell'interfaccia<br/>
                                    • <strong>Cookie di sicurezza:</strong> Per proteggere da attacchi informatici
                                </Typography>
                            </Box>
                        </Paper>

                        {/* Contact Info */}
                        <Paper elevation={8} sx={{p: {xs: 4, md: 6}, borderRadius: 4}}>
                            <Typography variant="h4" gutterBottom color="primary" textAlign="center" sx={{mb: 4}}>
                                Hai Domande?
                            </Typography>

                            <Typography variant="body1" paragraph sx={{textAlign: 'center', mb: 4}}>
                                Per qualsiasi domanda riguardo alla privacy o ai futuri sviluppi della piattaforma,
                                non esitare a contattarci.
                            </Typography>

                            <Box textAlign="center">
                                <Button
                                    variant="contained"
                                    size="large"
                                    startIcon={<SendIcon/>}
                                    href="/contact"
                                    sx={{
                                        py: 2,
                                        px: 4,
                                        '&:hover': {transform: 'translateY(-2px)'},
                                        transition: 'transform 0.2s ease'
                                    }}
                                >
                                    Vai ai Contatti
                                </Button>
                            </Box>

                            <Box sx={{mt: 4, textAlign: 'center', p: 3, bgcolor: 'grey.50', borderRadius: 2}}>
                                <Typography variant="body2" color="text.secondary">
                                    <strong>Ultimo aggiornamento:</strong> {new Date().toLocaleDateString('it-IT')}<br/>
                                    Questa policy verrà aggiornata in caso di implementazione di cookie.
                                </Typography>
                            </Box>
                        </Paper>

                        {/* Footer */}
                        <Box sx={{mt: 6, textAlign: 'center', py: 3}}>
                            <Typography variant="body2" sx={{color: 'white', opacity: 0.8}}>
                                © {new Date().getFullYear()} Org Chart Management – Sviluppato da Mattia Brizi per
                                Telematica Informatica
                            </Typography>
                        </Box>
                    </Container>
                </Box>
            </>
        );
    }
}

export default About;