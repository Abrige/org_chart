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
import {visuallyHidden} from '@mui/utils';
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import BASE_API_URL from "../config/config.js";
import {useSelector} from "react-redux";

// Supporta "account.mail", "account.companies[0].name", ecc.
function getValueByPath(obj, path) {
    return path.split('.').reduce((acc, part) => {
        if (acc && part.includes('[') && part.includes(']')) {
            const arrayPath = part.split('[')[0];
            const index = parseInt(part.split('[')[1].split(']')[0]);
            return acc[arrayPath] && acc[arrayPath][index];
        }
        return acc?.[part];
    }, obj);
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
const getOperationTypeLabel = (type) => {
    switch (type?.toUpperCase()) {
        case 'I': return 'Insert';
        case 'U': return 'Update';
        case 'D': return 'Delete';
        default: return type;
    }
};

const getOperationTypeColor = (type) => {
    switch (type?.toUpperCase()) {
        case 'I': return 'success';
        case 'U': return 'warning';
        case 'D': return 'error';
        default: return 'default';
    }
};

const getRoleLabel = (roleName) => {
    switch (roleName?.toUpperCase()) {
        case 'ROLE_USER': return 'User';
        case 'ROLE_SYSADMIN': return 'System Admin';
        case 'ROLE_COMPANY_ADMIN': return 'Company Admin';
        default: return roleName?.replace('ROLE_', '') || 'Unknown';
    }
};

const getRoleColor = (roleName) => {
    switch (roleName?.toUpperCase()) {
        case 'ROLE_USER': return 'primary';
        case 'ROLE_SYSADMIN': return 'error';
        case 'ROLE_COMPANY_ADMIN': return 'warning';
        default: return 'default';
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
        id: 'recordId',
        numeric: true,
        disablePadding: false,
        label: 'Record ID',
    },
    {
        id: 'recordTable',
        numeric: false,
        disablePadding: false,
        label: 'Table',
    },
    {
        id: 'operationType',
        numeric: false,
        disablePadding: false,
        label: 'Operation',
    },
    {
        id: 'account.mail',
        numeric: false,
        disablePadding: false,
        label: 'Account',
    },
    {
        id: 'operationBy',
        numeric: false,
        disablePadding: false,
        label: 'Operation By',
    },
    {
        id: 'operationDate',
        numeric: false,
        disablePadding: false,
        label: 'Date',
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

export default function History() {
    // Stati per la tabella
    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('operationDate');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // Stati per i dati
    const [historyRecords, setHistoryRecords] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Stati per filtri e ricerca
    const [searchTerm, setSearchTerm] = useState('');
    const [filterAnchorEl, setFilterAnchorEl] = useState(null);
    const [operationFilter, setOperationFilter] = useState('all');
    const [tableFilter, setTableFilter] = useState('all');

    // Stati per il dialogo di dettaglio
    const [detailDialog, setDetailDialog] = useState({
        open: false,
        record: null
    });

    const accountToken = useSelector(state => state.auth.token);

    const refreshTable = () => {
        setIsLoading(true);
        setError(null);

        fetch(`${BASE_API_URL}/admin/history`, {
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
                setHistoryRecords(Array.isArray(data) ? data : []);
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
    useEffect(refreshTable, []);

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

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleFilterClick = (event) => {
        setFilterAnchorEl(event.currentTarget);
    };

    const handleFilterClose = () => {
        setFilterAnchorEl(null);
    };

    const handleViewDetails = (record) => {
        setDetailDialog({
            open: true,
            record
        });
    };

    const handleCloseDetails = () => {
        setDetailDialog({
            open: false,
            record: null
        });
    };

    // Filtro i record in base alla ricerca e ai filtri
    const filteredRecords = historyRecords.filter(record => {
        const matchesSearch =
            record.recordTable?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            record.account?.mail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            record.operationBy?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            record.recordId?.toString().includes(searchTerm);

        const matchesOperation = operationFilter === 'all' || record.operationType?.toUpperCase() === operationFilter.toUpperCase();
        const matchesTable = tableFilter === 'all' || record.recordTable?.toLowerCase() === tableFilter.toLowerCase();

        return matchesSearch && matchesOperation && matchesTable;
    });

    // Ottieni liste uniche per i filtri
    const uniqueTables = [...new Set(historyRecords.map(record => record.recordTable))].filter(Boolean);

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
                    History Management
                </Typography>

                {/* Barra di ricerca e filtri */}
                <Box sx={{
                    display: 'flex',
                    gap: 2,
                    mb: 3,
                    flexWrap: 'wrap',
                    alignItems: 'center'
                }}>
                    <TextField
                        placeholder="Search history records..."
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
                        <MenuItem onClick={() => setOperationFilter('all')}>All Operations</MenuItem>
                        <MenuItem onClick={() => setOperationFilter('I')}>Insert</MenuItem>
                        <MenuItem onClick={() => setOperationFilter('U')}>Update</MenuItem>
                        <MenuItem onClick={() => setOperationFilter('D')}>Delete</MenuItem>
                        <MenuItem divider />
                        <MenuItem onClick={() => setTableFilter('all')}>All Tables</MenuItem>
                        {uniqueTables.map(table => (
                            <MenuItem key={table} onClick={() => setTableFilter(table)}>
                                {table}
                            </MenuItem>
                        ))}
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
                                rowCount={filteredRecords.length}
                            />
                            <TableBody>
                                {isLoading ? (
                                    <TableRow>
                                        <TableCell colSpan={8} align="center" sx={{
                                            py: 4,
                                            color: 'text.secondary',
                                            fontStyle: 'italic'
                                        }}>
                                            Caricamento...
                                        </TableCell>
                                    </TableRow>
                                ) : filteredRecords.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={8} align="center" sx={{
                                            py: 4,
                                            color: 'text.secondary',
                                            fontStyle: 'italic'
                                        }}>
                                            Nessun record trovato
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredRecords
                                        .slice()
                                        .sort(getComparator(order, orderBy))
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((record, index) => (
                                            <TableRow
                                                hover
                                                tabIndex={-1}
                                                key={record.id || index}
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
                                                    {record.id}
                                                </TableCell>
                                                <TableCell align="right" sx={{
                                                    py: 2,
                                                    color: 'text.secondary',
                                                    fontSize: '0.875rem'
                                                }}>
                                                    {record.recordId}
                                                </TableCell>
                                                <TableCell sx={{ py: 2 }}>
                                                    <Chip
                                                        label={record.recordTable}
                                                        color="primary"
                                                        size="small"
                                                        variant="outlined"
                                                    />
                                                </TableCell>
                                                <TableCell sx={{ py: 2 }}>
                                                    <Chip
                                                        label={getOperationTypeLabel(record.operationType)}
                                                        color={getOperationTypeColor(record.operationType)}
                                                        size="small"
                                                        variant="outlined"
                                                    />
                                                </TableCell>
                                                <TableCell sx={{
                                                    py: 2,
                                                    fontWeight: 500
                                                }}>
                                                    {record.account?.mail || 'N/A'}
                                                </TableCell>
                                                <TableCell sx={{
                                                    py: 2,
                                                    fontWeight: 500
                                                }}>
                                                    {record.operationBy}
                                                </TableCell>
                                                <TableCell sx={{
                                                    py: 2,
                                                    color: 'text.secondary',
                                                    fontSize: '0.875rem'
                                                }}>
                                                    {formatDate(record.operationDate)}
                                                </TableCell>
                                                <TableCell sx={{ py: 2 }}>
                                                    <IconButton
                                                        size="small"
                                                        sx={{
                                                            color: 'primary.main',
                                                            '&:hover': {
                                                                backgroundColor: 'primary.50',
                                                            },
                                                            borderRadius: 1
                                                        }}
                                                        onClick={() => handleViewDetails(record)}
                                                        aria-label="view details"
                                                    >
                                                        <VisibilityIcon fontSize="small"/>
                                                    </IconButton>
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
                        count={filteredRecords.length}
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

                {/* Dialog di dettaglio */}
                <Dialog
                    open={detailDialog.open}
                    onClose={handleCloseDetails}
                    maxWidth="md"
                    fullWidth
                >
                    <DialogTitle>
                        Record Details - ID: {detailDialog.record?.id}
                    </DialogTitle>
                    <DialogContent>
                        {detailDialog.record && (
                            <Box sx={{ mt: 2 }}>
                                <Card sx={{ mb: 2 }}>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>
                                            Operation Information
                                        </Typography>
                                        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                                            <Box>
                                                <Typography variant="body2" color="text.secondary">
                                                    Record ID
                                                </Typography>
                                                <Typography variant="body1" fontWeight={500}>
                                                    {detailDialog.record.recordId}
                                                </Typography>
                                            </Box>
                                            <Box>
                                                <Typography variant="body2" color="text.secondary">
                                                    Table
                                                </Typography>
                                                <Typography variant="body1" fontWeight={500}>
                                                    {detailDialog.record.recordTable}
                                                </Typography>
                                            </Box>
                                            <Box>
                                                <Typography variant="body2" color="text.secondary">
                                                    Operation Type
                                                </Typography>
                                                <Chip
                                                    label={getOperationTypeLabel(detailDialog.record.operationType)}
                                                    color={getOperationTypeColor(detailDialog.record.operationType)}
                                                    size="small"
                                                />
                                            </Box>
                                            <Box>
                                                <Typography variant="body2" color="text.secondary">
                                                    Operation Date
                                                </Typography>
                                                <Typography variant="body1" fontWeight={500}>
                                                    {formatDate(detailDialog.record.operationDate)}
                                                </Typography>
                                            </Box>
                                            <Box>
                                                <Typography variant="body2" color="text.secondary">
                                                    Operation By
                                                </Typography>
                                                <Typography variant="body1" fontWeight={500}>
                                                    {detailDialog.record.operationBy}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </CardContent>
                                </Card>

                                {detailDialog.record.account && (
                                    <Card sx={{ mb: 2 }}>
                                        <CardContent>
                                            <Typography variant="h6" gutterBottom>
                                                Account Information
                                            </Typography>
                                            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                                                <Box>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Email
                                                    </Typography>
                                                    <Typography variant="body1" fontWeight={500}>
                                                        {detailDialog.record.account.mail}
                                                    </Typography>
                                                </Box>
                                                <Box>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Role
                                                    </Typography>
                                                    <Chip
                                                        label={getRoleLabel(detailDialog.record.account.role?.name)}
                                                        color={getRoleColor(detailDialog.record.account.role?.name)}
                                                        size="small"
                                                        variant="outlined"
                                                    />
                                                </Box>
                                                <Box>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Account ID
                                                    </Typography>
                                                    <Typography variant="body1" fontWeight={500}>
                                                        {detailDialog.record.account.id}
                                                    </Typography>
                                                </Box>
                                                <Box>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Status
                                                    </Typography>
                                                    <Chip
                                                        label={detailDialog.record.account.enabled ? 'Enabled' : 'Disabled'}
                                                        color={detailDialog.record.account.enabled ? 'success' : 'error'}
                                                        size="small"
                                                    />
                                                </Box>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                )}

                                {detailDialog.record.account?.companies && detailDialog.record.account.companies.length > 0 && (
                                    <Card>
                                        <CardContent>
                                            <Typography variant="h6" gutterBottom>
                                                Associated Companies
                                            </Typography>
                                            {detailDialog.record.account.companies.map((company, index) => (
                                                <Box key={company.id || index}>
                                                    {index > 0 && <Divider sx={{ my: 2 }} />}
                                                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                                                        <Box>
                                                            <Typography variant="body2" color="text.secondary">
                                                                Company Name
                                                            </Typography>
                                                            <Typography variant="body1" fontWeight={500}>
                                                                {company.name}
                                                            </Typography>
                                                        </Box>
                                                        <Box>
                                                            <Typography variant="body2" color="text.secondary">
                                                                Fiscal Code
                                                            </Typography>
                                                            <Typography variant="body1" fontWeight={500}>
                                                                {company.fiscalCode}
                                                            </Typography>
                                                        </Box>
                                                        <Box>
                                                            <Typography variant="body2" color="text.secondary">
                                                                City
                                                            </Typography>
                                                            <Typography variant="body1" fontWeight={500}>
                                                                {company.city?.name}, {company.city?.country?.name}
                                                            </Typography>
                                                        </Box>
                                                        <Box>
                                                            <Typography variant="body2" color="text.secondary">
                                                                Employees
                                                            </Typography>
                                                            <Typography variant="body1" fontWeight={500}>
                                                                {company.numOfEmployees}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            ))}
                                        </CardContent>
                                    </Card>
                                )}
                            </Box>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDetails}>Close</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Box>
    );
}