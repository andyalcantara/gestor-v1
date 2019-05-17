import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

import { connect } from 'react-redux';

import Invoice from '../utils/utility-components/Invoice';
import {getUser} from "../utils/helpers";
import {grabInvoices} from "../actions/shared";

class Facturas extends React.Component {

    static navigationOptions = {
        title: 'Facturas',
        headerBackTitle: null
    };

    componentDidMount() {
        const { navigation, dispatch } = this.props;
        let clinicId = navigation.getParam('clinicId');

        getUser().then(result => {
            let user = JSON.parse(result);
            if (user) {
                dispatch(grabInvoices(clinicId, user.id, user.token));
            }
        });
    }

    render() {
        const { invoices, navigation } = this.props;
        let clinicId = navigation.getParam('clinicId');

        let acInvoices = invoices.filter(invoice => {
            return invoice.clinic === clinicId;
        });

        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.invoiceButton} onPress={() => this.props.navigation.navigate('Factura', {clinicId: clinicId})}>
                    <Text style={{color: 'white'}}>Add Invoice</Text>
                </TouchableOpacity>

                <FlatList
                    style={{marginTop: 30}}
                    data={acInvoices}
                    renderItem={({item}) => <Invoice
                                                onPress={() => alert('I was pressed!')}
                                                name={item.name}
                                                hc={item.clinicHistory}
                                                tto={item.treatment}
                                                price={item.price}
                                            />}
                    keyExtractor={(item) => item._id}
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

function mapStateToProps({invoices}) {

    return {
        invoices: Object.keys(invoices).map(key => invoices[key])
    }
}

export default connect(mapStateToProps)(Facturas);
