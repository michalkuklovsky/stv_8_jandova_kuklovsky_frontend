import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/home/homepage';
import LoginScreen from '../screens/auth/LoginScreen';
import Genres from '../screens/books/GenresCategories';
import CallScreen from '../screens/events/CallScreen';

const Navigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="Homepage"
      screenOptions={{
        headerShown: false,
        headerMode: 'none',
        statusbar: 'none',
      }}>
      <Stack.Screen
        name="Homepage"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Call" component={CallScreen} />
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
  );
};

export default Navigator;
