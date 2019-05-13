export const LOGIN_USER = 'LOGIN_USER';
export const SIGN_UP_USER = 'SIGN_UP_USER';
export const LOG_OUT_USER = 'LOG_OUT_USER';

export function loginUser(userData, token) {
    return {
        type: LOGIN_USER,
        user: {
            id: userData,
            token: token
        }
    }
}

export function signUpUser(userData, token) {
    return {
        type: SIGN_UP_USER,
        user: {
            id: userData,
            token: token
        }
    }
}

export function logOutUser() {
    return {
        type: LOG_OUT_USER,
        userData: null
    }
}
