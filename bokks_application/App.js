import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from './app/navigator/navigator';

const App = () => {
  return (
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
  );
};

export default App;
