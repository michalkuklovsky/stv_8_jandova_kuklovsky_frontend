// prevzate z https://github.com/vishalpwr/react-native/blob/master/Header/AppHeader.js
// prisposobene pre potreby aplikacie

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Badge, Surface, Title } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';

const IconSize = 24;

const AppHeader = ({ style, menu, back, title, right, onRightPress, optionalBtn,optionalBtnPress, rightComponent, headerBg, iconColor,
     titleAlight, optionalBadge, backOnPress, titleOnPress }) => {

	const LeftView = () => (
		<View style={styles.view}>
			{menu && <TouchableOpacity onPress={() => { }}>
				<Feather name="menu" size={IconSize} color={iconColor} />
			</TouchableOpacity>}
			{back && <TouchableOpacity onPress={backOnPress}>
				<Feather name="arrow-left" size={IconSize} color={iconColor} />
			</TouchableOpacity>}
		</View>
	)
	const RightView = () => (
		rightComponent ? rightComponent :
			<View style={[styles.view, styles.rightView]}>
				{optionalBtn && <TouchableOpacity style={styles.rowView} onPress={optionalBtnPress}>
					<Feather name={optionalBtn} size={IconSize} color={iconColor} />
					{optionalBadge && <Badge style={{ position: 'absolute', top: -5, right: -10 }}>{optionalBadge}</Badge>}
				</TouchableOpacity>}
				{right && <TouchableOpacity onPress={onRightPress}>
					<Feather name={right} size={IconSize} color={iconColor} />
				</TouchableOpacity>}
			</View>
	)
	const TitleView = () => (
		<View style={styles.titleView}>
            {<TouchableOpacity onPress={backOnPress}>
                <Title style={{ color: iconColor, textAlign: titleAlight }}>{title}</Title>
			</TouchableOpacity>}
			{/* <Title style={{ color: iconColor, textAlign: titleAlight }}>{title}</Title> */}
		</View>
	)
	return (
		<Surface style={[styles.header, style, { backgroundColor: headerBg }]}>
			<LeftView />
			<TitleView />
			<RightView />
		</Surface>
	)
}

const styles = StyleSheet.create({
	header: {
		height: 50,
		elevation: 8,
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row',
		backgroundColor: 'black',
	},
	view: {
		marginHorizontal: 16,
		alignItems: 'center',
		flexDirection: 'row',
	},
	titleView: {
		flex: 1,
	},
	rightView: {
		justifyContent: 'flex-end',
	},
	rowView: {
		flexDirection: 'row',
		alignItems: 'center',
		marginRight: 10,
	},
});

const HomeHeader = ({navigation}) => {
	return (
		<AppHeader
              title={'BOKKS'}
              titleOnPress={() => navigation.navigate('Home')}
              headerBg={'blue'}
              iconColor={'white'}
              titleAlight={'left'}
              right={'shopping-cart'}
              onRightPress={() => navigation.navigate('Cart')}
            />
	);
};

const ScreenHeader = ({navigation}) => {
	return (
		<AppHeader
            title={'BOKKS'}
            titleOnPress={() => navigation.navigate('NavBar', {screen: 'Home'})}
            headerBg={'blue'}
            iconColor={'white'}
            titleAlight={'center'}
            right={'shopping-cart'}
            onRightPress={() => navigation.navigate('Cart')}
            back
            backOnPress={() => navigation.pop()}
          />
	);
};

export {
	HomeHeader, ScreenHeader,
};
export default AppHeader;
