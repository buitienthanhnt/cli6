import React from "react";
import {View, StyleSheet, Text } from "react-native";

const BoxShow = (props) => {
    return (
        <View style={{margin: 5, paddingHorizontal: 4}}>
            <View style={[styles.card, styles.elevation]}>
                <View>
                    <Text style={styles.heading}>
                        React Native Box Shadow (Elevation)
                    </Text>
                </View>
                <Text>
                    By using the elevation style props to apply box-shadow for Android devices
                    {'\n'}
                    {<Break></Break>}
                    <Break></Break>
                    https://www.javatpoint.com/box-shadow-in-react-native
                </Text>
            </View>
        </View>
    );
};

const Break = () => {
    return (
        <Text>{'\n'}</Text>
    )
};

const styles = StyleSheet.create({
    heading: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 13,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        paddingVertical: 45,
        paddingHorizontal: 25,
        width: '100%',
    },
    elevation: {
        shadowColor: '#52006A',
        elevation: 20,
    },
});

export default BoxShow;
