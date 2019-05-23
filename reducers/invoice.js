import {
    ADD_INVOICE,
    GET_ALL_INVOICES,
    GET_INVOICES,
    DELETE_INVOICES
} from "../actions/invoice";

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

        case GET_ALL_INVOICES:
            const { allInvoices } = action;

            let objAllInvoices = {};
            let arrayAllInvoices = Object.keys(allInvoices).map(key => allInvoices[key]);

            for (let i = 0; i < arrayAllInvoices.length; i++) {
                objAllInvoices[arrayAllInvoices[i]._id] = arrayAllInvoices[i];
            }

            return {
                ...state,
                ...objAllInvoices
            };

        case DELETE_INVOICES:
            const { invoicesToDelete, clinicId } = action;
            return {
                ...state
            };

        default:
            return state;
    }
}
