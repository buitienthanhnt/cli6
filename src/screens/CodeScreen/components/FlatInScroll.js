import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View, Animated, Easing } from "react-native";
import { useState, useCallback, useRef, useEffect } from 'react';

const arr = [
	1, 2, 3, 4, 5, 6, 7, 8, 89, 90, 0, 12, 34
];

const arr2 = [1, 2, 3, 4, 5, 6, 7, 8, 89, 90, 0];

function data() {
	const element = [];
	for (let index = 0; index < 20; index++) {
		element.push({ title: 'Title Text ' + index, key: 'item ' + index });
	}
	return element;
};

const FlatInScroll = () => {
	const opacity = useRef(new Animated.Value(0)).current;
	const [value, setValue] = useState(data());
	const deleteItem = (index) => {
		let newValue = value;
		newValue.splice(index, 1);  // https://viblo.asia/p/su-khac-nhau-cua-bo-3-slice-splice-va-split-trong-javascript-924lJW6Y5PM
		setValue([...newValue]);
	}

	const renderItem = useCallback(({ item, index, separators }) => {
		return (
			<RenderItem item={item} index={index} opacity={opacity} onDelete={deleteItem}></RenderItem>
		)
	}, [])

	return (
		<FlatList
			style={{ padding: 20 }}
			ItemSeparatorComponent={
				(
					<View
						style={{ height: 12, backgroundColor: '' }}
					/>
				)
			}
			data={value}
			renderItem={renderItem}
			ListEmptyComponent={(<View><Text>empty data!!</Text></View>)}
			initialNumToRender={11}
			// initialScrollIndex={10}
			// inverted={true} // dao nguoc huong cuon
			keyExtractor={(item, index) => "key_" + item.key}
			onRefresh={() => {
				console.log(123);
			}}
			refreshing={false}
			extraData={value}
			maxToRenderPerBatch={4}
			windowSize={2}
		/>
	);
}

const RenderItem = ({ item, index, onDelete }) => {
	const opacity = useRef(new Animated.Value(0)).current;
	const x = useRef(new Animated.Value(-100)).current;

	useEffect(() => {
		Animated.timing(opacity, {
			toValue: 1,
			duration: index * 100,
			easing: Easing.linear
		}).start();

		Animated.timing(x, {
			toValue: 0,
			duration: index * 200,
			easing: Easing.linear
		}).start();
	}, [])
	return (
		<Animated.View
			style={{
				height: 40, borderRadius: 16, 
				justifyContent: 'center',
				alignItems: 'center', padding: 8,
				backgroundColor: 'green',
				transform: [{ translateX: x }],
				opacity: opacity
			}}
		>
			<TouchableOpacity onPress={() => { onDelete(index) }}>
				<View >
					<Text style={{ color: 'violet' }}>{item.title}</Text>
				</View>
			</TouchableOpacity>
		</Animated.View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		//   marginTop: StatusBar.currentHeight || 0,
	},
	item: {
		padding: 20,
		marginVertical: 8,
		marginHorizontal: 16,
	},
	title: {
		fontSize: 32,
	},
});

export default FlatInScroll;
