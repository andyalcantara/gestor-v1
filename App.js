import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator
} from "react-navigation";

import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Dashboard from "./components/Dashboard";
import Factura from './components/Factura';
import Calculator from './components/Calculator';
import Clinics from './components/Clinics';
import Facturas from './components/Facturas';

const StackNavigator = createStackNavigator({
  Dashboard: { screen: Dashboard },
  Signup: { screen: Signup },
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
