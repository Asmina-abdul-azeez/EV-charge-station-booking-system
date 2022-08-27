import React from 'react';
import {NativeBaseProvider} from 'native-base';
import {Provider} from 'react-redux';

import {store} from './app/store';
import AppNavigator from './app/navigation/AppNavigator';

const App = () => (
  <NativeBaseProvider>
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  </NativeBaseProvider>
);

export default App;
