import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    SafeAreaView,
    ActivityIndicator,
    Pressable,
    Image,
} from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { EventsHeader} from '../../components/Headers';
import {appURL} from '../../Constants';
import { NavigationBar } from '../../navigator/Navigator';


const eventsURL = appURL + 'events';

const Event = ({navigation, event}) => {

    const showDetail = () => {
        navigation.navigate("EventInfo", {event: event});
    };


    return (
        // <View>
        <Pressable onPress={showDetail}>
            <Card style={styles.card}>
                <View style={styles.cardView}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.logo} source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}} />
                        {/*    /!*<Card.Cover style={styles.logo} source={{ uri: appURL+'books/'+book.id+'/'+book.img_path }} />*!/*/}

                    </View>
                    <Title style={styles.imgTitle}> {event.name} </Title>
                    <Paragraph style={styles.imgSub}> User ID: {event.user__id}</Paragraph>
                </View>
            </Card>
        </Pressable>
        // </View>
    );
};

const EventsListScreen = ({navigation, route}) => {
    const [isLoading, setLoading] = useState(true);
    // const [books, setBooks] = useState([]);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch(eventsURL, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(json => {
                setEvents(json.events);
                // navigation.navigate();
            })
            .catch(error => alert(error))
            .finally(() => setLoading(false));
    }, [route]);

    // useEffect(function effectFunction() {
    //     async function fetchEvents() {
    //         const response = await fetch(eventsURL);
    //         const json = await response.json();
    //         setEvents(json.events);
    //         setLoading(false);
    //         // updateEvent(json.data);
    //     }
    //     fetchEvents();
    // }, []);

    const onPressed = () => {
        navigation.navigate('EventDetail', {id: 19});
    };

    return (
        <SafeAreaView>
            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <View>
                    <View>
                        <EventsHeader navigation={navigation}/>
                    </View>
                    <View style={styles.mainContainer}>
                        <Pressable onPress={onPressed}><Title style={styles.imgTitle}>Hello</Title></Pressable>
                        <FlatList
                            data={events}
                            keyExtractor={({id}, index) => id}
                            renderItem={({item}) => (<Event event={item} navigation={navigation} />)}
                            styles={styles.booksList}
                            contentContainerStyle={styles.listContainer}
                            nestedScrollEnabled={true}
                        />
                    </View>
                    <View style={styles.navbar}>
                        <NavigationBar />
                    </View>
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    mainContainer:{
        paddingTop: 10,
        // bottom: 50,
        // flexWrap: 'wrap',
    },
    titleContainer:{
        padding: 8,
    },
    mainTitle: {
        fontSize: 24,
        fontWeight: '500',
        textAlign: 'center',
        color: 'black',
    },
    booksList: {
        flexGrow: 1,
        backgroundColor: 'blue',
    },
    listContainer: {
        marginHorizontal: 8,
    },
    logo: {
        width: 20,
        height: 30,
        borderRadius: 10,
    },
    imageContainer: {
        paddingTop: 10,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
    },
    card: {
        // width: 140,
        height: 50,
        borderRadius: 10,
        shadowOpacity: 0.25,
        marginTop: 5,
        marginHorizontal: 20,
    },
    cardView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    imgTitle: {
        fontSize: 16,
        paddingLeft: 6,
        width: '60%',
    },
    imgSub: {
        paddingLeft: 6,
    },
    btn: {
        backgroundColor: '#fff',
        height: 60,
        borderRadius: 25,
        alignItems: 'stretch',
        justifyContent: 'center',
        fontSize: 18,
    },
    navbar: {
        position: 'absolute',
        bottom: 0,
    },
});

export default EventsListScreen;
