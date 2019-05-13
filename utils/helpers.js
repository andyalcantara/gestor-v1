import { AsyncStorage } from 'react-native';

export function saveToken(token) {
   return AsyncStorage.setItem('token', JSON.stringify({token: token}));
}

export function saveUser(id, token) {
    return AsyncStorage.setItem('user', JSON.stringify({ id: id, token: token}));
}

export function getUser() {
    return AsyncStorage.getItem('user');
}

export function getToken() {
    return AsyncStorage.getItem('token');
}

export function deleteToken() {
    return AsyncStorage.removeItem('token');
}
