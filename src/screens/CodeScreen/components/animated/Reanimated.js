import {useState} from 'react';
import {
  Button,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Dimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  withSpring,
  withTiming,
  useAnimatedStyle,
  useAnimatedProps,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
// import { styled, useColorScheme } from "nativewind";
import PagerView from 'react-native-pager-view';

const Reanimated1 = () => {
  const [text, setText] = useState('');
  const width = useSharedValue(100); // dung gia tri co ban

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const _w = useSharedValue(124);
  const _h = useSharedValue(124);
  const r = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {translateX: withSpring(translateX.value)},
      {translateY: withSpring(translateY.value)},
    ],
    width: withSpring(_w.value),
    height: withSpring(_h.value),
  }));

  const position = useSharedValue('absolute');
  const pTop = useSharedValue(24),
    pFeft = useSharedValue(24);
  const fSize = useSharedValue(12);
  const placeStyle = useAnimatedStyle(() => {
    return {
      top: withSpring(pTop.value),
      left: withSpring(pFeft.value),
      position: position.value,
      fontSize: withSpring(fSize.value),
    };
  });

  return (
    <TouchableWithoutFeedback
      style={{padding: 24}}
      onPress={() => {
        if (!text) {
          pFeft.value = pTop.value = 24;
          position.value = 'absolute';
          fSize.value = 12;
        }
        Keyboard.dismiss();
      }}
      accessible={false}>
      <View>
        <Animated.View
          style={{
            width: width,
            height: 100,
            backgroundColor: 'violet',
          }}
        />

        <Animated.View style={[styles.box, animatedStyles]} />
        <CustomInput />
        <CustomInput />
        <View
          style={{
            width: 'auto',
            borderRadius: 10,
            padding: 10,
            // borderWidth: 1,
            // borderColor: 'red',
          }}>
          <Animated.Text style={placeStyle}>place holder</Animated.Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderRadius: 10,
              borderColor: 'green',
              padding: 5,
              marginTop: 5,
              fontSize: 15,
            }}
            // placeholder="placeholder text"
            // onPressOut={()=>{
            //     console.log('onPressOut');
            // }}
            // onPressIn={()=>{
            //     console.log('onPressIn');
            // }}
            onFocus={() => {
              if (pFeft.value > 0 && pTop.value > 0) {
                pFeft.value -= 20;
                pTop.value -= 24;
                fSize.value = 16;
              }

              position.value = withSpring('relative');
            }}
            onChangeText={text => setText(text)}
            value={text}
          />
        </View>

        <Button
          title="onpress"
          style={{marginTop: 10}}
          onPress={() => {
            width.value = withSpring(width.value + 24);
            translateX.value += 24;
            translateY.value -= 10;
            _w.value -= 10;
            _h.value -= 10;
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
  // demo nativeWind
  // const StyledView = styled(View);
  // return (
  //     <StyledView className={''}>
  //         <Text className={''}>
  //             reanimated
  //         </Text>
  //     </StyledView>
  // )
};

const Reanimated2 = () => {
  const left = useSharedValue(0);
  const wi = Dimensions.get('screen').width;
  const animatedStyle = useAnimatedStyle(() => ({
    left: interpolate(
      left.value * wi,
      [0, wi * (4 - 1)],
      [0, 8 * (7 - 1)],
      Extrapolation.EXTEND,
    ),
  }));
  return (
    <View style={{flex: 1}}>
      <PagerView
        style={styles.pagerView}
        initialPage={0}
        onPageSelected={() => {}}
        onPageScroll={event => {
          // console.log(event.nativeEvent);
          left.value = event.nativeEvent.position + event.nativeEvent.offset;
        }}>
        <View
          key="1"
          style={{backgroundColor: 'green', padding: 5, height: 250}}>
          <Text>First page</Text>
        </View>
        <View
          key="2"
          style={{backgroundColor: 'violet', padding: 5, height: 250}}>
          <Text>Second page</Text>
        </View>
        <View
          key="3"
          style={{backgroundColor: 'violet', padding: 5, height: 250}}>
          <Text>3 page</Text>
        </View>
        <View
          key="4"
          style={{backgroundColor: 'violet', padding: 5, height: 250}}>
          <Text>4 page</Text>
        </View>
      </PagerView>
      <View
        style={{
          position: 'absolute',
          top: 250 - 30,
          // backgroundColor: 'blue',
          // height: 40,
          alignItems: 'center',
          // justifyContent: 'center',
          flexDirection: 'row',
          gap: 8,
          left: Dimensions.get('screen').width / 2 - (7 * 8) / 2,
          borderRadius: 10,
        }}>
        <View
          style={{
            width: 8,
            height: 8,
            backgroundColor: 'blue',
            borderRadius: 8,
          }}
        />
        <View
          style={{
            width: 8,
            height: 8,
            backgroundColor: 'blue',
            borderRadius: 8,
          }}
        />
        <View
          style={{
            width: 8,
            height: 8,
            backgroundColor: 'blue',
            borderRadius: 8,
          }}
        />
        <View
          style={{
            width: 8,
            height: 8,
            backgroundColor: 'blue',
            borderRadius: 8,
          }}
        />
        <Animated.View
          style={[
            {
              width: 8,
              height: 8,
              backgroundColor: 'red',
              borderRadius: 8,
              position: 'absolute',
            },
            animatedStyle,
          ]}
        />
      </View>
    </View>
  );
};

const CustomInput = () => {
  const [text, setText] = useState('');
  const position = useSharedValue('absolute');
  const pTop = useSharedValue(24),
    pFeft = useSharedValue(24);
  const fSize = useSharedValue(12);
  const placeStyle = useAnimatedStyle(() => {
    return {
      top: withSpring(pTop.value),
      left: withSpring(pFeft.value),
      position: position.value,
      fontSize: withSpring(fSize.value),
    };
  });

  return (
    <TouchableWithoutFeedback
      style={{padding: 24}}
      onPress={() => {
        if (!text) {
          pFeft.value = pTop.value = 24;
          position.value = 'absolute';
          fSize.value = 12;
        }
        Keyboard.dismiss();
      }}
      accessible={false}>
      <View
        style={{
          width: 'auto',
          borderRadius: 10,
          padding: 10,
          // borderWidth: 1,
          // borderColor: 'red',
        }}>
        <Animated.Text style={placeStyle}>place holder</Animated.Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderRadius: 10,
            borderColor: 'green',
            padding: 5,
            marginTop: 5,
            fontSize: 15,
          }}
          onFocus={() => {
            if (pFeft.value > 0 && pTop.value > 0) {
              pFeft.value -= 20;
              pTop.value -= 24;
              fSize.value = 16;
            }

            position.value = withSpring('relative');
          }}
          onChangeText={text => setText(text)}
          value={text}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
  },
});

export {Reanimated1, Reanimated2};
