import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from './app/navigator/Navigator';
// import NavigationBar from './app/components/NavigationBar';

const App = () => {
  return (
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
  );
};

export default App;
