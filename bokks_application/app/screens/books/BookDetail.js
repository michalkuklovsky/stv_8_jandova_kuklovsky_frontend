import React, {useEffect, useState} from "react";
import {ActivityIndicator, Pressable, SafeAreaView, StyleSheet, Text, ScrollView, View, Image} from "react-native";
import { List, Title, Subheading, Paragraph } from "react-native-paper";
import {appURL} from "../../Constants";

const bookURL = appURL + 'books/'

const BookDetailScreen = ({navigation, route}) => {
    const [isLoading, setLoading] = useState(true);
    const [book, setBook] = useState({});

    useEffect(() => {
            fetch( bookURL + route.params.id, {
                method: 'GET',
            })
                .then(response => response.json())
                .then(json => setBook(json.book))
                .catch(error => alert(error))
                .then(setLoading(false));
        }, []
    )

    return (
        <View style={styles.mainContainer}>
            {isLoading ? <ActivityIndicator/> : (

                <ScrollView style={styles.content}>

                    <View style={styles.card}>
                        <View style={styles.imageContainer}>
                            <Image style={styles.img} source={{uri: 'https://www.psdmockups.com/wp-content/uploads/2018/06/Hardback-Book-Front-Cover-PSD-Mockup.jpg'}} />
                        </View>
                        <View style={styles.infoContainer}>
                            <Title style={styles.imgTitle}> {book.title} </Title>
                            <Subheading style={styles.imgSub}> {book.authors__name}</Subheading>
                            <Paragraph style={styles.imgSub}> {book.price} € </Paragraph>
                        </View>
                    </View>

                    <View style={styles.detailsContainer}>
                        <View style={styles.sectionTitle} >
                            <Title>Details</Title>
                        </View>
                        <View style={styles.section} >
                            <Subheading> Release Year: {book.release_year} </Subheading>
                            <Subheading> ISBN: {book.isbn} </Subheading>
                        </View>
                    </View>

                    <View style={styles.descriptionContainer}>
                        <View style={styles.sectionTitle} >
                            <Title>Description</Title>
                        </View>
                        <View style={styles.section} >
                            <Paragraph> {book.description} </Paragraph>
                        </View>
                    </View>

                </ScrollView>

            )}
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 20,
        marginTop: 20,
        // justifyContent: "space-around",
    },
    content:{
        marginLeft:10,
        marginRight:10,
        marginTop:20,
    },
    card: {
        flex: 1,
        flexDirection: "row",
        position: "relative",
        justifyContent: 'space-between',
        backgroundColor: "#dcdcdc",
        shadowOpacity: 0.25,
        shadowRadius: 5,
        marginVertical: 12,
    },
    imageContainer: {
        justifyContent: "center",
        backgroundColor: "#ddd7ff",
        flexDirection: "column",
        flex: 2,
        alignItems: "center",
        padding: 5,
        width: "100%",
        height: 240,
    },
    infoContainer: {
        paddingTop: 20,
        backgroundColor: "#9980cc",
        flex: 3,
        flexDirection: "column",
        width: "100%",
        height: 240,
    },

    detailsContainer: {
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        backgroundColor: "#ddcae8",
        top: 20,
    },
    descriptionContainer: {
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        backgroundColor: "#ddcae8",
        flex: 1,
        // flexDirection: "column",
        // width: "100%",
        height: 240,
        top: 40,
    },
    section: {
        padding: 10,
    },
    sectionTitle: {
        padding: 10,
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        backgroundColor: "#ddd5f0",
    },
    img: {
        borderRadius: 10,
        height: 200,
        width: "100%",
    },

    imgTitle: {
        fontSize: 16,
        paddingLeft: 6,
    },
    imgSub: {
        paddingLeft: 6,
    }
})

export default BookDetailScreen;
