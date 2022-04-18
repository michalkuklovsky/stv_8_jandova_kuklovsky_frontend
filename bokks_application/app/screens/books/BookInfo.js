import React, {useEffect, useState} from "react";
import {Image, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import {Switch, Paragraph, Subheading, TextInput, Title} from "react-native-paper";
import {ScreenHeader} from "../../components/Headers";

const BookInfo = ({navigation, route}) => {
    const book = route.params.book;
    const [recover, setRecover] = useState(false);
    const toggledOn = () => setRecover(!recover);
    return (
        <View styles={styles.container}>
            {/*<View>*/}
            {/*    <ScreenHeader navigation={navigation} />*/}
            {/*</View>*/}
        <ScrollView contentContainerStyle={styles.content}>
            <View style={styles.imageContainer}>
                <Image style={styles.img} source={{uri: 'https://www.psdmockups.com/wp-content/uploads/2018/06/Hardback-Book-Front-Cover-PSD-Mockup.jpg'}} />
            <Pressable tyle={styles.btn}>
                <Text style={styles.btnText}> Upload </Text>
            </Pressable>
            </View>
            <View style={styles.infoContainer}>
                <TextInput mode="outlined" label="Title" defaultValue={book.title} />
                <TextInput mode="outlined" label="Author" defaultValue={book.authors__name} />
                <TextInput mode="outlined" label="Price" defaultValue={book.price.toString()} />
                <TextInput mode="outlined" label="Release year" defaultValue={book.release_year.toString()} />
                <TextInput mode="outlined" label="ISBN" defaultValue={book.isbn} />
                <TextInput mode="outlined" label="Image path" defaultValue={book.img_path} />
                <TextInput mode="outlined" label="Quantity" defaultValue={book.quantity.toString()} />
                <TextInput mode="outlined" label="Description" defaultValue={book.description} multiline={true} />
                <TextInput mode="outlined" label="Genre" value={book.genres__name} />
            </View>
            <View style={styles.btnContainer}>
                <Subheading>Recover</Subheading>
                <Switch color={"#a3c6ff"} value={recover} onValueChange={toggledOn} />
                <Pressable style={styles.btn}>
                    <Text style={styles.btnText}> Save </Text>
                </Pressable>

            </View>
        </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 8,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
    },
    content:{
        padding: 8,
        marginTop: 10,
        paddingBottom: 20,
    },
    infoContainer: {
        flexDirection: "column",
        justifyContent: "space-evenly",
        padding: 10,
    },
    img: {
        alignSelf: "center",
        borderRadius: 10,
        height: 200,
        width: 140,
    },
    imageContainer: {
        // flexDirection: "row",
        justifyContent: "center",
        // alignItems: "center",
        padding: 20,
        width: "100%",
        height: 240,
    },
    btnContainer: {
        // flex: 1,
        flexDirection: "row",
        padding: 14,
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    btn: {
        width: 110,
        height: 34,
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
})

export default BookInfo;
