import {ADD_INVOICE, GET_INVOICES} from "../actions/invoice";

export default function invoiceReducer(state = {}, action) {
    switch (action.type) {
        case ADD_INVOICE:
            const { invoice } = action;

            return {
                ...state,
                [invoice._id]: invoice
            };

        case GET_INVOICES:
            const { invoices } = action;

            let objInvoices = {};
            let arrayInvoices = Object.keys(invoices).map(key => invoices[key]);

            for (let i = 0; i < arrayInvoices.length; i++) {
                objInvoices[arrayInvoices[i]._id] = arrayInvoices[i];
            }

            return {
              ...state,
              ...objInvoices
            };

        default:
            return state;
    }
}
