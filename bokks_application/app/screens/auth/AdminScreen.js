import React, {useEffect, useState} from "react";
import {ActivityIndicator, Image, Pressable, ScrollView, Text, View} from "react-native";
import {StyleSheet} from "react-native";
import {Button} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ScreenHeader} from "../../components/Headers";
import {appURL} from "../../Constants";

const profileURL = appURL + 'profile';
const logoutURL = appURL + 'logout';

const AdminScreen = ({navigation, route}) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({});

    useEffect(() => {
        fetch(profileURL, {
            method: 'GET'
        })
            .then( response => response.json())
            .then( json => {
                setUser(json.user);
                if (json.user === undefined) {
                    throw "Unauthorized user. Please log in."
                } else if (!json.user.is_admin) {
                    throw "Forbidden."
                }
            })
            .catch(error => {  alert( error ); return navigation.navigate("Home", {}) })
            .finally(setLoading(false))
    }, [route]);

    const onLogout = () => {
        setLoading(true);
        fetch(logoutURL, {
            method: 'POST',
        })
            .then(response => {
                if (response.status === 204) {
                    navigation.navigate('Home', {});
                } else ( alert(response.status));
            })
            .catch(error => { alert(error);})
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <View>
            {loading ? (
                <ActivityIndicator />
            ) : (
                <ScrollView>
                    <ScreenHeader navigation={navigation} />

                    <View style={styles.container}>
                        <View style={styles.card}>
                            <Image style={styles.avatar} source={{uri: "https://logodix.com/logo/1707088.png"}} />
                            <Text style={styles.cardTittle}> Admin </Text>
                        </View>

                        <View style={styles.card}>
                            <Pressable style={styles.btn} onPress={() => navigation.navigate('BooksList', {})} >
                                <Text style={styles.btnText}> Books </Text>
                            </Pressable>

                            <Pressable style={styles.btn} onPress={() => navigation.navigate('EventsList', {})} >
                                <Text style={styles.btnText}> Events </Text>
                            </Pressable>
                            <Pressable style={styles.btn} onPress={onLogout} >
                                <Text style={styles.btnText}> Log out </Text>
                            </Pressable>
                        </View>
                    </View>
                </ScrollView>
            )}
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        height: "100%",
        justifyContent: "center",
    },
    cardTittle: {
        color: "black",
        fontSize: 22,
        marginBottom: 5,
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
    },
    btn: {
        width: 220,
        height: 40,
        margin: 8,
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

export default AdminScreen;
