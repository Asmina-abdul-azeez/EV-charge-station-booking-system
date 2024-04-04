import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {setTopLevelNavigator} from '~helpers/NavigationService';
import {Login, BookingSuccess} from '~screens';
import BottomTabNavigator from './BottomTabBarNavigator';

const AppNavigator = () => {
  const {Screen, Navigator} = createStackNavigator();

  return (
    <NavigationContainer
      ref={navigatorRef => {
        setTopLevelNavigator(navigatorRef);
      }}>
      <Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}>
        <Screen name="Login" component={Login} />
        <Screen name="Booking" component={BottomTabNavigator} />
        <Screen name="BookingSuccess" component={BookingSuccess} />
      </Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
