import { useCallback } from "react";

import { View, Text, Dimensions, FlatList, ImageBackground } from 'react-native';

const PaperCarousel = ({ slider_images }) => {
    const height = Math.floor(Dimensions.get('screen').width) / 4 * 2;

    const renderItem = useCallback(({ item, index }) => {
        return (
            <ImageBackground
                source={{ uri: item.value }}
                imageStyle={{ borderRadius: 10, resizeMode: 'cover'}}
                style={{
                    width: Dimensions.get('screen').width - 20,
                    height: height,
                    backgroundColor: 'blue',
                    padding: 10,
                    justifyContent: 'flex-end',
                    borderRadius: 10
                }}
            >
                <Text style={{ 
                    width: '100%',
                    color: 'white', 
                    fontSize: 16, 
                    textAlign: 'center', 
                    fontWeight: 600 
                }}>
                    {item.description}
                </Text>
            </ImageBackground>
        )
    }, []);
    if (!slider_images || !slider_images?.length) {
        return null;
    }
    return (
        <View 
            style={{ 
                height: height + 10,
                paddingVertical: 5
            }}>
            <FlatList
                horizontal={true}
                data={slider_images}
                extraData={slider_images}
                keyExtractor={(item, index) => index}
                renderItem={renderItem}
                pagingEnabled={true}
                contentContainerStyle={{ gap: 5 }}
            ></FlatList>
        </View>
    )
}

export default PaperCarousel;