
import React, { useCallback } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import CategoryTop from "./CategoryTop";
import { usePaperList } from "@hooks/usePapers";
import { ProductItem, ProductItemHost } from "./element";

const PaperListFunc = (props) => {
	const { data, isLoading, fetchNextPage, refetch } = usePaperList();
	const renderItem = useCallback(({ item, index }) => {
		if (index % 5 == 0) {
			return (
				<ProductItemHost
					data={item}
					navigation={props.navigation}
					index={index}
				/>
			);
		}
		return (
			<ProductItem data={item} navigation={props.navigation} index={index} />
		);
	}, [])

	return (
		<View style={css.container}>
			<CategoryTop navigation={props.navigation} />

			<FlatList // use online api server
				data={data?.pages.flatMap(({ data }) => {
					return data;
				})}
				refreshing={isLoading}
				onRefresh={refetch}
				decelerationRate={'normal'} // speed of scroll page: normal || fast(nên chọn: normal để mượt hơn)
				keyExtractor={item => item.id}
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
				renderItem={renderItem}
				onEndReachedThreshold={0.1}
				onEndReached={fetchNextPage}
			/>
		</View>
	);
}

const css = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default PaperListFunc;