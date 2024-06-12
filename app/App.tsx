import Sound from 'react-native-sound';
Sound.setCategory('Playback');
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import MainStackNavigator from './navigation/MainStackNavigator';

const App = () => {
  return (
    <Provider store={store}>
      <MainStackNavigator />
    </Provider>
  );
};

export default App;