import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView, Image, Text,
} from 'react-native';
import {Title} from 'react-native-paper';
import { ScreenHeader } from './Headers';

const OfflineScreen = ({navigation, route}) => {

  return (
    <SafeAreaView>
        <View >
          <View>
            <ScreenHeader navigation={navigation} />
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.card}>
              <Image style={styles.pic} source={require("../images/nowifi.png")} />
            </View>

            <Title style={styles.mainText}> You appear to be offline! </Title>
            <Title style={styles.mainText}> Check your internet connection. </Title>
          </View>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainText: {
    marginTop: 10,
    color: 'black',
  },
  infoContainer: {
    height: 400,
    width: '100%',
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    // alignSelf: "center",
    marginVertical: 80,
  },
  pic: {
    width: 200,
    height: 180,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,
    height: 220,
    marginBottom: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});


export default OfflineScreen;
