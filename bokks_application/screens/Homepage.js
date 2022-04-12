import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    SafeAreaView,
    ActivityIndicator,
} from 'react-native';

// const homeURL = 'http://192.168.56.1:8000/';
const homeURL = 'http://192.168.200.185:8000/';

const Homepage = () => {
    const [isLoading, setLoading] = useState(true);
    const [books, setBooks] = useState([]);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch(homeURL, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(json => {
                setBooks(json.books);
                setEvents(json.events);
            })
            .catch(error => alert(error))
            .finally(() => setLoading(false));
    });

    return (
        <SafeAreaView>
            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <View>
                    <Text>Books</Text>
                    <FlatList
                        data={books}
                        keyExtractor={({id}, index) => id}
                        renderItem={({item}, index) => (
                            <Text>
                                Title: {item.title}
                                <Text> </Text>
                                ISBN: {item.isbn}
                            </Text>
                        )}
                    />
                    <Text>Events</Text>
                    <FlatList
                        data={events}
                        keyExtractor={({id}, index) => id}
                        renderItem={({item}, index) => (
                            <Text>
                                Title: {item.name}
                                <Text> </Text>
                                User ID: {item.user_id}
                            </Text>
                        )}
                    />
                </View>
            )}
        </SafeAreaView>
    );
};

export default Homepage;
