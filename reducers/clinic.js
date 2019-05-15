import {GET_CLINICS, ADD_CLINIC, DELETE_CLINIC} from '../actions/clinic';

export default function clinicsReducer(state = {}, action) {

    switch (action.type) {
        case GET_CLINICS:
            const { clinics } = action;
            return {
                ...state,
                ...clinics
            };

        case ADD_CLINIC:
            const { clinic } = action;
            return {
                ...state,
                [clinic.id]: clinic
            };

        case DELETE_CLINIC:

            let updatedState = {...state};
            delete updatedState[action.id];

            return {
                ...updatedState
            };

        default:
            return state;
    }
}
