import React, { useRef, useEffect, useCallback, useState } from 'react';
import { Animated, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import {
  ScrollView,
  AppRegistry,
  StyleSheet,
  Image,
  Easing
} from 'react-native';
import SearchInput from '@elements/SearchInput';
import Data from '@config/PageList';

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
  useEffect(() => {
    Animated.timing(spinvalue, {
      toValue: 1,
      duration: 4000,
      easing: Easing.linear,
      useNativeDriver: true
    }).start()
  }, [])

  const changeOpaciti = useCallback((targetValue) => {
    Animated.timing(spinvalue, {
      toValue: targetValue,
      duration: 5000,
      easing: Easing.linear,
      useNativeDriver: true
    }).start();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
      }}>
      <SearchInput
        inputSource={Data.values}
        style={{ marginTop: 10, zIndex: Platform.OS === 'ios' ? 999 : undefined}}
      ></SearchInput>
      <FadeInView
        style={{
          width: 250,
          height: 50,
          backgroundColor: 'powderblue',
          zIndex: 1
        }}>
        <Text style={{ fontSize: 28, textAlign: 'center', margin: 10 }}>
          Fading in
        </Text>
      </FadeInView>

      <Animated.View style={{ width: 200, height: 100, backgroundColor: 'green', opacity: spinvalue, }}>
        <TouchableOpacity onPress={() => {
          changeOpaciti(0)
        }}>
          <Text>demo for opacity</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};