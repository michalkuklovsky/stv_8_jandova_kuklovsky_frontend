import React, {useEffect, useState} from "react";
import {ActivityIndicator, FlatList, Pressable, SafeAreaView, StyleSheet, Text, ScrollView, View, Image} from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import {appURL} from "../../Constants";
import { ScreenHeader } from '../../components/Headers';
import base64 from 'react-native-base64';

const genresURL = appURL + 'genres';

const Book = ({navigation, book}) => {
    const onPressed = () => {
        navigation.navigate("BookDetail", {id: book.id})
    }

    return (
        // <View>
        <Pressable onPress={onPressed}>
            <Card style={styles.card}>
                <View style={styles.imageContainer}>
                    <Image style={styles.logo} source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}} />
                    {/*    /!*<Card.Cover style={styles.logo} source={{ uri: appURL+'books/'+book.id+'/'+book.img_path }} />*!/*/}
                </View>
                <Title style={styles.imgTitle}> {book.title} </Title>
                <Paragraph style={styles.imgSub}> {book.price} € </Paragraph>
            </Card>
        </Pressable>
        // </View>
    )
}

const GenreResults = ({navigation, route}) => {
    const [isLoading, setLoading] = useState(true);
    const [books, setBooks] = useState([]);

    useEffect(() => {
          fetch( genresURL + '/?query=' + route.params.name, {
            method: 'GET',
          })
              .then(response => response.json())
              .then(json => setBooks(json.books))
              .catch(error => alert(error))
              .then(setLoading(false));
        }, []
    )
    return (
        <SafeAreaView>
            {isLoading ? <ActivityIndicator/> : (
                <View>
                    <ScreenHeader navigation={navigation} />
                    <View style={styles.titleContainer}>
                        <Text style={styles.mainTitle}> Results </Text>
                    </View>

                    <View style={styles.mainContainer}>
                        <FlatList
                            data={books}
                            keyExtractor={( {id}, index) => id}
                            renderItem={({item}) => (<Book book={item} navigation={navigation} />)}
                            numColumns={2}
                            styles={styles.booksList}
                            contentContainerStyle={styles.listContainer}
                            nestedScrollEnabled={true}
                        />
                    </View>

                </View>
            )}
        </SafeAreaView>
    );

}
const styles = StyleSheet.create({
    mainContainer:{
        padding: 10,
        flexWrap: "wrap",
        height: "100%",
    },
    titleContainer:{
        padding: 8,
    },
    mainTitle: {
        fontSize: 24,
        fontWeight: "500",
        textAlign: "center",
        color: "black",
    },
    booksList: {
        // flexGrow: 1,
        backgroundColor: "blue",
        height: "100%",
    },
    listContainer: {
        marginHorizontal: 8,
    },
    logo: {
        width: 100,
        height: 120,
        borderRadius: 10,
    },
    imageContainer: {
        alignItems: "center",
        paddingTop: 10,
        paddingBottom: 8,
    },
    card: {
        width: 140,
        height: 220,
        borderRadius: 10,
        shadowOpacity: 0.25,
        marginVertical: 10,
        marginHorizontal: 20,
    },
    imgTitle: {
        fontSize: 16,
        paddingLeft: 6,
    },
    imgSub: {
        paddingLeft: 6,
    }
})

export default GenreResults;
