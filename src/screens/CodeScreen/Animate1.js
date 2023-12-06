import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated'; // hiệu ứng thay đổi hình ảnh
import LinearGradient from 'react-native-linear-gradient'; // (thay đổi dải màu mờ hoặc đậm dần) npm i react-native-linear-gradient
import { useNavigation } from '@react-navigation/native';
import { Slider } from 'react-native-ui-lib';


export default function Animate1() {
  const width = useSharedValue(100);
  const height = useSharedValue(40);
  const [value, setValue] = useState(1);
  const handlePress = () => {
    if (width.value + 50 <= Dimensions.get('screen').width) {
      width.value = withSpring(width.value + 50);
      height.value = withSpring(height.value + 10);
    }
  };

  useEffect(()=>{
    console.log('___________');
  }, [value]);


  return (
    <View style={styles.container}>
      <Text>----{value}----</Text>
      <Animated.View style={{ ...styles.box, width, height }} />
      <Button onPress={handlePress} title="Click me" />
      <Button title='reset' onPress={() => {
        if (width.value - 50 > 0) {
          width.value = withSpring(width.value - 25);
          height.value = withSpring(height.value - 10);
        }
      }}></Button>
      <Rediredct></Rediredct>

      <View style={{ backgroundColor: 'green' }}>
        <TouchableOpacity onPress={() => { 
          let val = value;
          setValue(val+1);
        }}>
          <LinearGradient colors={['#4c669f', '#ffffff']} style={styles.linearGradient}>
            <Text style={styles.buttonText}>
              zxczczxc
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* <Text>asdasdasd</Text> */}
      </View>

      <View style={{
        width: 160, height: 120, borderRadius: 20,
        backgroundColor: 'rgba(14, 11, 147, 0.19)',  // trong suốt cho background, không làm mờ nội dung bên trong
        // backgroundColor:'#f0f8ff', opacity: 0.2,  // làm mờ cả nội dung bên trong, 
        position: 'absolute', top: 50, transform: [{ rotate: '30deg' }],
      }}
      >
        <View >
          <Text style={{ fontSize: 16, color: 'green' }}>pppppp    pppppppppp</Text>
        </View>

      </View>
      
    </View>
  );
}

const Rediredct = () => {
  const navigation = useNavigation();
  const changeScr = () => {
    navigation.navigate("Home");
  }
  return (
    <View>
      <TouchableOpacity onPress={changeScr}>
        <LinearGradient colors={['#4c669f', '#3b5998', '#00dcff']} style={styles.linearGradient}>
          <Text style={styles.buttonText}>
            Sign in with Facebook
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  box: {
    height: 60,
    backgroundColor: '#b58df1',
    borderRadius: 20,
    marginVertical: 64,
  },
  linearGradient: {
    height: 120,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});
