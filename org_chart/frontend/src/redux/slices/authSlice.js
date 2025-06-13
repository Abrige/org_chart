import { createSlice } from '@reduxjs/toolkit';
import {jwtDecode} from "jwt-decode";

const initialState = {
    token: null,
    username: null,
    role: null, // 1 = USER, 2 = COMPANY_ADMIN, 3 = SYSTEM_ADMIN
    adminForCompanies: null, // gli id delle company per cui si è COMPANY_ADMIN
    employeeForCompanies: null, // gli id delle company per cui è dipendente
    issuedAt: null,
    expiresAt: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action) => {
            const token = action.payload;
            let decodedToken;
            try {
                // provo la decodifica del token con libreria di terze parti
                decodedToken = jwtDecode(token);
            } catch (error) {
                console.log(error);
            }
            // se siamo riusciti a decodificare il token e non è ancora scaduto, salviamolo
            if (decodedToken && decodedToken.exp > new Date()/1000) {
                state.token = token;
                // dal payload del token possiamo anche prendere username e durata della sua validita' (da iat a exp)
                state.username = decodedToken.sub;
                state.role = decodedToken.role.id;
                state.adminForCompanies = decodedToken.adminForCompanies;
                state.employeeForCompanies = decodedToken.employeeForCompanies;
                state.issuedAt = decodedToken.iat;
                state.expiresAt = decodedToken.exp;
            }
        },
        clearToken: (state) => {
            state.token = null;
            state.username = null;
            state.role = null;
            state.adminForCompanies = null;
            state.employeeForCompanies = null;
            state.issuedAt = null;
            state.expiresAt = null;
        },
    },
});

export const {
    setToken,
    clearToken,
} = authSlice.actions;

export default authSlice.reducer;
