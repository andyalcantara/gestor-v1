import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator
} from "react-navigation";

import firebase from 'firebase';

import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Dashboard from "./components/Dashboard";
import Factura from './components/Factura';
import Calculator from './components/Calculator';
import Clinics from './components/Clinics';
import Facturas from './components/Facturas';

const StackNavigator = createStackNavigator({
  Signup: { screen: Signup },
  Dashboard: { screen: Dashboard },
  Signin: { screen: Signin },
  Facturas: { screen: Facturas },
  Factura: { screen: Factura },
  Clinics: { screen: Clinics},
}, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: 'fuchsia',
    },
    headerTintColor: 'white',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }
});

const TabNavigator = createBottomTabNavigator({
  Pacientes: { screen: StackNavigator },
  Calculator: { screen: Calculator }
});

const AppContainer = createAppContainer(TabNavigator);

export default class App extends React.Component {

  componentDidMount() {
    let config = {
      apiKey: "AIzaSyDtgsFRPUsaYkLKWPfOyOH-y5xSt9gi6ZQ",
      authDomain: "gestor-a4baa.firebaseapp.com",
      databaseURL: "https://gestor-a4baa.firebaseio.com",
      projectId: "gestor-a4baa",
      storageBucket: "gestor-a4baa.appspot.com",
      messagingSenderId: "503288975364"
    };
    firebase.initializeApp(config);
    // firebase.auth().onAuthStateChanged((user) => {
    //     if (user) {
    //         this.props.navigation.navigate('Dashboard');
    //     } else {
    //         this.props.navigation.navigate('Signin');
    //     }
    // })
  }

  render() {
    return (
      <View style={styles.container}>
        <AppContainer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
