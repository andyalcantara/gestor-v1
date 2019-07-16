import React from 'react';
import {
    Text,
    TextInput,
    StyleSheet,
    KeyboardAvoidingView,
    Picker,
    View,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    Modal
} from 'react-native';

import SubmitButton from '../utils/utility-components/SubmitButton';
import {getUser} from "../utils/helpers";
import {
    createInvoice,
    createTreatment,
    grabTreatments
} from "../actions/shared";
import { connect } from "react-redux";
import {aquaMarine} from "../utils/colors";
import { Ionicons } from '@expo/vector-icons';

class Factura extends React.Component {

    static navigationOptions = {
        title: 'Add Factura',
    };

    state = {
        hc: 0,
        name: '',
        tratamiento: '',
        precio: 0,
        precioTotal: 0,
        modalOpen: false,
        treatName: '',
        tratamientos: [],
        treatPrice: 0,
        treatFromInput: '',
        priceFromInput: '',
        firstTreatPrice: 0
    };

    componentDidMount() {
        const { dispatch, navigation } = this.props;
        const clinicId = navigation.getParam('clinicId');
        const treatment = navigation.getParam('treatment');

        this.setState({
            tratamiento: treatment.name,
            firstTreatPrice: treatment.value
        });

        getUser().then(result => {
            let user = JSON.parse(result);
            if (user) {
                dispatch(grabTreatments(clinicId, user.token));
            }
        });
    }

    handleNombreDescuento = (text) => {
      this.setState({
          treatFromInput: text
      });
    };

    handlePrecioDescuento = (text) => {
        this.setState({
            priceFromInput: parseFloat(text)
        });
    };

    handleTreatName = (text) => {
        this.setState({
            treatName: text
        });
    };

    handleTreatPrice = (text) => {
        this.setState({
            treatPrice: parseFloat(text.trim())
        });
    };

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

    handleTreatments = () => {
        const { tratamiento, precio, firstTreatPrice } = this.state;

        if (parseFloat(precio) === 0) {
            this.setState(oldState => ({
                tratamientos: oldState.tratamientos.concat(tratamiento),
                precioTotal: (oldState.precioTotal * 100 + parseFloat(firstTreatPrice) * 100) / 100
            }));
        } else {
            this.setState(oldState => ({
                tratamientos: oldState.tratamientos.concat(tratamiento),
                precioTotal: (oldState.precioTotal * 100 + parseFloat(precio) * 100) / 100
            }));
        }
    };

    handleSubmit = () => {
        const { hc, name, tratamiento, tratamientos, precioTotal, precio, priceFromInput } = this.state;
        const { dispatch, navigation } = this.props;

        let clinicId = navigation.getParam('clinicId');

        if (hc === 0 || name === '' || tratamiento === '') {
            alert('Hola!! Todos los campos son requeridos')
        } else {
            getUser().then(result => {
                let user = JSON.parse(result);

                if (precioTotal !== 0) {
                    if (priceFromInput !== '') {
                        console.log(precioTotal, 'This is precio total');
                        dispatch(createInvoice(clinicId, user.token, {
                            clinicHistory: hc,
                            name: name,
                            treatment: tratamiento,
                            price: precioTotal + priceFromInput,
                            treatments: tratamientos
                        }));
                        navigation.goBack();
                    } else {
                        dispatch(createInvoice(clinicId, user.token, {
                            clinicHistory: hc,
                            name: name,
                            treatment: tratamiento,
                            price: precioTotal,
                            treatments: tratamientos
                        }));
                        navigation.goBack();
                    }
                } else {
                    if (priceFromInput !== '' && precio === 0) {
                        dispatch(createInvoice(clinicId, user.token, {
                            clinicHistory: hc,
                            name: name,
                            treatment: tratamiento,
                            price: priceFromInput,
                            treatments: tratamientos
                        }));
                        navigation.goBack();
                    } else if (priceFromInput !== '' && precio !== 0) {

                        let totalAmount = parseFloat(precio) + priceFromInput;

                        dispatch(createInvoice(clinicId, user.token, {
                            clinicHistory: hc,
                            name: name,
                            treatment: tratamiento,
                            price: totalAmount,
                            treatments: tratamientos
                        }));
                        navigation.goBack();
                    } else if (precio !== 0) {
                        dispatch(createInvoice(clinicId, user.token, {
                            clinicHistory: hc,
                            name: name,
                            treatment: tratamiento,
                            price: precio,
                            treatments: tratamientos
                        }));
                        navigation.goBack();
                    }
                }
            });
        }
    };

