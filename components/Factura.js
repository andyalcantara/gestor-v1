import React from 'react';
import {
    Text,
    TextInput,
    StyleSheet,
    KeyboardAvoidingView,
    Picker,
    View,
    ScrollView,
    TouchableOpacity
} from 'react-native';

import SubmitButton from '../utils/utility-components/SubmitButton';
import {getUser} from "../utils/helpers";
import {createInvoice, grabTreatments} from "../actions/shared";
import { connect } from "react-redux";
import {aquaMarine} from "../utils/colors";

class Factura extends React.Component {

    static navigationOptions = {
        title: 'Add Factura'
    };

    state = {
      hc: 0,
      name: '',
      tratamiento: '',
      precio: 0,
    };

    componentDidMount() {
        const { dispatch, navigation } = this.props;
        const clinicId = navigation.getParam('clinicId');
        getUser().then(result => {
            let user = JSON.parse(result);
            if (user) {
                dispatch(grabTreatments(clinicId, user.token));
            }
        });
    }

    handleHC = (text) => {
        this.setState({
            hc: text
        });
    };

    handleName = (text) => {
        this.setState({
            name: text
        });
    };

    handleSubmit = () => {
        const { hc, name, tratamiento, precio } = this.state;
        const { dispatch, navigation } = this.props;

        let clinicId = navigation.getParam('clinicId');
        console.log(clinicId, 'CLinic id from Factura');
        getUser().then(result => {
            let user = JSON.parse(result);
            dispatch(createInvoice(clinicId, user.token, {clinicHistory: hc, name: name, treatment: tratamiento, price: precio}));
            navigation.goBack();
        });
    };

    render() {
        const { treatments } = this.props;
        return (
            <KeyboardAvoidingView style={styles.container} behavior="position" enabled>
                <ScrollView style={{height: '100%'}}>
                    <Text style={styles.label}>Historia Clinica</Text>
                    <TextInput style={styles.input} onChangeText={this.handleHC} />

                    <Text style={styles.label}>Name</Text>
                    <TextInput style={styles.input} onChangeText={this.handleName} />

                    <Text style={styles.label}>Tratamiento</Text>

                    <View style={{flex: 2, alignItems: 'center'}}>
                        <Picker
                            selectedValue={this.state.precio}
                            style={{height: 50, width: 200}}
                            itemStyle={{fontSize: 13}}
                            onValueChange={(itemValue, itemIndex) => {
                                this.setState({
                                    tratamiento: treatments[itemIndex].name,
                                    precio: itemValue})
                            }}
                        >
                            {
                                treatments.map(treatment => (
                                    <Picker.Item
                                        key={treatment._id}
                                        label={treatment.name + '-' + treatment.value}
                                        value={treatment.value}
                                    />
                                ))
                            }
                        </Picker>

                        <TouchableOpacity style={styles.addTreatmentBtn} onPress={() => alert('I was pressed')}>
                            <Text style={{color: 'white'}}>Add Treatment</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <SubmitButton onPress={this.handleSubmit} />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
   container: {
       flex: 1,
       justifyContent: 'center',
       padding: 10
   },
    input: {
        borderColor: aquaMarine,
        borderRadius: 25,
        borderWidth: 1,
        width: '100%',
        height: 40,
        marginTop: 20,
        paddingLeft: 10,
    },
    label: {
       marginTop: 10
    },
    addTreatmentBtn: {
        marginTop: 260,
        backgroundColor: aquaMarine,
        borderRadius: 25,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 10,
        paddingRight: 10
    }
});

function mapStateToProps({ treatments }) {
    return {
        treatments: Object.keys(treatments).map(key => treatments[key])
    }
}

export default connect(mapStateToProps)(Factura);
