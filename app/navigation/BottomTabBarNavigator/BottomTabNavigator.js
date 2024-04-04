/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Home, Booking, Profile} from '~screens';
import {HomeIcon, BookingIcon, ProfileIcon} from '~assets/Icons';
import BottomTabBar from './components/BottomTabBar/BottomTabBar';

import styles from './styles';

const {Navigator, Screen} = createBottomTabNavigator();

const BottomTabNavigator = () => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Navigator initialRouteName="Booking" tabBar={props => <BottomTabBar {...props} />}>
    <Screen
      options={{
        tabBarIcon: () => <HomeIcon style={styles.icon} />,
        tabBarIconSelected: () => <HomeIcon style={styles.selectedIcon} />,
        headerShown: false,
      }}
      name="Home"
      component={Home}
    />
    <Screen
      options={{
        tabBarIcon: () => <BookingIcon style={styles.icon} />,
        tabBarIconSelected: () => <BookingIcon style={styles.selectedIcon} />,
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
      name="Booking"
      component={Booking}
    />
    <Screen
      options={{
        tabBarIcon: () => <ProfileIcon style={styles.icon} />,
        tabBarIconSelected: () => <ProfileIcon style={styles.selectedIcon} />,
        headerShown: false,
      }}
      name="Profile"
      component={Profile}
    />
  </Navigator>
);

export default BottomTabNavigator;
