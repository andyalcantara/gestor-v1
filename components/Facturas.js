import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

import Invoice from '../utils/utility-components/Invoice';

class Facturas extends React.Component {

    static navigationOptions = {
      title: 'Facturas',
        headerBackTitle: null
    };

    render() {

        const { navigation } = this.props;
        let invoices = navigation.getParam('invoices', []);

        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.invoiceButton} onPress={() => this.props.navigation.navigate('Factura')}>
                    <Text style={{color: 'white'}}>Add Invoice</Text>
                </TouchableOpacity>

                <FlatList
                    style={{marginTop: 30}}
                    data={invoices}
                    renderItem={({item}) => <Invoice
                                                onPress={() => alert('I was pressed!')}
                                                name={item.name}
                                                hc={item.clinicHistory}
                                                tto={item.treatment}
                                                price={item.pricePerTreatment}
                                            />}
                    keyExtractor={(item) => item.id}
                />
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
});

export default Facturas;
