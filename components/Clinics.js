import React from 'react';
import {View, Text, StyleSheet, KeyboardAvoidingView, TextInput } from 'react-native';

import SubmitButton from '../utils/utility-components/SubmitButton';

class Clinics extends React.Component {

    static navigationOptions = {
        title: 'Add Clinic',
    };

    state = {
      name: '',
      pay: ''
    };

    handleName = (text) => {
        this.setState({
            name: text
        });
    };

    handlePay = (text) => {
        let textToParse = `0.${text}`;
        let pay = parseFloat(textToParse);
        this.setState({
            pay: pay
        });
        console.log(pay);
    };

    handleSubmit = () => {
        console.log(this.state);
    };

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="height" enabled>
                <Text style={styles.label}>Name</Text>
                <TextInput style={styles.input} onChangeText={this.handleName}/>

                <Text style={styles.label}>Pay</Text>
                <TextInput style={styles.input} onChangeText={this.handlePay} />

                <SubmitButton onPress={this.handleSubmit} />
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
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
        marginTop: 10
    }

});

export default Clinics;
