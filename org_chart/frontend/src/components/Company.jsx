import {useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import * as React from "react";
import EditIcon from '@mui/icons-material/Edit';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import Box from "@mui/material/Box";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentEmployeeSelected, setEditingEmployeeId} from '../redux/slices/employeeSlice.js';
import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import {
    ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import {setEditingCompany} from "../redux/slices/companySlice.js";
import BASE_API_URL from "../config/config.js";

function Company() {
    // STATE
    const [employees, setEmployees] = useState([]);
    // REDUX
    const selectedCompany = useSelector((state) => state.company.currentCompanySelected);
    const role = useSelector(state => state.auth.role);
    // NAVIGATE
    const navigate = useNavigate();
    // DISPATCH
    const dispatch = useDispatch();

    const refreshTable = () => {
        if (selectedCompany) {
            fetch(`${BASE_API_URL}/home/companies/${selectedCompany.id}/employees`)
                .then(res => res.json()) // 👈 converte in oggetto JS
                .then(data => {
                    setEmployees(data);
                })
                .catch(err => console.error('Errore nella fetch:', err));
        }
    }

    useEffect(refreshTable, [selectedCompany]);

    const handleEmployeeRedirect = (employee) => {
        dispatch(setCurrentEmployeeSelected(employee.id));
        navigate('/employee');
    };

    const handleGoBack = () => {
        navigate("/home")
    }

    const handleModifyCompany = (company) => {
        dispatch(setEditingCompany(company));
        navigate("/modifycompany");
    };
    const handleModifyEmployee = (event, employee) => {
        event.stopPropagation();
        dispatch(setEditingEmployeeId(employee.id));
        navigate("/modifyemployee");
    };

    const handleCompanyDelete = async (event, company) => {
        try {
            const response = await fetch(`${BASE_API_URL}/home/company/${company.id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert("Eliminazione riuscita");
                navigate("/home");
            } else {
                throw new Error(`Errore: ${response.status}`);
            }
        } catch (error) {
            console.error('Errore durante l\'eliminazione:', error);
            alert('Errore durante l\'eliminazione dell\'azienda.');
        }
    }

    const handleEmployeeDelete = async (event, employee) => {
        event?.stopPropagation();
        try {
            const response = await fetch(`${BASE_API_URL}/home/employee/${employee.id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert("Eliminazione riuscita");
                refreshTable();

            } else {
                throw new Error(`Errore: ${response.status}`);
            }
        } catch (error) {
            console.error('Errore durante l\'eliminazione:', error);
            alert('Errore durante l\'eliminazione del dipendente.');
        }
    };

    return (
        <Box sx={{width: '100%', display: 'flex', justifyContent: 'center', py: 3, mb: 6}}>
            <Box
                sx={{
                    width: '100%',
                    maxWidth: 1200,
                    px: 2,
                }}
            >
                <Button
                    startIcon={<ArrowBackIcon/>}
                    onClick={handleGoBack}
                    sx={{
                        mb: 3,
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 500
                    }}
                    variant="outlined"
                >
                    Torna a tutte le aziende
                </Button>

                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    mb: 3,
                    p: 2,
                    backgroundColor: 'grey.50',
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'grey.200'
                }}>
                    <Typography variant="h5" sx={{fontWeight: 600, color: 'text.primary'}}>
                        {selectedCompany.name}
                    </Typography>
                    {role === 3 &&
                        <Box sx={{display: 'flex', gap: 1, ml: 'auto'}}>
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
                                onClick={() => handleModifyCompany(selectedCompany)}
                                aria-label="modifica azienda"
                            >
                                <EditIcon fontSize="small"/>
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
                                onClick={() => handleCompanyDelete(null, selectedCompany)}
                                aria-label="elimina azienda"
                            >
                                <DeleteIcon fontSize="small"/>
                            </IconButton>
                        </Box>
                    }
                </Box>
                {employees && employees.length > 0 ? (
                    <TableContainer
                        component={Paper}
                        sx={{
                            borderRadius: 2,
                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                            border: '1px solid',
                            borderColor: 'grey.200',
                            overflow: 'hidden'
                        }}
                    >
                        <Table sx={{minWidth: 650}} aria-label="tabella dipendenti">
                            <TableHead>
                                <TableRow sx={{backgroundColor: 'grey.100'}}>
                                    <TableCell sx={{
                                        fontWeight: 600,
                                        color: 'text.secondary',
                                        py: 2.5,
                                        fontSize: '0.875rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px'
                                    }}>
                                        Nome
                                    </TableCell>
                                    <TableCell align="right" sx={{
                                        fontWeight: 600,
                                        color: 'text.secondary',
                                        py: 2.5,
                                        fontSize: '0.875rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px'
                                    }}>
                                        Cognome
                                    </TableCell>
                                    <TableCell align="right" sx={{
                                        fontWeight: 600,
                                        color: 'text.secondary',
                                        py: 2.5,
                                        fontSize: '0.875rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px'
                                    }}>
                                        Sesso
                                    </TableCell>
                                    {role === 3 &&
                                        <TableCell align="right" sx={{
                                            fontWeight: 600,
                                            color: 'text.secondary',
                                            py: 2.5,
                                            fontSize: '0.875rem',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.5px'
                                        }}>
                                            Azioni
                                        </TableCell>
                                    }
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {employees.map((employee, index) => (
                                    <TableRow
                                        hover
                                        onClick={() => handleEmployeeRedirect(employee)}
                                        tabIndex={-1}
                                        key={`${employee.id}`}
                                        sx={{
                                            cursor: 'pointer',
                                            '&:hover': {
                                                backgroundColor: 'primary.50',
                                            },
                                            '&:last-child td': {
                                                borderBottom: 0
                                            },
                                            backgroundColor: index % 2 === 0 ? 'white' : 'grey.25',
                                            transition: 'background-color 0.2s ease'
                                        }}
                                    >
                                        <TableCell sx={{
                                            py: 2,
                                            fontWeight: 500,
                                            color: 'text.primary'
                                        }}>
                                            {employee.first_name}
                                        </TableCell>
                                        <TableCell align="right" sx={{
                                            py: 2,
                                            fontWeight: 500,
                                            color: 'text.primary'
                                        }}>
                                            {employee.last_name}
                                        </TableCell>
                                        <TableCell align="right" sx={{
                                            py: 2,
                                            color: 'text.secondary'
                                        }}>
                                            {employee.sex ? employee.sex : "N/A"}
                                        </TableCell>
                                        {role === 3 &&
                                            <TableCell align="right" sx={{py: 2}}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    gap: 0.5,
                                                    justifyContent: 'flex-end',
                                                    opacity: 0.7,
                                                    '&:hover': {
                                                        opacity: 1
                                                    },
                                                    transition: 'opacity 0.2s ease'
                                                }}>
                                                    <IconButton
                                                        size="small"
                                                        sx={{
                                                            color: 'primary.main',
                                                            '&:hover': {
                                                                backgroundColor: 'primary.50',
                                                            },
                                                            borderRadius: 1
                                                        }}
                                                        onClick={(event) => handleModifyEmployee(event, employee)}
                                                        aria-label={`modifica ${employee.first_name} ${employee.last_name}`}
                                                    >
                                                        <EditIcon fontSize="small"/>
                                                    </IconButton>
                                                    <IconButton
                                                        size="small"
                                                        sx={{
                                                            color: 'error.main',
                                                            '&:hover': {
                                                                backgroundColor: 'error.50',
                                                            },
                                                            borderRadius: 1
                                                        }}
                                                        onClick={(event) => handleEmployeeDelete(event, employee)}
                                                        aria-label={`elimina ${employee.first_name} ${employee.last_name}`}
                                                    >
                                                        <DeleteIcon fontSize="small"/>
                                                    </IconButton>
                                                </Box>
                                            </TableCell>
                                        }
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    // Messaggio quando non ci sono dipendenti
                    <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    py: 8,
                    px: 4,
                    textAlign: 'center'
                }}>
                <Typography variant="h6" sx={{
                    color: 'text.secondary',
                    mb: 1,
                    fontWeight: 500
                }}>
                    Nessun dipendente trovato
                </Typography>
                <Typography variant="body2" sx={{
                    color: 'text.secondary',
                    opacity: 0.7
                }}>
                    Non ci sono dipendenti per questa azienda
                </Typography>
            </Box>)}
        </Box>
</Box>
)
    ;
}

export default Company;
