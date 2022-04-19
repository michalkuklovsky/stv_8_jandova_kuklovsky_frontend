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
} from 'react-native';import AppHeader, { ScreenHeader } from '../../components/Headers';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import {appURL} from '../../Constants';
// import Navigator from '../../navigator/Navigator';
import {NavigationBar } from '../../navigator/Navigator';
import Ionicons from 'react-native-vector-icons/Ionicons';


const cartURL = appURL + 'cart';
const orderURL = appURL + 'orders/';

const CartItem = ({navigation, item}) => {

    // const showDetail = () => {
    //     navigation.navigate("EventInfo", {item: item});
    // };
    const deleteItem = () => {
        fetch( cartURL + '/' + item.title, {
            method: 'DELETE',
          })
          .then(response => response)
          .catch(error => alert(error))
          .finally(navigation.navigate('Cart', {}));
    }


    return (
        <View>
            <Card style={styles.card}>
                <View style={styles.cardView}>
                    <Title style={styles.imgTitle}> {item.title} </Title>
                    <Paragraph style={styles.imgSub}> Quantity: {item.quantity}</Paragraph>
                    <Paragraph style={styles.imgSub2}>{item.price} €</Paragraph>
                    <Pressable onPress={deleteItem}>
                        <Ionicons style={styles.icon} name={'trash-outline'} size={22} color={'black'} />
                    </Pressable>
                </View>
            </Card>
        </View>
    );
};

const getTotalSum = (cart) => {
    var temp_sum = 0;
    for (let i = 0; i < cart.length; i++){
        console.log(cart[i]['price']);
        temp_sum += cart[i]['price'] * cart[i]['quantity'];
    }
    return temp_sum;
};

const CartScreen = ({navigation, route}) => {

    const [isLoading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);
    const [total_sum, setSum] = useState(0);


    useEffect(() => {
        fetch(cartURL, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(json => {
                setCart(json.cart);
                // setSum(getTotalSum(cart));
                // navigation.navigate();
            })
            .catch(error => alert(error))
            .finally(() => {
                setLoading(false);
                setSum(getTotalSum(cart));
            });
    }, [route, isLoading]);

    const checkout = () => {

        if (cart.length === 0) {
            alert('Cart is empty');
            return;
        }

        let formdata = new FormData();
        formdata.append('payment_type', 'card');
        formdata.append('shipping_type', 'courier');
        formdata.append('status', 'pending');

        fetch( orderURL, {
            method: 'Post',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formdata,
          })
          .then(response => response)
          .catch(error => alert(error))
          .finally(navigation.navigate('Cart', {}));
    };
    // setSum(getTotalSum(cart));

    return (
        <SafeAreaView>
            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <View>
                    <View>
                        <ScreenHeader navigation={navigation}/>
                    </View>
                    <Title style={styles.mainTitle}>Your Cart</Title>
                    <View style={styles.line}/>
                    <View style={styles.mainContainer}>
                        <FlatList
                            data={cart}
                            keyExtractor={({id}, index) => id}
                            renderItem={({item}) => (<CartItem item={item} navigation={navigation} />)}
                            styles={styles.booksList}
                            contentContainerStyle={styles.listContainer}
                            nestedScrollEnabled={true}
                        />
                    </View>
                    <View style={styles.line}/>
                    <View style={styles.priceView}>
                        <Title style={styles.price}>Total price</Title>
                        <Title style={styles.price}> {total_sum.toFixed(2)} € </Title>
                    </View>
                    <Button 
                        onPress={checkout}
                        style={styles.btn}
                        contentStyle={styles.btnContent}
                    >
                        <Text style={styles.text}>Procceed to checkout</Text>
                    </Button>
                    
                    {/* <View style={styles.navbar}>
                        <NavigationBar />
                    </View> */}
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    mainContainer:{
        paddingTop: 1,
        // bottom: 50,
        // flexWrap: 'wrap',
    },
    titleContainer:{
        padding: 8,
    },
    mainTitle: {
        fontSize: 26,
        fontWeight: '500',
        textAlign: 'left',
        color: 'black',
        paddingLeft: 30,
        paddingTop: 50,

    },
    price: {
        fontSize: 26,
        fontWeight: '500',
        textAlign: 'left',
        color: 'black',
        paddingLeft: 30,
        paddingTop: 20,
        width: '55%',

    },
    booksList: {
        flexGrow: 1,
        backgroundColor: 'blue',
    },
    listContainer: {
        marginHorizontal: 8,
    },
    logo: {
        width: 20,
        height: 30,
        borderRadius: 10,
    },
    imageContainer: {
        paddingTop: 10,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
    },
    card: {
        // width: 140,
        height: 50,
        borderRadius: 10,
        shadowOpacity: 0.25,
        marginTop: 5,
        marginHorizontal: 20,
        justifyContent: 'space-evenly',
    },
    cardView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    priceView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    imgTitle: {
        fontSize: 16,
        paddingLeft: 6,
        width: '38%',
    },
    imgSub: {
        paddingLeft: 6,
        fontSize: 15,
        width: '28%',
    },
    imgSub2: {
        paddingLeft: 6,
        fontSize: 15,
        width: '23%',
    },
    btn: {
        backgroundColor: 'blue',
        height: 60,
        borderRadius: 25,
        alignItems: 'stretch',
        justifyContent: 'center',
        fontSize: 18,
        top: 40,
        width: 300,
        alignSelf: 'center'
    },
    // navbar: {
    //     top: 228,
    // },
    line: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        paddingTop: 10,
        // paddingBottom: 5,
        marginVertical: 20,
        marginHorizontal: 25,
    },
    text: {
        color: 'white',
    },
});

export default CartScreen;
