import React from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView
} from "react-native";

import SubmitButton from '../utils/utility-components/SubmitButton';
import {deleteUser, getUser} from "../utils/helpers";

import { connect } from 'react-redux';
import {loginUser} from "../actions/user";

class Signup extends React.Component {

    state = {
        email: '',
        password: ''
    };

    componentDidMount() {
        const { navigation, dispatch } = this.props;

        getUser().then(result => {
            console.log(result, 'THIS IS RESULT FROM AUTO SIGN IN');
            let id = JSON.parse(result).id;
            let token = JSON.parse(result).token;

            if (id && token) {
                dispatch(loginUser(id, token));
                navigation.navigate('Dashboard', { token: token});
            } else {
                deleteUser().then(() => {
                    navigation.navigate('Signup');
                });
            }
        }).catch((error) => console.log(error));

    }

    static navigationOptions = {
      title: 'Sign Up'
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

    };

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <Text style={styles.label}>Email</Text>
                <TextInput style={styles.input} onChangeText={this.handleEmail} />

                <Text style={styles.label}>Password</Text>
                <TextInput style={styles.input} onChangeText={this.handlePassword} />

                <SubmitButton onPress={this.handleSubmit} />

                <View style={styles.login}>
                    <Text>Already have an accout</Text>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Signin')}
                        style={{marginLeft: 10}}
                    >
                        <Text style={styles.signin}>Login</Text>
                    </TouchableOpacity>
                </View>
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
    login: {
        flexDirection: 'row',
        marginTop: 10
    },
    signin: {
        color: 'fuchsia'
    }
});

export default connect()(Signup);
