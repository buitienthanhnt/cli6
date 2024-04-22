import React from 'react';
import type {StyleProp, ViewStyle, ViewProps} from 'react-native';
import {LongPressGestureHandler} from 'react-native-gesture-handler';
import type {AnimateProps} from 'react-native-reanimated';
import Animated from 'react-native-reanimated';

// import Constants from "expo-constants";

import {SBImageItem} from './SBImageItem';
import {SBTextItem} from './SBTextItem';

interface Props extends AnimateProps<ViewProps> {
  style?: StyleProp<ViewStyle>;
  index?: number;
  pretty?: boolean;
  showIndex?: boolean;
  img?: string;
  title?: string;
  onPress?: () => void;
}

export const SBItem: React.FC<Props> = props => {
  const {
    style,
    showIndex = true,
    index,
    pretty,
    img,
    title,
    testID,
    onPress,
    ...animatedViewProps
  } = props;

  const [isPretty, setIsPretty] = React.useState(pretty);
  return (
    <LongPressGestureHandler
      onActivated={() => {
        setIsPretty(!isPretty);
      }}>
      <Animated.View testID={testID} style={{flex: 1}} {...animatedViewProps}>
        {isPretty || img ? (
          <SBImageItem
            style={style}
            index={index}
            onPress={onPress}
            showIndex={typeof index === 'number' && showIndex}
            img={img}
            title={title}
          />
        ) : (
          <SBTextItem style={style} index={index} />
        )}
      </Animated.View>
    </LongPressGestureHandler>
  );
};
