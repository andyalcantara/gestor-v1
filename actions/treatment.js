export const GET_TREATMENTS = 'GET_TREATMENTS';
export const ADD_TREATMENT = 'ADD_TREATMENT';

export function getTreatments(treatments) {
    return {
        type: GET_TREATMENTS,
        treatments
    }
}

export function addTreatment(treatment) {
    return {
        type: ADD_TREATMENT,
        treatment
    }
}
