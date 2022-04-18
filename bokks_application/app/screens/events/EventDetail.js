import React, {useEffect, useState} from "react";
import {ActivityIndicator, StyleSheet, ScrollView, View, Image, Pressable, Text} from "react-native";
import { Title, Subheading, Paragraph, TextInput } from "react-native-paper";
import {appURL} from "../../Constants";
import {EventsHeader, ScreenHeader} from "../../components/Headers";

const eventURL = appURL + 'events/'

const EventDetailScreen = ({navigation, route}) => {
    const [isLoading, setLoading] = useState(true);
    const [event, setEvent] = useState({});
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

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
                <EventsHeader navigation={navigation} />
            </View>
            {isLoading ? <ActivityIndicator/> : (
            <View>
                <ScrollView style={styles.content}>
                    <View style={styles.card}>
                        <View style={styles.imageContainer}>
                            <Image style={styles.img} source={{uri: 'https://www.psdmockups.com/wp-content/uploads/2018/06/Hardback-Book-Front-Cover-PSD-Mockup.jpg'}} />
                        </View>
                        <View style={styles.infoContainer}>
                            <TextInput 
                                onChangeText={description => setTitle(description)}
                                mode="outlined"
                                style={styles.infoTitle}
                                value={event.name}
                            />
                            <Subheading style={styles.infoSub}>User email: {event.user__email}</Subheading>
                            {/* <Paragraph style={styles.infoPar}> User email: {event.user__email} </Paragraph> */}
                        </View>
                    </View>

                    <View style={styles.descriptionContainer}>
                        <View style={styles.sectionTitle} >
                            <Title>Description</Title>
                        </View>
                        <View style={styles.section} >
                            <TextInput
                                onChangeText={description => setDescription(description)}
                                mode="outlined"
                                style={styles.input}
                                value={event.description}
                            />
                        </View>
                    </View>

                    <View style={styles.btnView}>
                        <View style={styles.btnContainer}>
                            <Pressable style={styles.btn} onPress={() => {console.log('delete')}}>
                                <Text style={styles.btnText}> Save changes </Text>
                            </Pressable>
                        </View>
                        <View style={styles.btnContainer}>
                            <Pressable style={styles.btn} onPress={() => {console.log('delete')}}>
                                <Text style={styles.btnText}> Delete </Text>
                            </Pressable>
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
    },

    infoTitle: {
        fontSize: 20,
        paddingLeft: 6,
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
