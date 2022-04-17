import React from 'react';
import { View, Text } from 'react-native';
import AppHeader from '../../components/Headers'

const CartScreen = ({navigation}) => {
    return (
        <View>
            <AppHeader
            title={'BOKKS'}
            titleOnPress={() => navigation.navigate('NavBar', {screen: 'Homepage'})}
            headerBg={'blue'}
            iconColor={'white'}
            titleAlight={'center'}
            right={'shopping-cart'}
            onRightPress={() => navigation.navigate('Cart')}
            back
            backOnPress={() => navigation.pop()}
          />
            <Text>CART</Text>
        </View>
    );
};

export default CartScreen;
