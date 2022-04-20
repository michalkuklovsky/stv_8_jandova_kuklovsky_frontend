import React, {useContext, useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/home/Homepage';
import LoginScreen from '../screens/auth/LoginScreen';
import Genres from '../screens/books/GenresCategories';
import CallScreen from '../screens/events/CallScreen';
import BooksListScreen from '../screens/books/BooksList';
import GenreResults from '../screens/books/GenresResults';
import SearchScreen from '../screens/search/SearchScreen';
import SearchResults from '../screens/search/SearchResults';
import CartScreen from '../screens/cart/Cart';
import BookDetailScreen from '../screens/books/BookDetail';
import EventsListScreen from '../screens/events/EventsList';
import EventDetailScreen from '../screens/events/EventDetail';
import EventInfo, { CreateEvent } from '../screens/events/EventInfo';
import BookInfo, { CreateBook } from '../screens/books/BookInfo';
import AccountScreen from "../screens/auth/AccountScreen";
import AdminScreen from "../screens/auth/AdminScreen";

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

        <Stack.Screen name="NavBar" component={NavigationBar} options={{headerShown: false}} />
        <Stack.Screen name="Call" component={CallScreen} />
        <Stack.Screen name="BooksList" component={BooksListScreen} />
        <Stack.Screen name="GenreResults" component={GenreResults} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} />
        <Stack.Screen name="SearchResults" component={SearchResults} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="BookDetail" component={BookDetailScreen} />
        <Stack.Screen name="EventsList" component={EventsListScreen} />
        <Stack.Screen name="EventDetail" component={EventDetailScreen} />
        <Stack.Screen name="BookInfo" component={BookInfo} />
        <Stack.Screen name="EventInfo" component={EventInfo} />
        <Stack.Screen name="CreateEvent" component={CreateEvent} />
        <Stack.Screen name="CreateBook" component={CreateBook} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Account" component={AccountScreen} />
        <Stack.Screen name="Admin" component={AdminScreen} />

      </Stack.Navigator>
  );
};

const homeName = 'Home';
const genresName = 'Genres';
const loginName = 'Login';
const search = 'Search';

const Tab = createBottomTabNavigator();

const NavigationBar = () => {

  return (
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={( {route} ) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          let rn = route.name;

          if (rn === homeName) {
            iconName = focused ? 'home' : 'home-outline';
          } else if  (rn === search) {
            iconName = focused ? 'search' : 'search-outline';
          } else if (rn === loginName) {
            iconName = focused ? 'person' : 'person-outline';
          } else if (rn === genresName) {
            iconName = focused ? 'list' : 'list-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4a8fff',
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
        name="Search"
        component={SearchScreen}
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
        options={{headerShown: false }}
      />

    </Tab.Navigator>
  );
};

export {
    Navigator, NavigationBar,
};
export default Navigator;
