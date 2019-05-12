import {GET_CLINICS} from '../actions/clinic';

export default function clinicsReducer(state = {}, action) {

    switch (action.type) {
        case GET_CLINICS:
            const { clinics } = action;
            return {
                ...state,
                ...clinics
            };

        default:
            return state;
    }
}
