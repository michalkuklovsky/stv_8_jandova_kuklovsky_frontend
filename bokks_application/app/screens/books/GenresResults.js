import React, {useEffect, useState} from "react";
import {ActivityIndicator, FlatList, Pressable, SafeAreaView, StyleSheet, Text, View, Image} from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import {Colors} from "react-native/Libraries/NewAppScreen";
import {appURL} from "../../Constants";
import base64 from 'react-native-base64';


const genresURL = appURL + 'genres';
const storagePath = 'C:/Users/alexa/OneDrive - Slovenská technická univerzita v Bratislave/3 LS/MTAA/Zadanie2/backend/bokksapp/resources/books/';

const Book = ({navigation, book}) => {
    // const
    const onPressed = () => {
        // navigation.navigate("BookId", {id: book.id})
    }
    const [image, setImage] = useState(undefined)

    useEffect(() => {
            fetch(  appURL+'books/'+book.id+'/'+book.img_path, {
                method: 'GET',
            })
                .then(response => response.json())
                .then(json => {
                    setImage(json.image);
                    // console.log(json.image);
                } )
                .catch(error => alert(error))
        }, []
    )

    return (
        <Pressable onPress={onPressed}>
            <Card>
                <Title> {book.title} </Title>
                <Paragraph> {book.price} €</Paragraph>
                {/*<Card.Cover style={styles.logo} source={{uri: appURL+'books/'+book.id+'/'+book.img_path}} />*/}
                {/*<Image style={styles.logo} source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}} />*/}
                <Card.Cover style={styles.logo} source={{uri: {image} }}/>
            </Card>
        </Pressable>
    )
}

const GenreResults = ({navigation, route}) => {
    const [isLoading, setLoading] = useState(true);
    const [books, setBooks] = useState([]);

    useEffect(() => {
          fetch( genresURL + '/?query=' + route.params.name, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
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
                    <View>
                        <Text style={styles.mainTitle}> Results </Text>
                    </View>
                    <FlatList
                        data={books}
                        keyExtractor={( {id}, index) => id}
                        renderItem={({item}) => (<Book book={item}/>)}
                        numColumns={2}
                        styles={styles.listContainer}
                    />
                </View>
            )
            }
        </SafeAreaView>
    );

}
const styles = StyleSheet.create({
    mainTitle: {
        fontSize: 26,
        fontWeight: "500",
        textAlign: "center",
        color: "black",
    },
    listContainer:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center",
    },
    logo: {
        width: 100,
        height: 100,
    },
})


export default GenreResults;
