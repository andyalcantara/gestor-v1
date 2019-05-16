export const ADD_INVOICE = 'ADD_INVOICE';

export function addInvoice(invoice) {
    return {
        type: ADD_INVOICE,
        invoice
    }
}
