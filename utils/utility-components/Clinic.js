import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {aquaMarine} from "../colors";

const Clinic = (props) => {
    return (
        <TouchableOpacity style={styles.button} onPress={props.onPress}>
            <View style={styles.container}>
                <Text>Name: {props.name}</Text>
                <Text>Salary: {props.pay}</Text>
                <Text>{props.invoices} invoices</Text>

                <TouchableOpacity onPress={props.onDelete}>
                    <Text style={{color: aquaMarine}}>Delete</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
   container: {
       flex: 1,
       flexDirection: 'row',
       alignItems: 'center',
       justifyContent: 'space-evenly'
   },
    button: {
       borderRadius: 8,
       borderWidth: 1,
       borderColor: aquaMarine,
       height: 70,
       marginTop: 10,
    }
});

export default Clinic;
