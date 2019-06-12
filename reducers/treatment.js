import {GET_TREATMENTS} from "../actions/treatment";

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

        default:
            return state;
    }
}
