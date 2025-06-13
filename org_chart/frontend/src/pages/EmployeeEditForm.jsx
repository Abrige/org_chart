import {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {
    Box,
    Paper,
    Typography,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Button,
    Grid,
    Autocomplete,
    Alert,
    CircularProgress,
} from '@mui/material';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {format, parseISO} from 'date-fns';
import {
    ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import {useNavigate} from "react-router-dom";
import * as React from "react";
import BASE_API_URL from "../config/config.js";

export default function EmployeeEditForm() {

    // REDUX
    const editingEmployeeId = useSelector(state => state.employee.editingEmployeeId);
    // NAVIGATE
    const navigate = useNavigate();
    // Stati per i dati del form
    const [userData, setUserData] = useState(null);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        birthdate: null,
        sex: '',
        countryId: '',
        cityId: '',
        companyId: ''
    });

    // Stati per le opzioni
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [filteredCompanies, setFilteredCompanies] = useState([]);

    // Stati per il controllo del form
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    // Carica i dati dell'utente
    useEffect(() => {
        if (editingEmployeeId) {
            fetchUserData();
        }
    }, [editingEmployeeId]);

    // Carica i paesi all'avvio
    useEffect(() => {
        fetchCountries();
        fetchCompanies();
    }, []);

    // Carica le città quando cambia il paese
    useEffect(() => {
        if (formData.countryId) {
            fetchCities(formData.countryId);
        } else {
            setCities([]);
            setFormData(prev => ({...prev, cityId: ''}));
        }
    }, [formData.countryId]);


    // Fetcha i dati dell'employee in base all'ID
    const fetchUserData = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${BASE_API_URL}/home/employee/${editingEmployeeId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('❌ Errore HTTP:', response.status, errorText);
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            setUserData(data);

            setFormData({
                first_name: data.first_name || '',
                last_name: data.last_name || '',
                birthdate: data.birthdate ? parseISO(data.birthdate) : null,
                sex: data.sex || '',
                countryId: data.city?.country?.id || '',
                cityId: data.city?.id || '',
                companyId: data.company?.id || ''
            });

        } catch (error) {
            console.log(error)
            setError('Errore nel caricamento dei dati utente');
        } finally {
            setLoading(false);
        }
    };


    const fetchCountries = async () => {
        try {
            const response = await fetch(`${BASE_API_URL}/home/countries`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                setCountries(data);
            }
        } catch (error) {
            console.error('Errore nel caricamento paesi:', error);
        }
    };

    const fetchCities = async (countryId) => {
        try {
            const response = await fetch(`${BASE_API_URL}/home/countries/${countryId}/cities`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                setCities(data);
            }
        } catch (error) {
            console.error('Errore nel caricamento città:', error);
        }
    };

    const fetchCompanies = async () => {
        try {
            const response = await fetch(`${BASE_API_URL}/home/companies`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                setCompanies(data);
                setFilteredCompanies(data);
            }
        } catch (error) {
            console.error('Errore nel caricamento aziende:', error);
        }
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
        setError(null);
        setSuccess(false);
    };

    const handleCompanySearch = (event, value) => {
        if (typeof value === 'string') {
            // Filtra le aziende in base al testo inserito
            const filtered = companies.filter(company =>
                company?.name.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredCompanies(filtered);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSaving(true);
        setError(null);

        try {
            // Prepara i dati da inviare (solo i campi modificati)
            const updateData = {};

            if (formData.first_name !== (userData?.first_name || '')) {
                updateData.first_name = formData.first_name;
            }
            if (formData.last_name !== (userData?.last_name || '')) {
                updateData.last_name = formData.last_name;
            }

            const formattedFormDate = format(formData.birthdate, 'yyyy-MM-dd');

            const formattedUserDate = userData?.birthdate ? format(parseISO(userData.birthdate), 'yyyy-MM-dd') : '';

            if (formattedFormDate !== formattedUserDate) {
                updateData.birthdate = formattedFormDate; // 👈 usa "date" se il DTO la chiama così
            }
            if (formData.sex !== (userData?.sex || '')) {
                updateData.sex = formData.sex;
            }
            if (formData.cityId !== (userData?.city?.id || '')) {
                updateData.city_fk = formData.cityId;
            }
            if (formData.companyId !== (userData?.company?.id || '')) {
                updateData.company_fk = formData.companyId;
            }

            // Se non ci sono modifiche
            if (Object.keys(updateData).length === 0) {
                setError('Nessuna modifica da salvare');
                setSaving(false);
                return;
            }

            updateData.id = editingEmployeeId;

            const response = await fetch(`${BASE_API_URL}/home/employee`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updateData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            setSuccess(true);
            // Ricarica i dati aggiornati
            await fetchUserData();

        } catch (error) {
            console.error('Errore nel salvataggio:', error);
            setError('Errore nel salvataggio delle modifiche');
        } finally {
            setSaving(false);
        }
    };

    const handleReset = () => {
        if (userData) {
            setFormData({
                first_name: userData.first_name || '',
                last_name: userData.last_name || '',
                birthdate: userData.birthdate ? parseISO(userData.birthdate) : null,
                sex: userData.sex || '',
                countryId: userData.city?.country?.id || '',
                cityId: userData.city?.id || '',
                companyId: userData.company?.id || ''
            });
        }
        setError(null);
        setSuccess(false);
    };

    const handleGoBack = () => {
        navigate(-1) // come "indietro" del browser
    }

    if (!editingEmployeeId) {
        return (
            <Paper sx={{p: 3, textAlign: 'center'}}>
                <Typography variant="h6" color="text.secondary">
                    Seleziona un utente per modificarlo
                </Typography>
            </Paper>
        );
    }

    if (loading) {
        return (
            <Paper sx={{p: 3, textAlign: 'center'}}>
                <CircularProgress/>
                <Typography variant="body1" sx={{mt: 2}}>
                    Caricamento dati utente...
                </Typography>
            </Paper>
        );
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Paper sx={{p: 3}}>
                <Button
                    startIcon={<ArrowBackIcon/>}
                    onClick={handleGoBack}
                    sx={{mb: 3}}
                    variant="outlined"
                >
                    Torna indietro
                </Button>
                <Typography variant="h5" gutterBottom>
                    Modifica Utente
                </Typography>
                {userData && (
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        ID: {userData.id} - {userData.first_name} {userData.last_name}
                    </Typography>
                )}

                {error && (
                    <Alert severity="error" sx={{mb: 2}}>
                        {error}
                    </Alert>
                )}

                {success && (
                    <Alert severity="success" sx={{mb: 2}}>
                        Modifiche salvate con successo!
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {/* Nome */}
                        <Grid size={{xs: 12, lg: 2}}>
                            <TextField
                                fullWidth
                                label="Nome"
                                value={formData.first_name}
                                onChange={(e) => handleInputChange('first_name', e.target.value)}
                                variant="outlined"
                            />
                        </Grid>

                        {/* Cognome */}
                        <Grid size={{xs: 12, lg: 2}}>
                            <TextField
                                fullWidth
                                label="Cognome"
                                value={formData.last_name}
                                onChange={(e) => handleInputChange('last_name', e.target.value)}
                                variant="outlined"
                            />
                        </Grid>

                        {/* Data di nascita */}
                        <Grid size={{xs: 12, lg: 2}}>
                            <DatePicker
                                label="Data di nascita"
                                value={formData.birthdate}
                                onChange={(newValue) => handleInputChange('birthdate', newValue)}
                                renderInput={(params) => <TextField {...params} fullWidth/>}
                                maxDate={new Date()}
                            />
                        </Grid>

                        {/* Sesso */}
                        <Grid size={{xs: 12, lg: 1}}>
                            <FormControl fullWidth>
                                <InputLabel>Sesso</InputLabel>
                                <Select
                                    value={formData.sex}
                                    label="Sesso"
                                    onChange={(e) => handleInputChange('sex', e.target.value)}
                                >
                                    <MenuItem value="">
                                        <em>Seleziona</em>
                                    </MenuItem>
                                    <MenuItem value="M">Maschio</MenuItem>
                                    <MenuItem value="F">Femmina</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Paese */}
                        <Grid size={{xs: 12, lg: 2}}>
                            <FormControl fullWidth>
                                <InputLabel>Paese</InputLabel>
                                <Select
                                    value={formData.countryId}
                                    label="Paese"
                                    onChange={(e) => handleInputChange('countryId', e.target.value)}
                                >
                                    <MenuItem value="">
                                        <em>Seleziona paese</em>
                                    </MenuItem>
                                    {countries.map((country) => (
                                        <MenuItem key={country.id} value={country.id}>
                                            {country.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Città */}
                        <Grid size={{xs: 12, lg: 2}}>
                            <FormControl fullWidth disabled={!formData.countryId}>
                                <InputLabel>Città</InputLabel>
                                <Select
                                    value={formData.cityId}
                                    label="Città"
                                    onChange={(e) => handleInputChange('cityId', e.target.value)}
                                >
                                    <MenuItem value="">
                                        <em>Seleziona città</em>
                                    </MenuItem>
                                    {cities.map((city) => (
                                        <MenuItem key={city.id} value={city.id}>
                                            {city.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Azienda */}
                        <Grid size={{xs: 12, lg: 3}}>
                            <Autocomplete
                                fullWidth
                                options={filteredCompanies}
                                getOptionLabel={(option) => option.name || ''}
                                value={companies.find(c => c?.id === formData.companyId) || null}
                                onChange={(event, newValue) => {
                                    handleInputChange('companyId', newValue ? newValue.id : '');
                                }}
                                onInputChange={handleCompanySearch}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Azienda"
                                        placeholder="Cerca azienda..."
                                    />
                                )}
                                renderOption={(props, option) => (
                                    <Box key={option.id} component="li" {...props}>
                                        <Box>
                                            <Typography variant="body1">
                                                {option.name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {option.city?.name}, {option.city?.country?.name}
                                            </Typography>
                                        </Box>
                                    </Box>
                                )}
                            />
                        </Grid>
                    </Grid>

                    {/* Bottoni */}
                    <Box sx={{mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end'}}>
                        <Button
                            variant="outlined"
                            onClick={handleReset}
                            disabled={saving}
                        >
                            Reset
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={saving}
                            startIcon={saving && <CircularProgress size={20}/>}
                        >
                            {saving ? 'Salvataggio...' : 'Salva Modifiche'}
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </LocalizationProvider>
    );
}
