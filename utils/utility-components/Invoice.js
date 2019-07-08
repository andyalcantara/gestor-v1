import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {aquaMarine} from "../colors";

const Invoice = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress} style={styles.container}>
            <View style={styles.nameHC}>
                <Text>Paciente: {props.name}</Text>
                <Text>HC: {props.hc}</Text>
            </View>

            <View style={styles.ttoPrecio}>
                <Text>TTO: {props.tto}</Text>
                <Text>Precio: {props.price}</Text>
            </View>

            <TouchableOpacity/>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
   container: {
       flexDirection: 'row',
       alignItems: 'center',
       borderColor: aquaMarine,
       borderRadius: 8,
       borderWidth: 1,
       height: 100,
       marginTop: 10,
   },
    nameHC: {
        width: '50%',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
        marginLeft: 15,
        height: '100%'
    },
    ttoPrecio: {
        width: '50%',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
        marginLeft: 15,
        height: '100%'
    }
});

export default Invoice;
