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
import { BooksHeader} from '../../components/Headers';
import {appURL} from '../../Constants';
import { NavigationBar } from '../../navigator/Navigator';


const booksURL = appURL + 'books';

const Book = ({navigation, book}) => {

    const showDetail = () => {
        navigation.navigate("BookInfo", {book: book});
    };


    return (
        // <View>
        <Pressable onPress={showDetail}>
            <Card style={styles.card}>
                <View style={styles.cardView}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.logo} source={{uri: booksURL+'/'+book.id+'/'+book.img_path}} />
                    </View>
                    <Title style={styles.imgTitle}> {book.title} </Title>
                    <Paragraph style={styles.imgSub}> Quantity: {book.quantity}</Paragraph>
                </View>
            </Card>
        </Pressable>
        // </View>
    );
};

const BooksListScreen = ({navigation, route}) => {
    const [isLoading, setLoading] = useState(true);
    const [books, setBooks] = useState([]);
    // const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch(booksURL, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(json => {
                setBooks(json.books);
                // navigation.navigate();
            })
            .catch(error => alert(error))
            .finally(() => setLoading(false));
    }, [route]);

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
                        <BooksHeader navigation={navigation}/>
                    </View>
                    <View style={styles.mainContainer}>
                        <FlatList
                            data={books}
                            keyExtractor={({id}, index) => id}
                            renderItem={({item}) => (<Book book={item} navigation={navigation} />)}
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
        width: 28,
        height: 40,
        borderRadius: 5,
        backgroundColor: '#a3c6ff',
    },
    imageContainer: {
        padding: 5,
        paddingLeft: 10,
    },
    card: {
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
        fontSize: 14,
        paddingLeft: 6,
        width: '50%',
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

export default BooksListScreen;
