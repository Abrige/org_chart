import * as React from 'react';
import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import {visuallyHidden} from '@mui/utils';
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {setCurrentCompanySelected, setEditingCompany} from '../redux/slices/companySlice.js';
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BASE_API_URL from "../config/config.js";

// Supporta "city.name", "city.country.name", ecc.
function getValueByPath(obj, path) {
    return path.split('.').reduce((acc, part) => acc?.[part], obj);
}

function descendingComparator(a, b, orderBy) {
    const aValue = getValueByPath(a, orderBy);
    const bValue = getValueByPath(b, orderBy);

    if (bValue < aValue) return -1;
    if (bValue > aValue) return 1;
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
    {
        id: 'id',
        numeric: true,
        disablePadding: true,
        label: 'ID',
    },
    {
        id: 'name',
        numeric: false,
        disablePadding: false,
        label: 'Name',
    },
    {
        id: 'fiscalCode',
        numeric: false,
        disablePadding: false,
        label: 'Fiscal Code',
    },
    {
        id: 'city.name',
        numeric: true,
        disablePadding: false,
        label: 'City',
    },
    {
        id: 'city.country.name',
        numeric: true,
        disablePadding: false,
        label: 'Country',
    },
    {
        id: 'numOfEmployees',
        numeric: true,
        disablePadding: false,
        label: 'Employees',
    }
];

