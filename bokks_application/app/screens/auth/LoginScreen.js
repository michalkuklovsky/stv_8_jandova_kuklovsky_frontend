import React, {useContext, useState} from 'react';
import {View, StyleSheet, Pressable, SafeAreaView} from 'react-native';
import {Text, TextInput, Button} from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {appURL} from '../../Constants';
import {HomeHeader} from "../../components/Headers";
// import {storeUser, removeUser, getUser} from "../../StorageController";
import { AuthContext } from '../../context/AuthContext';
import NetInfo, {useNetInfo} from '@react-native-community/netinfo';
import OfflineScreen from '../../components/OfflineScreen';

const loginURL = appURL + 'login';
const logoutURL = appURL + 'logout';


const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const data = {email: email, password: password};
  const [loading, setLoading] = useState(false);
  const {storeUser, removeUser} = useContext(AuthContext);
  const netInfo = useNetInfo();


  const onLogin = () => {
    fetch(loginURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })  .then(response => {
          const resStatus = response.status;
          const resData = response.json();
          return Promise.all([resStatus, resData]);
    })  .then( res => ( {resStatus: res[0], resData: res[1]}))
        .then( (res) => {
        if (res.resStatus === 200) {
          storeUser(res.resData.user.email, res.resData.user.is_admin);
          navigation.navigate('Home', {});
        } else {
          alert(res.resData.error.message);
        }
      })
      .catch(error => { alert(error);})
      .finally(() => { setLoading(false);});
  };

  const onLogout = () => {
    fetch(logoutURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (response.status === 204) {
          removeUser();
          navigation.navigate('Home', {});
        } else ( alert(response.status));
      })
        .catch(error => {
          alert( 'There has been a problem with your fetch operation: ' + error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
      !netInfo.isInternetReachable ? (
          <OfflineScreen navigation={navigation}/>
        ) : (
          <View style={styles.root}>
            <HomeHeader navigation={navigation} />
            <View style={styles.content}>

              <Text style={styles.heading}>LOG IN</Text>

              <TextInput
                label="Email Address"
                onChangeText={email => setEmail(email)}
                mode="outlined"
                style={styles.input}
              />
              <TextInput
                secureTextEntry={true}
                label="Password"
                onChangeText={psd => setPassword(psd)}
                mode="outlined"
                style={styles.input}
              />

              <Pressable style={styles.btn} onPress={onLogin} >
                <Text style={styles.btnText}> LOG IN </Text>
              </Pressable>
              <Pressable style={styles.btn} onPress={onLogout} >
                <Text style={styles.btnText}> LOG OUT </Text>
              </Pressable>

            </View>
          </View>
    )
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#fff',
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    justifyContent: 'space-around',
  },
  heading: {
    fontSize: 18,
    marginTop: 200,
    marginBottom: 20,
    fontWeight: '600',
  },
  input: {
    height: 60,
    marginBottom: 20,
  },
  btn: {
    width: 200,
    height: 50,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: "#a3c6ff",
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  btnText: {
    color: "black",
    textAlign: "center",
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoginScreen;
