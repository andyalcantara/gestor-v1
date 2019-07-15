import React from 'react';
import {
    View,
    Text,
    SafeAreaView,
    SectionList,
    StyleSheet
} from "react-native";

import { connect } from 'react-redux';
import {aquaMarine} from "../utils/colors";

class Calculator extends React.Component {

    render() {
        const { sectionListData, total, totalIncome } = this.props;
        let date = new Date();
        let acDate = new Intl.DateTimeFormat('es-ES', {month: 'long'}).format(date);

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
            </SafeAreaView>
        );
    }
}

function mapStateToProps({ invoices, clinics }) {

    let incomes = [];
    let costs = [];
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

    const costsReducer = (accumulator, value) => accumulator + parseFloat(value);

    let theClinics = Object.keys(clinics).map(key => clinics[key]);
    for (let i = 0; i < theClinics.length; i++) {
        let clinic = theClinics[i];
        let invoices = invoicesMonthArray.filter(invoice => invoice.clinic === clinic._id);
        let subTotal = invoices.reduce(reducer, 0);
        let costs = clinic.labCosts.reduce(costsReducer, 0);

        let income = (subTotal - costs) * clinic.pay;
        let acIncome = {
            name: clinic.name,
            income: income
        };
        incomes.push(acIncome);
    }

    theClinics.forEach(clinic => {
       clinic.labCosts.forEach(cost => {
           costs.push(cost);
       });
    });

    let totalCost = costs.reduce(costsReducer, 0);

    const incomeReducer = (accumulator, value) => accumulator + value.income;
    let totalIncome = incomes.reduce(incomeReducer, 0).toFixed(2);

    return {
        invoices: Object.keys(invoices).map(key => invoices[key]),
        clinics: Object.keys(clinics).map(key => clinics[key]),
        sectionListData: acClinics,
        total: total - totalCost,
        totalIncome: totalIncome
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
