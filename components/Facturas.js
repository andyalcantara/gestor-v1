import React from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet, Image} from 'react-native';

import { connect } from 'react-redux';

import Invoice from '../utils/utility-components/Invoice';
import {getUser} from "../utils/helpers";
import {grabInvoices} from "../actions/shared";
import {aquaMarine} from "../utils/colors";

class Facturas extends React.Component {

    state = {
        clinicInvoices: [],
        total: 0,
        income: 0,
        show: false
    };

    static navigationOptions = ({navigation}) => ({
        title: navigation.getParam('title'),
        headerBackTitle: null,
    });

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
            } else {
                navigation.navigate('Signup');
            }
        });
    }

    handleIncomeCalc = (id) => {
        const { invoices, clinics } = this.props;

        let acInvoices = invoices.filter(invoice => {
            return invoice.clinic === id;
        });
        const reducer = (accumulator, value) => (accumulator * 100 + parseFloat(value.price) * 100) / 100;

        let total = acInvoices.reduce(reducer, 0);
        let income = total * clinics[id].pay;
        this.setState({
            total: total,
            income: income.toFixed(2),
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
                <TouchableOpacity
                    style={styles.invoiceButton}
                    onPress={() => this.props.navigation.navigate('Factura', {clinicId: clinicId})}
                >
                    <Text style={{color: 'black'}}>Add Invoice</Text>
                </TouchableOpacity>

                <FlatList
                    style={{marginTop: 30}}
                    data={acInvoices}
                    renderItem={({item}) => <Invoice
                                                onPress={() => alert('I was pressed!')}
                                                name={item.name}
                                                hc={item.clinicHistory}
                                                tto={item.treatments}
                                                price={item.price}
                                            />}
                    keyExtractor={(item) => item._id}
                />

                {show ? <Text>Total Facturado: {total}</Text> : <Text></Text>}
                {show ? <Text>Total Income: {income}</Text> : <Text></Text>}

                <TouchableOpacity style={styles.invoiceButton} onPress={() => this.handleIncomeCalc(clinicId)}>
                    <Text style={{color: 'black'}}>Calculate Total</Text>
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
        backgroundColor: aquaMarine,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: aquaMarine,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        marginTop: 10,
    },
});

function mapStateToProps({ invoices, clinics}) {

    let invoicesArray = Object.keys(invoices).map(key => invoices[key]);
    let acInvoices = invoicesArray.filter(invoice => {

    });

    return {
        invoices: Object.keys(invoices).map(key => invoices[key]).sort((a, b) => {
            let aDate = new Date(a.date);
            let bDate = new Date(b.date);
            return bDate - aDate;
        }),
        clinics: clinics
    }
}

export default connect(mapStateToProps)(Facturas);
