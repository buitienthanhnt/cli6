import { useState } from "react";
import { Button, Text, View, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard } from "react-native";
import Animated, { useSharedValue, withSpring, withTiming, useAnimatedStyle, useAnimatedProps } from 'react-native-reanimated';

// import { styled, useColorScheme } from "nativewind";

const Reanimated1 = () => {
    const width = useSharedValue(100); // dung gia tri co ban

    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const _w = useSharedValue(120);
    const _h = useSharedValue(120);
    const r = useSharedValue(0);
    const animatedStyles = useAnimatedStyle(() => ({
        transform: [
            { translateX: withSpring(translateX.value) },
            { translateY: withSpring(translateY.value) }
        ],
        width: withSpring(_w.value),
        height: withSpring(_h.value)
    }));

    const position = useSharedValue('absolute');
    const pTop = useSharedValue(20), pFeft = useSharedValue(20);
    const placeStyle = useAnimatedStyle(() => {
        return {
            top: withSpring(pTop.value),
            left: withSpring(pFeft.value),
            position: position.value
        }
    })

    const handlePress = () => {
        r.value += 10;
    };

    const animatedProps = useAnimatedProps(() => ({
        r: withTiming(r.value),
    }));

    return (
        <View style={{ padding: 20 }}>
            <Animated.View
                style={{
                    width: width,
                    height: 100,
                    backgroundColor: 'violet',
                }}
            >
                <Text>213123</Text>
            </Animated.View>

            <Animated.View style={[styles.box, animatedStyles]} />

            <TouchableWithoutFeedback onPress={() => {
                Keyboard.dismiss()
            }} accessible={false}>

                <View style={{
                    width: 'auto',
                    borderRadius: 10, padding: 10,
                    borderWidth: 1, borderColor: 'red',
                }}>
                    <Animated.Text style={placeStyle}>place holder</Animated.Text>
                    <TextInput style={{
                        borderWidth: 1, borderRadius: 10,
                        borderColor: 'green',
                        padding: 5,
                        marginTop: 5
                    }}
                        // placeholder="placeholder text"
                        // onPressOut={()=>{
                        //     console.log('onPressOut');
                        // }}
                        // onPressIn={()=>{
                        //     console.log('onPressIn');
                        // }}
                        onFocus={() => {
                            pFeft.value -= 20;
                            pTop.value -= 20;
                            position.value = withSpring('relative')
                        }}
                    ></TextInput>
                </View>
            </TouchableWithoutFeedback>

            <Text></Text>

            <Button title="onpress"
                style={{ marginTop: 10 }}
                onPress={() => {
                    width.value = withSpring(width.value + 20)
                    translateX.value += 20;
                    translateY.value -= 10;
                    _w.value -= 10;
                    _h.value -= 10
                }}></Button>
        </View>
    )
    // demo nativeWind
    // const StyledView = styled(View); 
    // return (
    //     <StyledView className={''}>
    //         <Text className={''}>
    //             reanimated
    //         </Text>
    //     </StyledView>
    // )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        backgroundColor: '#b58df1',
        borderRadius: 20,
        marginVertical: 50,
    },
});

export { Reanimated1 };