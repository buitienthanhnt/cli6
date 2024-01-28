import { useCallback, useState } from "react";
import { StyleSheet, Text, TextInput, View, TouchableWithoutFeedback } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

const FormInput = ({ label, placeholder, currentValue, onChangeText, numberOfLines }) => {
    const pTop = useSharedValue(5);
    const pos = useSharedValue('absolute');
    const left = useSharedValue(12);

    const [value, setValue] = useState(null);

    const labelTop = useAnimatedStyle(() => {
        return {
            top: withSpring(pTop.value),
            position: pos.value,
            fontSize: 16,
            color: '#00c4ff',
            left: left.value
        }
    });

    const focusInput = useCallback(() => {
        pTop.value = withSpring(0);
        pos.value = withSpring('relative');
        left.value = withSpring(0);
    }, [])

    const outFocusInput = useCallback(() => {
        if (!value) {
            pTop.value = 5;
            pos.value = 'absolute';
            left.value = 12;
        }
    }, [value]);

    const onChange = useCallback((text)=>{
        setValue(text);
        onChangeText?.(text);
    }, []);

    return (
        <TouchableWithoutFeedback onPress={()=>{
            outFocusInput()
        }}>
            <View style={css.viewInput}>
                <Animated.Text style={labelTop}>{label}</Animated.Text>
                <TextInput
                    onFocus={focusInput}
                    style={{ fontSize: 16, padding: 0 }}
                    onChangeText={onChange}
                    multiline={!!numberOfLines}
                    numberOfLines={numberOfLines}
                ></TextInput>
            </View>
        </TouchableWithoutFeedback>
    )
}

const css = StyleSheet.create({
    container: {
        flex: 1
    },
    viewInput: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
    },
    label: {
        position: 'absolute',
        top: 15,
        left: 12
    }
});

export default FormInput;