import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
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
import { aquaMarine } from "./utils/colors";
import image from './assets/bar.jpg';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './reducers';
import middleware from './middleware';

import { Ionicons } from '@expo/vector-icons';

const StackNavigator = createStackNavigator({
  Signup: { screen: Signup },
  Dashboard: { screen: Dashboard },
  Signin: { screen: Signin },
  Facturas: { screen: Facturas },
  Factura: { screen: Factura },
  Clinics: { screen: Clinics},
}, {
  defaultNavigationOptions: {
    headerBackground: (
        <Image source={require('./assets/bar.jpg')} style={{width: 375, height: 90}} />
    ),
    headerStyle: {
    },
    headerTintColor: 'black',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }
});

const TabNavigator = createBottomTabNavigator({
  Pacientes: { screen: StackNavigator },
  Total: { screen: Calculator }
}, {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ tintColor }) => {
      const { routeName } = navigation.state;

      if (routeName === 'Pacientes') {
        return <Ionicons name="ios-people" size={30} color={tintColor} />
      }

      if (routeName === 'Total') {
        return <Ionicons name="ios-cash" size={30} color={tintColor} />
      }
    }
  }),
  tabBarOptions: {
    activeTintColor: aquaMarine,
    inactiveTintColor: 'black'
  }
});

const AppContainer = createAppContainer(TabNavigator);

let store = createStore(rootReducer, middleware);

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
