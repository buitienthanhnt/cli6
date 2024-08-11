import React from 'react';
import type {
  StyleProp,
  ViewStyle,
  ImageURISource,
  ImageSourcePropType,
} from 'react-native';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
// import { Image } from 'expo-image';

interface Props {
  style?: StyleProp<ViewStyle>;
  index?: number;
  showIndex?: boolean;
  img?: string;
  title?: string;
  onPress?: () => void;
}

export const SBImageItem: React.FC<Props> = ({
  style,
  index: _index,
  showIndex = true,
  img,
  title,
  onPress,
}) => {
  const index = _index ?? 0;
  const source =
    'https://firebasestorage.googleapis.com/v0/b/newpaper-25148.appspot.com/o/demo%2FltSGfxAXmf.png?alt=media&token=22f75424-fcc8-41bf-8994-0f7c67114d54';

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={() => {
        onPress?.();
      }}>
      <Image
        key={index}
        style={styles.image}
        source={{uri: img || source}}
        defaultSource={{uri: source}}
      />
      {showIndex && (
        <Text
          style={{
            position: 'absolute',
            color: 'white',
            fontSize: 18,
            borderRadius: 5,
            overflow: 'hidden',
            // backgroundColor: "#EAEAEA",
            // paddingHorizontal: 10,
            // paddingTop: 2,
            bottom: 10,
          }}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
});
