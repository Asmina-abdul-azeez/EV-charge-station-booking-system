/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
import {
  Dimensions, Image, PermissionsAndroid, View, Text, TouchableOpacity,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import LinearGradient from 'react-native-linear-gradient';
import { currentPosition, stationIcon, stationPreview } from '~assets/Images';

import CustomBottomSheet from '~components/CustomBottomSheet/CustomBottomSheet';
import { navigateTo } from '~helpers/NavigationService';
import {Location, Price, Time} from '~assets/Icons';

import CustomButton from '~components/CustomButton/CustomButton';

import { gradientColors } from '~utilities/Constants';
import SearchBar from '../../components/SearchBar/SearchBar';
import {
  fetchLatLng,
  useLazyGetPlacesPredictionsQuery,
} from './api';

import {markers, mcD} from './data';
import styles from './styles';

const slots = [
  {
    time: '10 AM - 11 AM',
    available: true,
  },
  {
    time: '11 AM - 12 PM',
    available: false,
  },
  {
    time: '12 PM - 1 PM',
    available: true,
  },
  {
    time: '1 PM - 2 PM',
    available: true,
  },
  {
    time: '2 PM - 3 PM',
    available: true,
  },
  {
    time: '3 PM - 4 PM',
    available: true,
  },
  {
    time: '4 PM - 5 PM',
    available: true,
  },
  {
    time: '5 PM - 6 PM',
    available: true,
  },
  {
    time: '6 PM - 7 PM',
    available: true,
  },
  {
    time: '8 PM - 9 PM',
    available: true,
  },
  {
    time: '8 PM - 9 PM',
    available: true,
  },
  {
    time: '10 PM - 11 PM',
    available: true,
  },
];

const Booking = (props) => {
  const {stationName = 'Zeon Charging Station', stationAddress = 'Gokul Oottupura Veg Restaurant, NH66, Padivattom, Edappally', stationImage, openTime = '10:00 AM', closeTime = '10:59 PM', price = '₹ 25/kWh'} = props;

  const [region, setRegion] = useState(mcD);
  const [search, setSearch] = useState({term: '', fetchPredictions: false});
  const [predictions, setPredictions] = useState([]);
  const [showPredictions, setShowPredictions] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState();
  const [isVisible, setVisible] = useState(true);

  const mapRef = useRef();

  const [getPlacesPredictions] = useLazyGetPlacesPredictionsQuery();

  const onChangeText = async text => {
    setSearch({term: text, fetchPredictions: true});
    if (text.trim() === '') {
      setPredictions([]);
      setShowPredictions(false);
      return;
    }
    // const result = await fetchPredictions(text);
    // setPredictions(result.predictions);
    // setShowPredictions(true);
    const res = await getPlacesPredictions(text);
    console.log('rose predictions1', res);
  };

  const onPredictionTapped = async (placeId, description) => {
    const result = await fetchLatLng(placeId);
    setShowPredictions(false);
    setSearch({term: description});
    setRegion({latitude: result.location.lat, longitude: result.location.lng});
    updateCameraHeading(result.location);
  };

  const updateCameraHeading = l => {
    mapRef.current.animateCamera({center: {latitude: l.lat, longitude: l.lng}});
  };

  const checkForLocationPermission = () => {
    // TO DO - to handle if permission is denied
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
  };

  const attributes = [
    {
      Icon: Location,
      label: '5.9km',
    },
    {
      Icon: Time,
      label: `${openTime} - ${closeTime}`,
    },
    {
      Icon: Price,
      label: price,
    },
  ];

  const closeModal = () => setVisible(false);

  const renderAttribute = item => {
    const {Icon, label} = item;
    return (
      <View style={styles.row}>
        <Icon />
        <Text style={styles.attributeText}>{label}</Text>
      </View>
    );
  };

  const renderSlots = () => (
    <View style={[styles.row, styles.slotRow]}>
      {slots.map(slot => {
        const {available, time} = slot;
        const isSelected = selectedSlot === time;
        return (
          <TouchableOpacity disabled={!available} activeOpacity={0.8} onPress={() => setSelectedSlot(time)} style={[styles.slotContainer, available && styles.availableSlot, isSelected && styles.selectedSlot]}>
            <Text style={[styles.slotText, available && styles.blackText]}>{time}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  const navigateToBookingSuccess = () => {
    setVisible(false);
    navigateTo('BookingSuccess');
  };

  return (
    <>
      <MapView
        ref={mapRef}
        provider="google"
        mapType="standard" // [hybrid, standard]
        initialRegion={region}
        // region={region}
        onMapReady={checkForLocationPermission}
        // onRegionChange={onRegionChange}
        showsUserLocation
        style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height}}>
        {markers.map((marker) => (
          <Marker
            key={marker.title}
            // onPress={e => console.log('rose e', e)}
            coordinate={marker.latlng}
            title={marker.title}
            description={marker.description}>
            <Image
              source={stationIcon}
              style={{width: 36, height: 36}}
            />
          </Marker>
        ))}
        <Marker
          // flat
          coordinate={region}
        >
          <Image source={currentPosition} style={{width: 24, height: 24}} />
        </Marker>
      </MapView>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          paddingHorizontal: 16,
          paddingTop: 20,
        }}>
        <SearchBar
          value={search.term}
          onChangeText={onChangeText}
          showPredictions={showPredictions}
          predictions={predictions}
          onPredictionTapped={onPredictionTapped}
        />
        <CustomBottomSheet handleSwipeDown={closeModal} isVisible={isVisible} customStyle={styles.modal}>
          <TouchableOpacity onPress={closeModal} style={styles.slider} />
          <View style={[styles.row, styles.stationDetails]}>
            <View>
              <Image style={styles.image} source={stationPreview} />
              <View style={styles.banner}><Text style={styles.bannerText}>Open</Text></View>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{stationName}</Text>
              <Text style={styles.subTitle}>{stationAddress}</Text>
            </View>
          </View>
          <View style={[styles.row, styles.attributeContainer]}>{attributes.map(attribute => renderAttribute(attribute))}</View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={[styles.subTitle, styles.blackText]}>Upcoming Slots</Text>
          </View>
          {renderSlots()}
          <View style={[styles.row, styles.attributeContainer]}>
            <CustomButton text="CANCEL" containerStyle={styles.cancel} />
            <LinearGradient useAngle angle={105.4} colors={gradientColors} style={[styles.book, !!selectedSlot && styles.enabledButton]}>
              <CustomButton onClick={navigateToBookingSuccess} containerStyle={styles.buttonContainer} text="BOOK NOW" />
            </LinearGradient>
          </View>
        </CustomBottomSheet>
      </View>
    </>
  );
};

export default Booking;
