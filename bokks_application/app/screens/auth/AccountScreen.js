import React, {useEffect, useState} from "react";
import {Image, Pressable, ScrollView, Text, View} from "react-native";
import {StyleSheet} from "react-native";
import {Button} from "react-native-paper";
import {appURL} from "../../Constants";
import {ScreenHeader} from "../../components/Headers";

const logoutURL = appURL + 'logout';
const profileURL = appURL + 'profile';

const AccountScreen = ({navigation, route}) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({});

    useEffect(() => {
        fetch(profileURL, {
            method: 'GET'
        })  .then( response => response.json())
            .then( json => {
                setUser(json.user);
                console.log(user.is_admin)
                if (json.user.is_admin) {
                    setUser({});
                    navigation.navigate('Admin', {});
                }
            })
            .catch(error => {  alert( error ) })
            .finally(setLoading(false))
    }, [route, loading]);

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
                    navigation.navigate('NavBar', {screen: 'Home'});
                } else {
                    alert(response.status);
                    navigation.navigate('NavBar', {screen: 'Home'});
                }
            })
            .catch(error => {
                alert( 'There has been a problem with your fetch operation: ' + error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };


    return (
        <ScrollView>
            <ScreenHeader navigation={navigation}/>
            <View style={styles.container}>
                <View style={styles.card}>
                    <Image style={styles.avatar} source={{uri: "https://iconape.com/wp-content/png_logo_vector/user-circle.png"}} />
                    <Text style={styles.cardTittle}>User</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardText}> Email: {user.email} </Text>
                    <Pressable style={styles.btn} onPress={onLogout} >
                        <Text style={styles.btnText}> Log out </Text>
                    </Pressable>
                </View>
            </View>
        </ScrollView>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        justifyContent: "center",
        alignContent: "center",
    },
    cardTittle: {
        color: "black",
        fontSize: 22,
        marginBottom: 5,
    },
    cardText: {
        color: "black",
        fontSize: 20,
        marginTop: 10,
        marginBottom: 20,
    },
    avatar: {
        width: 160,
        height: 160,
    },
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        padding: 10,
        height: 200,
        marginTop: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    profileCard: {
        height: 200,
        alignItems: 'center',
        marginTop: 20,
    },
    btn: {
        width: 220,
        height: 40,
        margin: 10,
        borderRadius: 20,
        backgroundColor: "#a3c6ff",
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
    },
    btnText: {
        color: "black",
        textAlign: "center",
    },
})

export default AccountScreen;
