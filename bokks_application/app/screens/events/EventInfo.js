import React, {useEffect, useState} from "react";
import {Image, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import {Switch, Paragraph, Subheading, TextInput, Title} from "react-native-paper";
import {ScreenHeader} from "../../components/Headers";
import { appURL } from "../../Constants";

const EventInfo = ({navigation, route}) => {
    const event = route.params.event;
    const [recover, setRecover] = useState(false);
    const [name, setName] = useState('');
    const [imgpath, setImgpath] = useState('');
    const [description, setDescription] = useState('');
    const toggledOn = () => setRecover(!recover);

    const eventURL = appURL + 'events/' + route.params.event.id;

    const save = () => {
        let formdata = new FormData();
        let changed = false;

        if (name !== '') {formdata.append('name', name); changed = true;}
        if (imgpath !== '') {formdata.append('img_path', imgpath); changed = true;}
        if (description !== '') {formdata.append('description', description); changed = true;}

        if (changed) {
            fetch(eventURL,{
                method: 'put',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: formdata,
                })
                .then(response => {
                    console.log(eventURL+ " -> HTTP PUT sent");
                })
                .catch(err => {
                    console.log(err);
                });
                changed = false;
        }

        navigation.navigate('EventsList', {});
    };

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
                <TextInput
                    mode="outlined"
                    label="Name"
                    defaultValue={event.name}
                    onChangeText={text => setName(text)} />
                <TextInput
                    mode="outlined"
                    label="Image path"
                    defaultValue={event.img_path}
                    onChangeText={text => setImgpath(text)} />
                <TextInput
                    mode="outlined"
                    label="Description"
                    defaultValue={event.description}
                    multiline={true}
                    onChangeText={text => setDescription(text)} />
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
    )
}

const CreateEvent = ({navigation, route}) => {
    const event = route.params.event;
    const [recover, setRecover] = useState(false);
    const [name, setName] = useState('');
    const [imgpath, setImgpath] = useState('');
    const [description, setDescription] = useState('');
    const toggledOn = () => setRecover(!recover);

    const eventURL = appURL + 'events/';

    const create = () => {
        let formdata = new FormData();
        let changed = false;

        if (name !== '') {formdata.append('name', name); changed = true;}
        if (imgpath !== '') {formdata.append('img_path', imgpath); changed = true;}
        if (description !== '') {formdata.append('description', description); changed = true;}

        if (changed) {
            fetch(eventURL,{
                method: 'post',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: formdata,
                })
                .then(response => {
                    console.log(eventURL+ " -> HTTP POST sent");
                })
                .catch(err => {
                    console.log(err);
                });
                changed = false;
        }

        navigation.navigate('EventsList', {});
    };

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
                <TextInput
                    mode="outlined"
                    label="Name"
                    defaultValue={''}
                    onChangeText={text => setName(text)} />
                <TextInput
                    mode="outlined"
                    label="Image path"
                    defaultValue={''}
                    onChangeText={text => setImgpath(text)} />
                <TextInput
                    mode="outlined"
                    label="Description"
                    defaultValue={''}
                    multiline={true}
                    onChangeText={text => setDescription(text)} />
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

export default EventInfo;

export {
    CreateEvent,
};
