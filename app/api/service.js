// Need to use the React-specific entry point to import createApi
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {APP_BASE_URL, GOOGLE_PLACES_API_BASE_URL} from '../constants';

export const bookingApi = createApi({
  reducerPath: 'bookingApi',
  baseQuery: fetchBaseQuery({baseUrl: APP_BASE_URL}),
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}),
});

export const googlePlacesApi = createApi({
  reducerPath: 'googlePlacesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: GOOGLE_PLACES_API_BASE_URL,
  }),
  endpoints: () => ({}),
});
