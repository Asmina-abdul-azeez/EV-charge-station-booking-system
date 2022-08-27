/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions, Image, PermissionsAndroid, Text, View,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { currentPosition, selectedStationIcon, stationIcon } from '../../assets/appImages';
import SearchBar from '../../components/SearchBar/SearchBar';
import {
  // fetchDistanceBetweenPoints,
  fetchLatLng,
  useGetChargingStationsQuery,
  useLazyGetPlacesPredictionsQuery,
} from './api';

import {mcD} from './data';
import { GOOGLE_API_KEY } from '../../constants';
import { useDebounce } from '../../hooks/useDebounce';

const Map = () => {
  const [region, setRegion] = useState(mcD); // TO DO - update initial location
  const [search, setSearch] = useState({term: '', fetchPredictions: false});
  const [predictions, setPredictions] = useState([]);
  const [showPredictions, setShowPredictions] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // TO DO - remove this boolean
  const [selectedStation, setSelectedStation] = useState(); // TO DO - use this for showing modal

  const mapRef = useRef();
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
    setShowPopup(true);
    // const distance = await fetchDistanceBetweenPoints(
    //   region.latitude,
    //   region.longitude,
    //   stationCoordinate.latitude,
    //   stationCoordinate.longitude,
    // );
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
      </View>
      {showPopup && (
      <View style={{position: 'absolute', bottom: 0, width: Dimensions.get('window').width, height: 100, backgroundColor: 'white'}}>
        <Text style={{color: 'red'}}>{selectedStation?.distance}</Text>
      </View>
      )}
    </>
  );
};

export default Map;
