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

const StackNavigator = createStackNavigator({
  Signup: { screen: Signup },
  Signin: { screen: Signin },
  Dashboard: { screen: Dashboard },
  Factura: { screen: Factura }
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
