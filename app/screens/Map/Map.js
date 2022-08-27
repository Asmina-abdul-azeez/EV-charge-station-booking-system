/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
import {
  Dimensions, Image, PermissionsAndroid, View,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import { currentPosition, stationIcon } from '../../assets/images';
import SearchBar from '../../components/SearchBar/SearchBar';
import {
  fetchLatLng,
  useLazyGetPlacesPredictionsQuery,
} from './api';

import {markers, mcD} from './data';

const Map = () => {
  const [region, setRegion] = useState(mcD);
  const [search, setSearch] = useState({term: '', fetchPredictions: false});
  const [predictions, setPredictions] = useState([]);
  const [showPredictions, setShowPredictions] = useState(false);

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
      </View>
    </>
  );
};

export default Map;
