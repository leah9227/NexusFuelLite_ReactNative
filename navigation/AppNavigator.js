import React from 'react';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

import Home from '../containers/Home'
import Settings from '../containers/Settings';
import PaymentSelection from '../containers/PaymentSelection';
import CardPayment from '../containers/CardPayment';

const AppStack = createStackNavigator(
  {
    HomeScreen: Home,
    SettingsScreen: Settings,
    PaymentSelectionScreen: PaymentSelection,
    CardPaymentScreen: CardPayment,
  },
  // {
    // headerMode: 'none',
  // }
);

export default class AppNavigator extends React.Component {
  render() {
    //const Stack = this.props.isLogged ? AppStack : AuthStack;
    const Stack = AppStack
    return <Stack />;
  }
}
