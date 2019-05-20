import React from 'react';
import { View, Text, FlatList, SafeAreaView, SectionList } from "react-native";

import { connect } from 'react-redux';

class Calculator extends React.Component {

    render() {

        const { invoices, clinics, sectionListData } = this.props;
        console.log(invoices, clinics, sectionListData);

        return (
            <SafeAreaView>
                <Text>Here you can find the whole Income of your clinics</Text>

                <SectionList
                    renderItem={({item, index, section}) => (
                        <Text>{item.price}</Text>
                    )}
                    renderSectionHeader={({section: {name}}) => (
                        <Text>{name}</Text>
                    )}
                    sections={sectionListData}
                />

            </SafeAreaView>
        );
    }
}

function mapStateToProps({ invoices, clinics }) {

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

    console.log(acClinics, 'These are actual clinics');

    return {
        invoices: Object.keys(invoices).map(key => invoices[key]),
        clinics: Object.keys(clinics).map(key => clinics[key]),
        sectionListData: acClinics,
    }
}

export default connect(mapStateToProps)(Calculator);
