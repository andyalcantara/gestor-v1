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
            console.log(result);
            if (result) {
                dispatch(logOutUser());
                navigation.navigate('Signup');
            }
        })
    };

    static navigationOptions = ({navigation}) => ({
        title: 'Dashboard',
        headerBackTitle: null,
        headerRight: (
            <SignOutButton
                onPress={() => {
                    deleteToken().then((result) => {
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

        let token = this.props.navigation.getParam('token');
        dispatch(handleClinics(token));
    }

    render() {

        const { clinics, navigation } = this.props;

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
                                                    onPress={() => navigation.navigate('Facturas', {invoices: invoices})}
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
    console.log(Object.keys(clinics).map(key => clinics[key]));
    return {
        clinics: Object.keys(clinics).map(key => clinics[key])
    }
}

export default connect(mapStateToProps, null)(Dashboard);
