import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from './app/navigator/Navigator';
// import NavigationBar from './app/components/NavigationBar';
import {AuthProvider} from './app/context/AuthContext.js';

const App = () => {
  return (
      <AuthProvider>
        <NavigationContainer>
          <Navigator />
        </NavigationContainer>
      </AuthProvider>
  );
};

export default App;
