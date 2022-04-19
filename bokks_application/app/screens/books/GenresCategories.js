import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  Pressable,
} from "react-native";
import {Colors} from "react-native/Libraries/NewAppScreen";
import React, {useEffect, useState} from "react";
import { HomeHeader } from '../../components/Headers';

import {appURL} from "../../Constants";

const genresURL = appURL + 'genres/';

const Genre = ({navigation, genre}) => {
  const onPressed = () => {
    navigation.navigate("GenreResults", {id: genre.id, name: genre.name})
  }

  return (
      <View style={styles.genreContainer}>
      <Pressable onPress={onPressed}>

          <Text style={styles.sectionTitle} adjustsFontSizeToFit={true} numberOfLines={1}>
            {genre.name}
          </Text>

      </Pressable>
      </View>
  )
}

const Genres = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const renderItem = ({item}) => (<Genre genre={item} navigation={navigation}/>);

  useEffect(() => {
      fetch(genresURL, {
        method: 'GET',
      })
          .then(response => response.json())
          .then(json => setData(json.genres))
          .catch(error => alert(error))
          .then(setLoading(false));
    },[]
  )

  return (
      <View style={Colors.lighter} >
        {isLoading ? <ActivityIndicator/> : (
            <View>
              <HomeHeader navigation={navigation} />
              <View style={styles.mainTitleContainer}>
                <Text style={styles.mainTitle}> Genres </Text>
              </View>
              <FlatList
                  data={data}
                  keyExtractor={( {id}, index) => id}
                  renderItem={renderItem}
                  numColumns={2}
                  styles={styles.listContainer}
                  nestedScrollEnabled={true}
              />
            </View>
        )
        }
      </View>
  );
};

const styles = StyleSheet.create({
  listContainer:{
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  genreContainer: {
    marginHorizontal: 24,
    marginBottom: 20,
    width: 140,
    height: 140,
    borderRadius: 90,
    backgroundColor: "#96beff",
    justifyContent: "center",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "500",
    textAlign: "center",
    color: "black",
  },
  mainTitleContainer: {
    margin: 20,
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: "500",
    textAlign: "center",
    color: "black",
  },
});

export default Genres;
