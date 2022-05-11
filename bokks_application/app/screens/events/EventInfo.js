import React, {useContext, useEffect, useState} from "react";
import {Image, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import {Switch, Paragraph, Subheading, TextInput, Title, Checkbox} from "react-native-paper";
import {ScreenHeader} from "../../components/Headers";
import { appURL } from "../../Constants";
import ImagePicker from 'react-native-image-crop-picker';
import {deleteData, postData} from "../../utility/HandleRequest";
import {useNetInfo} from "@react-native-community/netinfo";
import {OfflineContext} from "../../context/OfflineContext";


const EventInfo = ({navigation, route}) => {
    const event = route.params.event;
    const [recover, setRecover] = useState(false);
    const [name, setName] = useState('');
    const [imgpath, setImgpath] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(undefined);
    let net = useNetInfo();
    const offline = useContext(OfflineContext);
    const eventURL = appURL + 'events/' + route.params.event.id;
    const [checked, setChecked] = useState(false);
    const delState = event.deleted_at === null ? false : true;
    const [isDeleted, setDeleted] = useState(delState);

    const save = () => {
        let formdata = new FormData();
        let changed = false;

        if (name !== '') {formdata.append('name', name); changed = true;}
        if (imgpath !== '') {formdata.append('img_path', imgpath); changed = true;}
        if (image !== undefined && image !== '') {formdata.append('image', {uri: image.path, name: 'image.jpg', type: 'image/jpeg'}); changed = true;}
        if (description !== '') {formdata.append('description', description); changed = true;}
        if (isDeleted && checked) {formdata.append('deleted_at', 'recover'); changed = true;}

        if (changed) {
            // fetch(eventURL,{
            //     method: 'put',
            //     headers: {
            //         'Content-Type': 'multipart/form-data',
            //     },
            //     body: formdata,
            //     })
            //     .then(response => {
            //         console.log(eventURL+ " -> HTTP PUT sent");
            //     })
            //     .catch(err => {
            //         console.log(err);
            //     });
            //     changed = false;
            postData(net.isInternetReachable, eventURL, 'PUT', 'multipart/form-data', formdata, offline)
                .catch(err => { console.log("PUT caught: " + err);
                });
        }

        navigation.navigate('EventsList', {});
    };

    const onDelete = () =>{
        deleteData(net.isInternetReachable, eventURL, 'DELETE', offline)
            .catch(err => { console.log("DELETE caught: " + err);
            });
        return navigation.navigate('EventsList', {route});
    }

    const uploadImage = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
          }).then(image => {
              setImage(image);
          });
    };

    return (
        <View styles={styles.container}>
            {/*<View>*/}
            {/*    <ScreenHeader navigation={navigation} />*/}
            {/*</View>*/}
        <ScrollView contentContainerStyle={styles.content}>
            <View style={styles.imageContainer}>
                <Image style={styles.img} source={{uri:  eventURL + '/' + event.img_path}} />

                <Pressable style={styles.btn} onPress={uploadImage}>
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
                { isDeleted ? (
                    <View style={styles.switchContainer}>
                        <Subheading style={{alignSelf: "center"}}> Recover </Subheading>
                        <Checkbox color={"#a3c6ff"} status={checked ? 'checked' : 'unchecked'} onPress={() => setChecked(!checked)}/>
                    </View>
                ) : (
                    <Pressable style={styles.btn} onPress={onDelete}>
                        <Text style={styles.btnText}> Delete </Text>
                    </Pressable>
                )
                }
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
    const [image, setImage] = useState(undefined);
    let net = useNetInfo();
    const offline = useContext(OfflineContext);
    const eventURL = appURL + 'events/';

    const create = () => {
        let formdata = new FormData();
        let changed = false;

        if (name !== '') {formdata.append('name', name); changed = true;}
        if (imgpath !== '') {formdata.append('img_path', imgpath); changed = true;}
        if (image !== undefined && image !== '') {formdata.append('image', {uri: image.path, name: 'image.jpg', type: 'image/jpeg'}); changed = true;}
        if (description !== '') {formdata.append('description', description); changed = true;}

        if (changed) {
            // fetch(eventURL,{
            //     method: 'post',
            //     headers: {
            //         'Content-Type': 'multipart/form-data',
            //     },
            //     body: formdata,
            //     })
            //     .then(response => {
            //         console.log(eventURL+ " -> HTTP POST sent");
            //     })
            //     .catch(err => {
            //         console.log(err);
            //     });
            //     changed = false;
            postData(net.isInternetReachable, eventURL, 'POST', 'multipart/form-data', formdata, offline)
                .catch(err => { console.log("PUT caught: " + err);
                });
        }
        navigation.navigate('EventsList', {});
    };

    const uploadImage = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
          }).then(image => {
              setImage(image);
          });
    };

    return (
        <View styles={styles.container}>
            {/*<View>*/}
            {/*    <ScreenHeader navigation={navigation} />*/}
            {/*</View>*/}
        <ScrollView contentContainerStyle={styles.content}>
            <View style={styles.imageContainer}>
                <Image style={styles.img} source={{ uri: eventURL + '/' + event.img_path}} />

                <Pressable style={styles.btn} onPress={uploadImage} >
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
    },
    img: {
        alignSelf: "center",
        borderRadius: 10,
        height: 200,
        width: 180,
        backgroundColor: '#a3c6ff',
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
    switchContainer: {
        flexDirection: "row",
    },
    btn: {
        width: 110,
        height: 34,
        margin: 8,
        borderRadius: 20,
        backgroundColor: "#a3c6ff",
        justifyContent: "center",
        elevation: 5,
        alignSelf: 'center'
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
