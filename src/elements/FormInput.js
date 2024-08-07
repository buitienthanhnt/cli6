import {useCallback, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const FormInput = ({
  label,
  placeholder,
  currentValue,
  onChangeText,
  numberOfLines,
  inputStyle,
}) => {
  const pTop = useSharedValue(20);
  const pos = useSharedValue('absolute');
  const left = useSharedValue(12);

  const [value, setValue] = useState(null);

  const labelTop = useAnimatedStyle(() => {
    return {
      top: withSpring(pTop.value),
      position: pos.value,
      fontSize: 16,
      color: 'blue',
      left: left.value,
    };
  });

  const focusInput = useCallback(() => {
    pTop.value = withSpring(0);
    pos.value = withSpring('relative');
    left.value = withSpring(0);
  }, [left, pTop, pos]);

  const outFocusInput = useCallback(() => {
    if (!value) {
      pTop.value = 5;
      pos.value = 'absolute';
      left.value = 12;
    }
  }, [left, pTop, pos, value]);

  const onChange = useCallback(
    text => {
      setValue(text);
      onChangeText?.(text);
    },
    [onChangeText],
  );

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        outFocusInput();
      }}>
      <View style={css.viewInput}>
        <Animated.Text style={labelTop}>{label}</Animated.Text>
        <TextInput
          onFocus={focusInput}
          style={[{fontSize: 16, padding: 0, height: 24}, inputStyle]}
          onChangeText={onChange}
          multiline={!!numberOfLines}
          numberOfLines={numberOfLines}
          // placeholder={placeholder}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const css = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    justifyContent: 'center',
  },
  label: {
    position: 'absolute',
    top: 15,
    left: 12,
  },
});

export default FormInput;
