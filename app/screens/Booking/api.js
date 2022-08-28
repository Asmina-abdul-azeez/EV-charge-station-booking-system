/* eslint-disable max-len */
import {GOOGLE_API_KEY, GOOGLE_PLACES_API_BASE_URL} from '../../constants';
import {callAPI} from '../../api/axios';
import {bookingApi, googlePlacesApi} from '../../api/service';

const googleApiService = googlePlacesApi.injectEndpoints({
  endpoints: builder => ({
    getPlacesPredictions: builder.query({
      query: text => `/autocomplete/json?key=${GOOGLE_API_KEY}&input=${text}`,
    }),
  }),
});

const booingApiService = bookingApi.injectEndpoints({
  endpoints: builder => ({
    getChargingStations: builder.query({
      query: () => '/charging-station',
    }),
    getStationDetailsById: builder.query({
      query: ({id, date}) => `/booking/slots?chargingStationId=${id}&bookingDate=${date}`,
    }),
    bookStation: builder.mutation({
      query: payload => ({
        url: '/booking',
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

export const {useGetPlacesPredictionsQuery, useLazyGetPlacesPredictionsQuery} = googleApiService;
export const {useGetChargingStationsQuery, useLazyGetStationDetailsByIdQuery, useBookStationMutation} = booingApiService;

export const fetchPredictions = async text => {
  const url = `${GOOGLE_PLACES_API_BASE_URL}/autocomplete/json?key=${GOOGLE_API_KEY}&input=${text}`;
  const result = await callAPI({url});
  if (result.success) {
    const {
      data: {predictions},
    } = result.data;
    return {predictions, success: true};
  }
  return result;
};

export const fetchLatLng = async placeId => {
  const url = `${GOOGLE_PLACES_API_BASE_URL}/details/json?key=${GOOGLE_API_KEY}&place_id=${placeId}`;
  const result = await callAPI({url});
  if (result.success) {
    const {
      data: {
        result: {
          geometry: {location},
        },
      },
    } = result.data;
    return {location, success: true};
  }
  return result;
};

export const fetchDistanceBetweenPoints = (lat1, lng1, lat2, lng2) => {
  // TO DO - replace fetch
  const urlToFetchDistance = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${lat1},${lng1}&destinations=${lat2}%2C${lng2}&key=${GOOGLE_API_KEY}`;
  fetch(urlToFetchDistance)
    .then(res => res.json())
    .then(res => {
      const distanceString = res.rows[0].elements[0].distance.text;
      return distanceString;
    })
    .catch(() => null);
};
