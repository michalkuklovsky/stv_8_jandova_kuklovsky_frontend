import React from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
} from 'react-native';
import {Title} from 'react-native-paper';
import { ScreenHeader } from './Headers';

const OfflineScreen = ({navigation, route}) => {

  return (
    <SafeAreaView>
        <View>
          <View>
            <ScreenHeader navigation={navigation} />
          </View>
          <View style={styles.infoContainer}>
            <Title style={styles.mainText}> You are offline! </Title>

          </View>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainText: {
    marginTop: 5,
    color: 'black',
  },
  infoContainer: {
    height: 400,
    width: '100%',
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    // alignSelf: "center",
    paddingTop: 50,
  }
});


export default OfflineScreen;
