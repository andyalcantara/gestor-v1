import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import SubmitButton from '../utils/utility-components/SubmitButton';
import * as firebase from "firebase";

class Signin extends React.Component {

    state = {
        email: '',
        password: ''
    };

    static navigationOptions = {
        title: 'Sign In'
    };

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
        firebase.auth().signInWithEmailAndPassword(email.trim(), password).then(result => {
            console.log(result);
            this.props.navigation.navigate('Dashboard');
        }).catch(error => alert(error));
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>Sign In</Text>

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

export default Signin;
