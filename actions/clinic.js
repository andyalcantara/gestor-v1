export const GET_CLINICS = 'GET_CLINICS';
export const ADD_CLINIC = 'ADD_CLINIC';

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
