import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    SafeAreaView,
    ActivityIndicator,
} from 'react-native';
import {Button} from 'react-native-paper';
import {appURL} from "../../Constants";


const eventsURL = appURL + 'events';

const EventsScreen = () => {

}

const BooksListScreen = ({navigation}) => {
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
    }, []);

    return (
        <SafeAreaView>
            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <View>
                    <Text>Events</Text>
                    <FlatList
                        data={events}
                        keyExtractor={({id}, index) => id}
                        renderItem={({item}, index) => (
                            <Text>
                                Name: {item.name}
                                <Text> </Text>
                                Description: {item.description}
                            </Text>
                        )}
                    />
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    btn: {
        backgroundColor: '#fff',
        height: 60,
        borderRadius: 25,
        alignItems: 'stretch',
        justifyContent: 'center',
        fontSize: 18,
    },
});

export default EventsScreen;
