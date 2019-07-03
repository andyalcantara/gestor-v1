import React from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
    Image
} from "react-native";

import SubmitButton from '../utils/utility-components/SubmitButton';
import {deleteUser, getUser} from "../utils/helpers";

import { connect } from 'react-redux';
import {loginUser} from "../actions/user";
import {aquaMarine} from "../utils/colors";
import {handleSignup} from "../actions/shared";

class Signup extends React.Component {

    state = {
        email: '',
        password: ''
    };

    static navigationOptions = {
        title: 'Sign Up',
        headerBackTitle: null
    };

    componentDidMount() {
        const { navigation, dispatch } = this.props;

        getUser().then(result => {
            if (result !== null) {
                let token = JSON.parse(result).token;

                fetch('http://localhost:3000/user/checkToken', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    }
                }).then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            let id = JSON.parse(result).id;

                            if (data.token === token) {
                                dispatch(loginUser(id, token));
                                navigation.navigate('Dashboard', { token: token});
                            }
                        } else {
                            deleteUser().then(() => {
                                navigation.navigate('Signup');
                            });
                        }
                    }).catch(error => console.log(error));
            }
        }).catch(error => console.log(error));
    }

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

        dispatch(handleSignup({email: email, password: password}));
        this.setState({
           email: '',
           password: ''
        });
        navigation.navigate('Signin');
    };

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={this.handleEmail}
                    autoCapitalize='none'
                />

                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={this.handlePassword}
                    autoCapitalize='none'
                    secureTextEntry={true}
                />

                <SubmitButton onPress={this.handleSubmit} />

                <View style={styles.login}>
                    <Text>Already have an accout</Text>
                    <TouchableOpacity
                        onPress={
                            () => this.props.navigation
                                .navigate('Signin')
                        }
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
        borderColor: aquaMarine,
        borderRadius: 25,
        borderWidth: 1,
        width: '100%',
        height: 40,
        marginTop: 20,
        paddingLeft: 10,
    },
    label: {
        color: 'black',
        fontSize: 15,
        marginTop: 15,
    },
    login: {
        flexDirection: 'row',
        marginTop: 10
    },
    signin: {
        color: aquaMarine
    }
});

export default connect()(Signup);
