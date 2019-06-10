import {GET_TREATMENTS} from "../actions/treatment";

export default function treatmentReducer(state = {}, action) {
    switch (action.type) {
        case GET_TREATMENTS:
            const { treatments } = action;
            return {
                ...state,
                ...treatments
            };

        default:
            return state;
    }
}
