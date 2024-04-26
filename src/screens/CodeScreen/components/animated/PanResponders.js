import React, {useCallback, useRef, useState} from 'react';
import {View, StyleSheet, PanResponder, Text, Button} from 'react-native';
import Animated, {
  ReduceMotion,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {
  check,
  request,
  openSettings,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';

const END_POSITION = 200;

const PanResponders = () => {
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);
  const [color, setColor] = useState('green');

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
    .onTouchesDown(e => {
      // doi mau
      runOnJS(setColor)('violet');

      // bo vien
      radius.value = 8;

      // thu nho
      w.value = withTiming(55, {duration: 200});
      h.value = withTiming(55, {duration: 200});

      // xoay
      // rotate.value = withRepeat(
      //   withTiming(1, { duration: 1000 }),
      //   3,
      //   true
      // )
    })
    .onUpdate(e => {
      // console.log(e.translationX);
      tranX.value = lastX + e.translationX;
      tranY.value = lastY + e.translationY;
    })
    .onEnd(e => {
      runOnJS(setLastX)(lastX + e.translationX);
      runOnJS(setLastY)(lastY + e.translationY);
    })
    .onTouchesUp(() => {
      runOnJS(setColor)('green'); // doi lai mau
      radius.value = 0; // het bo vien
      // rotate.value = 0
      w.value = withTiming(60, {duration: 200});
      h.value = withTiming(60, {duration: 200});
    });

  const onDown = useCallback(
    data => {
      setOnX(data);
      setShow(true);
      dX.value = data;
    },
    [dX],
  );

  const onEnd = useCallback(
    data => {
      setOnX(onX + data);
      setShow(false);
    },
    [onX],
  );

  const showCom = Gesture.Pan()
    .onTouchesDown(e => {
      runOnJS(onDown)(e.changedTouches[0].x);
    })
    .onUpdate(e => {
      dX.value = onX + e.translationX;
    })
    .onEnd(e => {
      runOnJS(onEnd)(e.translationX);
    })
    .onTouchesUp(e => {
      runOnJS(setShow)(false);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {translateX: tranX.value},
      {translateY: tranY.value},
      {rotateZ: `${rotate.value * 360}deg`},
    ],
    width: w.value,
    height: h.value,
    backgroundColor: color,
    borderRadius: radius.value,
  }));

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={animatedStyle} />
      </GestureDetector>
      <GestureDetector gesture={showCom}>
        <View
          style={{
            width: '100%',
            height: 40,
            backgroundColor: 'rgba(123, 186, 235, 1)',
            transform: [{scaleY: 1.2}],
          }}>
          <Animated.View
            style={{
              transform: [{translateX: dX}],
              height: 40,
              width: 2,
              backgroundColor: 'red',
            }}
          />
          <Animated.View
            style={{
              position: 'absolute',
              transform: [{translateY: -20}, {translateX: dX}],
            }}>
            {show && <Text>active text</Text>}
          </Animated.View>
        </View>
      </GestureDetector>
      <Text />

      <Button
        title="request Per"
        onPress={() => {
          check(PERMISSIONS.IOS.MEDIA_LIBRARY)
            .then(result => {
              switch (result) {
                case RESULTS.UNAVAILABLE:
                  console.log(
                    'This feature is not available (on this device / in this context)',
                  );
                  break;
                case RESULTS.DENIED:
                  console.log(
                    'The permission has not been requested / is denied but requestable',
                  );
                  break;
                case RESULTS.LIMITED:
                  console.log(
                    'The permission is limited: some actions are possible',
                  );
                  break;
                case RESULTS.GRANTED:
                  console.log('The permission is granted');
                  break;
                case RESULTS.BLOCKED:
                  console.log(
                    'The permission is denied and not requestable anymore',
                  );
                  break;
              }
            })
            .catch(error => {
              // …
            });

          request(PERMISSIONS.IOS.MEDIA_LIBRARY).then(result => {
            console.log('---->', result);
          });

          openSettings().catch(() => console.warn('cannot open settings'));
        }}
      />
      <Text />
      <Button
        title={'run'}
        onPress={() => {
          dX.value = withRepeat(withTiming(200, {duration: 1000}), 10, true);
        }}
      />
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
