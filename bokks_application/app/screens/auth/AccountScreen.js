import React, {useEffect, useState} from "react";
import {Image, ScrollView, Text, View} from "react-native";

const AccountScreen = () => {

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={[styles.card, styles.profileCard]}>
                    <Image style={styles.avatar} source={{uri: "https://bootdey.com/img/Content/avatar/avatar6.png"}} />
                    <Text  style={styles.name}>John Doe</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTittle}>Title</Text>
                    <Text> email</Text>
                </View>
            </View>
        </ScrollView>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: "#DCDCDC"
    },
    cardTittle: {
        color: "#808080",
        fontSize: 22,
        marginBottom: 5,
    },
    avatar: {
        width: 150,
        height: 150,
    },
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        padding: 10,
        height: 100,
        marginTop: 10,
    },
    profileCard: {
        height: 200,
        alignItems: 'center',
        marginTop: 20,
    },
})

export default AccountScreen;
