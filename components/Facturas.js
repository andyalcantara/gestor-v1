import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

import { connect } from 'react-redux';

import Invoice from '../utils/utility-components/Invoice';
import {getUser} from "../utils/helpers";
import {grabInvoices} from "../actions/shared";

class Facturas extends React.Component {

    state = {
        clinicInvoices: [],
        total: 0,
        income: 0,
        show: false
    };

    static navigationOptions = {
        title: 'Facturas',
        headerBackTitle: null
    };

    componentDidMount() {
        const { navigation, dispatch, invoices } = this.props;
        let clinicId = navigation.getParam('clinicId');

        let acInvoices = invoices.filter(invoice => {
            return invoice.clinic === clinicId;
        });

        this.setState({
            clinicInvoices: acInvoices
        });

        getUser().then(result => {
            let user = JSON.parse(result);
            if (user) {
                dispatch(grabInvoices(clinicId, user.id, user.token));
            }
        });
    }

    handleIncomeCalc = (id) => {
        const { invoices, clinics } = this.props;

        let acInvoices = invoices.filter(invoice => {
            return invoice.clinic === id;
        });
        const reducer = (accumulator, value) => accumulator + parseFloat(value.price);

        let total = acInvoices.reduce(reducer, 0);
        let income = total * clinics[id].pay;
        this.setState({
            total: total,
            income: income,
            show: true
        });
    };

    render() {
        const { invoices, navigation } = this.props;
        const { total, show, income } = this.state;

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

                {show ? <Text>Total Facturado: {total}</Text> : <Text></Text>}
                {show ? <Text>Total Income: {income}</Text> : <Text></Text>}

                <TouchableOpacity style={styles.invoiceButton} onPress={() => this.handleIncomeCalc(clinicId)}>
                    <Text style={{color: 'white'}}>Calculate Total</Text>
                </TouchableOpacity>
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

function mapStateToProps({ invoices, clinics}) {

    return {
        invoices: Object.keys(invoices).map(key => invoices[key]),
        clinics: clinics
    }
}

export default connect(mapStateToProps)(Facturas);
