import { useCallback, useEffect, useState } from 'react';
import {
  Button,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';
import Animated, { ReduceMotion, withDecay, withSequence } from 'react-native-reanimated';
import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  Easing,
  withRepeat,
  withDelay,
} from 'react-native-reanimated';
import Carousel from '@elements/Carousel';
import ExtraConten from '@elements/ExtraConten';
import testList from '@assets/data/testList';
// https://reactnavigation.org/docs/stack-navigator/
// https://reactnavigation.org/docs/stack-navigator/#transparent-modals

const ExAnimated1 = () => {
  const width = useSharedValue(120);
  const height = useSharedValue(60);
  const left = useSharedValue(10);

  const handlePress = () => {
    width.value = withSpring(width.value + 20);
    height.value = withSpring(height.value + 50);
    left.value = withSpring(left.value + 20);
  };

  return (
    <View style={{ paddingHorizontal: 10 }}>
      <Animated.View
        style={{
          width,
          height: height,
          backgroundColor: 'violet',
          left: left,
          top: 20,
        }}>
        <Button onPress={handlePress} title="Click me 1" />
      </Animated.View>

      <Carousel
        data={testList}
        onPress={() => {
          console.log(123123);
        }}
      />
      <ExtraConten
        title={'View conten'}
        contenStyle={{ backgroundColor: 'violet', borderRadius: 10, padding: 8 }}>
        <Text>123</Text>
        <Text>1234</Text>
        <Text>12345</Text>
        <Text>12356</Text>
        <Text>12367</Text>
        <Text>12378</Text>
        <Text>12389</Text>
        <Text>123910</Text>
        <Text>1231011</Text>
        <Text>12311123</Text>
      </ExtraConten>
      <ExtraConten
        title={'View conten'}
        contenStyle={{ backgroundColor: 'violet', borderRadius: 10, padding: 8 }}>
        <Text>123</Text>
        <Text>1234</Text>
        <Text>12345</Text>
        <Text>12356</Text>
        <Text>12367</Text>
        <Text>12378</Text>
        <Text>12389</Text>
        <Text>123910</Text>
        <Text>1231011</Text>
        <Text>12311123</Text>
      </ExtraConten>
    </View>
  );
};

const ExAnimated2 = () => {
  const translateX = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: withSpring(translateX.value * 2) }],
  }));

  const tranX = useSharedValue(0);
  const tranY = useSharedValue(0);

  const trinhTu = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: tranX.value },
        { translateY: tranY.value },
      ],
      width: 60,
      height: 60,
    }
  })

  const dao = useSharedValue(0);
  useEffect(() => {
    dao.value = withRepeat(
      withTiming(100, { duration: 2000 }), // 1 hoạt ảnh cần lặp lại.
      4,   // số lần lặp lạil (-1 sẽ là vô tận)
      true //Hoạt ảnh có nên: chạy ngược lạil(vd x x= 0->dần->100 sau đó sẽ từ từ 100->dần->0) với mỗi lần lặp lại khác hay không. Mặc định là false.
    )

    tranX.value = withSequence(
      withTiming(tranX.value + 100, { duration: 1000 }), // giá trị không cộng dồn mà tham chiếu so với giá trị ban đầu.
      withDelay(1000, withTiming(tranX.value - 50, { duration: 1000 })),  // giá trị không cộng dồn mà tham chiếu so với giá trị ban đầu.
      withDelay(1000, withTiming(tranX.value + 60, { duration: 1000 }))  // giá trị không cộng dồn mà tham chiếu so với giá trị ban đầu.
    )

    tranY.value = withSequence(
      withDelay(1000, withTiming(tranY.value + 50, { duration: 1000 })),  // giá trị không cộng dồn mà tham chiếu so với giá trị ban đầu.
      withDelay(1000, withTiming(tranY.value, { duration: 1000 }))// ,  // giá trị không cộng dồn mà tham chiếu so với giá trị ban đầu.
    )
  }, [])

  return (
    <View>
      <Animated.View
        style={[
          {
            width: 60,
            height: 60,
            backgroundColor: 'violet',
          },
          animatedStyles,
        ]}
      />

      <TouchableOpacity
        onPress={() => {
          translateX.value = withSpring(translateX.value + 30);
        }}>
        <Text>on click</Text>
      </TouchableOpacity>

      <Animated.View style={{
        transform: [
          { translateX: dao }
        ],
        width: 60, height: 60, backgroundColor: 'green'
      }}>
      </Animated.View>
      <Animated.Image style={trinhTu} source={require('@assets/icons8-image-100.png')}></Animated.Image>

    </View>
  );
};

const duration = 2000;

function ExAnimated3() {
  const defaultAnim = useSharedValue(200);
  const linear = useSharedValue(200);

  const animatedDefault = useAnimatedStyle(() => ({
    transform: [{ translateX: defaultAnim.value }],
  }));
  const animatedChanged = useAnimatedStyle(() => ({
    transform: [{ translateX: linear.value }],
  }));

  useEffect(() => {
    linear.value = withRepeat(
      // highlight-next-line
      withTiming(-linear.value, {
        duration,
        easing: Easing.linear,
      }),
      -1,
      true,
    );
    defaultAnim.value = withRepeat(
      // highlight-next-line
      withTiming(-defaultAnim.value, {
        duration,
      }),
      -1,
      true,
    );
  }, [defaultAnim, linear]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, animatedDefault]}>
        <Text style={styles.text}>inout</Text>
      </Animated.View>
      <Animated.View style={[styles.box, animatedChanged]}>
        <Text style={styles.text}>linear</Text>
      </Animated.View>
    </View>
  );
}

