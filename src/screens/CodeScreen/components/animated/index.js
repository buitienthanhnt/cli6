import React, { useCallback, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from 'react-native';

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
    }, // FadeInView
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
    },
];

const ExAnimated = ({ navigation }) => {

    const redirectView = useCallback((viewName) => {
        navigation.navigate(viewName);
    }, [navigation]);

    const randomValue = useCallback((max) => {
        return Math.floor(Math.random() * max);
    }, []);
    const randomColor = useCallback(() => {
        return `rgba(${randomValue(256)}, ${randomValue(256)}, ${randomValue(256)}, 1)`;
    }, []);

    const renderItem = useCallback(({ item, index }) => {
        return (
            <TouchableOpacity
                style={{
                    height: 60, flex: 1, backgroundColor: randomColor(),
                    justifyContent: 'center', alignItems: 'center', margin: 2,
                    borderRadius: 10
                }}
                onPress={() => {
                    redirectView(item.component);
                }}
            >
                <Text>{item.name}</Text>
            </TouchableOpacity>
        )
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
export default ExAnimated;