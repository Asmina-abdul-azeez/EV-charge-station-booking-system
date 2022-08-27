import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/dist/query';
import {bookingApi, googlePlacesApi} from './api/service';

import sliceReducer from './slice';

export const store = configureStore({
  reducer: {
    counter: sliceReducer, // slice
    [bookingApi.reducerPath]: bookingApi.reducer, // service
    [googlePlacesApi.reducerPath]: googlePlacesApi.reducer, // service
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(bookingApi.middleware),
});

setupListeners(store.dispatch);
