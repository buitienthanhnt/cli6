import React, { useCallback } from "react";
import { View, FlatList, Dimensions, Text } from "react-native";

const Carousel = (props) => {
    const renderItem = useCallback(({ item, index }) => {
        return (
            <View style={{
                width: Dimensions.get('screen').width - 50,
                height: 140,
                backgroundColor: 'green',
                borderRadius: 8
            }}>
                <Text>{item}</Text>
            </View>
        )
    }, [])

    return (
        <View>
            <FlatList
                contentContainerStyle={{
                    marginTop: 60
                }}
                data={props.data}
                renderItem={renderItem}
                horizontal={true}
                pagingEnabled={true}
                ItemSeparatorComponent={() => {
                    return (
                        <View style={{ width: 20 }}></View>
                    )
                }}
                showsHorizontalScrollIndicator={false}
                snapToInterval={Dimensions.get('screen').width - 30}
                decelerationRate="fast" // cần có để kết hợp với: pagingEnabled={true} & snapToInterval trên ios(không sẽ lỗi paging)
            ></FlatList>
        </View>
    )
}

export default Carousel;