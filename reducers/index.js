import { combineReducers } from 'redux';
import userReducer from './user';
import clinicsReducer from "./clinic";
import invoiceReducer from "./invoice";

export default combineReducers({
    user: userReducer,
    clinics: clinicsReducer,
    invoices: invoiceReducer,
});
