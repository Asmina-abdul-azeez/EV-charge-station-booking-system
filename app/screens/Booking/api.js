import {GOOGLE_API_KEY, GOOGLE_PLACES_API_BASE_URL} from '../../constants';
import {callAPI} from '../../api/axios';
import {googlePlacesApi} from '../../api/service';

const sampleApi = googlePlacesApi.injectEndpoints({
  endpoints: builder => ({
    getPlacesPredictions: builder.query({
      query: text => `/autocomplete/json?key=${GOOGLE_API_KEY}&input=${text}`,
    }),
  }),
});

export const {useGetPlacesPredictionsQuery, useLazyGetPlacesPredictionsQuery} = sampleApi;

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
