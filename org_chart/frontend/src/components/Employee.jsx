import React, {useEffect, useState} from 'react';
import {
    Box,
    Typography,
    Button,
    Avatar,
    Paper,
} from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import {
    ArrowBack as ArrowBackIcon,
    Person as PersonIcon,
} from '@mui/icons-material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import CakeIcon from '@mui/icons-material/Cake';
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PublicIcon from '@mui/icons-material/Public';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {setEditingEmployeeId} from "../redux/slices/employeeSlice.js";
import BASE_API_URL from "../config/config.js";

const EmployeeDetailPage = () => {
    // Dati di esempio per l'impiegato

    const employeeId = useSelector((state) => state.employee.currentEmployeeSelected);
    const [employee, setEmployee] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // REDUX STATE
    const role = useSelector(state => state.auth.role);

    useEffect(() => {
        if (employeeId) {
            fetch(`${BASE_API_URL}/home/employee/${employeeId}`)
                .then(res => res.json())
                .then(data => setEmployee(data))
                .catch(err => console.error('Errore fetch impiegato:', err));
        }
    }, [employeeId]);

    if (!employee) {
        return <Typography>Caricamento dati dipendente...</Typography>;
    }

    let formattedDate = 'Data non disponibile';
    if (employee.birthdate) {
        const birthdate = new Date(employee.birthdate);
        if (!isNaN(birthdate.getTime())) {
            formattedDate = birthdate.toLocaleDateString('it-IT', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            });
        }
    }

    const handleGoBack = () => {
        navigate("/company") // come "indietro" del browser
    };

    const handleModifyEmployee = (event) => {
        event.stopPropagation();
        dispatch(setEditingEmployeeId(employee.id));
        navigate("/modifyemployee");
    }

    const handleEmployeeDelete = async (employee) => {
        try {
            const response = await fetch(`${BASE_API_URL}/home/employee/${employee.id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert("Eliminazione riuscita");
                navigate("/company");

            } else {
                throw new Error(`Errore: ${response.status}`);
            }
        } catch (error) {
            console.error('Errore durante l\'eliminazione:', error);
            alert('Errore durante l\'eliminazione del dipendente.');
        }
    };

    return (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', py: 3, mb: 6 }}>
            <Box sx={{ width: '100%', maxWidth: 1000, px: 2 }}>
                {/* Pulsante Indietro */}
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={handleGoBack}
                    sx={{
                        mb: 3,
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 500
                    }}
                    variant="outlined"
                >
                    Torna a {employee.company.name}
                </Button>

                {/* Header compatto con foto e info principali */}
                <Paper sx={{
                    p: 3,
                    mb: 3,
                    borderRadius: 2,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    border: '1px solid',
                    borderColor: 'grey.200'
                }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 3,
                        flexDirection: { xs: 'column', sm: 'row' }
                    }}>
                        {/* Avatar e azioni */}
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                            <Avatar
                                src={employee.photo}
                                sx={{
                                    width: 80,
                                    height: 80,
                                    bgcolor: 'grey.300',
                                    border: '3px solid',
                                    borderColor: 'grey.100'
                                }}
                            >
                                {!employee.photo && <PersonIcon sx={{ fontSize: 40 }} />}
                            </Avatar>

                            {/* Azioni sotto l'avatar */}
                            {role === 3 &&
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <IconButton
                                        size="small"
                                        sx={{
                                            backgroundColor: 'primary.main',
                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor: 'primary.dark',
                                            },
                                            borderRadius: 1.5
                                        }}
                                        onClick={(event) => handleModifyEmployee(event)}
                                        aria-label={`modifica ${employee.first_name} ${employee.last_name}`}
                                    >
                                        <EditIcon fontSize="small" />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        sx={{
                                            backgroundColor: 'error.main',
                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor: 'error.dark',
                                            },
                                            borderRadius: 1.5
                                        }}
                                        onClick={() => handleEmployeeDelete(employee)}
                                        aria-label={`elimina ${employee.first_name} ${employee.last_name}`}
                                    >
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </Box>}
                        </Box>

                        {/* Info principale */}
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography variant="h4" component="h1" sx={{
                                fontWeight: 600,
                                color: 'text.primary',
                                mb: 2,
                                wordBreak: 'break-word'
                            }}>
                                {employee.first_name} {employee.last_name}
                            </Typography>

                            {/* Grid delle informazioni */}
                            <Box sx={{
                                display: 'grid',
                                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                                gap: 2
                            }}>
                                {/* Sesso */}
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    p: 1.5,
                                    backgroundColor: 'grey.25',
                                    borderRadius: 1.5,
                                    border: '1px solid',
                                    borderColor: 'grey.100'
                                }}>
                                    {employee.sex === "M" ? (
                                        <>
                                            <MaleIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                Maschio
                                            </Typography>
                                        </>
                                    ) : employee.sex === "F" ? (
                                        <>
                                            <FemaleIcon sx={{ color: 'secondary.main', fontSize: 20 }} />
                                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                Femmina
                                            </Typography>
                                        </>
                                    ) : (
                                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                            Non specificato
                                        </Typography>
                                    )}
                                </Box>

                                {/* Data di nascita */}
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    p: 1.5,
                                    backgroundColor: 'grey.25',
                                    borderRadius: 1.5,
                                    border: '1px solid',
                                    borderColor: 'grey.100'
                                }}>
                                    <CakeIcon sx={{ color: 'warning.main', fontSize: 20 }} />
                                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                        {formattedDate}
                                    </Typography>
                                </Box>

                                {/* Città */}
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    p: 1.5,
                                    backgroundColor: 'grey.25',
                                    borderRadius: 1.5,
                                    border: '1px solid',
                                    borderColor: 'grey.100'
                                }}>
                                    <LocationOnIcon sx={{ color: 'info.main', fontSize: 20 }} />
                                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                        {employee.city?.name || 'Città non disponibile'}
                                    </Typography>
                                </Box>

                                {/* Paese */}
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    p: 1.5,
                                    backgroundColor: 'grey.25',
                                    borderRadius: 1.5,
                                    border: '1px solid',
                                    borderColor: 'grey.100'
                                }}>
                                    <PublicIcon sx={{ color: 'success.main', fontSize: 20 }} />
                                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                        {employee.city?.country?.name || 'Paese non disponibile'}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Paper>

                {/* Sezione azienda */}
                <Paper sx={{
                    p: 2.5,
                    borderRadius: 2,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    border: '1px solid',
                    borderColor: 'grey.200',
                    backgroundColor: 'primary.25'
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <BusinessIcon sx={{ color: 'primary.main', fontSize: 24 }} />
                        <Box>
                            <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
                                AZIENDA
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                                {employee.company.name}
                            </Typography>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </Box>
    );
};

export default EmployeeDetailPage;
