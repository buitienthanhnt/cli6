import React, {useRef, useEffect, useCallback} from 'react';
import {Animated, Text, TouchableOpacity, View} from 'react-native';
import {
  AppRegistry,
  StyleSheet,
  Image,
  Easing
} from 'react-native'

const FadeInView = props => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 10000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}>
      {props.children}
    </Animated.View>
  );
};

// You can then use your `FadeInView` in place of a `View` in your components:
export default () => {
  const spinvalue = useRef(new Animated.Value(0)).current;

  useEffect(()=>{
    Animated.timing(spinvalue, {
      toValue: 1,
      duration: 4000,
      easing: Easing.linear
    }).start()
  }, [])

  const changeOpaciti = useCallback((targetValue)=>{
    Animated.timing(spinvalue, {
      toValue: targetValue,
      duration: 5000,
      easing: Easing.linear
    }).start();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <FadeInView
        style={{
          width: 250,
          height: 50,
          backgroundColor: 'powderblue',
        }}>
        <Text style={{fontSize: 28, textAlign: 'center', margin: 10}}>
          Fading in
        </Text>
      </FadeInView>

      <Animated.View style={{ width: 200, height: 100, backgroundColor: 'green', opacity: spinvalue}}>
        <TouchableOpacity onPress={()=>{
          changeOpaciti(0)
        }}>
          <Text>demo for opacity</Text>
        </TouchableOpacity>
       
      </Animated.View>
    </View>
  );
};