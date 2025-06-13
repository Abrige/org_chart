import React, {useState, useEffect} from 'react';
import {
    Box,
    Paper,
    Button,
    TextField,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Container,
    Grid,
    IconButton,
    Input,
    Card,
    CardContent,
    Fade,
    Tab,
    Tabs,
    Alert,
    CircularProgress
} from '@mui/material';
import {
    Business,
    Person,
    CloudUpload
} from '@mui/icons-material';
import BASE_API_URL from "../config/config.js";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const AddForm = () => {

    // Stati per il controllo del form
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const [selectedForm, setSelectedForm] = useState('company'); // stato per capire quale form è selezionato
    const [companies, setCompanies] = useState([]); // contiene i dati fetchati delle company
    const [countries, setCountries] = useState([]); // contiene i dati fetchati delle countries
    const [cities, setCities] = useState([]); // contiene i dati fetchati delle cities
    const [employeeCities, setEmployeeCities] = useState([]); // TODO vedere se serve

    // ####### FORM STATES #######
    // COMPANY FORM
    const [companyForm, setCompanyForm] = useState({
        name: '',
        fiscalCode: '',
        city_fk: '',
        countryId: '',
        logo: null     // TODO reworkare il logoUrl e il logo come file
    });
    // EMPLOYEE FORM
    const [employeeForm, setEmployeeForm] = useState({
        first_name: '',
        last_name: '',
        birthdate: '',
        sex: '',
        city_fk: '',
        company_fk: '',
        countryId: ''
    });
    // FILE
    const [uploadFile, setUploadFile] = useState(null);

    // Fetch functions
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

    const fetchEmployeeCities = async (countryId) => {
        try {
            const response = await fetch(`${BASE_API_URL}/home/countries/${countryId}/cities`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                setEmployeeCities(data);
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
            }
        } catch (error) {
            console.error('Errore nel caricamento aziende:', error);
        }
    };

    // fetch dei dati al caricamento della pagina
    useEffect(() => {
        fetchCountries();
        fetchCompanies();
    }, []);


    // HANDLERS shift+f11 per bookmarks
    // Serve per scrivere nel form della company in base a che input è
    const handleCompanyChange = (field, value) => {
        // Aggiorna il campo specificato (es: 'name', 'fiscalCode', ecc.) nello state 'companyForm'
        setCompanyForm(prev => ({
            ...prev,                // Mantiene gli altri campi invariati
            [field]: value          // Aggiorna solo quello passato alla funzione
        }));

        // Se il campo modificato è il paese ('countryId') e ha un valore...
        if (field === 'countryId' && value) {
            fetchCities(value);     // Carica le città associate a quel paese (chiamata API)

            // Resetta il campo 'city_fk' (per evitare che resti selezionata una città del paese precedente)
            setCompanyForm(prev => ({
                ...prev,
                city_fk: ''         // Reset città selezionata
            }));
        }
    };

    // Serve per scrivere nel form dell' Employee in base a che input è
    const handleEmployeeChange = (field, value) => {
        // Aggiorna il campo specificato nel form dello stato 'employeeForm'
        setEmployeeForm(prev => ({
            ...prev,                // copia tutti i campi precedenti
            [field]: value          // imposta il campo dinamico passato come parametro
        }));

        // Se il campo cambiato è il 'countryId' e il valore è valido (non vuoto)...
        if (field === 'countryId' && value) {
            fetchEmployeeCities(value);  // Carica le città associate al nuovo paese

            // Resetta la città selezionata, perché quella vecchia non è più valida
            setEmployeeForm(prev => ({
                ...prev,
                city_fk: ''
            }));
        }
    };

    // Si usa in un campo file tipo <input type="file" /> per caricare un'immagine/logo.
    const handleLogoUpload = (event) => {
        const file = event.target.files[0];  // Prende il primo file selezionato

        if (file) {
            setCompanyForm(prev => ({
                ...prev,
                logo: file          // Aggiunge il file al form azienda
            }));
        }
    };

    // È più generico: non aggiorna un form, ma salva semplicemente un file in uno state separato (uploadFile).
    const handleFileUpload = (event) => {
        const file = event.target.files[0];  // Prende il primo file selezionato

        if (file) {
            setUploadFile(file);  // Salva direttamente il file nello stato 'uploadFile'
        }
    };


    // SUBMIT FUNCTIONS
    const handleCompanySubmit = async (event) => {
        event.preventDefault();
        setSaving(true);
        setError(null);
        setSuccess(false);

        try {
            const addCompanyData = {
                name: companyForm.name,
                fiscalCode: companyForm.fiscalCode,
                city_fk: companyForm.city_fk || null,
            };

            const response = await fetch(`${BASE_API_URL}/home/company`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(addCompanyData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            setSuccess(true);
            // Reset form dopo il successo
            setCompanyForm({
                name: '',
                fiscalCode: '',
                city_fk: '',
                countryId: '',
                logo: null
            });
            setCities([]);

        } catch (error) {
            console.error('Errore nel salvataggio azienda:', error);
            setError('Errore nel salvataggio dell\'azienda. Riprova.');
        } finally {
            setSaving(false);
        }
    };

    const handleEmployeeSubmit = async (event) => {
        event.preventDefault();
        setSaving(true);
        setError(null);
        setSuccess(false);

        try {
            const addEmployeeData = {
                first_name: employeeForm.first_name,
                last_name: employeeForm.last_name,
                birthdate: employeeForm.birthdate || null,
                sex: employeeForm.sex || null,
                city_fk: employeeForm.city_fk || null,
                company_fk: employeeForm.company_fk || null
            };

            const response = await fetch(`${BASE_API_URL}/home/employee`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(addEmployeeData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            setSuccess(true);
            // Reset form dopo il successo
            setEmployeeForm({
                first_name: '',
                last_name: '',
                birthdate: '',
                sex: '',
                city_fk: '',
                company_fk: '',
                countryId: ''
            });
            setEmployeeCities([]);

        } catch (error) {
            console.error('Errore nel salvataggio dipendente:', error);
            setError('Errore nel salvataggio del dipendente. Riprova.');
        } finally {
            setSaving(false);
        }
    };

    const handleFileSubmit = async (event) => {
        event.preventDefault();
        if (!uploadFile) return;

        setUploading(true);
        setError(null);
        setSuccess(false);

        try {
            const formData = new FormData();
            formData.append('file', uploadFile);

            // Qui dovrai adattare l'endpoint per il caricamento file
            const response = await fetch(`${BASE_API_URL}/home/upload`, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            setSuccess(true);
            setUploadFile(null);

        } catch (error) {
            console.error('Errore nel caricamento file:', error);
            setError('Errore nel caricamento del file. Riprova.');
        } finally {
            setUploading(false);
        }
    };

    const handleTabChange = (event, newValue) => {
        setSelectedForm(newValue);
        // Reset stati quando cambi tab
        setError(null);
        setSuccess(false);
    };

    // ####### FORMS #######

    // COMPANY FORM
    const renderCompanyForm = () => (
        <Fade in={selectedForm === 'company'} timeout={300}>
            <Box component="form" onSubmit={handleCompanySubmit}>
                <Box sx={{display: 'flex', alignItems: 'center', mb: 4, pb: 2, borderBottom: '2px solid #1976d2'}}>
                    <Business sx={{fontSize: 32, color: '#1976d2', mr: 2}}/>
                    <Typography variant="h4" color="primary" fontWeight="bold">
                        Aggiungi Azienda
                    </Typography>
                </Box>

                {/* Alert messages */}
                {error && (
                    <Alert severity="error" sx={{mb: 3}}>
                        {error}
                    </Alert>
                )}
                {success && (
                    <Alert severity="success" sx={{mb: 3}}>
                        Azienda aggiunta con successo!
                    </Alert>
                )}

                <Grid container spacing={3}>

                    {/* Nome Azienda */}
                    <Grid size={{xs: 12, lg: 3}}>
                        <TextField
                            fullWidth
                            label="Nome Azienda"
                            value={companyForm.name}
                            onChange={(e) => handleCompanyChange('name', e.target.value)}
                            required
                            variant="outlined"
                            disabled={saving}
                        />
                    </Grid>

                    {/* Codice Fiscale */}
                    <Grid size={{xs: 12, lg: 3}}>
                        <TextField
                            fullWidth
                            label="Codice Fiscale"
                            value={companyForm.fiscalCode}
                            onChange={(e) => handleCompanyChange('fiscalCode', e.target.value)}
                            required
                            variant="outlined"
                            disabled={saving}
                        />
                    </Grid>

                    {/* Paese */}
                    <Grid size={{xs: 12, lg: 2}}>
                        <FormControl fullWidth required>
                            <InputLabel>Paese</InputLabel>
                            <Select
                                value={companyForm.countryId}
                                onChange={(e) => handleCompanyChange('countryId', e.target.value)}
                                label="Paese"
                                disabled={saving}
                            >
                                {countries.map((country) => (
                                    <MenuItem key={country.id} value={country.id}>
                                        {country.name} ({country.iso})
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Città */}
                    <Grid size={{xs: 12, lg: 2}}>
                        <FormControl fullWidth required disabled={!companyForm.countryId || saving}>
                            <InputLabel>Città</InputLabel>
                            <Select
                                value={companyForm.city_fk}
                                onChange={(e) => handleCompanyChange('city_fk', e.target.value)}
                                label="Città"
                            >
                                {cities.map((city) => (
                                    <MenuItem key={city.id} value={city.id}>
                                        {city.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    {/* Logo Azienda */}
                    <Grid size={{xs: 12, lg: 3}}>
                        <Box sx={{mt: 2}}>
                            <Box sx={{display: 'flex', alignItems: 'center', mb: 2}}>
                                <AddPhotoAlternateIcon/>
                                <Typography variant="body1" gutterBottom fontWeight="medium" sx={{ml: 2}}>
                                    Logo Azienda (opzionale)
                                </Typography>
                                <Input
                                    accept="image/*"
                                    style={{display: 'none'}}
                                    id="logo-upload"
                                    type="file"
                                    onChange={handleLogoUpload}
                                    disabled={saving}
                                />
                            </Box>
                            <label htmlFor="logo-upload">
                                <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                                    <Button variant="outlined" component="span" color="primary" disabled={saving}>
                                        Carica Logo
                                    </Button>
                                </Box>
                            </label>
                            {companyForm.logo && (
                                <Typography variant="body2" sx={{mt: 1, color: 'success.main'}}>
                                    File selezionato: {companyForm.logo.name}
                                </Typography>
                            )}
                        </Box>
                    </Grid>

                    {/* Bottone di invio */}
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            fullWidth
                            disabled={saving}
                            sx={{
                                mt: 2,
                                py: 1.5,
                                fontSize: '1.1rem',
                                fontWeight: 'bold'
                            }}
                        >
                            {saving ? (
                                <>
                                    <CircularProgress size={20} sx={{mr: 1}}/>
                                    Aggiungendo...
                                </>
                            ) : (
                                'Aggiungi Azienda'
                            )}
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Fade>
    );

    // EMPLOYEE FORM
    const renderEmployeeForm = () => (
        <Fade in={selectedForm === 'employee'} timeout={300}>
            <Box component="form" onSubmit={handleEmployeeSubmit}>
                <Box sx={{display: 'flex', alignItems: 'center', mb: 4, pb: 2, borderBottom: '2px solid #2e7d32'}}>
                    <Person sx={{fontSize: 32, color: '#2e7d32', mr: 2}}/>
                    <Typography variant="h4" color="success.main" fontWeight="bold">
                        Aggiungi Dipendente
                    </Typography>
                </Box>

                {/* Alert messages */}
                {error && (
                    <Alert severity="error" sx={{mb: 3}}>
                        {error}
                    </Alert>
                )}
                {success && (
                    <Alert severity="success" sx={{mb: 3}}>
                        Dipendente aggiunto con successo!
                    </Alert>
                )}

                <Grid container spacing={3}>
                    {/* First Name */}
                    <Grid size={{xs: 12, lg: 2}}>
                        <TextField
                            fullWidth
                            label="Nome"
                            value={employeeForm.first_name}
                            onChange={(e) => handleEmployeeChange('first_name', e.target.value)}
                            required
                            variant="outlined"
                            disabled={saving}
                        />
                    </Grid>

                    {/* Last Name */}
                    <Grid size={{xs: 12, lg: 2}}>
                        <TextField
                            fullWidth
                            label="Cognome"
                            value={employeeForm.last_name}
                            onChange={(e) => handleEmployeeChange('last_name', e.target.value)}
                            required
                            variant="outlined"
                            disabled={saving}
                        />
                    </Grid>

                    {/* Birthdate */}
                    <Grid size={{xs: 12, lg: 3}}>
                        <TextField
                            fullWidth
                            label="Data di Nascita (opzionale)"
                            type="date"
                            value={employeeForm.birthdate}
                            onChange={(e) => handleEmployeeChange('birthdate', e.target.value)}
                            InputLabelProps={{shrink: true}}
                            variant="outlined"
                            disabled={saving}
                        />
                    </Grid>

                    {/* Sex */}
                    <Grid size={{xs: 12, lg: 3}}>
                        <FormControl component="fieldset" disabled={saving}>
                            <FormLabel component="legend" sx={{fontWeight: 'medium'}}>Sesso (opzionale)</FormLabel>
                            <RadioGroup
                                row
                                value={employeeForm.sex}
                                onChange={(e) => handleEmployeeChange('sex', e.target.value)}
                            >
                                <FormControlLabel value="M" control={<Radio/>} label="Maschio"/>
                                <FormControlLabel value="F" control={<Radio/>} label="Femmina"/>
                            </RadioGroup>
                        </FormControl>
                    </Grid>

                    {/* Country */}
                    <Grid size={{xs: 12, lg: 3}}>
                        <FormControl fullWidth>
                            <InputLabel>Paese (opzionale)</InputLabel>
                            <Select
                                value={employeeForm.countryId}
                                onChange={(e) => handleEmployeeChange('countryId', e.target.value)}
                                label="Paese (opzionale)"
                                disabled={saving}
                            >
                                <MenuItem value="">
                                    <em>Nessun paese</em>
                                </MenuItem>
                                {countries.map((country) => (
                                    <MenuItem key={country.id} value={country.id}>
                                        {country.name} ({country.iso})
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Città */}
                    <Grid size={{xs: 12, lg: 2}}>
                        <FormControl fullWidth disabled={!employeeForm.countryId || saving}>
                            <InputLabel>Città (opzionale)</InputLabel>
                            <Select
                                value={employeeForm.city_fk}
                                onChange={(e) => handleEmployeeChange('city_fk', e.target.value)}
                                label="Città (opzionale)"
                            >
                                <MenuItem value="">
                                    <em>Nessuna città</em>
                                </MenuItem>
                                {employeeCities.map((city) => (
                                    <MenuItem key={city.id} value={city.id}>
                                        {city.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Company */}
                    <Grid size={{xs: 12, lg: 2}}>
                        <FormControl fullWidth disabled={saving}>
                            <InputLabel>Azienda (opzionale)</InputLabel>
                            <Select
                                value={employeeForm.company_fk}
                                onChange={(e) => handleEmployeeChange('company_fk', e.target.value)}
                                label="Azienda (opzionale)"
                            >
                                <MenuItem value="">
                                    <em>Nessuna azienda</em>
                                </MenuItem>
                                {companies.map((company) => (
                                    <MenuItem key={company.id} value={company.id}>
                                        {company.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Bottone di invio */}
                    <Grid>
                        <Button
                            type="submit"
                            variant="contained"
                            color="success"
                            size="large"
                            fullWidth
                            disabled={saving}
                            sx={{
                                mt: 2,
                                py: 1.5,
                                fontSize: '1.1rem',
                                fontWeight: 'bold'
                            }}
                        >
                            {saving ? (
                                <>
                                    <CircularProgress size={20} sx={{mr: 1}}/>
                                    Aggiungendo...
                                </>
                            ) : (
                                'Aggiungi Dipendente'
                            )}
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Fade>
    );

    // FILE UPLOADS
    const renderFileUploadForm = () => (
        <Fade in={selectedForm === 'upload'} timeout={300}>
            <Box component="form" onSubmit={handleFileSubmit}>
                <Box sx={{display: 'flex', alignItems: 'center', mb: 4, pb: 2, borderBottom: '2px solid #ed6c02'}}>
                    <CloudUpload sx={{fontSize: 32, color: '#ed6c02', mr: 2}}/>
                    <Typography variant="h4" color="warning.main" fontWeight="bold">
                        Carica File Dati
                    </Typography>
                </Box>

                {/* Alert messages */}
                {error && (
                    <Alert severity="error" sx={{mb: 3}}>
                        {error}
                    </Alert>
                )}
                {success && (
                    <Alert severity="success" sx={{mb: 3}}>
                        File caricato con successo!
                    </Alert>
                )}

                <Box sx={{textAlign: 'center', py: 6}}>
                    <Input
                        accept=".csv,.xlsx,.xls,.json"
                        style={{display: 'none'}}
                        id="file-upload"
                        type="file"
                        onChange={handleFileUpload}
                        disabled={uploading}
                    />
                    <label htmlFor="file-upload">
                        <Paper
                            elevation={0}
                            sx={{
                                p: 6,
                                border: '2px dashed #ed6c02',
                                borderRadius: 3,
                                cursor: uploading ? 'not-allowed' : 'pointer',
                                transition: 'all 0.3s ease',
                                opacity: uploading ? 0.6 : 1,
                                '&:hover': {
                                    backgroundColor: uploading ? 'inherit' : '#fff3e0',
                                    borderColor: uploading ? '#ed6c02' : '#e65100'
                                }
                            }}
                        >
                            <CloudUpload sx={{fontSize: 64, color: '#ed6c02', mb: 2}}/>
                            <Typography variant="h6" gutterBottom>
                                {uploading ? 'Caricamento...' : 'Seleziona File'}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Formati supportati: CSV, XLSX, XLS, JSON
                            </Typography>
                        </Paper>
                    </label>

                    {uploadFile && (
                        <Box sx={{mt: 3}}>
                            <Typography variant="h6" color="success.main">
                                File selezionato: {uploadFile.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Dimensione: {(uploadFile.size / 1024).toFixed(2)} KB
                            </Typography>
                        </Box>
                    )}
                </Box>

                <Button
                    type="submit"
                    variant="contained"
                    color="warning"
                    size="large"
                    disabled={!uploadFile || uploading}
                    fullWidth
                    sx={{
                        mt: 2,
                        py: 1.5,
                        fontSize: '1.1rem',
                        fontWeight: 'bold'
                    }}
                >
                    {uploading ? (
                        <>
                            <CircularProgress size={20} sx={{mr: 1}}/>
                            Caricando...
                        </>
                    ) : (
                        'Carica File'
                    )}
                </Button>
            </Box>
        </Fade>
    );


    // NAVIGATION TABS
    return (
        <Container maxWidth="lg" sx={{py: 4}}>
            <Paper elevation={3} sx={{borderRadius: 4, overflow: 'hidden'}}>
                {/* Navigation Tabs */}
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <Tabs
                        value={selectedForm}
                        onChange={handleTabChange}
                        centered
                        sx={{
                            '& .MuiTab-root': {
                                minHeight: 80,
                                fontSize: '1rem',
                                fontWeight: 'medium',
                                textTransform: 'none',
                                minWidth: 120
                            }
                        }}
                    >
                        <Tab
                            value="company"
                            label="Azienda"
                            icon={<Business/>}
                            iconPosition="start"
                            sx={{color: '#1976d2'}}
                        />
                        <Tab
                            value="employee"
                            label="Dipendente"
                            icon={<Person/>}
                            iconPosition="start"
                            sx={{color: '#2e7d32'}}
                        />
                        <Tab
                            value="upload"
                            label="Carica File"
                            icon={<CloudUpload/>}
                            iconPosition="start"
                            sx={{color: '#ed6c02'}}
                        />
                    </Tabs>
                </Box>

                {/* Form Container */}
                <Box sx={{p: 4, minHeight: 400}}>
                    {selectedForm === 'company' && renderCompanyForm()}
                    {selectedForm === 'employee' && renderEmployeeForm()}
                    {selectedForm === 'upload' && renderFileUploadForm()}
                </Box>
            </Paper>
        </Container>
    );
};

export default AddForm;
