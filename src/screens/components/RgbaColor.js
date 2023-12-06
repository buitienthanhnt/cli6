import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View, Clipboard } from "react-native";
import { Slider } from 'react-native-ui-lib';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const RgbaColor = (props) => {
    const [r, setR] = useState(0);
    const [g, setG] = useState(0);
    const [b, setB] = useState(0);
    const [a, setA] = useState(1);
    const saveColorConten = async () => {
        let value = `rgba(${r}, ${g}, ${b}, ${a})`;
        await Clipboard.setString(value);
        alert("coppied value: " + value);
    }
    return (
        <View style={css.container}>
            <View style={css.colorView}>
                <View style={{ ...css.colorbackground, backgroundColor: `rgba(${r}, ${g}, ${b}, ${a})` }}>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>{`rgba(${r}, ${g}, ${b}, ${a})`}  </Text>
                    <TouchableOpacity onPress={saveColorConten}>
                        <FontAwesome5Icon name='copy' size={28} color='tomato' />
                    </TouchableOpacity>
                </View>

            </View>
            <View style={css.sliderEdit}>
                <View style={css.sliderItem}>
                    <Text style={{ ...css.sliderText, color: 'red' }}>R: </Text>
                    <View style={{ flex: 1 }}>
                        <Slider
                            value={0}
                            minimumValue={0}
                            maximumValue={255}
                            onValueChange={(value) => setR(Math.round(value))}
                        />
                    </View>
                </View>

                <View style={css.sliderItem}>
                    <Text style={{ ...css.sliderText, color: 'green' }}>G: </Text>
                    <View style={{ flex: 1 }}>
                        <Slider
                            value={0}
                            minimumValue={0}
                            maximumValue={255}
                            onValueChange={(value) => setG(Math.round(value))}
                        />
                    </View>
                </View>

                <View style={css.sliderItem}>
                    <Text style={{ ...css.sliderText, color: 'blue' }}>B: </Text>
                    <View style={{ flex: 1 }}>
                        <Slider
                            value={0}
                            minimumValue={0}
                            maximumValue={255}
                            onValueChange={(value) => setB(Math.round(value))}
                        />
                    </View>
                </View>

                <View style={css.sliderItem}>
                    <Text style={css.sliderText}>A: </Text>
                    <View style={{ flex: 1 }}>
                        <Slider
                            value={1}
                            minimumValue={0}
                            maximumValue={1}
                            onValueChange={(value) => setA(value.toFixed(1))}
                        />
                    </View>

                </View>
            </View>

        </View>
    )
};

const css = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12
    },
    colorView: {
        height: Dimensions.get('screen').width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    colorbackground: {
        width: Dimensions.get('screen').width * 3 / 4,
        height: Dimensions.get('screen').width * 3 / 4,
        borderRadius: Dimensions.get('screen').width * 3 / 4 / 2,
    },
    sliderEdit: {
        padding: 12,
        marginTop: 20,
    },
    sliderItem: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    sliderText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black'
    }
});

export default RgbaColor;
// rgba(0, 153, 0, 0.8)