    handleSubmitTreatment = () => {
        const { treatName, treatPrice } = this.state;
        const { navigation, dispatch } = this.props;

        if (treatName === '' || treatPrice === 0) {
            alert('Hola!! Todos los campos son requeridos');
        } else {
            let clinicId = navigation.getParam('clinicId');
            getUser().then(result => {
                let user = JSON.parse(result);
                let body = {
                    name: treatName,
                    value: treatPrice
                };
                dispatch(createTreatment(clinicId, user.token, body));
            });
        }
    };

    render() {
        const { treatments } = this.props;
        const { tratamientos, priceFromInput, treatFromInput } = this.state;

        return (
            <KeyboardAvoidingView style={styles.container} behavior="position" enabled>
                <ScrollView style={{height: '100%'}}>
                    <Text style={styles.label}>Historia Clinica</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={this.handleHC}
                        value={this.state.hc.toString()}
                    />

                    <Text style={styles.label}>Name</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={this.handleName}
                        value={this.state.name}
                    />

                    <Text style={styles.label}>Nombre de tratamiento</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={this.handleNombreDescuento}
                    />
                    {
                        treatFromInput ?
                            <View>
                                <Text style={styles.label}>Descuento</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={this.handlePrecioDescuento}
                                />
                            </View> :
                            <View></View>
                    }

                    <Text style={styles.label}>Tratamientos</Text>
                    {tratamientos.length > 0 ?
                        tratamientos.map(tratamiento => (
                            <View key={tratamiento} style={{flexDirection: 'row'}}>
                                <Text>[{tratamiento}]</Text>
                            </View>
                        )) :
                        <Text></Text>
                    }

                    <View style={{flex: 2, alignItems: 'center'}}>
                        <Picker
                            selectedValue={this.state.precio}
                            style={{height: 50, width: 200}}
                            itemStyle={{fontSize: 13}}
                            onValueChange={(itemValue, itemPosition) => {
                                this.setState({
                                    tratamiento: treatments[itemPosition].name,
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
                        <TouchableOpacity
                            style={styles.plusBtn}
                            onPress={this.handleTreatments}
                        >
                            <Ionicons name="ios-add" size={30} color="black" />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.addTreatmentBtn}
                            onPress={() => this.setState({modalOpen: true})}
                        >
                            <Text style={{color: 'black'}}>Add Treatment</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <SubmitButton onPress={this.handleSubmit} />
                    </View>
                </ScrollView>

                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalOpen}
                >
                    <SafeAreaView style={styles.modalContainer}>
                        <KeyboardAvoidingView behavior="position" enabled>
                            <View style={{padding: 10}}>
                                <TouchableOpacity
                                    style={{alignSelf: 'flex-end', marginRight: 40}}
                                    onPress={
                                        () => this.setState({modalOpen: false})
                                    }
                                >
                                    <Ionicons name="ios-close" size={30} color="black" />
                                </TouchableOpacity>

                                <Text>Nombre del Tratamiento:</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={this.handleTreatName}
                                />

                                <Text>Precio</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={this.handleTreatPrice}
                                />

                                <SubmitButton onPress={this.handleSubmitTreatment} />
                            </View>
                        </KeyboardAvoidingView>
                    </SafeAreaView>
                </Modal>

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
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 50,
        paddingLeft: 30

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
        marginTop: 0,
        backgroundColor: aquaMarine,
        borderRadius: 25,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 10,
        paddingRight: 10
    },
    plusBtn: {
        marginTop: 220,
        backgroundColor: aquaMarine,
        borderRadius: 25,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        alignSelf: 'flex-end'
    }
});

function mapStateToProps({ treatments }) {
    return {
        treatments: Object.keys(treatments).map(key => treatments[key])
    }
}

export default connect(mapStateToProps)(Factura);
