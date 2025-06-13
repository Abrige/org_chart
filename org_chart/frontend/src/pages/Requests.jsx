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
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import BASE_API_URL from "../config/config.js";
import {useSelector} from "react-redux";

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

// Funzioni helper per formattare i dati
const getRequestTypeLabel = (type) => {
    switch (type?.toUpperCase()) {
        case 'UPDATE': return 'Update';
        case 'CREATE': return 'Create';
        case 'DELETE': return 'Delete';
        default: return type;
    }
};

const getRequestTypeColor = (type) => {
    switch (type?.toUpperCase()) {
        case 'UPDATE': return 'warning';
        case 'CREATE': return 'success';
        case 'DELETE': return 'error';
        default: return 'default';
    }
};

const getEntityTypeLabel = (type) => {
    return type?.toUpperCase() === 'COMPANIES' ? 'Company' : 'Employee';
};

// Funzione per gestire gli stati delle richieste
const getRequestStatusLabel = (status) => {
    switch (status) {
        case 'FALSE':
            return 'Rejected';
        case 'TRUE':
            return 'Approved';
        case 'TO_REVIEW':
            return 'Pending Review';
        default:
            return 'Unknown';
    }
};

const getRequestStatusColor = (status) => {
    switch (status) {
        case 'FALSE':
            return 'error';
        case 'TRUE':
            return 'success';
        case 'TO_REVIEW':
            return 'warning';
        default:
            return 'default';
    }
};

