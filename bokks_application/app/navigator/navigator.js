import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/home/Homepage';
import LoginScreen from '../screens/auth/LoginScreen';
import Genres from '../screens/books/GenresCategories';
import CallScreen from '../screens/events/CallScreen';
import BooksListScreen from '../screens/books/BooksList';

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
        name="NavBar"
        component={NavigationBar}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Call" component={CallScreen} />
    </Stack.Navigator>
  );
};

const homeName = 'Home';
const genresName = 'Genres';
const loginName = 'Login';
const booksListName = 'Books';

const Tab = createBottomTabNavigator();

const NavigationBar = () => {
  return (
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          let rn = route.name;

          if (rn === homeName) {
            iconName = focused ? 'home' : 'home-outline';
          } else if (rn === genresName) {
            iconName = focused ? 'search' : 'search-outline';
          } else if (rn === loginName) {
            iconName = focused ? 'person' : 'person-outline';
          } else if (rn === booksListName) {
            iconName = focused ? 'list' : 'list-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#006BFF',
        tabBarInactiveTintColor: 'grey',
        tabBarLabelStyle: {
          paddingBottom: 10,
          fontSize: 10,
        },
        tabBarStyle: [
          {
            display: 'flex',
          },
          null,
        ],
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Genres"
        component={Genres}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Books"
        component={BooksListScreen}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default Navigator;
