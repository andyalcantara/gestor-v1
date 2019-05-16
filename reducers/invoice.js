import {ADD_INVOICE} from "../actions/invoice";

export default function invoiceReducer(state = {}, action) {
    switch (action.type) {
        case ADD_INVOICE:
            const { invoice } = action;

            return {
                ...state,
                [invoice._id]: invoice
            };

        default:
            return state;
    }
}
