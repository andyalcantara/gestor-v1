import React from 'react';
import { View, Text, TextInput, StyleSheet } from "react-native";

import * as firebase from 'firebase';
import firekeys from '../utils/firekeys';

class Signup extends React.Component {

    componentDidMount() {
        firebase.initializeApp(firekeys);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Sign Up Component</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Signup;
