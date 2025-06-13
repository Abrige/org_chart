import { configureStore } from '@reduxjs/toolkit';
import companyReducer from './slices/companySlice';
import employeeReducer from './slices/employeeSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
    reducer: {
        company: companyReducer,
        employee: employeeReducer,
        auth: authReducer
    },
});
