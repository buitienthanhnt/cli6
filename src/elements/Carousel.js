import React, { useCallback } from "react";
import { View, FlatList, Dimensions, Text, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
// https://viblo.asia/p/react-native-tim-hieu-ve-panresponder-3Q75wxk2KWb
// https://viblo.asia/p/huong-dan-cai-dat-tailwindcss-cho-project-react-native-expo-GrLZDobBKk0

const Carousel = ({ data, onPress, itemStyle }) => {
    const renderItem = useCallback(({ item, index }) => {
        return (
            <TouchableOpacity onPress={()=>{
                onPress?.(item)
            }} style={[css.caItem, itemStyle]}>
                <ImageBackground source={{ uri: item.image_path }} style={[css.imgItem]} resizeMode="cover" imageStyle={{ borderRadius: 8 }}>
                    <Text style={[css.label]}>{item.title}</Text>
                </ImageBackground>
            </TouchableOpacity>
        )
    }, [])

    return (
        <View>
            <FlatList
                contentContainerStyle={{
                    // marginTop: 60
                }}
                data={data}
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

const css = StyleSheet.create({
    caItem: {
        width: Dimensions.get('screen').width - 50,
        height: 150,
    },
    imgItem: {
        flex: 1,
        padding: 8,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#ffffff'
    },
})

export default Carousel;