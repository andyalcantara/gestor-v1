export const LOGIN_USER = 'LOGIN_USER';
export const SIGN_UP_USER = 'SIGN_UP_USER';

export function loginUser(userData) {
    return {
        type: LOGIN_USER,
        userData
    }
}

export function signUpUser(userData) {
    return {
        type: SIGN_UP_USER,
        userData
    }
}
