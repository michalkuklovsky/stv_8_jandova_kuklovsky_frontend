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
import {getData} from '../../utility/HandleRequest.js';
import OfflineScreen from '../../components/OfflineScreen';


const eventsURL = appURL + 'events';

const Event = ({navigation, event}) => {

    const showDetail = () => {
        navigation.navigate("EventInfo", {event: event});
    };
    return (
        <Pressable onPress={showDetail}>
            <Card style={styles.card}>
                <View style={styles.cardView}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.logo} source={{ uri: eventsURL+'/'+event.id+'/'+event.img_path }} />
                    </View>
                    <Title style={styles.imgTitle}> {event.name} </Title>
                    <Paragraph style={styles.imgSub}> User ID: {event.user__id}</Paragraph>
                </View>
            </Card>
        </Pressable>
    );
};

const EventsListScreen = ({navigation, route}) => {
    const [isLoading, setLoading] = useState(true);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        getData(eventsURL)
            .then(res => setEvents(res.events))
            .catch(() => {})
            .finally(() => setLoading(false));
    }, [route]);

    return (
        <SafeAreaView>
            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <View>
                    { events && events.length > 0 ? (
                        <View>
                            <View>
                                <EventsHeader navigation={navigation}/>
                            </View>
                            <View style={styles.mainContainer}>
                                <FlatList
                                    data={events}
                                    keyExtractor={({id}, index) => id}
                                    renderItem={({item}) => (<Event event={item} navigation={navigation} />)}
                                    styles={styles.booksList}
                                    contentContainerStyle={styles.listContainer}
                                    nestedScrollEnabled={true}
                                />
                            </View>
                        </View>
                    ) : (
                        <OfflineScreen navigation={navigation}/>
                    ) }
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    mainContainer:{
        paddingTop: 20,
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
        width: 32,
        height: 38,
        borderRadius: 5,
        backgroundColor: '#a3c6ff',
    },
    imageContainer: {
        padding: 5,
    },
    card: {
        height: 50,
        borderRadius: 10,
        shadowOpacity: 0.25,
        marginTop: 5,
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imgTitle: {
        fontSize: 16,
        paddingLeft: 6,
        width: '60%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imgSub: {
        paddingLeft: 6,
        alignItems: 'center',
        justifyContent: 'center',
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
