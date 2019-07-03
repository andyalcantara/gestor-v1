import React from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity
} from "react-native";

import { connect } from 'react-redux';

import Clinic from '../utils/utility-components/Clinic';
import SignOutButton from '../utils/utility-components/SignOutButton';

import {handleClinics, eraseClinic, grabAllInvoices} from "../actions/shared";
import {deleteUser, getUser} from "../utils/helpers";
import {logOutUser} from "../actions/user";
import {aquaMarine} from "../utils/colors";

class Dashboard extends React.Component {

    state = {
      token: ''
    };

    handleDelete = (id) => {
        const { dispatch } = this.props;
        getUser().then(result => {
            let token = JSON.parse(result).token;
            dispatch(eraseClinic(id, token))
        });
    };

    static navigationOptions = ({navigation}) => ({
        title: 'Dashboard',
        headerLeft: null,
        headerBackTitle: null,
        headerRight: (
            <SignOutButton
                onPress={() => {
                    deleteUser().then((result) => {
                        console.log(result);
                        navigation.state.params.dispatch(logOutUser());
                        navigation.navigate('Signup');
                    })
                }}
            />
        )
    });

    componentDidMount() {
        const { dispatch, navigation } = this.props;
        navigation.setParams({
            dispatch: dispatch
        });

        let token = navigation.getParam('token');
        let userId = navigation.getParam('userId');

        if (!token) {
            navigation.navigate('Signup');
        } else {
            dispatch(handleClinics(token, userId));
            dispatch(grabAllInvoices(token));
        }
    }

    handleClinicSelection = (clinic) => {
        const { navigation } = this.props;
        navigation.navigate('Facturas', { clinicId: clinic._id, title: clinic.name});
    };

    render() {

        const { clinics, navigation, total } = this.props;
        console.log(total, 'from render method');
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.clinicButton}
                    onPress={() => this.props.navigation.navigate('Clinics')}
                >
                    <Text style={{color: 'black', fontWeight: 'bold'}}>Add Clinic</Text>
                </TouchableOpacity>

                <View style={styles.list}>
                    <FlatList
                        data={clinics}
                        renderItem={({item}) => <Clinic
                                                    onPress={() => this.handleClinicSelection(item)}
                                                    name={item.name}
                                                    pay={item.pay}
                                                    invoices={item.numberOfInvoices}
                                                    onDelete={() => this.handleDelete(item._id)}
                                                />}
                        keyExtractor={(item) => item._id}
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
        backgroundColor: aquaMarine,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: aquaMarine,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        marginTop: 10,
    },
    clinicButton: {
        backgroundColor: aquaMarine,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: aquaMarine,
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

function mapStateToProps({clinics, invoices}) {

    let dateMonth = new Date().getMonth();

    // Manipulating data from store
    let invoicesArray = Object.keys(invoices).map(key => invoices[key]);
    let invoicesMonthArray = invoicesArray.filter(invoice => {
        let invoiceDate = new Date(invoice.date).getMonth();
        return dateMonth === invoiceDate;
    });

    const reducer = (accumulator, value) => accumulator + parseFloat(value.price);
    let total = invoicesMonthArray.reduce(reducer, 0);
    let acTotal;
    if (total !== 0) {
        acTotal = total;
    }

    return {
        clinics: Object.keys(clinics).map(key => clinics[key]),
        total: acTotal
    }
}

export default connect(mapStateToProps, null)(Dashboard);
