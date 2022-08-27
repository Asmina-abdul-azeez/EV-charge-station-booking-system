import {ScrollView, StatusBar} from 'native-base';
import React, {useRef, useState} from 'react';
import {Image, View, Text, TextInput, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {Eye} from '~assets/Icons';
import {login} from '~assets/appImages';
import CustomButton from '~components/CustomButton/CustomButton';
import {navigateTo} from '~helpers/NavigationService';
import {Colors, gradientColors} from '~utilities/Constants';

import styles from './styles';

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const inputDetails = [
    {
      label: 'Email ID',
      placeholder: 'Enter your email ID',
      value: email,
      onChange: onChangeEmail,
      ref: emailRef,
    },
    {
      label: 'Password',
      placeholder: 'Password',
      value: password,
      onChange: onChangePassword,
      Icon: Eye,
      ref: passwordRef,
    },
  ];

  const onChangeEmail = value => setEmail(value);

  const onChangePassword = value => setPassword(value);

  const handleShowPassword = () => setShowPassword(true);

  const navigateToBooking = () => navigateTo('Booking');

  const renderInput = ({label, placeholder, value, onChange, Icon, ref}) => (
    <View key={label}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.row, styles.input, ref.current?.isFocused() && styles.focused]}>
        <TextInput style={styles.inputText} ref={ref} secureTextEntry={label === 'Password' && !showPassword} onChangeText={onChange} placeholder={placeholder} value={value} placeholderTextColor={Colors.GREY} />
        {Icon && (
          <TouchableOpacity onPress={handleShowPassword} activeOpacity={0.8}>
            <Icon />
          </TouchableOpacity>
        )}
      </View>
      {label === 'Password' && (
        <TouchableOpacity activeOpacity={0.8}>
          <Text style={[styles.label, styles.forgot]}>Forgot password?</Text>
        </TouchableOpacity>
      )}
    </View>
  );
  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false} style={styles.root}>
        <Image source={login} style={styles.image} />
        <Text style={styles.title}>Welcome,</Text>
        <Text style={styles.subTitle}>Sign in to continue!</Text>
        {inputDetails.map(input => renderInput(input))}
        <LinearGradient angle={105.4} useAngle colors={gradientColors} style={styles.button}>
          <CustomButton containerStyle={styles.buttonContainer} onClick={navigateToBooking} text="LOGIN" textStyle={styles.buttonText} />
        </LinearGradient>
      </ScrollView>
    </View>
  );
};

export default Login;
