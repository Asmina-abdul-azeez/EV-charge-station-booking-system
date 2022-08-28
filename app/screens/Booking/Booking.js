/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState, useEffect} from 'react';
import {
  Dimensions, Image, PermissionsAndroid, View, Text, TouchableOpacity, ActivityIndicator, Keyboard,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import LinearGradient from 'react-native-linear-gradient';
import {stationIcon, selectedStationIcon, car } from '~assets/appImages';

import CustomBottomSheet from '~components/CustomBottomSheet/CustomBottomSheet';
import { navigateTo } from '~helpers/NavigationService';
import {CalendarSmall, Location, Price, Time} from '~assets/Icons';

import CustomButton from '~components/CustomButton/CustomButton';

import { Colors, gradientColors } from '~utilities/Constants';
import SearchBar from '~components/SearchBar/SearchBar';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import {
  fetchLatLng,
  useLazyGetPlacesPredictionsQuery,
  useGetChargingStationsQuery,
  useLazyGetStationDetailsByIdQuery,
  useBookStationMutation,
} from './api';

import {mcD} from './data';
import { GOOGLE_API_KEY } from '../../constants';
import { useDebounce } from '../../hooks/useDebounce';
import styles from './styles';

const Booking = () => {
  const [region, setRegion] = useState(mcD); // TO DO - update initial location
  const [search, setSearch] = useState({term: '', fetchPredictions: false});
  const [predictions, setPredictions] = useState([]);
  const [showPredictions, setShowPredictions] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // TO DO - remove this boolean
  const [selectedStation, setSelectedStation] = useState(); // TO DO - use this for showing modal
  const [isLoading, setIsLoading] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  const [markedDate, setMarkedDate] = useState({});
  const [showCalendar, setShowCalendar] = useState();

  const mapRef = useRef();
  const locationFetch = useRef(false);

  useEffect(() => {
    const date = (new Date()).toLocaleDateString();
    const formattedDate = moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD');
    handleDateSelection(formattedDate, false);
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
        address: item.address,
        name: item.name,
        imageUrl: item.imageUrl,
        openingTime: item.startTime,
        closingTime: item.endTime,
        chargeCost: item.chargeCost,
        label: item.label,
      }));
    }
    return markerSet;
  };

  const markers = formatDataIntoMarker();

  const [getPlacesPredictions] = useLazyGetPlacesPredictionsQuery();
  const [getStationDetailsById, {isFetching: isFetchingAvailability}] = useLazyGetStationDetailsByIdQuery();
  const [bookStation] = useBookStationMutation();

  useEffect(() => {
    const watchId = Geolocation.watchPosition(
      pos => {
        locationFetch.current = true;
        setRegion({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      },
      e => console.log('rose error in watch', e),
    );
    return () => Geolocation.clearWatch(watchId);
  }, []);

  const handleDateSelection = async (date, fetchAPI = true) => {
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
    if (fetchAPI) {
      const availabilityResponse = await fetchStationAvailability(selectedStation.id, formattedDate);
      setSelectedStation({
        ...selectedStation,
        slots: availabilityResponse.data,
      });
    }
  };

  const fetchStationAvailability = async (id, date) => {
    if (id && !isFetchingAvailability) {
      const params = {
        id,
        date,
      };
      return await getStationDetailsById(params);
    }
    return null;
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
  const fetchDistanceBetweenPoints = async stationInfo => {
    setIsLoading(true);
    const date = (new Date()).toLocaleDateString();
    const availabilityResponse = await fetchStationAvailability(stationInfo.id, date);
    if (availabilityResponse) {
      const {latitude: lat1, longitude: lng1} = region;
      const {latitude: lat2, longitude: lng2} = stationInfo.latlng;
      const urlToFetchDistance = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${lat1},${lng1}&destinations=${lat2}%2C${lng2}&key=${GOOGLE_API_KEY}`;
      fetch(urlToFetchDistance)
        .then(res => res.json())
        .then(res => {
          const distanceString = res.rows[0].elements[0].distance?.text;
          setSelectedStation({
            ...stationInfo,
            distance: distanceString || '-',
            date,
            slots: availabilityResponse.data,
          });
          setShowPopup(true);
          return distanceString;
        })
        .catch((e) => {
          console.log('rose catch', e);
          return null;
        });
    }
    setIsLoading(false);
  };

  const onSelectStation = async stationInfo => {
    if (selectedStation?.id === stationInfo.id) { closePopup(); return; }
    setSelectedStation({
      id: stationInfo.id,
    });
    // const distance = await fetchDistanceBetweenPoints(
    //   region.latitude,
    //   region.longitude,
    //   stationCoordinate.latitude,
    //   stationCoordinate.longitude,
    // );
    // setShowPopup(true);
    fetchDistanceBetweenPoints(stationInfo);
    // setSelectedStation({
    //   ...stationCoordinate,
    //   distance: distance || 'Unable to determine',
    // });
  };

  const onClear = () => {
    setSearch({ term: '', fetchPredictions: false});
    setShowPredictions(false);
    Keyboard.dismiss();
  };

  const attributes = [
    {
      Icon: Location,
      label: 'distance',
    },
    {
      Icon: Time,
      label: 'time',
    },
    {
      Icon: Price,
      label: 'price',
    },
  ];

  const getAttributeValue = label => {
    switch (label) {
      case 'distance': return selectedStation?.distance || '-';
      case 'time': return selectedStation?.label ? selectedStation?.label : '-';
      default: return `Rs ${selectedStation?.chargeCost}/kWh` || '-';
    }
  };

  const renderAttribute = item => {
    const {Icon, label} = item;
    const value = getAttributeValue(label);
    return (
      <View style={styles.row}>
        <Icon />
        <Text style={styles.attributeText}>{value}</Text>
      </View>
    );
  };

  const onChangeSlot = (start, end) => {
    setSelectedStation({
      ...selectedStation,
      selectedSlot: {start, end},
    });
  };

  const renderCalendar = () => <Calendar markingType="custom" markedDates={markedDate} onDayPress={(date) => handleDateSelection(date.dateString)} theme={{arrowColor: Colors.TURQUOISE, selectedDayTextColor: Colors.TURQUOISE, todayTextColor: Colors.TURQUOISE}} />;

  const renderSlots = () => (
    <View style={[styles.row, styles.slotRow]}>
      {selectedStation?.slots?.map(slot => {
        const {isBooked, label, startTime, endTime} = slot;
        const {start, end} = selectedStation?.selectedSlot || {};
        const isSelected = (start === startTime && end === endTime);
        return (
          <TouchableOpacity key={slot.label} disabled={isBooked} activeOpacity={0.8} onPress={() => onChangeSlot(startTime, endTime)} style={[styles.slotContainer, !isBooked && styles.availableSlot, isSelected && styles.selectedSlot]}>
            <Text style={[styles.slotText, !isBooked && styles.blackText]}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  const onBookStation = async () => {
    setIsBooking(true);
    const payload = {
      userId: 'ec367034-25e7-11ed-b4f5-8373468317e6',
      chargingStationId: selectedStation.id,
      bookingDate: selectedStation.date,
      startTime: selectedStation.selectedSlot.start,
      endTime: selectedStation.selectedSlot.end,
    };
    const response = await bookStation(payload);
    setIsBooking(false);
    if (response.data) {
      navigateToBookingSuccess(selectedStation.latlng, selectedStation.name, selectedStation.selectedSlot);
    } else {
      alert('Booking failed :(');
    }
  };

  const navigateToBookingSuccess = ({latitude, longitude}, stationName, selectedSlot) => {
    closePopup();
    navigateTo('BookingSuccess', {latitude, longitude, stationName, selectedSlot});
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedStation(null);
  };

  const handleShowCalendar = () => setShowCalendar(true);

  return (
    <>
      {isLoading && <ActivityIndicator style={{position: 'absolute', top: '50%', left: '50%'}} />}
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
            onPress={() => onSelectStation(marker)}
            coordinate={marker.latlng}>
            <Image
              source={selectedStation?.id === marker.id ? selectedStationIcon : stationIcon}
              style={{width: 48, height: 48}}
            />
          </Marker>
        ))}
        {region && locationFetch.current && (
        <Marker coordinate={region}>
          <Image source={car} style={{width: 24, height: 24}} />
        </Marker>
        )}
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
        <CustomBottomSheet handleSwipeDown={closePopup} isVisible={showPopup} customStyle={styles.modal}>
          <TouchableOpacity onPress={closePopup} style={styles.slider} />
          <View style={[styles.row, styles.stationDetails]}>
            <View>
              <Image style={styles.image} source={{uri: selectedStation?.imageUrl}} />
              <View style={styles.banner}><Text style={styles.bannerText}>Open</Text></View>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{selectedStation?.name}</Text>
              <Text style={styles.subTitle}>{selectedStation?.address}</Text>
            </View>
          </View>
          <View style={[styles.row, styles.attributeContainer]}>{attributes.map(attribute => renderAttribute(attribute))}</View>
          <View style={styles.divider} />
          <View style={[styles.row, styles.calendarContainer]}>
            <Text style={[styles.subTitle, styles.blackText]}>Upcoming Slots</Text>
            <View style={[styles.row, styles.dateContainer]}>
              <Text style={styles.date}>{selectedDate === 'Invalid date' ? '28/08/2022' : selectedDate}</Text>
              <TouchableOpacity activeOpacity={0.8} onPress={handleShowCalendar}><CalendarSmall /></TouchableOpacity>
            </View>
          </View>
          {selectedStation?.slots && (showCalendar ? renderCalendar() : renderSlots())}
          {!showCalendar && (
          <View style={[styles.row, styles.attributeContainer]}>
            <CustomButton onClick={closePopup} text="CANCEL" containerStyle={styles.cancel} />
            <LinearGradient useAngle angle={105.4} colors={gradientColors} style={[styles.book, !!selectedStation?.selectedSlot && styles.enabledButton]}>
              <CustomButton onClick={onBookStation} containerStyle={styles.buttonContainer} text="BOOK NOW" isLoading={isBooking} disabled={!!selectedStation?.selectedSlot} />
            </LinearGradient>
          </View>
          )}
        </CustomBottomSheet>
        )}
      </View>
    </>
  );
};

export default Booking;
