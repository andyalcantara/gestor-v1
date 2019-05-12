import { AsyncStorage } from 'react-native';

export function saveToken(token) {
   return AsyncStorage.setItem('token', JSON.stringify({token: token}));
}

export function getToken() {
    AsyncStorage.getItem('token').then((result) => {
        console.log(result, 'From async storage');
        return result.token;
    });
}
