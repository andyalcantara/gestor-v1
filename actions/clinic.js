export const GET_CLINICS = 'GET_CLINICS';
export const ADD_CLINIC = 'ADD_CLINIC';
export const DELETE_CLINIC = 'DELETE_CLINIC';
export const ADD_LABCOST = 'ADD_LABCOST';

export function getClinics(clinics, userId) {
    return {
        type: GET_CLINICS,
        clinics,
        userId
    }
}

export function addClinic(clinic) {
    return {
        type: ADD_CLINIC,
        clinic
    }
}

export function deleteClinic(id) {
    return {
        type: DELETE_CLINIC,
        id
    }
}

export function addLabCost(id, costs) {
    return {
        type: ADD_LABCOST,
        id,
        costs
    }
}
