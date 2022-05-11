import React, {useEffect, useState, useContext} from "react";
import {ActivityIndicator, Pressable, SafeAreaView, StyleSheet, Text, ScrollView, View, Image} from "react-native";
import { List, Title, Subheading, Paragraph } from "react-native-paper";
import {appURL} from "../../Constants";
import {ScreenHeader} from "../../components/Headers";
import {NavigationBar} from "../../navigator/Navigator";
import NetInfo, {useNetInfo} from '@react-native-community/netinfo';
import {getData} from '../../utility/HandleRequest.js';
import { AuthContext } from '../../context/AuthContext';
import OfflineScreen from "../../components/OfflineScreen";



const bookURL = appURL + 'books/'
const cartURL = appURL + 'cart/'

const BookDetailScreen = ({navigation, route}) => {
    const [isLoading, setLoading] = useState(false);
    const [book, setBook] = useState({});
    const {role, email, getUser, removeUser} = useContext(AuthContext);

    const netInfo = useNetInfo();

    const addToCart = () => {

        getUser();
        if (role === "unknown") {
            alert("You are not logged in");
            return;
        }
        
        if (!netInfo.isInternetReachable) {
            alert('You are not connected to the internet.');
            return;
        }

        const data = {
            'title': book.title,
            'quantity': 1,
            'price': book.price,
        };

        fetch( cartURL, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
        })
            .then(response => response.json())
            .catch(error => alert(error))
            .then(setLoading(false));
        
        alert('Book was added to your cart.');    
    }
    const showDetail = () => {
        navigation.navigate("BookInfo", {book: book});
    }

    useEffect(() => {
            getData(bookURL + route.params.id)
                .then(res => setBook(res.book))
                .catch(() => {})
                .finally(() => setLoading(false));
        }, [route]
    )

    return (
        <View>
            { book && Object.keys(book).length > 0  ? (
                <View style={styles.container}>
                <View>
                    <ScreenHeader navigation={navigation} />
                </View>
                {isLoading ? <ActivityIndicator/> : (
                <View>
                    <ScrollView contentContainerStyle={styles.content}>
                        <View style={styles.card}>
                            <View style={styles.imageContainer}>
                                <Image style={styles.img} source={{uri: appURL + 'books/' + book.id + '/' + book.img_path}} />
                            </View>
                            <View style={styles.infoContainer}>
                                <Title style={styles.infoTitle}> {book.title} </Title>
                                <Subheading style={styles.infoSub}> {book.authors__name}</Subheading>
                                <Paragraph style={styles.infoPar}> {book.price} € </Paragraph>
                                <View style={styles.btnContainer}>
                                    <Pressable style={styles.btn} onPress={addToCart} >
                                        <Text style={styles.btnText}> Add to cart </Text>
                                    </Pressable>
                                    {/* <Pressable style={styles.btn} onPress={showDetail} >
                                        <Text style={styles.btnText}> Detail </Text>
                                    </Pressable> */}
                                </View>
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
                </View>
                )}
            </View>
         ) : ( 
            <OfflineScreen navigation={navigation}/>
        )}
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
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
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
        marginTop: 20,
    },
    descriptionContainer: {
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        backgroundColor: "#c7dcff",
        marginTop: 20,
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
        width: 110,
        height: 34,
        margin: 8,
        borderRadius: 20,
        backgroundColor: "#a3c6ff",
        justifyContent: "center",
        elevation: 5,
        top: 5,
    },
    btnText: {
        color: "black",
        textAlign: "center",
    },
    btnContainer: {
        flex: 1,
        padding: 14,
        alignItems: "flex-end",
    }
})

export default BookDetailScreen;