const ExAnimated4 = props => {
  const width = 210;
  const height = 120;
  const topY = useSharedValue(-120);
  const [show, setShow] = useState(false);
  useEffect(() => { }, []);
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      {show && (
        <Animated.View
          style={{
            width: width,
            height: height,
            backgroundColor: 'rgba(0, 207, 101, 0.4)',
            position: 'absolute',
            transform: [{ translateY: topY }],
            borderRadius: 10,
            padding: 10,
            left: Dimensions.get('screen').width / 2 - width / 2,
            zIndex: 1,
          }}>
          <Text style={{ fontSize: 16, fontWeight: 500 }}>
            {props?.message || 'Not message'}
          </Text>
        </Animated.View>
      )}

      <Button
        title="show messsage"
        onPress={() => {
          setShow(true);
          topY.value = withTiming(-60, {
            duration: 1420,
            easing: Easing.elastic(2),
            reduceMotion: ReduceMotion.System,
          });
          setTimeout(() => {
            setShow(false);
            topY.value = -height;
          }, 3000);
        }}
      />
      <Text />
      <View style={{ backgroundColor: 'violet', width: 120, height: 220 }} />
    </View>
  );
};

const ExAnimated5 = props => {
  const DURATION = 1000;
  const DELAY = 500;

  const text = ['React', 'Native', 'Reanimated'];
  const [isShown, setShown] = useState(false);

  const opacity1 = useSharedValue(0);
  const opacity2 = useSharedValue(0);
  const opacity3 = useSharedValue(0);
  const top = useSharedValue(Dimensions.get('screen').height);

  // prettier-ignore
  const show = () => {
    if (isShown) {
      opacity3.value = withDelay(0 * DELAY, withTiming(0, { duration: DURATION }));
      opacity2.value = withDelay(1 * DELAY, withTiming(0, { duration: DURATION }));
      opacity1.value = withDelay(2 * DELAY, withTiming(0, { duration: DURATION }));
    } else {
      opacity1.value = withDelay(0 * DELAY, withTiming(1, { duration: DURATION }));
      opacity2.value = withDelay(1 * DELAY, withTiming(1, { duration: DURATION }));
      opacity3.value = withDelay(2 * DELAY, withTiming(1, { duration: DURATION }));
    }
    setShown(!isShown);
  };

  useEffect(() => {
    top.value = withTiming(0, {
      duration: 1000,
      easing: Easing.inOut(Easing.ease),
    });
  }, [top]);

  const onClose = useCallback(() => {
    top.value = withTiming(Dimensions.get('screen').height, {
      duration: 1000,
      easing: Easing.inOut(Easing.ease),
    });
    setTimeout(() => {
      props.navigation.goBack();
    }, 1000);
  }, [props.navigation, top]);

  return (
    <Animated.View style={[styles.container, { top: top }]}>
      <TouchableOpacity style={{ height: 160 }} onPress={onClose} />
      <View
        style={[
          {
            backgroundColor: 'white',
            flex: 1,
            borderTopStartRadius: 30,
            borderTopEndRadius: 30,
            // justifyContent: 'center',
            // alignItems: 'center'
          },
        ]}>
        <View
          style={{ alignItems: 'flex-end', paddingRight: 15, paddingTop: 15 }}>
          <TouchableOpacity style={{ padding: 5 }} onPress={onClose}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>X</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.text1}>
          <Animated.Text style={{ ...styles.label, opacity: opacity1 }}>
            {text[0]}
          </Animated.Text>
          <Animated.Text style={{ ...styles.label, opacity: opacity2 }}>
            {text[1]}
          </Animated.Text>
          <Animated.Text style={{ ...styles.label, opacity: opacity3 }}>
            {text[2]}
          </Animated.Text>
        </View>
        <Button title={isShown ? 'Hide' : 'Show'} onPress={show} />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.0)',
    // alignItems: 'center',
    // justifyContent: 'center',
    // height: '100%',
    // borderTopStartRadius: 30,
    // borderTopEndRadius: 30
  },
  box: {
    height: 80,
    width: 80,
    margin: 20,
    borderWidth: 1,
    borderColor: '#b58df1',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#b58df1',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  text1: {
    flexDirection: 'row',
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  label: {
    fontSize: 42,
    textAlign: 'center',
    fontWeight: 'bold',
    marginRight: 8,
  },
  divider: {
    borderRightWidth: 1,
    borderRightColor: '#ddd',
  },
  animatedBorder: {
    height: 8,
    width: 64,
    backgroundColor: 'tomato',
    borderRadius: 20,
  },
});

export { ExAnimated1, ExAnimated2, ExAnimated3, ExAnimated4, ExAnimated5 };
// =========================================================
// useSharedValue: là 1 hook để tham chiếu giá trị cho hiệu ứng(đây là yêu cầu bắt buộc cho việc lưu và cập nhập giá trị thuộc tính.)
// withSpring: là 1 dạng hiệu ứng để chi phối giá trị cập nhập.

// https://www.w3schools.com/css/css3_2dtransforms.asp
// https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translateX
