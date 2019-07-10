import {SET_TOTAL, SET_COST} from "../actions/total";

export default function totalReducer(state = {}, action) {
    switch (action.type) {
        case SET_TOTAL:
            const { total } = action;

            return {
                ...state,
                total: total
            };

        case SET_COST:
            const { cost } = action;

            return {
                ...state,
                cost: cost
            };

        default:
            return state;
    }
}
