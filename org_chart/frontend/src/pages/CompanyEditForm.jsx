import {useState, useEffect} from 'react';
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
    Alert,
    CircularProgress,
    Avatar
} from '@mui/material';
import {BusinessOutlined, CloudUploadOutlined} from '@mui/icons-material';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {
    ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import BASE_API_URL from "../config/config.js";

export default function CompanyEditForm() {

    // Redux state
    const editingCompany = useSelector(state => state.company.editingCompany);
    const navigate = useNavigate();
    const role = useSelector(state => state.auth.role);
    const username = useSelector(state => state.auth.username);
    const adminForCompanies = useSelector(state => state.auth.adminForCompanies);

    useEffect(() => {
        const loadCitiesAndSetForm = async () => {
            if (editingCompany) {
                const countryId = editingCompany.city?.country?.id || '';
                const cityId = editingCompany.city?.id || '';

                let citiesList = [];
                if (countryId) {
                    citiesList = await fetchCities(countryId);
                }

                setCities(citiesList);

                setFormData({
                    name: editingCompany.name || '',
                    fiscalCode: editingCompany.fiscalCode || '',
                    countryId: countryId,
                    cityId: cityId && citiesList.find(city => city.id === cityId) ? cityId : '',
                    logoUrl: editingCompany.logoUrl || ''
                });
            }
        };

        loadCitiesAndSetForm();
    }, [editingCompany]);


    // Stati per i dati del form
    const [formData, setFormData] = useState({
        name: '',
        fiscalCode: '',
        countryId: '',
        cityId: '',
        logoUrl: ''
    });

    // Stati per le opzioni
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);

    // Stati per il controllo del form
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    // Carica i paesi all'avvio
    useEffect(() => {
        fetchCountries();
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
                headers: {'Content-Type': 'application/json'}
            });

            if (response.ok) {
                const data = await response.json();
                setCities(data);
                return data; // <-- importante per il then nel useEffect
            }
        } catch (error) {
            console.error('Errore nel caricamento città:', error);
            setCities([]);
            return [];
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

    // Upload del logo
    const handleLogoUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // Validazione file
        const maxSize = 5 * 1024 * 1024; // 5MB
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];

        if (file.size > maxSize) {
            setError('Il file è troppo grande. Dimensione massima: 5MB');
            return;
        }

        if (!allowedTypes.includes(file.type)) {
            setError('Formato file non supportato. Usa JPG, PNG o GIF');
            return;
        }

        setUploading(true);
        setError(null);

        try {
            const formDataUpload = new FormData();
            formDataUpload.append('logo', file);

            const response = await fetch(`${BASE_API_URL}/home`, {
                method: 'POST',
                body: formDataUpload
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // Aggiorna il form data con la nuova URL del logo
            handleInputChange('logoUrl', data.logoUrl);
            setSuccess('Logo caricato con successo!');

        } catch (error) {
            console.error('Errore nell\'upload del logo:', error);
            setError('Errore nel caricamento del logo');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSaving(true);
        setError(null);
        setSuccess(null);

        try {
            // Prepara i dati da inviare (solo i campi modificati, escludendo l'id inizialmente)
            const updateFields = {};

            if (formData.name !== (editingCompany?.name || '')) {
                updateFields.name = formData.name;
            }
            if (formData.fiscalCode !== (editingCompany?.fiscalCode || '')) {
                updateFields.fiscalCode = formData.fiscalCode;
            }
            if (formData.cityId !== (editingCompany?.city?.id || '')) {
                updateFields.city_fk = formData.cityId;
            }
            if (formData.logoUrl !== (editingCompany?.logoUrl || '')) {
                updateFields.logoUrl = formData.logoUrl;
            }

            // Se non ci sono modifiche
            if (Object.keys(updateFields).length === 0) {
                setError('Nessuna modifica da salvare');
                setSaving(false);
                return;
            }

            // Aggiungi l'id solo dopo aver verificato che ci siano modifiche
            const updateData = {
                id: editingCompany.id,
                ...updateFields
            };

            let response;

            if (role === 3 || role === 2 && adminForCompanies.includes(editingCompany.id)){
                // Esegui la richiesta POST o PUT
                response = await fetch(`${BASE_API_URL}/home/company`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updateData)
                });
            }else{
                response = await fetch(`${BASE_API_URL}/home/request`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        request_type: "d",
                        request_details: JSON.stringify(updateData),
                        entity_type: 0,
                        company_fk: editingCompany.id,
                        operation_by: username
                    })
                });
            }

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            setSuccess('Modifiche salvate con successo!');
        } catch (error) {
            console.error('Errore nel salvataggio:', error);
            setError('Errore nel salvataggio delle modifiche');
        } finally {
            setSaving(false);
        }
    };

    const handleReset = () => {
        if (editingCompany) {
            setFormData({
                name: editingCompany.name || '',
                fiscalCode: editingCompany.fiscalCode || '',
                countryId: editingCompany.city?.country?.id || '',
                cityId: editingCompany.city?.id || '',
                logoUrl: editingCompany.logoUrl || ''
            });
        }
        setError(null);
        setSuccess(false);
    };

    const handleGoBack = () => {
        navigate(-1) // come "indietro" del browser
    }

    if (!editingCompany) {
        return (
            <Paper sx={{p: 3, textAlign: 'center'}}>
                <Typography variant="h6" color="text.secondary">
                    Seleziona un'azienda per modificarla
                </Typography>
            </Paper>
        );
    }

    return (
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
                Modifica Azienda
            </Typography>
            {editingCompany && (
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    ID: {editingCompany.id} - {editingCompany.name}
                </Typography>
            )}

            {error && (
                <Alert severity="error" sx={{mb: 2}}>
                    {error}
                </Alert>
            )}

            {success && (
                <Alert severity="success" sx={{mb: 2}}>
                    {typeof success === 'string' ? success : 'Modifiche salvate con successo!'}
                </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={3}>

                    {/* Logo */}
                    <Grid xs={12}>
                        <Box sx={{display: 'flex', alignItems: 'center', gap: 2, mb: 2}}>
                            <Avatar
                                src={formData.logoUrl}
                                sx={{width: 64, height: 64}}
                            >
                                <BusinessOutlined/>
                            </Avatar>
                            <Box>
                                <input
                                    accept="image/*"
                                    style={{display: 'none'}}
                                    id="logo-upload"
                                    type="file"
                                    onChange={handleLogoUpload}
                                />
                                <label htmlFor="logo-upload">
                                    <Button
                                        variant="outlined"
                                        component="span"
                                        startIcon={uploading ? <CircularProgress size={20}/> : <CloudUploadOutlined/>}
                                        disabled={uploading}
                                    >
                                        {uploading ? 'Caricamento...' : 'Carica Logo'}
                                    </Button>
                                </label>
                                <Typography variant="caption" display="block" color="text.secondary">
                                    JPG, PNG, GIF - Max 5MB
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>

                    {/* Nome Azienda */}
                    <Grid size={{xs: 12, lg: 3}}>
                        <TextField
                            fullWidth
                            label="Nome Azienda"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            variant="outlined"
                            required
                        />
                    </Grid>

                    {/* Codice Fiscale */}
                    <Grid size={{xs: 12, lg: 2}}>
                        <TextField
                            fullWidth
                            label="Codice Fiscale"
                            value={formData.fiscalCode}
                            onChange={(e) => handleInputChange('fiscalCode', e.target.value)}
                            variant="outlined"
                            required
                        />
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
                </Grid>

                {/* Bottoni */}
                <Box sx={{mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end'}}>
                    <Button
                        variant="outlined"
                        onClick={handleReset}
                        disabled={saving || uploading}
                    >
                        Reset
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={saving || uploading}
                        startIcon={saving && <CircularProgress size={20}/>}
                    >
                        {saving ? 'Salvataggio...' : 'Salva Modifiche'}
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
}