const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString('it-IT', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

const headCells = [
    {
        id: 'id',
        numeric: true,
        disablePadding: true,
        label: 'ID',
    },
    {
        id: 'requestType',
        numeric: false,
        disablePadding: false,
        label: 'Type',
    },
    {
        id: 'entityType',
        numeric: false,
        disablePadding: false,
        label: 'Entity',
    },
    {
        id: 'companyName',
        numeric: false,
        disablePadding: false,
        label: 'Company',
    },
    {
        id: 'companyId',
        numeric: true,
        disablePadding: false,
        label: 'Company ID',
    },
    {
        id: 'operationBy',
        numeric: false,
        disablePadding: false,
        label: 'Requested By',
    },
    {
        id: 'operationDate',
        numeric: false,
        disablePadding: false,
        label: 'Date',
    },
    {
        id: 'isRequestApproved',
        numeric: false,
        disablePadding: false,
        label: 'Status',
    },
    {
        id: 'action',
        numeric: false,
        disablePadding: false,
        label: 'Actions',
    },
];


function EnhancedTableHead(props) {
    const {order, orderBy, onRequestSort} = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

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
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
};

export default function Requests() {
    // Stati per la tabella
    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('operation_date');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [tabValue, setTabValue] = useState(0); // 0 = pending, 1 = all

    // Stati per i dati
    const [requests, setRequests] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [responseData, setResponseData] = useState(null);

    // Stati per filtri e ricerca
    const [searchTerm, setSearchTerm] = useState('');
    const [filterAnchorEl, setFilterAnchorEl] = useState(null);
    const [typeFilter, setTypeFilter] = useState('all');
    const [entityFilter, setEntityFilter] = useState('all');

    // Stati per la conferma dell'azione
    const [confirmDialog, setConfirmDialog] = useState({
        open: false,
        requestId: null,
        action: null,
        requestDetails: ''
    });

    const accountToken = useSelector(state => state.auth.token);

    // Funzione per formattare i dati
    const formatData = () => {
        if (responseData) {
            // I dati sono già un array, non hanno una struttura con content/pageable
            setRequests(Array.isArray(responseData) ? responseData : []);
        }
    };

    useEffect(formatData, [responseData]);

    const refreshTable = () => {
        setIsLoading(true);
        setError(null);

        fetch(`${BASE_API_URL}/admin/requests`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accountToken}`
            }
        })
            .then(async response => {
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`HTTP error! ${response.status} - ${errorText}`);
                }
                return response.json();
            })
            .then(data => {
                // Filtra i dati in base al tab selezionato
                if (tabValue === 0) {
                    // Solo richieste pending (isRequestApproved === "TO_REVIEW")
                    const pendingRequests = data.filter(request => request.isRequestApproved === "TO_REVIEW");
                    setResponseData(pendingRequests);
                } else {
                    // Tutte le richieste
                    setResponseData(data);
                }
            })
            .catch(error => {
                console.error('Errore fetch:', error);
                setError(error.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    // Fetch dei dati dal server
    useEffect(refreshTable, [tabValue]);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
        setPage(0);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
        setPage(0);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleFilterClick = (event) => {
        setFilterAnchorEl(event.currentTarget);
    };

    const handleFilterClose = () => {
        setFilterAnchorEl(null);
    };

    const handleApprovalAction = (requestId, action, companyName) => {
        setConfirmDialog({
            open: true,
            requestId,
            action,
            requestDetails: `Request for ${companyName}`
        });
    };

    // Funzione aggiornata per gestire l'approvazione/rifiuto delle richieste
    const handleConfirmAction = async () => {
        const {requestId, action} = confirmDialog;

        try {
            const response = await fetch(`http://localhost:8100/admin/request`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accountToken}`
                },
                body: JSON.stringify({
                    id: requestId,
                    action: action
                })
            });

            if (response.ok) {
                alert(`Richiesta ${action === 'approve' ? 'approvata' : 'rifiutata'} con successo`);
                refreshTable();
            } else {
                throw new Error(`Errore: ${response.status}`);
            }
        } catch (error) {
            console.error('Errore durante l\'operazione:', error);
            alert('Errore durante l\'operazione.');
        } finally {
            setConfirmDialog({open: false, requestId: null, action: null, requestDetails: ''});
        }
    };

    const handleCancelAction = () => {
        setConfirmDialog({open: false, requestId: null, action: null, requestDetails: ''});
    };

    // Filtro le richieste in base alla ricerca e ai filtri
    const filteredRequests = requests.filter(request => {
        const matchesSearch = request.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            request.operationBy?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesType = typeFilter === 'all' || request.requestType?.toUpperCase() === typeFilter.toUpperCase();
        const matchesEntity = entityFilter === 'all' ||
            (entityFilter === 'company' && request.entityType?.toUpperCase() === 'COMPANIES') ||
            (entityFilter === 'employee' && request.entityType?.toUpperCase() === 'EMPLOYEES');

        return matchesSearch && matchesType && matchesEntity;
    });

    if (error) {
        return (
            <Box sx={{p: 2, color: 'error.main'}}>
                Errore nel caricamento: {error}
            </Box>
        );
    }

    return (
        <Box sx={{width: '100%', display: 'flex', justifyContent: 'center', py: 3, mb: 4}}>
            <Box
                sx={{
                    width: '100%',
                    maxWidth: 1400,
                    px: 2,
                }}
            >
                <Typography variant="h4" gutterBottom sx={{
                    fontWeight: 600,
                    color: 'text.primary',
                    mb: 3
                }}>
                    Request Management
                </Typography>

                {/* Tabs per pending/all requests */}
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}
                >
                    <Tab label="Pending Requests" />
                    <Tab label="All Requests" />
                </Tabs>

                {/* Barra di ricerca e filtri */}
                <Box sx={{
                    display: 'flex',
                    gap: 2,
                    mb: 3,
                    flexWrap: 'wrap',
                    alignItems: 'center'
                }}>
                    <TextField
                        placeholder="Search requests..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        size="small"
                        sx={{ minWidth: 300, flexGrow: 1 }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button
                        variant="outlined"
                        startIcon={<FilterListIcon />}
                        onClick={handleFilterClick}
                        size="small"
                    >
                        Filters
                    </Button>

                    <Menu
                        anchorEl={filterAnchorEl}
                        open={Boolean(filterAnchorEl)}
                        onClose={handleFilterClose}
                    >
                        <MenuItem onClick={() => setTypeFilter('all')}>All Types</MenuItem>
                        <MenuItem onClick={() => setTypeFilter('CREATE')}>Create</MenuItem>
                        <MenuItem onClick={() => setTypeFilter('UPDATE')}>Update</MenuItem>
                        <MenuItem onClick={() => setTypeFilter('DELETE')}>Delete</MenuItem>
                        <MenuItem divider />
                        <MenuItem onClick={() => setEntityFilter('all')}>All Entities</MenuItem>
                        <MenuItem onClick={() => setEntityFilter('company')}>Company</MenuItem>
                        <MenuItem onClick={() => setEntityFilter('employee')}>Employee</MenuItem>
                    </Menu>
                </Box>

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
                            sx={{minWidth: 1000}}
                            aria-labelledby="tableTitle"
                        >
                            <EnhancedTableHead
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                                rowCount={filteredRequests.length}
                            />
                            <TableBody>
                                {isLoading ? (
                                    <TableRow>
                                        <TableCell colSpan={9} align="center" sx={{
                                            py: 4,
                                            color: 'text.secondary',
                                            fontStyle: 'italic'
                                        }}>
                                            Caricamento...
                                        </TableCell>
                                    </TableRow>
                                ) : filteredRequests.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={9} align="center" sx={{
                                            py: 4,
                                            color: 'text.secondary',
                                            fontStyle: 'italic'
                                        }}>
                                            Nessuna richiesta trovata
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredRequests
                                        .slice()
                                        .sort(getComparator(order, orderBy))
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((request, index) => (
                                            <TableRow
                                                hover
                                                tabIndex={-1}
                                                key={request.id || index}
                                                sx={{
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
                                                    {request.id}
                                                </TableCell>
                                                <TableCell sx={{ py: 2 }}>
                                                    <Chip
                                                        label={getRequestTypeLabel(request.requestType)}
                                                        color={getRequestTypeColor(request.requestType)}
                                                        size="small"
                                                        variant="outlined"
                                                    />
                                                </TableCell>
                                                <TableCell sx={{ py: 2 }}>
                                                    <Chip
                                                        label={getEntityTypeLabel(request.entityType)}
                                                        color={request.entityType?.toUpperCase() === 'COMPANIES' ? 'primary' : 'secondary'}
                                                        size="small"
                                                        variant="outlined"
                                                    />
                                                </TableCell>
                                                <TableCell sx={{
                                                    py: 2,
                                                    fontWeight: 500
                                                }}>
                                                    {request.companyName}
                                                </TableCell>
                                                <TableCell align="right" sx={{
                                                    py: 2,
                                                    color: 'text.secondary'
                                                }}>
                                                    {request.companyId || 'N/A'}
                                                </TableCell>
                                                <TableCell sx={{
                                                    py: 2,
                                                    fontWeight: 500
                                                }}>
                                                    {request.operationBy}
                                                </TableCell>
                                                <TableCell sx={{
                                                    py: 2,
                                                    color: 'text.secondary',
                                                    fontSize: '0.875rem'
                                                }}>
                                                    {formatDate(request.operationDate)}
                                                </TableCell>
                                                <TableCell sx={{ py: 2 }}>
                                                    <Chip
                                                        label={getRequestStatusLabel(request.isRequestApproved)}
                                                        color={getRequestStatusColor(request.isRequestApproved)}
                                                        size="small"
                                                    />
                                                </TableCell>
                                                <TableCell sx={{ py: 2 }}>
                                                    {request.isRequestApproved === "TO_REVIEW" && (
                                                        <Box sx={{
                                                            display: 'flex',
                                                            gap: 0.5,
                                                            justifyContent: 'flex-end'
                                                        }}>
                                                            <IconButton
                                                                size="small"
                                                                sx={{
                                                                    color: 'success.main',
                                                                    '&:hover': {
                                                                        backgroundColor: 'success.50',
                                                                    },
                                                                    borderRadius: 1
                                                                }}
                                                                onClick={() => handleApprovalAction(request.id, 'approve', request.companyName)}
                                                                aria-label="approve request"
                                                            >
                                                                <CheckIcon fontSize="small"/>
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
                                                                onClick={() => handleApprovalAction(request.id, 'reject', request.companyName)}
                                                                aria-label="reject request"
                                                            >
                                                                <CloseIcon fontSize="small"/>
                                                            </IconButton>
                                                        </Box>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={filteredRequests.length}
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

                {/* Dialog di conferma */}
                <Dialog
                    open={confirmDialog.open}
                    onClose={handleCancelAction}
                >
                    <DialogTitle>
                        Confirm {confirmDialog.action === 'approve' ? 'Approval' : 'Rejection'}
                    </DialogTitle>
                    <DialogContent>
                        <Typography>
                            Are you sure you want to {confirmDialog.action} this request?
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            <strong>Details:</strong> {confirmDialog.requestDetails}
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCancelAction}>Cancel</Button>
                        <Button
                            onClick={handleConfirmAction}
                            color={confirmDialog.action === 'approve' ? 'success' : 'error'}
                            variant="contained"
                        >
                            {confirmDialog.action === 'approve' ? 'Approve' : 'Reject'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Box>
    );
}