/* eslint-disable react/prop-types */
import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

import styles from './styles';

const CustomButton = props => {
  const {text, onClick, containerStyle, textStyle} = props;
  return (
    <TouchableOpacity style={[styles.container, containerStyle]} activeOpacity={0.8} onPress={onClick}>
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
