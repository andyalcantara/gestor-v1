import { LOGIN_USER, LOG_OUT_USER } from '../actions/user';

export default function userReducer (state = {}, action) {
    switch (action.type) {

        case LOGIN_USER:
            const { user } = action;
            return {
                ...state,
                user: {
                    id: user.id,
                    token: user.token
                }
            };

        case LOG_OUT_USER:
            return {
                ...state,
                user: action.user
            };

        default:
            return state;
    }
}
