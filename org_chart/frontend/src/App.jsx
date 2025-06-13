import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import About from "./pages/About.jsx"
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Box from "@mui/material/Box";
import Companies from "./components/Companies.jsx";
import Company from "./components/Company.jsx";
import Employee from "./components/Employee.jsx";
import AddForm from "./components/AddForm.jsx";
import LoginForm from "./pages/LoginForm.jsx";
import EmployeeEditForm from "./pages/EmployeeEditForm.jsx";
import CompanyEditForm from "./pages/CompanyEditForm.jsx";
import Requests from "./pages/Requests.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import History from "./pages/History.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";

// Componente che gestisce il layout condizionale
function AppLayout() {
    const location = useLocation();
    const isLandingPage = location.pathname === '/';

    const theme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#3b82f6',
            },
            secondary: {
                main: '#8b5cf6',
            },
            success: {
                main: '#10b981',
            },
        },
        typography: {
            fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        },
    });

    if (isLandingPage) {
        // Layout per la landing page (senza Navbar e Footer)
        return (
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                </Routes>
            </ThemeProvider>
        );
    }

    // Layout per tutte le altre pagine (con Navbar e Footer)
    return (
        <>
            <CssBaseline />
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Navbar />
                <Box component="main" sx={{ flexGrow: 1 }}>
                    <Routes>
                        <Route path="/home" element={<Companies />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/loginform" element={<LoginForm />} />
                        <Route path="/contact" element={<About />} />
                        <Route path="/cookie" element={<About />} />
                        <Route path="/requests" element={<Requests />} />
                        <Route path="/company" element={<Company />} />
                        <Route path="/employee" element={<Employee />} />
                        <Route path="/addform" element={<AddForm />} />
                        <Route path="/modifyemployee" element={<EmployeeEditForm />} />
                        <Route path="/modifycompany" element={<CompanyEditForm />} />
                        <Route path="/history" element={<History />} />
                        <Route path="/history" element={<History />} />
                        <Route path="/adminpanel" element={<AdminPanel />} />
                    </Routes>
                </Box>
                <Footer />
            </Box>
        </>
    );
}

function App() {
    return (
        <Router>
            <AppLayout />
        </Router>
    );
}

export default App;