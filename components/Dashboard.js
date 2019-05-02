import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";

import Clinic from '../utils/utility-components/Clinic';

const invoices = [
    {id: '1', clinicHistory: 8438, name: 'Fulano Mengano', treatment: 'Obt', pricePerTreatment: 39.80 },
    {id: '2', clinicHistory: 8431, name: 'Emet Piwitina', treatment: 'Obt', pricePerTreatment: 39.80 },
    {id: '3', clinicHistory: 8432, name: 'Andy Piwitino', treatment: 'Obt', pricePerTreatment: 39.80 },
    {id: '4', clinicHistory: 8433, name: 'Lizet Guajira', treatment: 'Obt', pricePerTreatment: 39.80 },
    {id: '5', clinicHistory: 8434, name: 'Jane Guajira', treatment: 'Obt', pricePerTreatment: 39.80 },
    {id: '6', clinicHistory: 8435, name: 'La Mami', treatment: 'Obt', pricePerTreatment: 39.80 },
    {id: '7', clinicHistory: 8436, name: 'El Chacal', treatment: 'Obt', pricePerTreatment: 39.80 },
    {id: '8', clinicHistory: 8437, name: 'Mirame pero no toques', treatment: 'Obt', pricePerTreatment: 39.80 }
];

const clinics = [
    { id: '1', name: 'Vitaldent', pay: 23, numberOfInvoices: 8 },
    { id: '2', name: 'Vitaldent', pay: 30, numberOfInvoices: 10 }
];

class Dashboard extends React.Component {

    static navigationOptions = {
        title: 'Dashboard',
        headerBackTitle: null
    };

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.clinicButton} onPress={() => this.props.navigation.navigate('Clinics')}>
                    <Text style={{color: 'white', fontWeight: 'bold'}}>Add Clinic</Text>
                </TouchableOpacity>

                <View style={styles.list}>
                    <FlatList
                        data={clinics}
                        renderItem={({item}) => <Clinic
                                                    onPress={() => this.props.navigation.navigate('Facturas', {invoices: invoices})}
                                                    name={item.name}
                                                    pay={item.pay}
                                                    invoices={item.numberOfInvoices}
                                                />}
                        keyExtractor={(item) => item.id}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        marginTop: 40,
    },
    invoiceButton: {
        backgroundColor: 'fuchsia',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'fuchsia',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        marginTop: 10,
    },
    clinicButton: {
        backgroundColor: 'fuchsia',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'fuchsia',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
    },
    list: {
        marginTop: 20,
        borderRadius: 8,
        backgroundColor: 'lightgray',
        padding: 10,
    }
});

export default Dashboard;
