import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, TextInput, Button} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {appURL} from '../../Constants';

const loginURL = appURL + 'login';
const logoutURL = appURL + 'logout';


export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const data = {email: email, password: password};
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(false);

  // const onLogin = async () => {
  //     setLoading(true);
  //     try {
  //         await AsyncStorage.setItem('userId', userId);
  //         setLoading(false);
  //         props.navigation.push('Call');
  //     } catch (err) {
  //         console.log('Error', err);
  //         setLoading(false);
  //     }
  // };

  // const onLogin = () => {
  //   setLoading(true);

  //   fetch(loginURL, {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(data),
  //   })
  //     .then(response => response.json())
  //     .then(response => console.log(response.data))
  //     .catch(function (error) {
  //       console.log(
  //         'There has been a problem with your fetch operation: ' +
  //           error.message,
  //       );
  //       // ADD THIS THROW error
  //       // throw error;
  //     })
  //     .finally(setLoading(false));
  // };

  const onLogin = ({navigation}) => {
    let tmpstatus;
    // const tmp = {
    //   'email': 'michal@email.com',
    //   'password': 'pass123',
    // };
    fetch(loginURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        tmpstatus = response.status;
        console.log('login: ' + response.status);
        // navigation.navigate('NavBar', {screen: 'Homepage'});
      })
      // .then(res => {
      //   AsyncStorage.setItem('user', JSON.stringify(res.data));
      //   setUser(res.data);
      //   navigation.navigate('Homepage');
      // })
      .catch(error => {
        console.log(
          'There has been a problem with your fetch operation: ' +
            error.message,
        );
      })
      .finally(() => {
        setLoading(false);
      });
    // if (tmpstatus === 204) {
    //   navigation.navigate('NavigationBar', {screen: 'Homepage'});
    // }
  };

  const onLogout = ({navigation}) => {
    let tmpstatus;
    fetch(logoutURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        tmpstatus = response.status;
        console.log('logout: ' + response.status);
      })
      .catch(error => {
        console.log(
          'There has been a problem with your fetch operation: ' +
            error.message,
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <View style={styles.root}>
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

        <Button
          mode="contained"
          onPress={onLogin}
          loading={loading}
          style={styles.btn}
          contentStyle={styles.btnContent}
          // disabled={userId.length === 0}
        >
          <Text>LOGIN</Text>
        </Button>

        <Button
          mode="contained"
          onPress={onLogout}
          loading={loading}
          style={styles.btn}
          contentStyle={styles.btnContent}
          // disabled={userId.length === 0}
        >
          <Text>LOGOUT</Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#fff',
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    // alignSelf: 'center',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: '600',
  },
  input: {
    height: 60,
    marginBottom: 10,
  },
  btn: {
    height: 60,
    borderRadius: 25,
    alignItems: 'stretch',
    justifyContent: 'center',
    fontSize: 18,
  },
  btnContent: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
  },
});
