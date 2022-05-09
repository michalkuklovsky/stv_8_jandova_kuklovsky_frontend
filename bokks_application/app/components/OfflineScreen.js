import React from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
} from 'react-native';
import {Title} from 'react-native-paper';
import { ScreenHeader } from '../components/Headers';

const OfflineScreen = ({navigation, route}) => {

  return (
    <SafeAreaView>
        <View>
          <View>
            <ScreenHeader navigation={navigation} />
          </View>
          <View style={{padding: 20}}>

            <Title style={styles.mainText}>Offline</Title>

          </View>
        </View>
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


export default OfflineScreen;
