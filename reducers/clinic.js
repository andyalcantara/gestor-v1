import {GET_CLINICS, ADD_CLINIC, DELETE_CLINIC} from '../actions/clinic';

export default function clinicsReducer(state = {}, action) {

    switch (action.type) {
        case GET_CLINICS:
            const { clinics } = action;

            let arrayClinics = Object.keys(clinics).map(key => clinics[key]);
            let theClinics = {};

            for (let i = 0; i < arrayClinics.length; i++) {
                theClinics[arrayClinics[i]._id] = arrayClinics[i];
            }

            return {
                ...state,
                ...theClinics
            };

        case ADD_CLINIC:
            const { clinic } = action;
            return {
                ...state,
                [clinic._id]: clinic
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
