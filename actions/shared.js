import { loginUser } from './user';
const url = 'http://localhost:3000/user';

const postHeader = {
    'Content-Type': 'application/json'
};

export function handleLogin() {
    return (dispatch) => {
        return fetch(url + '/signin', {
            method: 'POST',
            headers: postHeader
        }).then(response => response.json())
            .then(data => {
                dispatch(loginUser(data))
            });
    }
}
