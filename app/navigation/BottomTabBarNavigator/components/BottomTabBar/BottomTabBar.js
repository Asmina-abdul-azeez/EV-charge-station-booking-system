/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';

import styles from './styles';

const BottomTabBar = props => {
  const {state, descriptors, navigation} = props;
  return (
    <View style={styles.root}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        let label;
        const Icon = options.tabBarIcon;
        const SelectedIcon = options.tabBarIconSelected;
        if (options.tabBarLabel) {
          label = options.tabBarLabel;
        } else if (options.routeName) {
          label = options.routeName;
        } else {
          label = route.name;
        }

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
          >
            {isFocused
              ? SelectedIcon && (
                  <View style={styles.selectedIconContainer}>
                    <SelectedIcon />
                    <Text style={styles.label}>{label}</Text>
                  </View>
                )
              : Icon && (
                  <View style={styles.iconContainer}>
                    <Icon />
                  </View>
                )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomTabBar;
