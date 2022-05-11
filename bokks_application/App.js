import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from './app/navigator/Navigator';
// import NavigationBar from './app/components/NavigationBar';
import {AuthProvider} from './app/context/AuthContext.js';
import {OfflineContext, OfflineProvider} from "./app/context/OfflineContext";

const App = () => {
  return (
      <AuthProvider>
          <OfflineProvider>
              <NavigationContainer>
                <Navigator />
              </NavigationContainer>
          </OfflineProvider>
      </AuthProvider>
  );
};

export default App;
