import React from 'react';
import { View, Text, TextInput, StyleSheet, Button } from "react-native";

import * as firebase from 'firebase';
import {firekeys} from '../utils/firekeys';
import 'firebase/auth';

import SubmitButton from '../utils/utility-components/SubmitButton';

class Signup extends React.Component {

    state = {
        email: '',
        password: ''
    };

    componentDidMount() {
        let config = {
            apiKey: "AIzaSyDtgsFRPUsaYkLKWPfOyOH-y5xSt9gi6ZQ",
            authDomain: "gestor-a4baa.firebaseapp.com",
            databaseURL: "https://gestor-a4baa.firebaseio.com",
            projectId: "gestor-a4baa",
            storageBucket: "gestor-a4baa.appspot.com",
            messagingSenderId: "503288975364"
        };
        firebase.initializeApp(config);

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.props.navigation.navigate('Dashboard');
            } else {
                this.props.navigation.navigate('Signin');
            }
        })
    }

    handleEmail = (text) => {
        let actualText = text.trim();
        this.setState({
            email: actualText
        });
        console.log(this.state);
    };

    handlePassword = (text) => {
        this.setState({
            password: text
        });
        console.log(this.state);
    };

    handleSubmit = () => {
        let { email, password } = this.state;
        firebase.auth().createUserWithEmailAndPassword(email.trim(), password).then(result => {
            console.log(result);
            this.props.navigation.navigate('Dashboard');
        }).catch(error => alert(error));
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>Sign Up Here!!</Text>

                <Text style={styles.label}>Email</Text>
                <TextInput style={styles.input} onChangeText={this.handleEmail} />

                <Text style={styles.label}>Password</Text>
                <TextInput style={styles.input} onChangeText={this.handlePassword} />

                <SubmitButton onPress={this.handleSubmit} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    input: {
        borderColor: 'fuchsia',
        borderRadius: 25,
        borderWidth: 1,
        width: '100%',
        height: 40,
        marginTop: 20,
        paddingLeft: 10,
    },
    label: {
        color: 'fuchsia',
        fontSize: 15,
        marginTop: 15,
    },
});

export default Signup;
