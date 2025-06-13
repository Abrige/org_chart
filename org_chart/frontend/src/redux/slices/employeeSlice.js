import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentEmployeeSelected: null,
    editingEmployeeId: null, // vuole un l'id (integer) dell'employee
};

const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {
        setCurrentEmployeeSelected: (state, action) => {
            state.currentEmployeeSelected = action.payload;
        },
        clearCurrentEmployeeSelected: (state) => {
            state.currentEmployeeSelected = null;
        },
        setEditingEmployeeId: (state, action) => {
            state.editingEmployeeId = action.payload;
        },
        clearEditingEmployeeId: (state) => {
            state.editingEmployeeId = null;
        }
    },
});

export const {
    setCurrentEmployeeSelected,
    clearCurrentEmployeeSelected,
    setEditingEmployeeId,
    clearEditingEmployeeId
} = employeeSlice.actions;

export default employeeSlice.reducer;
