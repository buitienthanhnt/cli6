import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Slider } from 'react-native-ui-lib';  // npm i react-native-ui-lib // https://wix.github.io/react-native-ui-lib/docs/foundation/colors

const BasicSlider = () => {
    return (
        <View style= {{ padding: 30}}>
            <Slider
                value={0}
                minimumValue = {0}
                maximumValue = {10}
                onValueChange = {() => {}}
            ></Slider>
        </View>
    );
}

export { BasicSlider };