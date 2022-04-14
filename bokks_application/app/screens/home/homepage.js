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
import appURL from '../../Constants';

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
          <Text>Events</Text>
          <FlatList
            data={events}
            keyExtractor={({id}, index) => id}
            renderItem={({item}, index) => (
              <Text>
                Title: {item.name}
                <Text> </Text>
                User ID: {item.user_id}
              </Text>
            )}
          />
          <Button
            title="Go to Details"
            onPress={() => navigation.navigate('Call')}
            style={styles.btn}
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

export default HomeScreen;
