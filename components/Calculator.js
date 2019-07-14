import React from 'react';
import {
    View,
    Text,
    SafeAreaView,
    SectionList,
    StyleSheet,
    TouchableOpacity,
    TextInput
} from "react-native";

import { connect } from 'react-redux';
import {aquaMarine} from "../utils/colors";
import {setLabCost, setTotal} from "../actions/total";

class Calculator extends React.Component {

    state = {
        addingCost: false,
        labCost: 0,
        newTotal: 0,
        newTotalIncome: 0,
        cost: 0
    };

    componentDidMount() {
        const { labCost } = this.state;
        const { dispatch, total } = this.props;

        dispatch(setTotal(total));
        dispatch(setLabCost(labCost));
    }

    handleAddingCost = () => {
      this.setState(prevState => ({
          addingCost: !prevState.addingCost
      }));
    };

    applyCost = () => {
        // Call dispatch to set total
        const { dispatch, total } = this.props;
        const { cost } = this.state;

        let newTotal = ((total - cost) * 100) / 100;
        dispatch(setTotal(newTotal));

        this.setState({
            addingCost: false,
            newTotal: newTotal
        });
        dispatch(setLabCost(cost));
    };

    handleCost = (text) => {
        let cost = (parseFloat(text) * 100) / 100;
        this.setState({
            cost: cost
        });
    };

    render() {
        const { addingCost } = this.state;
        const { sectionListData, total, totalIncome, storeTotal } = this.props;
        let date = new Date();
        let acDate = new Intl.DateTimeFormat('es-ES', {month: 'long'}).format(date);
        console.log(storeTotal.total, 'This is totals');
        return (
            <SafeAreaView>
                <Text>Here you can find the whole Income of your clinics</Text>
                <Text>For month: {acDate}</Text>
                <SectionList
                    renderItem={({item, index, section}) => {
                        let itemDate = new Date(item.date);
                        let itemMonth = new Intl.DateTimeFormat('es-ES', {month: 'long'})
                            .format(itemDate);
                        return (
                            <View>
                                <Text>{acDate === itemMonth ? item.price : ''}</Text>
                            </View>
                        );
                    }}
                    renderSectionHeader={({section: {name}}) => (
                        <View style={styles.containerHeader}>
                            <Text style={styles.headerSection}>{name}</Text>
                        </View>
                    )}
                    sections={sectionListData}
                    keyExtractor={(item) => item._id}
                />

                <Text>Total facturado: {total.toFixed(2)}</Text>
                <Text>Total para casa: {totalIncome}</Text>

                <View style={styles.inputContainer}>
                    <TouchableOpacity
                        onPress={this.handleAddingCost}
                        style={styles.addLabCostBtn}
                    >
                        <Text style={styles.btnTxt}>Costo de Laboratorio</Text>
                    </TouchableOpacity>

                    {addingCost === true ?
                        <TextInput style={styles.input} onChangeText={this.handleCost} />
                        : <Text></Text>}

                    {addingCost === true ? (
                        <TouchableOpacity
                            onPress={this.applyCost}
                            style={styles.aplicarBtn}
                        >
                            <Text style={styles.btnTxt}>Aplicar</Text>
                        </TouchableOpacity>
                    ) : <Text></Text>}
                </View>

            </SafeAreaView>
        );
    }
}

function mapStateToProps({ invoices, clinics, totals }) {

    let superTotal = 0;
    let incomes = [];
    let dateMonth = new Date().getMonth();
    // let acTotal = Object.keys(totals).map(key => totals[key]);
    // Getting all invoices from the current month
    let invoicesArray = Object.keys(invoices).map(key => invoices[key]);
    let invoicesMonthArray = invoicesArray.filter(invoice => {
        let invoiceDate = new Date(invoice.date).getMonth();
        return dateMonth === invoiceDate;
    });

    let acClinics = Object.keys(clinics).map(key => clinics[key])
        .map(clinic => {
            let acInvoices = invoicesMonthArray.filter(invoice => {
               return invoice.clinic === clinic._id;
            });
            return {
                name: clinic.name,
                data: acInvoices
            }
        });

    const reducer = (accumulator, value) => accumulator + parseFloat(value.price);
    let total = invoicesMonthArray.reduce(reducer, 0);

    let theClinics = Object.keys(clinics).map(key => clinics[key]);
    for (let i = 0; i < theClinics.length; i++) {
        let clinic = theClinics[i];
        let invoices = invoicesMonthArray.filter(invoice => invoice.clinic === clinic._id);

        let discount = totals.cost;
        let subTotal = invoices.reduce(reducer, 0);

        let income = (subTotal - discount) * clinic.pay;
        let acIncome = {
            name: clinic.name,
            income: income
        };
        console.log(discount, 'This is discount');
        incomes.push(acIncome);
    }

    const incomeReducer = (accumulator, value) => accumulator + value.income;
    let totalIncome = incomes.reduce(incomeReducer, 0).toFixed(2);

    if (totals.cost !== 0) {
        superTotal = ((total - totals.cost) * 100) / 100;
    } else {
        superTotal = total;
    }

    return {
        invoices: Object.keys(invoices).map(key => invoices[key]),
        clinics: Object.keys(clinics).map(key => clinics[key]),
        sectionListData: acClinics,
        total: superTotal,
        totalIncome: totalIncome,
        storeTotal: totals
    }
}

const styles = StyleSheet.create({
    containerHeader: {
        alignItems: 'center',
        backgroundColor: 'lightgray',
    },
    containerPrice: {
        width: '100%',
        padding: 15,
    },
    input: {
        borderRadius: 25,
        borderWidth: 1,
        borderColor: aquaMarine,
        height: 40,
        paddingLeft: 15
    },
    inputContainer: {
        padding: 20,
    },
    addLabCostBtn: {
        alignSelf: 'center',
        height: 40,
        marginBottom: 20,
        backgroundColor: aquaMarine,
        borderRadius: 25,
        justifyContent: 'center',
        padding: 10
    },

    aplicarBtn: {
        alignSelf: 'center',
        height: 40,
        marginTop: 20,
        backgroundColor: aquaMarine,
        borderRadius: 25,
        justifyContent: 'center',
        padding: 10
    },
    btnTxt: {
        color: 'black'
    }
});

export default connect(mapStateToProps)(Calculator);
