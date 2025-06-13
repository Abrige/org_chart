// src/api/homeApi.js

const BASE_URL = '${BASE_API_URL}/home';

export const fetchCountries = async () => {
    try {
        const response = await fetch(`${BASE_URL}/countries`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Errore HTTP: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Errore nel caricamento paesi:', error);
        throw error;
    }
};

export const fetchCities = async (countryId) => {
    try {
        const response = await fetch(`${BASE_URL}/countries/${countryId}/cities`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Errore HTTP: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Errore nel caricamento città:', error);
        throw error;
    }
};

export const fetchCompanies = async () => {
    try {
        const response = await fetch(`${BASE_URL}/companies`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Errore HTTP: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Errore nel caricamento aziende:', error);
        throw error;
    }
};
