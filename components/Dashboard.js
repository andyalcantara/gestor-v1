import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Button } from "react-native";

import { connect } from 'react-redux';

import Clinic from '../utils/utility-components/Clinic';
import SignOutButton from '../utils/utility-components/SignOutButton';

import {handleClinics} from "../actions/shared";
import {deleteToken} from "../utils/helpers";
import {logOutUser} from "../actions/user";

class Dashboard extends React.Component {

    state = {
      token: ''
    };

    handleSignOut = () => {
        const { navigation, dispatch } = this.props;

        deleteToken().then((result) => {
            if (result) {
                dispatch(logOutUser());
                navigation.navigate('Signup');
            }
        })
    };

    static navigationOptions = {
        title: 'Dashboard',
        headerBackTitle: null,
        headerRight: (
            <SignOutButton onPress={this.handleSignOut} />
        )
    };

    componentDidMount() {
        const { dispatch } = this.props;

        let token = this.props.navigation.getParam('token');
        dispatch(handleClinics(token));
    }

    render() {

        const { clinics } = this.props;

        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.clinicButton}
                    onPress={() => this.props.navigation.navigate('Clinics')}
                >
                    <Text style={{color: 'white', fontWeight: 'bold'}}>Add Clinic</Text>
                </TouchableOpacity>

                <View style={styles.list}>
                    <FlatList
                        data={clinics}
                        renderItem={({item}) => <Clinic
                                                    onPress={() => this.props.navigation.navigate('Facturas', {invoices: invoices})}
                                                    name={item.name}
                                                    pay={item.pay}
                                                    invoices={item.numberOfInvoices}
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
        backgroundColor: 'fuchsia',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'fuchsia',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        marginTop: 10,
    },
    clinicButton: {
        backgroundColor: 'fuchsia',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'fuchsia',
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

function mapStateToProps({clinics}) {

    return {
        clinics: Object.keys(clinics).map(key => clinics[key])
    }
}

export default connect(mapStateToProps, null)(Dashboard);
