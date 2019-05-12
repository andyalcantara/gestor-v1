import { AsyncStorage } from 'react-native';

export function saveToken(token) {
   return AsyncStorage.setItem('token', JSON.stringify({token: token}));
}

export function getToken() {
    return AsyncStorage.getItem('token')
}

export function deleteToken() {
    return AsyncStorage.removeItem('token');
}
