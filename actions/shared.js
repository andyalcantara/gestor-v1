import {loginUser, logOutUser} from './user';
import { getClinics, addClinic, deleteClinic } from "./clinic";
import {saveUser} from "../utils/helpers";
import {addInvoice, getInvoices, getAllInvoices} from "./invoice";

const url = 'http://localhost:3000/';

const postHeader = {
    'Content-Type': 'application/json'
};

export function handleSignup(body) {
    return (dispatch) => {
        return fetch(url + '/signup', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: postHeader
        }).then(response => response.json())
            .then(data => {
                console.log('this is the data', data);
            });
    }
}

export function handleLogin(body) {
    return (dispatch) => {
        return fetch(url + '/signin', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: postHeader
        }).then(response => response.json())
            .then(data => {
                saveUser(data.id, data.token);
                dispatch(loginUser(data.id, data.token));
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
                if (typeof data.message === 'Token is not valid') {
                    dispatch(logOutUser());
                }
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

export function eraseClinic(id, token) {
    return (dispatch) => {
        return fetch(url + 'clinic/' + id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(response => response.json())
            .then(data => {
                dispatch(deleteClinic(data._id))
            });
    }
}

////////////////// Invoice Section /////////////////////

export function grabInvoices(clinicId, userId, token) {
    return (dispatch) => {
        return fetch(url + clinicId + '/invoices', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(response => response.json())
            .then(data => {
                console.log(data, '//////////////This is data from server///////////');
                dispatch(getInvoices(data))
            });
    }
}

export function grabAllInvoices(token) {
    return (dispatch) => {
        return fetch(url + 'allInvoices', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(response => response.json())
            .then(data => {
                dispatch(getAllInvoices(data))
            });
    }
}

export function createInvoice(clinicId, token, body) {
    return (dispatch) => {
        return fetch(url + clinicId + '/invoice', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(body)
        }).then(response => response.json())
            .then(data => {
                dispatch(addInvoice(data))
            });
    }
}
