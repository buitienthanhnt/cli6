import React, { useState } from 'react'
import QRCode from 'react-native-qrcode-svg'; // npm i react-native-qrcode-svg --legacy-peer-deps && yarn add react-native-svg
import {
    StyleSheet,
    View,
    TextInput,
    Text,
    TouchableOpacity
} from 'react-native';
const QrGenerator = (props) => {
    const [value, setValue] = useState('');
    const [qr, setQr] = useState(null);

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={(text) => setValue(text)}
                value={value}
            />

            <TouchableOpacity onPress={() => {
                setQr(value);
            }} style={{
                marginVertical: 10
            }}>
                <Text style={{ color: 'rgba(0, 0, 172, 0.5)' }}>generate:</Text>
            </TouchableOpacity>

            {qr && <QrCreate qr={qr}></QrCreate>}

        </View>
    );
}

const QrCreate = (props) => {
    return (
        <View>
            <QRCode
                value={props.qr}
                size={200}
                bgColor='black'
                fgColor='white'
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        borderRadius: 5,
        padding: 5,
        width: '70%'
    }
});
export default QrGenerator;