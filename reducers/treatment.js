import {GET_TREATMENTS, ADD_TREATMENT} from "../actions/treatment";

export default function treatmentReducer(state = {}, action) {
    switch (action.type) {
        case GET_TREATMENTS:
            const { treatments } = action;

            let acTreatments = {};
            treatments.map(treatment => {
               acTreatments[treatment._id] = treatment;
            });

            return {
                ...state,
                ...acTreatments
            };

        case ADD_TREATMENT:
            const { treatment } = action;

            return {
              ...state,
              [treatment._id]: treatment
            };

        default:
            return state;
    }
}