function EnhancedTableHead(props) {
    const {order, orderBy, onRequestSort} = props;

    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    const role = useSelector(state => state.auth.role);

    return (
        <TableHead>
            <TableRow sx={{backgroundColor: 'grey.100'}}>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                        sx={{
                            fontWeight: 600,
                            color: 'text.secondary',
                            py: 2.5,
                            fontSize: '0.875rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                        }}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
                {role === 3 && (
                    <TableCell
                        align="right"
                        sx={{
                            fontWeight: 600,
                            color: 'text.secondary',
                            py: 2.5,
                            fontSize: '0.875rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                        }}
                    >
                        Action
                    </TableCell>
                )}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
};

export default function Companies() {
    // Stati per la tabella
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Stati per i dati
    const [companies, setCompanies] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [responseData, setResponseData] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const role = useSelector(state => state.auth.role);


    // Funzione per formattare i dati (definita fuori dal useEffect)
    const formatData = () => {
        if (responseData) {
            setCompanies(responseData.content);
            setPage(responseData.pageable.pageNumber);
        }
    };

    useEffect(formatData, [responseData])

    const refreshTable = () => {
        setIsLoading(true);
        setError(null);

        fetch(`${BASE_API_URL}/home/companies`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                page: page,
                pageSize: rowsPerPage
            })
        })
            .then(async response => {
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`HTTP error! ${response.status} - ${errorText}`);
                }
                return response.json();
            })
            .then(data => {
                setResponseData(data);
            })
            .catch(error => {
                console.error('Errore fetch:', error);
                setError(error.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    const handleCompanyDelete = async (event, company) => {
        event.stopPropagation();
        try {
            const response = await fetch(`${BASE_API_URL}/home/company/${company.id}`, {
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
            alert('Errore durante l\'eliminazione dell\'azienda.');
        }
    }

    // Fetch dei dati dal server
    useEffect(refreshTable, [page, rowsPerPage]);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
        setPage(0); // Reset alla prima pagina quando si ordina
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    if (error) {
        return (
            <Box sx={{p: 2, color: 'error.main'}}>
                Errore nel caricamento: {error}
            </Box>
        );
    }

    const handleCompanyRedirect = (company) => {
        dispatch(setCurrentCompanySelected(company)); // puoi anche passare l'intero oggetto company
        navigate(`/company`); // se usi react-router-dom
    }

    const handleModifyCompany = (event, company) => {
        event.stopPropagation();
        dispatch(setEditingCompany(company));
        navigate("/modifycompany");
    }

    return (
        <Box sx={{width: '100%', display: 'flex', justifyContent: 'center', py: 3, mb: 4}}>
            <Box
                sx={{
                    width: '100%',
                    maxWidth: 1200,
                    px: 2,
                }}
            >
                <Typography variant="h4" gutterBottom sx={{
                    fontWeight: 600,
                    color: 'text.primary',
                    mb: 3
                }}>
                    Companies
                </Typography>

                <Paper sx={{
                    width: '100%',
                    mb: 2,
                    overflowX: 'auto',
                    borderRadius: 2,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    border: '1px solid',
                    borderColor: 'grey.200'
                }}>
                    <TableContainer>
                        <Table
                            sx={{minWidth: 750}}
                            aria-labelledby="tableTitle"
                        >
                            <EnhancedTableHead
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                                rowCount={companies.length}
                                sx={{
                                    '& .MuiTableCell-head': {
                                        backgroundColor: 'grey.100',
                                        fontWeight: 600,
                                        color: 'text.secondary',
                                        py: 2.5,
                                        fontSize: '0.875rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px'
                                    }
                                }}
                            />
                            <TableBody>
                                {isLoading ? (
                                    <TableRow>
                                        <TableCell colSpan={7} align="center" sx={{
                                            py: 4,
                                            color: 'text.secondary',
                                            fontStyle: 'italic'
                                        }}>
                                            Caricamento...
                                        </TableCell>
                                    </TableRow>
                                ) : companies.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} align="center" sx={{
                                            py: 4,
                                            color: 'text.secondary',
                                            fontStyle: 'italic'
                                        }}>
                                            Nessun dato disponibile
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    companies
                                        .slice()
                                        .sort(getComparator(order, orderBy))
                                        .map((company, index) => (
                                            <TableRow
                                                hover
                                                onClick={() => handleCompanyRedirect(company)}
                                                tabIndex={-1}
                                                key={`${company.id}-${company.fiscalCode}`}
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
                                                <TableCell align="right" sx={{
                                                    py: 2,
                                                    color: 'text.secondary',
                                                    fontSize: '0.875rem'
                                                }}>
                                                    {company.id}
                                                </TableCell>
                                                <TableCell component="th" scope="row" sx={{
                                                    py: 2,
                                                    fontWeight: 500,
                                                    color: 'text.primary'
                                                }}>
                                                    {company.name}
                                                </TableCell>
                                                <TableCell align="right" sx={{
                                                    py: 2,
                                                    color: 'text.secondary',
                                                    fontFamily: 'monospace',
                                                    fontSize: '0.875rem'
                                                }}>
                                                    {company.fiscalCode}
                                                </TableCell>
                                                <TableCell align="right" sx={{
                                                    py: 2,
                                                    color: 'text.secondary'
                                                }}>
                                                    {company.city?.name || 'N/A'}
                                                </TableCell>
                                                <TableCell align="right" sx={{
                                                    py: 2,
                                                    color: 'text.secondary'
                                                }}>
                                                    {company.city?.country?.name || 'N/A'}
                                                </TableCell>
                                                <TableCell align="right" sx={{
                                                    py: 2,
                                                    color: 'text.secondary',
                                                    fontWeight: 500
                                                }}>
                                                    {company.numOfEmployees}
                                                </TableCell>
                                                {role === 3 && (
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
                                                                onClick={(event) => handleModifyCompany(event, company)}
                                                                aria-label="modifica azienda"
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
                                                                onClick={(event) => handleCompanyDelete(event, company)}
                                                                aria-label="elimina azienda"
                                                            >
                                                                <DeleteIcon fontSize="small"/>
                                                            </IconButton>
                                                        </Box>
                                                    </TableCell>
                                                )}
                                            </TableRow>
                                        ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={-1}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        sx={{
                            borderTop: '1px solid',
                            borderColor: 'grey.200',
                            backgroundColor: 'grey.25',
                            '& .MuiTablePagination-toolbar': {
                                paddingLeft: 2,
                                paddingRight: 2,
                            }
                        }}
                    />
                </Paper>
            </Box>
        </Box>

    );
}
