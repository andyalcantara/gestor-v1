import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    TextInput
} from 'react-native';

import { connect } from 'react-redux';

import Invoice from '../utils/utility-components/Invoice';
import {getUser} from "../utils/helpers";
import {grabInvoices, grabTreatments, addClinicLabCost} from "../actions/shared";
import {aquaMarine} from "../utils/colors";

class Facturas extends React.Component {

    state = {
        clinicInvoices: [],
        total: 0,
        income: 0,
        show: false,
        showCost: false,
        labCost: ''
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
                dispatch(grabTreatments(clinicId, user.token));
            } else {
                navigation.navigate('Signup');
            }
        });
    }

    showLabCostInput = () => {
        this.setState(prevState => ({
            showCost: !prevState.showCost
        }))
    };

    handleLabCost = (text) => {
        this.setState({
            labCost: text
        });
    };

    applyCostToClinic = () => {
        const { dispatch, navigation } = this.props;
        const { labCost } = this.state;
        const clinicId = navigation.getParam('clinicId');

        getUser().then(result => {
            let token = JSON.parse(result).token;
            dispatch(addClinicLabCost({labCosts: [labCost]}, token, clinicId));
            this.setState({
                showCost: false
            });
        });
    };

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
        const { invoices, navigation, treatments } = this.props;
        const { total, show, income, showCost } = this.state;

        let clinicId = navigation.getParam('clinicId');
        let acInvoices = invoices.filter(invoice => {
            return invoice.clinic === clinicId;
        });

        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.invoiceButton}
                    onPress={
                        () => this.props.navigation
                            .navigate('Factura', {clinicId: clinicId, treatment: treatments[0] !== undefined ? treatments[0].name : ''})}
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

                <TouchableOpacity
                    style={styles.invoiceButton}
                    onPress={() => this.handleIncomeCalc(clinicId)}
                >
                    <Text style={{color: 'black'}}>Calculate Total</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.labCost}
                    onPress={this.showLabCostInput}
                >
                    <Text>Costo de Laboratorio</Text>
                </TouchableOpacity>

                {showCost ?
                    <View>
                        <TextInput
                            style={styles.input}
                            onChangeText={this.handleLabCost}
                        />
                        <TouchableOpacity
                            style={styles.invoiceButton}
                            onPress={this.applyCostToClinic}
                        >
                            <Text>Aplicar Costo</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    <View></View>
                }
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
    labCost: {
        backgroundColor: aquaMarine,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: aquaMarine,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        marginTop: 10,
    },
    input: {
        borderColor: aquaMarine,
        borderRadius: 25,
        borderWidth: 1,
        width: '100%',
        height: 40,
        marginTop: 20,
        paddingLeft: 10,
    }
});

function mapStateToProps({ invoices, clinics, treatments}) {

    return {
        invoices: Object.keys(invoices).map(key => invoices[key])
            .sort((a, b) => {
                let aDate = new Date(a.date);
                let bDate = new Date(b.date);
                return bDate - aDate;
        }),
        clinics: clinics,
        treatments: Object.keys(treatments).map(key => treatments[key])
    }
}

export default connect(mapStateToProps)(Facturas);
