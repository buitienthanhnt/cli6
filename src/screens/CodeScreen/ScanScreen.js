import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Clipboard,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { Navigate } from '@hooks/Navigate';
import Icon from 'react-native-vector-icons/FontAwesome';

class ScanScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }
  onSuccess = e => {
    this.setState({ value: e.data });
  };

  saveQrValue = async () => {
    await Clipboard.setString(this.state.value);
    alert("coppied value: " + this.state.value);
  }

  checkHttp = () => {
    if (this.state.value) {
      var myRe = /^(http|https):\/\/.*/g;
      if (myRe.exec(this.state.value)) {
        return true;
      }
    }
    return false;
  }

  render() {
    if (this.state.value) {
      return (
        <View style={{ flexDirection: 'row', padding: 10 }}>
          <Text style={{ marginRight: 10 }}>Qr value: {this.state.value}</Text>
          <TouchableOpacity onPress={this.saveQrValue} style={{ marginHorizontal: 10 }}>
            <FontAwesome5Icon name='copy' size={28} color='tomato' />
          </TouchableOpacity>
          {
            this.checkHttp() && <TouchableOpacity onPress={() => {
              Navigate('CodeScreen', { screen: "WebviewApp" })
            }}>
              <Icon name='arrow-circle-right' size={28} color='blue' />
            </TouchableOpacity>
          }
        </View>
      )
    }
    return (
      <QRCodeScanner
        onRead={this.onSuccess}
        flashMode={RNCamera.Constants.FlashMode.torch}
        topContent={
          <Text style={styles.centerText}>
            Go to{' '}
            <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
            your computer and scan the QR code.
          </Text>
        }
        bottomContent={
          <TouchableOpacity style={styles.buttonTouchable}>
            <Text style={styles.buttonText}>OK. Got it!</Text>
          </TouchableOpacity>
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  }
});

export default ScanScreen;
// AppRegistry.registerComponent('default', () => ScanScreen);