export const ADD_INVOICE = 'ADD_INVOICE';
export const GET_INVOICES = 'GET_INVOICES';

export function addInvoice(invoice) {
    return {
        type: ADD_INVOICE,
        invoice
    }
}

export function getInvoices(invoices) {
    return {
        type: GET_INVOICES,
        invoices
    }
}
