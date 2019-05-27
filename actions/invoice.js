export const ADD_INVOICE = 'ADD_INVOICE';
export const GET_INVOICES = 'GET_INVOICES';
export const GET_ALL_INVOICES = 'GET_ALL_INVOICES';
export const DELETE_INVOICES = 'DELETE_INVOICES';

export function addInvoice(invoice) {
    return {
        type: ADD_INVOICE,
        invoice
    }
}

export function getAllInvoices(allInvoices) {
    return {
        type: GET_ALL_INVOICES,
        allInvoices
    }
}

export function getInvoices(invoices) {
    return {
        type: GET_INVOICES,
        invoices
    }
}

export function deleteInvoices(clinicId) {
    return {
        type: DELETE_INVOICES,
        clinicId
    }
}


