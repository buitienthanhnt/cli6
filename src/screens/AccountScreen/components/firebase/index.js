import React, { useCallback, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from 'react-native';

const screens = [
    {
        name: 'to ListData',
        component: 'ListData'
    },
    {
        name: 'to FireStore',
        component: 'FireStore'
    },
    {
        name: 'to cloud DataBase',
        component: 'DataBase'
    },
    {
        name: 'to cloud function',
        component: 'CloudFun'
    },
];

const ExFireabse = ({ navigation }) => {

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
            >
            </FlatList>
        </View>
    )
};
export default ExFireabse;