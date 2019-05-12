import { AsyncStorage } from 'react-native';
import { loginUser } from './user';
import { getClinics } from "./clinic";
import { getToken } from "../utils/helpers";

const url = 'http://localhost:3000/';

const postHeader = {
    'Content-Type': 'application/json'
};

export function handleLogin(body) {
    return (dispatch) => {
        return fetch(url + '/signin', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: postHeader
        }).then(response => response.json())
            .then(data => {
                dispatch(loginUser(data))
            });
    }
}

export function handleClinics(token) {

    return (dispatch) => {
        return fetch(url + 'clinics', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(response => response.json())
            .then(data => {
                dispatch(getClinics(data));
            });
    }
}
