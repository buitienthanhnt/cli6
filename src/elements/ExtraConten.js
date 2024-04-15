import React, { useCallback, useState } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming, runOnJS, FadeInUp, FadeOutUp } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome';

const ExtraConten = ({ children, title, contenStyle }) => {
	const rotate = useSharedValue('0deg');
	const [showConten, setShowConten] = useState(false);

	const animatedStyles = useAnimatedStyle(() => ({
		transform: [{ rotateZ: rotate.value }],
	}));

	const rotateView = useCallback(() => {
		rotate.value = withTiming(rotate.value == '90deg' ? '0deg' : '90deg', {duration: 300,}, ()=>{
			// runOnJS(setShowConten)(!showConten)
		});
		setShowConten(!showConten)
	}, [showConten])

	return (
		<View style={css.container}>
			<View style={css.header}>
				<Text style={css.headerTitle}>{title}</Text>
				<Animated.View style={[css.icon, animatedStyles]}>
					<TouchableOpacity onPress={rotateView}>
						<Icon name='angle-right' size={36} color='tomato' />
					</TouchableOpacity>
				</Animated.View>
			</View>
			{showConten && <Animated.View style={[css.conten, contenStyle]} entering={FadeInUp.springify()} exiting={FadeOutUp}>
				{children}
			</Animated.View>}
		</View>
	)
}

const css = StyleSheet.create({
	container: {
		// paddingVertical: 15
	},
	icon: {
		width: 40,
		height: 40,
		// backgroundColor: 'red',
		justifyContent: 'center',
		alignItems: 'center'
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		height: 40,
		alignItems: 'center',
		backgroundColor: 'rgba(255, 255, 255, 0.5)',
		paddingHorizontal: 5,
		borderRadius: 5
	},
	headerTitle: {
		fontSize: 18,
		fontWeight: '600'
	},
	conten: {
		// backgroundColor: 'green'
	}
})
export default ExtraConten;