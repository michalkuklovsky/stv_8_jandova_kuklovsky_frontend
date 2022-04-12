import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from "./screens/LoginScreen";
import CallScreen from "./screens/CallScreen";
import Genres from "./screens/GenresCategories";
import Homepage from "./screens/Homepage";

const Stack = createNativeStackNavigator();

const App = () => {

  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
              name="Homepage"
              component={Homepage}
              options={{headerShown: false}}
          />

          <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{headerShown: false}}
          />
          <Stack.Screen
              name="Call"
              component={CallScreen}
          />
          <Stack.Screen
              name="Genres"
              component={Genres}
              options={{headerShown: false}}
          />


          {/*<Stack.Screen*/}
          {/*    name="DrawerNavigationRoutes"*/}
          {/*    component={DrawerNavigationRoutes}*/}
          {/*    // Hiding header for Navigation Drawer*/}
          {/*    options={{headerShown: false}}*/}
          {/*/>*/}

        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;
