import {SET_TOTAL} from "../actions/total";

export default function totalReducer(state = {}, action) {
    switch (action.type) {
        case SET_TOTAL:
            const { total } = action;

            return {
                ...state,
                total: total
            };

        default:
            return state;
    }
}
