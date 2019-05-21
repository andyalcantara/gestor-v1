import React from 'react';
import { Text, TextInput, StyleSheet, KeyboardAvoidingView, AsyncStorage } from 'react-native';
import SubmitButton from '../utils/utility-components/SubmitButton';

import {saveUser} from "../utils/helpers";
import { connect } from 'react-redux';
import {loginUser} from "../actions/user";

class Signin extends React.Component {

    state = {
        email: '',
        password: ''
    };

    static navigationOptions = {
        title: 'Sign In',
        headerBackTitle: null
    };

    handleEmail = (text) => {
        let actualText = text.trim();
        this.setState({
            email: actualText
        });
    };

    handlePassword = (text) => {
        this.setState({
            password: text
        });
    };

    handleSubmit = () => {

        const { dispatch, navigation } = this.props;

        let { email, password } = this.state;
        fetch('http://localhost:3000/user/signin', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email: email, password: password}),
        }).then(response => response.json())
            .then(data => {
                saveUser(data.id, data.token);
                dispatch(loginUser(data.id, data.token));
                navigation.navigate('Dashboard', {token: data.token});
            });
    };

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <Text style={styles.label}>Email</Text>
                <TextInput style={styles.input} onChangeText={this.handleEmail} />

                <Text style={styles.label}>Password</Text>
                <TextInput style={styles.input} onChangeText={this.handlePassword} />

                <SubmitButton onPress={this.handleSubmit} />
            </KeyboardAvoidingView>
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

export default connect()(Signin);
