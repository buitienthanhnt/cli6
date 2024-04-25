import React, { useRef, useState } from 'react';
import { View, StyleSheet, PanResponder, Text, Button } from 'react-native';
import Animated, { ReduceMotion, runOnJS, useAnimatedStyle, useSharedValue, withDecay, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const END_POSITION = 200;

const PanResponders = () => {
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);
  const [color, setColor] = useState('green')

  const w = useSharedValue(60);
  const h = useSharedValue(60);
  const tranX = useSharedValue(0);
  const tranY = useSharedValue(0);
  const radius = useSharedValue(0);
  const rotate = useSharedValue(0);

  const [onX, setOnX] = useState(0);
  const dX = useSharedValue(0);
  const [show, setShow] = useState(false);

  const panGesture = Gesture.Pan()
    .onTouchesDown((e) => {
      // doi mau
      runOnJS(setColor)('violet')

      // bo vien
      radius.value = 8

      // thu nho
      w.value = withTiming(55, { duration: 200 })
      h.value = withTiming(55, { duration: 200 })

      // xoay
      // rotate.value = withRepeat(
      //   withTiming(1, { duration: 1000 }),
      //   3,
      //   true
      // )
    })
    .onUpdate((e) => {
      // console.log(e.translationX);
      tranX.value = lastX + e.translationX;
      tranY.value = lastY + e.translationY;
    })
    .onEnd((e) => {
      runOnJS(setLastX)(lastX + e.translationX)
      runOnJS(setLastY)(lastY + e.translationY)
    }).onTouchesUp(() => {
      runOnJS(setColor)('green') // doi lai mau
      radius.value = 0; // het bo vien
      // rotate.value = 0
      w.value = withTiming(60, { duration: 200 })
      h.value = withTiming(60, { duration: 200 })
    });

  const showCom = Gesture.Pan().onTouchesDown((e) => {
    // console.log('====================================');
    // console.log(e);
    // console.log('====================================');
    runOnJS(setOnX)(e.changedTouches[0].x)
    runOnJS(setShow)(true)
    dX.value = e.changedTouches[0].x;
  }).onUpdate((e) => {
    dX.value = onX + e.translationX;
  }
  ).onEnd((e) => {
    // 
    runOnJS(setShow)(false);
    runOnJS(setOnX)(onX+ e.translationX)
  })

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: tranX.value },
      { translateY: tranY.value },
      { rotateZ: `${rotate.value * 360}deg` }
    ],
    width: w.value,
    height: h.value,
    backgroundColor: color,
    borderRadius: radius.value
  }));

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={animatedStyle} />
      </GestureDetector>

      <Button title='show x' onPress={() => {
        console.log('====================================');
        console.log(position.value);
      }}></Button>

      <GestureDetector gesture={showCom}>
        <View style={{ width: '100%', height: 40, backgroundColor: 'rgba(123, 186, 235, 1)' }}>
          <Animated.View style={{
            position: 'absolute',
            transform: [
              { translateY: -20 },
              { translateX: dX }
            ]
          }}>
            {show && <Text>active text</Text>}
          </Animated.View>
        </View>
      </GestureDetector>

    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  box: {
    height: 150,
    width: 150,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
});

export default PanResponders;