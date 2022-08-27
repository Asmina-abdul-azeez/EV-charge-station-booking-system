/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState, useEffect} from 'react';
import {
  Dimensions, Image, PermissionsAndroid, View, Text, TouchableOpacity,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import LinearGradient from 'react-native-linear-gradient';
import { currentPosition, stationIcon, stationPreview, selectedStationIcon } from '~assets/appImages';

import CustomBottomSheet from '~components/CustomBottomSheet/CustomBottomSheet';
import { navigateTo } from '~helpers/NavigationService';
import {CalendarSmall, Location, Price, Time} from '~assets/Icons';

import CustomButton from '~components/CustomButton/CustomButton';

import { Colors, gradientColors } from '~utilities/Constants';
import SearchBar from '~components/SearchBar/SearchBar';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import {
  // fetchDistanceBetweenPoints,
  fetchLatLng,
  useLazyGetPlacesPredictionsQuery,
  useGetChargingStationsQuery,
} from './api';

import {mcD} from './data';
import { GOOGLE_API_KEY } from '../../constants';
import { useDebounce } from '../../hooks/useDebounce';
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

  const [region, setRegion] = useState(mcD); // TO DO - update initial location
  const [search, setSearch] = useState({term: '', fetchPredictions: false});
  const [predictions, setPredictions] = useState([]);
  const [showPredictions, setShowPredictions] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState();
  const [showPopup, setShowPopup] = useState(false); // TO DO - remove this boolean
  const [selectedStation, setSelectedStation] = useState(); // TO DO - use this for showing modal
  const [selectedDate, setSelectedDate] = useState();
  const [markedDate, setMarkedDate] = useState({});
  const [showCalendar, setShowCalendar] = useState();

  const mapRef = useRef();

  useEffect(() => {
    const date = new Date().toLocaleDateString();
    const formattedDate = moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD');
    handleDateSelection(formattedDate);
  }, []);

  const {data} = useGetChargingStationsQuery();
  const formatDataIntoMarker = () => {
    let markerSet = [];
    if (data) {
      markerSet = data.map(item => ({
        id: item.id,
        latlng: {
          latitude: parseFloat(item.latitude),
          longitude: parseFloat(item.longitude),
        },
      }));
    }
    return markerSet;
  };

  const markers = formatDataIntoMarker();

  const [getPlacesPredictions] = useLazyGetPlacesPredictionsQuery();

  useEffect(() => {
    const watchId = Geolocation.watchPosition(
      pos => {
        setRegion({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      },
      e => console.log('rose error in watch', e),
    );
    return () => Geolocation.clearWatch(watchId);
  }, []);

  const handleDateSelection = (date) => {
    const dateObj = {};
    dateObj[date] = {
      selected: true,
      selectedColor: Colors.TURQUOISE,
      customStyles: {
        text: {
          color: Colors.WHITE,
        },
      },
    };
    setMarkedDate(dateObj);
    const formattedDate = moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY');
    setSelectedDate(formattedDate);
    setShowCalendar(false);
  };

  const onChangeText = async () => {
    if (search.term?.trim() === '') {
      setPredictions([]);
      setShowPredictions(false);
      return;
    }
    if (!search.fetchPredictions) return;
    const res = await getPlacesPredictions(search.term);
    const predictionResult = res.data.predictions;
    setPredictions(predictionResult);
    setShowPredictions(true);
  };

  useDebounce(onChangeText, 300, [search.term]);

  const onPredictionTapped = async (placeId, description) => {
    const result = await fetchLatLng(placeId);
    setShowPredictions(false);
    setSearch({term: description, fetchPredictions: false});
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

  // eslint-disable-next-line max-len
  const fetchDistanceBetweenPoints = (stationCoordinate, stationId) => {
    const {latitude: lat1, longitude: lng1} = region;
    const {latitude: lat2, longitude: lng2} = stationCoordinate;
    const urlToFetchDistance = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${lat1},${lng1}&destinations=${lat2}%2C${lng2}&key=${GOOGLE_API_KEY}`;
    fetch(urlToFetchDistance)
      .then(res => res.json())
      .then(res => {
        const distanceString = res.rows[0].elements[0].distance.text;
        setSelectedStation({
          ...stationCoordinate,
          id: stationId,
          distance: distanceString || 'Unable to determine',
        });
        return distanceString;
      })
      .catch(() => null);
  };

  const onSelectStation = async (stationCoordinate, stationId) => {
    if (selectedStation?.id === stationId) { setShowPopup(false); setSelectedStation(); return; }
    // const distance = await fetchDistanceBetweenPoints(
    //   region.latitude,
    //   region.longitude,
    //   stationCoordinate.latitude,
    //   stationCoordinate.longitude,
    // );
    setShowPopup(true);
    fetchDistanceBetweenPoints(stationCoordinate, stationId);
    // setSelectedStation({
    //   ...stationCoordinate,
    //   distance: distance || 'Unable to determine',
    // });
  };

  const onClear = () => {
    setSearch({ term: '', fetchPredictions: false});
    setShowPredictions(false);
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

  const closeModal = () => setShowPopup(false);

  const renderAttribute = item => {
    const {Icon, label} = item;
    return (
      <View style={styles.row}>
        <Icon />
        <Text style={styles.attributeText}>{label}</Text>
      </View>
    );
  };

  console.log('asmi', selectedDate);

  const renderCalendar = () => <Calendar markingType="custom" markedDates={markedDate} onDayPress={(date) => handleDateSelection(date.dateString)} theme={{arrowColor: Colors.TURQUOISE, selectedDayTextColor: Colors.TURQUOISE, todayTextColor: Colors.TURQUOISE}} />;

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
    setShowPopup(false);
    navigateTo('BookingSuccess');
  };

  const handleShowCalendar = () => setShowCalendar(true);

  const handleCancel = () => setShowPopup(false);

  return (
    <>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        mapType="standard" // [hybrid, standard]
        initialRegion={region}
        onMapReady={checkForLocationPermission}
        showsUserLocation
        style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height}}>
        {markers && markers.map((marker) => (
          <Marker
            key={marker.title}
            onPress={() => onSelectStation(marker.latlng, marker.id)}
            coordinate={marker.latlng}>

            <Image
              source={selectedStation?.id === marker.id ? selectedStationIcon : stationIcon}
              style={{width: 36, height: 36}}
            />
          </Marker>
        ))}
        <Marker coordinate={region}>
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
          onChangeText={text => setSearch({term: text, fetchPredictions: true})}
          showPredictions={showPredictions}
          predictions={predictions}
          onPredictionTapped={onPredictionTapped}
          onClear={onClear}
        />
        {showPopup && (
        <View style={{position: 'absolute', bottom: 0, width: Dimensions.get('window').width, height: 100, backgroundColor: 'white'}}>
          <Text style={{color: 'red'}}>{selectedStation?.distance}</Text>
        </View>
        )}
        <CustomBottomSheet handleSwipeDown={closeModal} isVisible={showPopup} customStyle={styles.modal}>
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
          <View style={[styles.row, styles.calendarContainer]}>
            <Text style={[styles.subTitle, styles.blackText]}>Upcoming Slots</Text>
            <View style={[styles.row, styles.dateContainer]}>
              <Text style={styles.date}>{selectedDate}</Text>
              <TouchableOpacity activeOpacity={0.8} onPress={handleShowCalendar}><CalendarSmall /></TouchableOpacity>
            </View>
          </View>
          {showCalendar ? renderCalendar() : renderSlots()}
          {!showCalendar && (
          <View style={[styles.row, styles.attributeContainer]}>
            <CustomButton onClick={handleCancel} text="CANCEL" containerStyle={styles.cancel} />
            <LinearGradient useAngle angle={105.4} colors={gradientColors} style={[styles.book, !!selectedSlot && styles.enabledButton]}>
              <CustomButton onClick={navigateToBookingSuccess} containerStyle={styles.buttonContainer} text="BOOK NOW" />
            </LinearGradient>
          </View>
          )}
        </CustomBottomSheet>
      </View>
    </>
  );
};

export default Booking;
