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
import {appURL} from "../../Constants";

const genresURL = appURL + 'genres';

const Genre = ({navigation, genre}) => {
  const onPressed = () => {
    navigation.navigate("GenreResults", {id: genre.id, name: genre.name})
  }

  return (
      <Pressable onPress={onPressed}>
        <View style={styles.genreContainer}>
          <Text style={styles.sectionTitle} adjustsFontSizeToFit={true} numberOfLines={1}>
            {genre.name}
          </Text>
        </View>
      </Pressable>
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
      <SafeAreaView style={Colors.lighter} >
        {isLoading ? <ActivityIndicator/> : (
            <View>
              <View style={styles.mainTitleContainer}>
              <Text style={styles.mainTitle}> Genres </Text>
              </View>
                <FlatList
                    data={data}
                    keyExtractor={( {id}, index) => id}
                    renderItem={renderItem}
                    numColumns={2}
                    styles={styles.listContainer}
                />
            </View>
        )
        }
      </SafeAreaView>
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
    marginHorizontal: 20,
    marginBottom: 20,
    // width:  '50%',
    // height: '50%',
    width: 160,
    height: 160,
    borderRadius: 90,
    backgroundColor: "skyblue",
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
