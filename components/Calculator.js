import React from 'react';
import { View, Text, SafeAreaView, SectionList, StyleSheet } from "react-native";

import { connect } from 'react-redux';

class Calculator extends React.Component {

    render() {

        const { invoices, clinics, sectionListData, total, totalIncome } = this.props;

        return (
            <SafeAreaView>
                <Text>Here you can find the whole Income of your clinics</Text>

                <SectionList
                    renderItem={({item, index, section}) => (
                        <View>
                            <Text>{item.price}</Text>
                        </View>
                    )}
                    renderSectionHeader={({section: {name}}) => (
                        <View style={styles.containerHeader}>
                            <Text style={styles.headerSection}>{name}</Text>
                        </View>
                    )}
                    sections={sectionListData}
                    keyExtractor={(item) => item._id}
                />

                <Text>Total facturado: {total}</Text>
                <Text>Total para casa: {totalIncome}</Text>

            </SafeAreaView>
        );
    }
}

function mapStateToProps({ invoices, clinics }) {

    let incomes = [];

    // Manipulating data from store
    let invoicesArray = Object.keys(invoices).map(key => invoices[key]);

    let acClinics = Object.keys(clinics).map(key => clinics[key])
        .map(clinic => {
            let acInvoices = invoicesArray.filter(invoice => {
               return invoice.clinic === clinic._id;
            });
            return {
                name: clinic.name,
                data: acInvoices
            }
        });

    const reducer = (accumulator, value) => accumulator + parseFloat(value.price);
    let total = invoicesArray.reduce(reducer, 0);

    let theClinics = Object.keys(clinics).map(key => clinics[key]);
    for (let i = 0; i < theClinics.length; i++) {
        let clinic = theClinics[i];
        let invoices = invoicesArray.filter(invoice => invoice.clinic === clinic._id);

        let subTotal = invoices.reduce(reducer, 0);
        let income = subTotal * clinic.pay;
        let acIncome = {
            name: clinic.name,
            income: income
        };

        incomes.push(acIncome);
    }

    const incomeReducer = (accumulator, value) => accumulator + value.income;
    let totalIncome = incomes.reduce(incomeReducer, 0);

    return {
        invoices: Object.keys(invoices).map(key => invoices[key]),
        clinics: Object.keys(clinics).map(key => clinics[key]),
        sectionListData: acClinics,
        total: total,
        totalIncome: totalIncome
    }
}

const styles = StyleSheet.create({
    containerHeader: {
        alignItems: 'center',
        backgroundColor: 'lightgray',
    },
    headerSection: {

    },
    containerPrice: {
        width: '100%',
        padding: 15,
    }
});

export default connect(mapStateToProps)(Calculator);
