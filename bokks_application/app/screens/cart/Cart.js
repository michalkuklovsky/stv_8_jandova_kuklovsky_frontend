import React from 'react';
import { View, Text } from 'react-native';
import AppHeader, { ScreenHeader } from '../../components/Headers'

const CartScreen = ({navigation}) => {
    return (
        <View>
            <ScreenHeader navigation={navigation}/>
            <Text>CART</Text>
        </View>
    );
};

export default CartScreen;
