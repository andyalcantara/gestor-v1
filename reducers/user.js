import { LOGIN_USER, LOG_OUT_USER } from '../actions/user';

export default function userReducer (state = {}, action) {
    switch (action.type) {

        case LOGIN_USER:
            const { userData } = action;
            return {
                ...state,
                user: userData
            };

        case LOG_OUT_USER:
            return {
                ...state,
                user: null
            };

        default:
            return state;
    }
}
