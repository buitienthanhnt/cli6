import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View, VirtualizedList, TouchableHighlight } from "react-native";
import { useState } from 'react';

const arr = [
	1, 2, 3, 4, 5, 6, 7, 8, 89, 90, 0, 12, 34
];

const arr2 = [1, 2, 3, 4, 5, 6, 7, 8, 89, 90, 0];

function data(){
	const element = [];
	for (let index = 0; index <20; index++) {
		element.push({ title: 'Title Text ' + index, key: 'item '+ index });
	}
	return element;
};

const FlatInScroll = () => {

	const [value, setValue] = useState(data());

	const deleteItem = (item, index)=>{
		let newValue = value;
		newValue.splice(index, 1);  // https://viblo.asia/p/su-khac-nhau-cua-bo-3-slice-splice-va-split-trong-javascript-924lJW6Y5PM
		setValue([...newValue]);
	}

	return (
		<FlatList
		style={{padding: 20}}
			ItemSeparatorComponent={
				(
					<View
						style={{ height: 12, backgroundColor: '' }}
					/>
				)
			}
			data={value}
			renderItem={({ item, index, separators }) => (
				<TouchableHighlight
					style={{height: 40, borderRadius: 16, justifyContent: 'center',
						alignItems: 'center', padding: 8,
						backgroundColor: 'green'
					}}
					key={item.key}
					onPress={() => {
						deleteItem(item, index);
					 }}
					onShowUnderlay={separators.highlight}
					onHideUnderlay={separators.unhighlight}>
					<View >
						<Text style={{color: 'violet'}}>{item.title}</Text>
					</View>
				</TouchableHighlight>
			)}
			ListEmptyComponent={(<View><Text>empty data!!</Text></View>)}
			initialNumToRender={11}
			// initialScrollIndex={10}
			// inverted={true} // dao nguoc huong cuon
			keyExtractor={(item, index)=>"key_"+item.key}
			onRefresh={()=>{
				console.log(123);
			}}
			refreshing={false}
			extraData={value}
			maxToRenderPerBatch={4}
			windowSize={2}
		/>
	);
}

const Item = () => {
	return (
		<View>
			<Text>noi dung trong item childrent</Text>
			<TouchableOpacity onPress={() => {
				console.log(123);
			}}>
				<Text>onPress</Text>
				<Text></Text>
			</TouchableOpacity>
		</View>
	);
}

const Item2 = () => {
	return (<View >
		<FlatList
			showsVerticalScrollIndicator={false}
			data={arr2}
			// getItemCount={()=>{
			// 	return arr2.length;
			// }}
			renderItem={({ item }) => {
				return <View>
					<Text>123</Text>
					<Text></Text>
				</View>
			}}></FlatList>
	</View>);
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
