import React from 'react';
import { Platform } from 'react-native';

import { createAppContainer } from 'react-navigation';

import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';

import WelcomeScreen from './Views/WelcomeScreen';
import LoginScreen from './Views/LoginScreen';
import HomeScreen from './Views/HomeScreen';
import CuponsScreen from './Views/CuponsScreen';

const defaultBarOptions = {
  labelStyle: {
    fontSize: 20
  }
};

const TabNav = createBottomTabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name={Platform.OS === 'ios' ? "ios-home" : 'md-home'} size={24} color={tintColor} />
      ),
    },
    tabBarOptions: defaultBarOptions 
  },
  Cupons: {
    screen: CuponsScreen,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name={Platform.OS === 'ios' ? "ios-gift" : 'md-gift'} size={24} color={tintColor} />
      ),
    },
    tabBarOptions: defaultBarOptions 
  },
}, {
  initialRouteName: 'Home',
  activeTintColor: '#455eea',
});

const MainNav = createStackNavigator({
  Welcome: {
    screen: WelcomeScreen,
    navigationOptions: {
      header: null
    }
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      header: null
    }
  },
  TavNav: {
    screen: TabNav,
    navigationOptions: {
      header: null
    }
  }
});

console.disableYellowBox = true;

const App = createAppContainer(MainNav);

export default App;