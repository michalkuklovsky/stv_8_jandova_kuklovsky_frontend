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

const homeURL = 'http://147.175.182.110:8000/'; //TU MUSI BYT ESTE /books
// const homeURL = 'http://147.175.160.194:8000/';
// const homeURL = 'http://10.62.44.90:8000/';

const BookListScreen = ({navigation}) => {
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
          <Text>Books</Text>
          <FlatList
            data={books}
            keyExtractor={({id}, index) => id}
            renderItem={({item}, index) => (
              <Text>
                Title: {item.title}
                <Text> </Text>
                ISBN: {item.isbn}
              </Text>
            )}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#fff',
    height: 60,
    borderRadius: 25,
    alignItems: 'stretch',
    justifyContent: 'center',
    fontSize: 18,
  },
});

export default BookListScreen;
