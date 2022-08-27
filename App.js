import React from 'react';
import {LogBox} from 'react-native';
import {NativeBaseProvider} from 'native-base';
import {Provider} from 'react-redux';

import {store} from './app/store';
import AppNavigator from './app/navigation/AppNavigator';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); // Ignore all log notifications

const App = () => (
  <NativeBaseProvider>
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  </NativeBaseProvider>
);

export default App;
