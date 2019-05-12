import { LOGIN_USER } from '../actions/user';

export default function userReducer (state = {}, action) {
    switch (action.type) {

        case LOGIN_USER:
            const { userData } = action;
            return {
                ...state,
                user: userData
            };

        default:
            return state;
    }
}
