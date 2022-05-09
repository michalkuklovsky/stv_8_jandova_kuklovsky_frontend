import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    SafeAreaView,
    ActivityIndicator, Pressable, Image,
} from 'react-native';
import {Button, Card, Paragraph, Title} from 'react-native-paper';
import AppHeader, { HomeHeader } from '../../components/Headers';
import {appURL} from '../../Constants';
import {Book} from "../books/GenresResults";
import {getData} from "../../utility/HandleRequest";

const homeURL = appURL;

export const Event = ({navigation, event}) => {
    const onPressed = () => {
        navigation.navigate("EventDetail", {id: event.id})
    }
    return (
        <Pressable onPress={onPressed}>
            <Card style={styles.card}>
                <View style={styles.imageContainer}>
                    <Image style={styles.logo} source={{ uri: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80' }} />
                </View>
                <View style={styles.infoContainer}>
                    <Title style={styles.imgTitle}> {event.name} </Title>
                    <Paragraph style={styles.imgSub}> {event.description} </Paragraph>
                </View>
            </Card>
        </Pressable>
    )
}

const HomeScreen = ({navigation, route}) => {
  const [isLoading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
      getData(homeURL)
          .then(res => { setEvents(res.events); setBooks(res.books); })
    // fetch(homeURL, {
    //   method: 'GET',
    // })
    //   .then(response => response.json())
    //   .then(json => {
    //     setBooks(json.books);
    //     setEvents(json.events);
    //   })
    //   .catch(error => alert(error))
      .finally(() => setLoading(false));
  }, [route]);

  return (
    <SafeAreaView>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <View>
            <HomeHeader navigation={navigation} />
          </View>
          <View style={{padding: 20}}>

            <Title style={styles.mainText}>Most Popular Books</Title>
            <FlatList
              data={books}
              keyExtractor={({id}, index) => id}
              renderItem={({item}) => (<Book book={item} navigation={navigation} />)}
              numColumns={2}
            />

            <Title style={styles.mainText}>Upcoming Events</Title>

              <FlatList
              data={events}
              keyExtractor={({id}, index) => id}
              renderItem={({item}) => (<Event event={item} navigation={navigation} />)}
            />

          </View>
        </View>
    )}
    </SafeAreaView>
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
    marginTop: 5,
    color: 'black',
  },
  card: {
    flexDirection: "row",
    height: 130,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    shadowOpacity: 0.25,
    marginTop: 10,
    marginBottom: 30,
    alignSelf: "center"
  },
  infoContainer: {
    flex: 1,
    flexDirection: "column",
    alignSelf: "flex-end",
    paddingTop: 10,
    paddingBottom: 10,
  },
  imageContainer: {
    flex: 1,
    position: "absolute",
    flexDirection: "column",
    alignSelf: "flex-start",
    padding: 10,
    height: "100%",
  },
  imgTitle: {
    fontSize: 18,
    padding: 4,
    paddingRight: 14,
    color: "black",
    alignSelf: "flex-start"
  },
  logo: {
    width: 100,
    height: 110,
    borderRadius: 10,
  },
  imgSub: {
    paddingLeft: 6,
      color: "black"
  }
});


export default HomeScreen;
