import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/home/Homepage';
import LoginScreen from '../screens/auth/LoginScreen';
import Genres from '../screens/books/GenresCategories';
import CallScreen from '../screens/events/CallScreen';
import BooksListScreen from '../screens/books/BooksList';
import GenreResults from '../screens/books/GenresResults';
import SearchScreen from '../screens/books/SearchScreen';
import CartScreen from '../screens/cart/Cart';
import BookDetailScreen from '../screens/books/BookDetail';


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
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="BookDetail" component={BookDetailScreen} />
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
        options={{headerShown: false}}
        />
    </Tab.Navigator>
  );
};

export default Navigator;
