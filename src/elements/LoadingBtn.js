import React from "react";
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
// import { Image } from "react-native-elements"; // dùng này bị lỗi nháy ảnh khi chuyển trang thái.
import FastImage from 'react-native-fast-image';

const LoadingBtn = ({ children, onPress, loadingSize, loadding, style }) => {
    const _onPress = () => {
        onPress?.();
    }

    return (
        <TouchableOpacity style={[css.btn, style, loadding ? { opacity: 0.5 } : {}]} onPress={_onPress} disabled={loadding}>
            {(children)}
            {loadding &&
                <View style={css.loadding}>
                    <FastImage
                        source={require("@assets/Rolling-1s-200px.gif")}
                        style={{ width: loadingSize || 24, height: loadingSize || 24 }}>
                    </FastImage>
                </View>
            }
        </TouchableOpacity>
    )
}

export default LoadingBtn;

const css = StyleSheet.create({
    btn: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        padding: 10,
        borderRadius: 8,
        minWidth: 10,
        alignSelf: 'flex-start', // fit conten for btn.
    },
    loadding: {
        position: 'absolute'
    }
})
