import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/dist/query';

import {pokemonApi} from './api';
import sliceReducer from './slice';

export const store = configureStore({
  reducer: {
    counter: sliceReducer, // slice
    [pokemonApi.reducerPath]: pokemonApi.reducer, // service
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

setupListeners(store.dispatch);
