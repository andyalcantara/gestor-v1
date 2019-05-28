import { combineReducers } from 'redux';
import userReducer from './user';
import clinicsReducer from "./clinic";
import invoiceReducer from "./invoice";
import { LOG_OUT_USER } from "../actions/user";

export const appReducer = combineReducers({
    user: userReducer,
    clinics: clinicsReducer,
    invoices: invoiceReducer,
});

export const rootReducer = (state, action) => {
  if (action.type === LOG_OUT_USER) {
      state = undefined;
  }

  return appReducer(state, action);
};


