import React, {useContext, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, TextInput, Button} from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {appURL} from '../../Constants';

const loginURL = appURL + 'login';
const logoutURL = appURL + 'logout';


const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const data = {email: email, password: password};
  const [loading, setLoading] = useState('');
  // const [resStatus, setStatus] = useState(400);
  // const [resData, setData] = useState({})

  // toto by malo pouzit funkciu z AuthContext
  // const {loading, login} = useContext(AuthContext);

  const onLogin = () => {
    fetch(loginURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })  .then(response => {
        console.log(response);
          const resStatus = response.status;
          const resData = response.json();
          return Promise.all([resStatus, resData]);
    })  .then( res => ( {resStatus: res[0], resData: res[1]}))
        .then( (res) => {
        if (res.resStatus === 204) {
          console.log(res.resData.user);
          // AsyncStorage.setItem('user', JSON.stringify(res.resData));
          navigation.navigate('Home');
        } else {
          alert(res.resStatus + ': ' +res.resData.error.message);
        }
      })
      .catch(error => {
        console.log(error);
        alert( 'There has been a problem with your fetch operation: \n' + error.message);
      })
      .finally(() => { setLoading(false);
      });
  };

  const onLogout = ({navigation}) => {
    fetch(logoutURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (response.status === 204) {
          AsyncStorage.removeItem('user');
          navigation.navigate('Home');
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
          onPress={ onLogin }
          loading={loading}
          style={styles.btn}
          contentStyle={styles.btnContent}
        >
          <Text>LOG IN</Text>
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

export default LoginScreen;
