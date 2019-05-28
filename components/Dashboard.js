import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Button } from "react-native";

import { connect } from 'react-redux';

import Clinic from '../utils/utility-components/Clinic';
import SignOutButton from '../utils/utility-components/SignOutButton';

import {handleClinics, eraseClinic, grabAllInvoices} from "../actions/shared";
import {deleteToken, getUser} from "../utils/helpers";
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
    return {
        clinics: Object.keys(clinics).map(key => clinics[key])
    }
}

export default connect(mapStateToProps, null)(Dashboard);
