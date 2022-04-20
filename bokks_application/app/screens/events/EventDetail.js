import React, {useEffect, useState} from "react";
import {ActivityIndicator, StyleSheet, ScrollView, View, Image, Pressable, Text} from "react-native";
import { Title, Subheading, Paragraph } from "react-native-paper";
import {appURL} from "../../Constants";
import {ScreenHeader} from "../../components/Headers";

const eventURL = appURL + 'events/'

const EventDetailScreen = ({navigation, route}) => {
    const [isLoading, setLoading] = useState(true);
    const [event, setEvent] = useState({});

    useEffect(() => {
            fetch( eventURL + route.params.id, {
                method: 'GET',
            })
                .then(response => response.json())
                .then(json => setEvent(json.event))
                .catch(error => alert(error))
                .then(setLoading(false));
        }, []
    )

    return (
        <View style={styles.container}>
            <View>
                <ScreenHeader navigation={navigation} />
            </View>
            {isLoading ? <ActivityIndicator/> : (
            <View>
                <ScrollView style={styles.content}>
                    <View style={styles.card}>
                        <View style={styles.imageContainer}>
                            <Image style={styles.logo} source={{ uri: eventURL+'/'+event.id+'/'+event.img_path }} />
                        </View>
                        <View style={styles.infoContainer}>
                            <Title style={styles.infoTitle}> {event.name} </Title>
                            <Subheading style={styles.infoSub}>User email: {event.user__email}</Subheading>
                        </View>
                    </View>

                    <View style={styles.descriptionContainer}>
                        <View style={styles.sectionTitle} >
                            <Title>Description</Title>
                        </View>
                        <View style={styles.section} >
                            <Paragraph> {event.description} </Paragraph>
                        </View>
                    </View>
                </ScrollView>
            </View>
            )}
            {/*<View>*/}
            {/*    <NavigationBar />*/}
            {/*</View>*/}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: "white",
        height: "100%",
        width: "100%",
    },
    content:{
        padding: 8,
        marginLeft:10,
        marginRight:10,
        marginTop:20,
    },
    card: {
        flex: 1,
        flexDirection: "row",
        shadowOpacity: 0.25,
        shadowRadius: 5,
        marginVertical: 12,
    },
    imageContainer: {
        flex: 3,
        justifyContent: "center",
        // backgroundColor: "#ddd7ff",
        flexDirection: "column",
        alignItems: "center",
        padding: 5,
        width: "100%",
        height: 240,
    },
    infoContainer: {
        flex: 4,
        paddingTop: 20,
        flexDirection: "column",
        width: "100%",
        height: 240,
    },

    detailsContainer: {
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        backgroundColor: "#c7dcff",
        top: 10,
    },
    descriptionContainer: {
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        backgroundColor: "#c7dcff",
        flex: 1,
        // flexDirection: "column",
        // width: "100%",
        height: 200,
        top: 5,
    },
    section: {
        padding: 10,
    },
    sectionTitle: {
        padding: 10,
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        backgroundColor: "#a3c6ff",
    },
    img: {
        borderRadius: 10,
        height: 200,
        width: "100%",
        backgroundColor: '#a3c6ff',

    },

    infoTitle: {
        fontSize: 20,
        // paddingLeft: 0,
        marginTop: 8,
    },
    infoSub: {
        fontSize: 16,
        paddingLeft: 6,
        marginVertical: 8,
    },
    infoPar: {
        fontSize: 16,
        fontWeight: "bold",
        paddingLeft: 6,
        marginVertical: 8,
    },
    btn: {
        width: 150,
        height: 40,
        margin: 8,
        borderRadius: 20,
        backgroundColor: "#a3c6ff",
        justifyContent: "center",
        elevation: 5,
    },
    btnText: {
        color: "black",
        textAlign: "center",
    },
    btnContainer: {
        flex: 1,
        padding: 14,
        alignItems: "center",
        top: 5,
    },
    btnView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default EventDetailScreen;
