export const GET_CLINICS = 'GET_CLINICS';

export function getClinics(clinics) {
    return {
        type: GET_CLINICS,
        clinics
    }
}
