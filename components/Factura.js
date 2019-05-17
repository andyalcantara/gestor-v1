import React from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView } from 'react-native';

import SubmitButton from '../utils/utility-components/SubmitButton';
import {getUser} from "../utils/helpers";
import {createInvoice} from "../actions/shared";
import { connect } from "react-redux";

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
        this.setState({
            hc: text
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
        this.setState({
            precio: text
        });
    };

    handleSubmit = () => {
        const { hc, name, tratamiento, precio } = this.state;
        const { dispatch, navigation } = this.props;

        let clinicId = navigation.getParam('clinicId');
        console.log(clinicId, 'CLinic id from Factura');
        getUser().then(result => {
            let user = JSON.parse(result);
            dispatch(createInvoice(clinicId, user.token, {clinicHistory: hc, name: name, treatment: tratamiento, price: precio}));
            navigation.goBack();
        });
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

export default connect()(Factura);
