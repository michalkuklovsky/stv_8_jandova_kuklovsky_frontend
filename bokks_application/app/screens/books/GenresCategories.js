import {
  Text,
  useColorScheme,
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  FlatList
} from "react-native";
import {Colors} from "react-native/Libraries/NewAppScreen";
import React, {useEffect, useState} from "react";
import appURL from '../../Constants';

const genresURL = appURL;

const Genres = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  // const getGenres = async () => {
  //     try {
  //         const response = await fetch(genresURL, {
  //             method: 'GET'
  //         })
  //             .then(response => response.json())
  //             .then((json) => setData(json.genres))
  //             .catch(error => alert(error));
  //     }
  // }

  useEffect(() => {
        fetch(genresURL, {
          method: 'GET',
        })
            .then(response => response.json())
            .then(json => setData(json.genres))
            .catch(error => alert(error))
            .then(setLoading(false));
      }
  )

  return (
      <SafeAreaView style={Colors.lighter} >
        {isLoading ? <ActivityIndicator/> : (
            <View>
              <Text style={styles.sectionTitle}> Genres </Text>
              <View>
                <FlatList
                    data={data}
                    keyExtractor={( {id}, index) => id}
                    renderItem={({item}) => (
                        <View style={styles.sectionContainer}>
                          <Text style={styles.sectionTitle} adjustsFontSizeToFit={true} numberOfLines={1}>
                            {item.name}
                          </Text>
                        </View>
                    )}
                />
              </View>
            </View>
        )
        }
      </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  sectionContainer: {
    margin: 20,
    width: 160,
    height: 160,
    paddingHorizontal: 24,
    borderRadius: 90,
    backgroundColor: 'blue',
    justifyContent: "center",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '500',
    textAlign: "center",
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default Genres;
