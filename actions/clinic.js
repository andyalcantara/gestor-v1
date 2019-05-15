export const GET_CLINICS = 'GET_CLINICS';
export const ADD_CLINIC = 'ADD_CLINIC';
export const DELETE_CLINIC = 'DELETE_CLINIC';

export function getClinics(clinics) {
    return {
        type: GET_CLINICS,
        clinics
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
