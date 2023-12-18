import React, { useCallback, useEffect, useState, useRef } from "react";
import { View, Text, TouchableOpacity, FlatList, Animated, Easing } from 'react-native';

const screens = [
    {
        name: 'Animate1',
        component: 'Animate1'
    },
    {
        name: 'SwipeListViews',
        component: 'SwipeListViews'
    },
    {
        name: 'pull handle',
        component: 'PanResponders'
    },
    {
        name: 'TabViewExample',
        component: 'TabViewExample'
    },
    {
        name: 'SwipeBtn',
        component: 'SwipeBtn'
    },
    {
        name: 'Slide Image',
        component: 'ScrollViews'
    },
    {
        name: 'to FadeInView',
        component: 'FadeInView'
    },
    {
        name: 'to ExAnimated1',
        component: 'ExAnimated1'
    },
    {
        name: 'to ExAnimated2',
        component: 'ExAnimated2'
    },
    {
        name: 'to ExAnimated3',
        component: 'ExAnimated3'
    },
    {
        name: 'to show message',
        component: 'ExAnimated4'
    },
    {
        name: 'to show delay',
        component: 'ExAnimated5'
    }, // Reanimated1
    {
        name: 'to Reanimated1',
        component: 'Reanimated1'
    },
    {
        name: 'to Reanimated2',
        component: 'Reanimated2'
    },
];

const ExAnimated = ({ navigation }) => {

    const renderItem = useCallback(({ item, index }) => {
        return <Item item={item} index={index} navigation={navigation}></Item>
    }, []);

    return (
        <View style={{ flex: 1, padding: 10 }}>
            <FlatList
                data={screens}
                numColumns={2}
                horizontal={false}
                renderItem={renderItem}
            // ItemSeparatorComponent={()=>{
            //     return <View style={{height: 5}}></View>
            // }}

            >
            </FlatList>
        </View>
    )
};

const Item = ({ navigation, item, index }) => {

    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(opacity, {
            toValue: 1,
            duration: index * 200,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start()
    }, []);

    const randomColor = useCallback(() => {
        return `rgba(${randomValue(256)}, ${randomValue(256)}, ${randomValue(256)}, 1)`;
    }, []);

    const redirectView = useCallback((viewName) => {
        navigation.navigate(viewName);
    }, [navigation]);

    const randomValue = useCallback((max) => {
        return Math.floor(Math.random() * max);
    }, []);

    return (
        <Animated.View style={{
            height: 60, flex: 1, backgroundColor: randomColor(),
            justifyContent: 'center', alignItems: 'center', margin: 2,
            borderRadius: 10,
            opacity: opacity
        }}>
            <TouchableOpacity
                style={{
                }}
                onPress={() => {
                    redirectView(item.component);
                }}
            >
                <Text>{item.name}</Text>
            </TouchableOpacity>
        </Animated.View>
    )
}
export default ExAnimated;