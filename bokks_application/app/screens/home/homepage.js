import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {Button} from 'react-native-paper';
import AppHeader, { HomeHeader } from '../../components/Headers';
import {appURL} from '../../Constants';


const homeURL = appURL;

const HomeScreen = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch(homeURL, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(json => {
        setBooks(json.books);
        setEvents(json.events);
      })
      .catch(error => alert(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <SafeAreaView>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <View>
            <HomeHeader navigation={navigation} />
          </View>
          <View style={StyleSheet.create({padding: 20})}>
            <Text style={styles.mainText}>Books</Text>
            <FlatList
              data={books}
              keyExtractor={({id}, index) => id}
              renderItem={({item}, index) => (
                <Text style={styles.mainText}>
                  Title: {item.title}
                  <Text> </Text>
                  ISBN: {item.isbn}
                </Text>
              )}
            />
            {/* <Text style={styles.mainText}>Events</Text>
            <FlatList
              data={events}
              keyExtractor={({id}, index) => id}
              renderItem={({item}, index) => (
                <Text style={styles.mainText}>
                  Title: {item.name}
                  <Text> </Text>
                  User ID: {item.user_id}
                </Text>
              )}
            /> */}
            <Button
              title="Login"
              color="white"
              onPress={() =>
                navigation.navigate('NavBar', {screen: 'Login'})
              }
              style={styles.btn}
            >{'Login'}
            </Button>

            {/* <Button
              title="BooksDetail"
              color="white"
              onPress={() =>
                navigation.navigate('BooksDetail')
              }
              style={styles.btn}
            >{'BooksDetail'}
            </Button> */}

            <Button
              title="BooksList"
              color="white"
              onPress={() =>
                navigation.navigate('BooksList')
              }
              style={styles.btn}
            >{'BooksList'}
            </Button>

            <Button
              title="EventsList"
              color="white"
              onPress={() =>
                navigation.navigate('EventsList')
              }
              style={styles.btn}
            >{'EventsList'}
            </Button>

            <Button
              title="GenreResults"
              color="white"
              onPress={() =>
                navigation.navigate('GenreResults')
              }
              style={styles.btn}
            >{'GenreResults'}
            </Button>

            <Button
              title="SeachScreen"
              color="white"
              onPress={() =>
                navigation.navigate('SearchScreen')
              }
              style={styles.btn}
            >{'SeachScreen'}
            </Button>

            {/* <Button
              title="Cart"
              color="white"
              // onPress={() => navigation.navigate('Cart')}
              style={styles.btn}
            >{'Cart'}
            </Button> */}

            <Button
              title="CallScreen"
              color="white"
              onPress={() =>
                navigation.navigate('Call')
              }
              style={styles.btn}
            >{'CallScreen'}
            </Button>

            {/* <Button
              title="EventsDetails"
              color="white"
              onPress={() => navigation.navigate('EventsDetails')}
              style={styles.btn}
            >{'EventsDetails'}
            </Button> */}

            {/* <Button
              title="Events"
              color="white"
              onPress={() => navigation.navigate('Events')}
              style={styles.btn}
            >{'Events'}
            </Button> */}

            <Button
              title="Homepage"
              color="white"
              onPress={() =>
                navigation.navigate('NavBar', {screen: 'Homepage'})
              }
              style={styles.btn}
            >{'Homepage'}
            </Button>

            {/* <Button
              title="SearchResults"
              color="white"
              onPress={() =>
                navigation.navigate('SearchResults')
              }
              style={styles.btn}
            >{'SearchResults'}
            </Button> */}
            {/* <TestButtons /> */}
          </View>
        </View>
    )}
    </SafeAreaView>
  );
};

const TestButtons = ({navigation}) => {
  return (
    <View>
      <Button
        title="Login"
        color="white"
        onPress={() =>
          navigation.navigate('NavBar', {screen: 'Login'})
        }
        style={styles.btn}
      >{'Login'}
      </Button>

      <Button
        title="BooksDetail"
        color="white"
        // onPress={() =>
        //   navigation.navigate('BooksDetail')
        // }
        style={styles.btn}
      >{'BooksDetail'}
      </Button>

      <Button
        title="BooksList"
        color="white"
        onPress={() =>
          navigation.navigate('BooksList')
        }
        style={styles.btn}
      >{'BooksList'}
      </Button>

      <Button
        title="GenresCategories"
        color="white"
        onPress={() =>
          navigation.navigate('NavBar', {screen: 'Genres'})
        }
        style={styles.btn}
      >{'GenresCategories'}
      </Button>

      <Button
        title="GenresResults"
        color="white"
        onPress={() =>
          navigation.navigate('NavBar', {screen: 'Genres'})
        }
        style={styles.btn}
      >{'GenresResults'}
      </Button>

      <Button
        title="SeachScreen"
        color="white"
        onPress={() =>
          navigation.navigate('NavBar', {screen: 'Genres'})
        }
        style={styles.btn}
      >{'SeachScreen'}
      </Button>

      <Button
        title="Cart"
        color="white"
        onPress={() =>
          navigation.navigate('NavBar', {screen: 'Genres'})
        }
        style={styles.btn}
      >{'Cart'}
      </Button>

      <Button
        title="CallScreen"
        color="white"
        onPress={() =>
          navigation.navigate('Call')
        }
        style={styles.btn}
      >{'CallScreen'}
      </Button>

      <Button
        title="EventsDetails"
        color="white"
        onPress={() =>
          navigation.navigate('NavBar', {screen: 'Genres'})
        }
        style={styles.btn}
      >{'EventsDetails'}
      </Button>

      <Button
        title="Events"
        color="white"
        onPress={() => navigation.navigate('Call')}
        style={styles.btn}
      >{'Events'}
      </Button>

      <Button
        title="Homepage"
        color="white"
        onPress={() =>
          navigation.navigate('NavBar', {screen: 'Genres'})
        }
        style={styles.btn}
      >{'Homepage'}
      </Button>

      <Button
        title="SearchResults"
        color="white"
        // onPress={() =>
        //   navigation.navigate('SearchResults')
        // }
        style={styles.btn}
      >{'SearchResults'}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#006BFF',
    color: 'white',
    height: 60,
    borderRadius: 25,
    alignItems: 'stretch',
    justifyContent: 'center',
    fontSize: 18,
  },
  mainText: {
    color: 'black',
  },
});


export default HomeScreen;
