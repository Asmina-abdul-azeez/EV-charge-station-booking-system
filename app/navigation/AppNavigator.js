import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {setTopLevelNavigator} from '~helpers/NavigationService';
import Home from '~screens/Home/Home';

const AppNavigator = () => {
  const {Screen, Navigator} = createStackNavigator();

  return (
    <NavigationContainer
      ref={(navigatorRef) => {
        setTopLevelNavigator(navigatorRef);
      }}>
      <Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}>
        <Screen name="Home" component={Home} />
      </Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
