import { useState } from "react";
import { Button, Text, View, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard, ScrollView } from "react-native";
import Animated, { useSharedValue, withSpring, withTiming, useAnimatedStyle, useAnimatedProps } from 'react-native-reanimated';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
// import { styled, useColorScheme } from "nativewind";

const Reanimated1 = () => {
    const [text, setText] = useState('');
    const width = useSharedValue(100); // dung gia tri co ban

    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const _w = useSharedValue(124);
    const _h = useSharedValue(124);
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
    const pTop = useSharedValue(24), pFeft = useSharedValue(24);
    const fSize = useSharedValue(12);
    const placeStyle = useAnimatedStyle(() => {
        return {
            top: withSpring(pTop.value),
            left: withSpring(pFeft.value),
            position: position.value,
            fontSize: withSpring(fSize.value)
        }
    })

    return (
        <TouchableWithoutFeedback style={{ padding: 24 }} onPress={() => {
            if (!text) {
                pFeft.value = pTop.value = 24;
                position.value = 'absolute';
                fSize.value = 12
            }
            Keyboard.dismiss()
        }} accessible={false}>
            <View>
                <Animated.View
                    style={{
                        width: width,
                        height: 100,
                        backgroundColor: 'violet',
                    }}
                >
                </Animated.View>

                <Animated.View style={[styles.box, animatedStyles]} />
                <CustomInput></CustomInput>
                <CustomInput></CustomInput>
                <View style={{
                    width: 'auto',
                    borderRadius: 10,
                    padding: 10,
                    // borderWidth: 1, 
                    // borderColor: 'red',
                }}>
                    <Animated.Text style={placeStyle}>place holder</Animated.Text>
                    <TextInput style={{
                        borderWidth: 1, borderRadius: 10,
                        borderColor: 'green',
                        padding: 5,
                        marginTop: 5,
                        fontSize: 15
                    }}
                        // placeholder="placeholder text"
                        // onPressOut={()=>{
                        //     console.log('onPressOut');
                        // }}
                        // onPressIn={()=>{
                        //     console.log('onPressIn');
                        // }}
                        onFocus={() => {
                            if (pFeft.value > 0 && pTop.value > 0) {
                                pFeft.value -= 20;
                                pTop.value -= 24;
                                fSize.value = 16;
                            }

                            position.value = withSpring('relative')
                        }}
                        onChangeText={text => setText(text)}
                        value={text}
                    ></TextInput>
                </View>

                <Button title="onpress"
                    style={{ marginTop: 10 }}
                    onPress={() => {
                        width.value = withSpring(width.value + 24)
                        translateX.value += 24;
                        translateY.value -= 10;
                        _w.value -= 10;
                        _h.value -= 10
                    }}></Button>

            </View>
        </TouchableWithoutFeedback>

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

const Reanimated2 = () => {
    return (
        // <ScrollView style={{flex: 1}}>
        //     <Text>withTiming2</Text>
        // </ScrollView>
        <View style={styles.container2}>
            <MapView
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.map}
                region={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
            >
            </MapView>
        </View>
    )
}

const CustomInput = () => {
    const [text, setText] = useState('');
    const position = useSharedValue('absolute');
    const pTop = useSharedValue(24), pFeft = useSharedValue(24);
    const fSize = useSharedValue(12);
    const placeStyle = useAnimatedStyle(() => {
        return {
            top: withSpring(pTop.value),
            left: withSpring(pFeft.value),
            position: position.value,
            fontSize: withSpring(fSize.value)
        }
    })

    return (

        <TouchableWithoutFeedback style={{ padding: 24 }} onPress={() => {
            if (!text) {
                pFeft.value = pTop.value = 24;
                position.value = 'absolute';
                fSize.value = 12
            }
            Keyboard.dismiss()
        }} accessible={false}>
            <View style={{
                width: 'auto',
                borderRadius: 10,
                padding: 10,
                // borderWidth: 1, 
                // borderColor: 'red',
            }}>
                <Animated.Text style={placeStyle}>place holder</Animated.Text>
                <TextInput style={{
                    borderWidth: 1, borderRadius: 10,
                    borderColor: 'green',
                    padding: 5,
                    marginTop: 5,
                    fontSize: 15
                }}
                    onFocus={() => {
                        if (pFeft.value > 0 && pTop.value > 0) {
                            pFeft.value -= 20;
                            pTop.value -= 24;
                            fSize.value = 16;
                        }

                        position.value = withSpring('relative')
                    }}
                    onChangeText={text => setText(text)}
                    value={text}
                ></TextInput>
            </View>
        </TouchableWithoutFeedback>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        backgroundColor: '#b58df1',
        borderRadius: 24,
        // marginVertical: 50,
    },
    container2: {
        ...StyleSheet.absoluteFillObject,
        height: 400,
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
      map: {
        ...StyleSheet.absoluteFillObject,
      },
});

export { Reanimated1, Reanimated2 };