import {loginUser, logOutUser, signUpUser} from './user';
import { getClinics, addClinic, deleteClinic } from "./clinic";
import {saveUser} from "../utils/helpers";
import {addInvoice, getInvoices, getAllInvoices, deleteInvoices} from "./invoice";
import {addTreatment, getTreatments} from "./treatment";

const url = 'http://localhost:3000/';

const postHeader = {
    'Content-Type': 'application/json'
};

export function handleSignup(body) {
    return (dispatch) => {
        return fetch(url + 'user/' + 'signup', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: postHeader
        }).then(response => response.json())
            .then(data => {
                dispatch(signUpUser());
            })
            .catch(error => console.log(error));
    }
}

export function handleLogin(body) {
    return (dispatch) => {
        return fetch(url + 'user/signin', {
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

export function handleClinics(token, userId) {

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
                if (data.message === 'Token is not valid') {
                    dispatch(logOutUser());
                }
                dispatch(getClinics(data, userId));
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
                dispatch(addClinic(data))
            });
    }
}

export function addClinicLabCost(body, token, id) {
    return (dispatch) => {
        return fetch(url + 'clinic/' + id + '/update', {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(body)
        }).then(response => response.json())
            .then(data => {
                dispatch(addLabCost(data))
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
                console.log(data, 'Data from deleting a clinic');
                dispatch(deleteClinic(data['clinic']._id));
                dispatch(deleteInvoices(data['clinic']._id));
            }).catch(error => console.log(error));
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

//////////// TREATMENTS ACTION CREATORS //////////
export function grabTreatments(clinicId, token) {
    return (dispatch) => {
        return fetch(url + 'treatment/' + clinicId + '/treatments', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(response => response.json())
            .then(data => {
                dispatch(getTreatments(data));
            });
    }
}

export function createTreatment(clinicId, token, body) {
    return (dispatch) => {
        return fetch(url + 'treatment/' + clinicId, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(body)
        }).then(response => response.json())
            .then(data => {
                dispatch(addTreatment(data));
            });
    }
}
