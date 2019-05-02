import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Clinic = (props) => {
    return (
        <TouchableOpacity style={styles.button} onPress={props.onPress}>
            <View style={styles.container}>
                <Text>Name: {props.name}</Text>
                <Text>Salary: {props.pay}</Text>
                <Text>{props.invoices} invoices</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
   container: {
       flexDirection: 'row',
       alignItems: 'center',
       justifyContent: 'space-evenly'
   },
    button: {
       borderRadius: 8,
       borderWidth: 1,
       borderColor: 'fuchsia',
       height: 70,
       marginTop: 10,
    }
});

export default Clinic;
