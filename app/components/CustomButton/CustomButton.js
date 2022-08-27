/* eslint-disable react/prop-types */
import React from 'react';
import {TouchableOpacity, Text, ActivityIndicator} from 'react-native';

import styles from './styles';

const CustomButton = props => {
  const {text, onClick, containerStyle, textStyle, isLoading} = props;
  return (
    <TouchableOpacity style={[styles.container, containerStyle]} activeOpacity={0.7} onPress={onClick}>
      {isLoading ? <ActivityIndicator color="white" /> : <Text style={[styles.text, textStyle]}>{text}</Text>}
    </TouchableOpacity>
  );
};

export default CustomButton;
