import {GET_CLINICS, ADD_CLINIC} from '../actions/clinic';

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

        default:
            return state;
    }
}
