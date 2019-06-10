export const GET_TREATMENTS = 'GET_TREATMENTS';

export function getTreatments(treatments) {
    return {
        type: GET_TREATMENTS,
        treatments
    }
}
