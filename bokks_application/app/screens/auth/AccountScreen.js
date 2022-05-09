import React, {useEffect, useState, useContext} from "react";
import {ActivityIndicator, Image, Pressable, ScrollView, Text, View} from "react-native";
import {StyleSheet} from "react-native";
import {ScreenHeader} from "../../components/Headers";
import {appURL} from "../../Constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from '../../context/AuthContext';

const profileURL = appURL + 'profile';
const logoutURL = appURL + 'logout';

const AccountScreen = ({navigation, route}) => {
    const [loading, setLoading] = useState(true);
    const [logout, setLogout] = useState(false);
    const {role, email, getUser, removeUser} = useContext(AuthContext);

    useEffect( () => {
        let unmounted = false
        getUser();
        if (role === "unknown") {
            alert("Unauthorized user. Please log in.");
            return navigation.navigate("Home", {});
        }
        setLoading(false);
        return () => {
            unmounted = true
        }
    }, [logout])

    const onLogout = () => {
        setLoading(true);
        fetch(logoutURL, {
            method: 'POST',
        })
            .then(response => {
                if (response.status === 204) {
                    removeUser();
                    setLogout(true);
                    navigation.navigate('Home', {});
                } else ( alert(response.status));
            })
            .catch(error => { alert(error.message);})
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
                            {/*<Image style={styles.avatar} source={{uri: "https://logodix.com/logo/1707088.png"}} />*/}
                            <Image style={styles.avatar} source={require("../../images/profile.png")} />
                            <Text style={styles.cardTittle}> {email} </Text>
                        </View>

                        <View style={styles.card}>
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
        height: 220,
        marginTop: 10,
        alignItems: "center",
        justifyContent: "center",
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

export default AccountScreen;
