/* eslint-disable react/prop-types */
import React from 'react';
import {Image, View, Text, ScrollView, Linking, TouchableOpacity} from 'react-native';

import {success, stationPreview} from '~assets/Images';
import {Calendar, Contact, Navigate, Star} from '~assets/Icons';
import {gradientColors} from '~utilities/Constants';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '~components/CustomButton/CustomButton';
import styles from './styles';

const BookingSuccess = props => {
  const {latitude, longitude} = props;

  const handleContact = () => Linking.openURL('tel:9999999999');

  const handleCalendar = () => {};

  const handleMapNavigate = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          console.log(`Can't handle url: ${url}`);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch(err => console.error('An error occurred', err));
  };

  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <Image source={success} style={styles.image} />
        <Text style={styles.title}>Charger Booked</Text>
        <Text style={styles.subTitle}>Your charger has been Successfully Booked</Text>
        <Text style={[styles.subTitle, styles.smallText]}>Charging Hour : 2PM - 3PM</Text>
        <View style={styles.card}>
          <View style={styles.row}>
            <Image style={styles.stationImage} source={stationPreview} />
            <View>
              <Text style={styles.location}>Zeon Charging Station</Text>
              <View style={styles.row}>
                <Star style={styles.star} />
                <Text style={styles.review}>(32 reviews)</Text>
              </View>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={[styles.row, styles.iconContainer]}>
            <TouchableOpacity activeOpacity={0.8} onPress={handleContact}>
              <Contact />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={handleCalendar}>
              <Calendar />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={handleMapNavigate}>
              <Navigate />
            </TouchableOpacity>
          </View>
        </View>
        <LinearGradient useAngle angle={105.4} style={styles.button} colors={gradientColors}>
          <CustomButton textStyle={styles.buttonText} text="GO TO HOMEPAGE" />
        </LinearGradient>
      </ScrollView>
    </View>
  );
};

export default BookingSuccess;
