import { LOGIN_USER } from '../actions/user';

export default function userReducer (state = {}, action) {
    switch (action.type) {

        case LOGIN_USER:
            const { user } = action;
            return {
                ...state,
                user: user.id
            };

        default:
            return state;
    }
}
