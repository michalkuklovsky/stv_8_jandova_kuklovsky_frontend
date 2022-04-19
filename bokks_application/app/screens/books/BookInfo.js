import React, {useEffect, useState} from "react";
import {Image, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import {Switch, Paragraph, Subheading, TextInput, Title} from "react-native-paper";
import {BooksHeader, ScreenHeader} from "../../components/Headers";
import { appURL } from "../../Constants";

const BookInfo = ({navigation, route}) => {
    const book = route.params.book;
    const [recover, setRecover] = useState(false);
    const toggledOn = () => setRecover(!recover);

    const [title, setTitle] = useState('');
    const [author, setAuhtor] = useState('');
    const [price, setPrice] = useState('');
    const [releaseYear, setReleaseYear] = useState('');
    const [isbn, setIsbn] = useState('');
    const [imgpath, setImgpath] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');
    const [genre, setGenre] = useState('');

    const bookURL = appURL + 'books/' + route.params.book.id;

    const save = () => {
        let formdata = new FormData();
        let changed = false;

        if (title !== '') {formdata.append('title', title); changed = true;}
        if (author !== '') {formdata.append('authors', author); changed = true;}
        if (price !== '') {formdata.append('price', price); changed = true;}
        if (releaseYear !== '') {formdata.append('release_year', releaseYear); changed = true;}
        if (isbn !== '') {formdata.append('isbn', isbn); changed = true;}
        if (imgpath !== '') {formdata.append('img_path', imgpath); changed = true;}
        if (quantity !== '') {formdata.append('quantity', quantity); changed = true;}
        if (description !== '') {formdata.append('description', description); changed = true;}
        if (genre !== '') {formdata.append('genres', genre); changed = true;}

        if (changed) {
            fetch(bookURL,{
                method: 'put',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: formdata,
                })
                .then(response => {
                    console.log(bookURL + " -> HTTP PUT sent");
                })
                .catch(err => {
                    console.log(err);
                });
                changed = false;
        }

        navigation.navigate('BooksList', {});
    };

    return (
        <View styles={styles.container}>
            {/* <View> */}
               {/* <BooksHeader navigation={navigation} /> */}
            {/* </View> */}
        <ScrollView contentContainerStyle={styles.content}>
            <View style={styles.imageContainer}>
                <Image style={styles.img} source={{uri: 'https://www.psdmockups.com/wp-content/uploads/2018/06/Hardback-Book-Front-Cover-PSD-Mockup.jpg'}} />
            <Pressable tyle={styles.btn}>
                <Text style={styles.btnText}> Upload </Text>
            </Pressable>
            </View>
            <View style={styles.infoContainer}>
                <TextInput mode="outlined" label="Title" onChangeText={text => setTitle(text)} defaultValue={book.title} />
                <TextInput mode="outlined" label="Author" onChangeText={text => setAuhtor(text)} defaultValue={book.authors__name} />
                <TextInput mode="outlined" label="Price" onChangeText={text => setPrice(text)} defaultValue={book.price.toString()} />
                <TextInput mode="outlined" label="Release year" onChangeText={text => setReleaseYear(text)} defaultValue={book.release_year.toString()} />
                <TextInput mode="outlined" label="ISBN" onChangeText={text => setIsbn(text)} defaultValue={book.isbn} />
                <TextInput mode="outlined" label="Image path" onChangeText={text => setImgpath(text)} defaultValue={book.img_path} />
                <TextInput mode="outlined" label="Quantity" onChangeText={text => setQuantity(text)} defaultValue={book.quantity.toString()} />
                <TextInput mode="outlined" label="Description" onChangeText={text => setDescription(text)} defaultValue={book.description} multiline={true} />
                <TextInput mode="outlined" label="Genre" onChangeText={text => setGenre(text)} value={book.genres__name} />
            </View>
            <View style={styles.btnContainer}>
                <Subheading>Recover</Subheading>
                <Switch color={"#a3c6ff"} value={recover} onValueChange={toggledOn} />
                <Pressable style={styles.btn} onPress={save}>
                    <Text style={styles.btnText}> Save </Text>
                </Pressable>

            </View>
        </ScrollView>
        </View>
    );
};

const CreateBook = ({navigation, route}) => {
    const book = route.params.book;
    const [recover, setRecover] = useState(false);
    const toggledOn = () => setRecover(!recover);

    const [title, setTitle] = useState('');
    const [author, setAuhtor] = useState('');
    const [price, setPrice] = useState('');
    const [releaseYear, setReleaseYear] = useState('');
    const [isbn, setIsbn] = useState('');
    const [imgpath, setImgpath] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');
    const [genre, setGenre] = useState('');

    const bookURL = appURL + 'books/';

    const create = () => {
        let formdata = new FormData();
        let changed = false;

        if (title !== '') {formdata.append('title', title); changed = true;}
        if (author !== '') {formdata.append('authors', author); changed = true;}
        if (price !== '') {formdata.append('price', price); changed = true;}
        if (releaseYear !== '') {formdata.append('release_year', releaseYear); changed = true;}
        if (isbn !== '') {formdata.append('isbn', isbn); changed = true;}
        if (imgpath !== '') {formdata.append('img_path', imgpath); changed = true;}
        if (quantity !== '') {formdata.append('quantity', quantity); changed = true;}
        if (description !== '') {formdata.append('description', description); changed = true;}
        if (genre !== '') {formdata.append('genres', genre); changed = true;}

        if (changed) {
            fetch(bookURL,{
                method: 'post',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: formdata,
                })
                .then(response => {
                    console.log(bookURL + " -> HTTP POST sent");
                })
                .catch(err => {
                    console.log(err);
                });
                changed = false;
        }

        navigation.navigate('BooksList', {});
    };

    return (
        <View styles={styles.container}>
            {/* <View> */}
               {/* <BooksHeader navigation={navigation} /> */}
            {/* </View> */}
        <ScrollView contentContainerStyle={styles.content}>
            <View style={styles.imageContainer}>
                <Image style={styles.img} source={{uri: 'https://www.psdmockups.com/wp-content/uploads/2018/06/Hardback-Book-Front-Cover-PSD-Mockup.jpg'}} />
            <Pressable tyle={styles.btn}>
                <Text style={styles.btnText}> Upload </Text>
            </Pressable>
            </View>
            <View style={styles.infoContainer}>
                <TextInput mode="outlined" label="Title" onChangeText={text => setTitle(text)} defaultValue={''} />
                <TextInput mode="outlined" label="Author" onChangeText={text => setAuhtor(text)} defaultValue={''}/>
                <TextInput mode="outlined" label="Price" onChangeText={text => setPrice(text)} defaultValue={''} />
                <TextInput mode="outlined" label="Release year" onChangeText={text => setReleaseYear(text)} defaultValue={''} />
                <TextInput mode="outlined" label="ISBN" onChangeText={text => setIsbn(text)} defaultValue={''} />
                <TextInput mode="outlined" label="Image path" onChangeText={text => setImgpath(text)} defaultValue={''} />
                <TextInput mode="outlined" label="Quantity" onChangeText={text => setQuantity(text)} defaultValue={''} />
                <TextInput mode="outlined" label="Description" onChangeText={text => setDescription(text)} defaultValue={''} multiline={true} />
                <TextInput mode="outlined" label="Genre" onChangeText={text => setGenre(text)} defaultValue={''} />
            </View>
            <View style={styles.btnContainer}>
                <Subheading>Recover</Subheading>
                <Switch color={"#a3c6ff"} value={recover} onValueChange={toggledOn} />
                <Pressable style={styles.btn} onPress={create}>
                    <Text style={styles.btnText}> Save </Text>
                </Pressable>

            </View>
        </ScrollView>
        </View>
    );
};

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
        bottom: 30,
        top: 10,
    },
    infoContainer: {
        flexDirection: "column",
        justifyContent: "space-evenly",
        padding: 10,
        // bottom: 50,
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
        // bottom: 30,
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
export {
    CreateBook,
};
