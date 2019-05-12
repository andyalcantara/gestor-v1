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

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import middleware from './middleware';

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

let store = createStore(reducer, middleware);

export default class App extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Provider store={store}>
          <AppContainer />
        </Provider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
