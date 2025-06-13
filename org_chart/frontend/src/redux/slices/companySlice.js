import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentCompanySelected: null, // oppure direttamente un ID o un oggetto company
    editingCompany: null,
};

const companySlice = createSlice({
    name: 'company',
    initialState,
    reducers: {
        setCurrentCompanySelected: (state, action) => {
            state.currentCompanySelected = action.payload;
        },
        clearCurrentCompanySelected: (state) => {
            state.currentCompanySelected = null;
        },
        setEditingCompany: (state, action) => {
            state.editingCompany = action.payload;
        },
        clearEditingCompany: (state) => {
            state.editingCompany = null;
        }
    },
});

export const {
    setCurrentCompanySelected,
    clearCurrentCompanySelected ,
    setEditingCompany,
    clearEditingCompany,
} = companySlice.actions;

export default companySlice.reducer;
