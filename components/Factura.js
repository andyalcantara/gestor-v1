import React from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView } from 'react-native';

import SubmitButton from '../utils/utility-components/SubmitButton';

class Factura extends React.Component {

    static navigationOptions = {
        title: 'Add Factura'
    };

    state = {
      hc: 0,
      name: '',
      tratamiento: '',
      precio: 0,
    };

    handleHC = (text) => {
        const textToNumber = parseInt(text.trim());
        this.setState({
            hc: textToNumber
        });
    };

    handleName = (text) => {
        this.setState({
            name: text
        });
    };

    handleTreatment = (text) => {
        this.setState({
            tratamiento: text
        });
    };

    handlePrice = (text) => {
        const price = parseInt(text.trim());
        this.setState({
            precio: price
        });
    };

    handleSubmit = () => {
        let invoice = this.state;
        console.log(invoice);

        // TODO: API call post request to create new invoice
        // TODO: clear form
        // TODO: Navigate back to Dashboard
    };

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="position" enabled>
                <Text style={styles.label}>Historia Clinica</Text>
                <TextInput style={styles.input} onChangeText={this.handleHC} />

                <Text style={styles.label}>Name</Text>
                <TextInput style={styles.input} onChangeText={this.handleName} />

                <Text style={styles.label}>Tratamiento</Text>
                <TextInput style={styles.input} onChangeText={this.handleTreatment} />

                <Text style={styles.label}>Precio por tratamiento</Text>
                <TextInput style={styles.input} onChangeText={this.handlePrice} />

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

export default Factura;
