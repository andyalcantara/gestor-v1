import { loginUser } from './user';
import { getClinics, addClinic } from "./clinic";
import {getToken, saveUser} from "../utils/helpers";

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
                console.log(data, 'Data from server!!!!!!!!!!!!');
                saveUser(data.id, data.token);
                dispatch(loginUser(data.id, data.token))
            });
    }
}

// Clinic related logic

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

export function createClinic(body, token) {
    return (dispatch) => {
        return fetch(url + 'clinic', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(body)
        }).then(response => response.json())
            .then(data => {
                console.log(data, 'This is the data returned');
                dispatch(addClinic(data))
            });
    }
}
