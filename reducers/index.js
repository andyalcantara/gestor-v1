import { combineReducers } from 'redux';
import userReducer from './user';
import clinicsReducer from "./clinic";

export default combineReducers({
    user: userReducer,
    clinics: clinicsReducer
});
