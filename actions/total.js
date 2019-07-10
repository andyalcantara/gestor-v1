export const SET_TOTAL = 'SET_TOTAL';
export const SET_COST = 'SET_COST';

export function setTotal(total) {
    return {
        type: SET_TOTAL,
        total
    }
}

export function setLabCost(cost) {
    return {
        type: SET_COST,
        cost
    }
}
