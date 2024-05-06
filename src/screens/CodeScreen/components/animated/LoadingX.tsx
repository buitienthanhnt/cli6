import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Button, Dimensions, Text, View } from "react-native";
import { Navigation } from 'react-native-navigation';
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withTiming } from "react-native-reanimated";


const LoadingX: FunctionComponent<Navigation> = ({navigation}) => {
	const top = useSharedValue(0);
	
	return (
		<Animated.View 
			className={'flex-1 bg-blur'} 
			style={{justifyContent: 'center', alignItems: 'center',top: top}}>
			<ActivityIndicator 
				color={'green'} 
				size={'large'}
			></ActivityIndicator>
		</Animated.View>
	)
}

export default LoadingX;