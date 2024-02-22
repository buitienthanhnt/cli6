import React from "react";
import type {
  StyleProp,
  ViewStyle,
  ImageURISource,
  ImageSourcePropType,
  
} from "react-native";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  Image
} from "react-native";
// import { Image } from 'expo-image';

interface Props {
  style?: StyleProp<ViewStyle>
  index?: number
  showIndex?: boolean
  img?: string,
  title?: string,
}

export const SBImageItem: React.FC<Props> = ({
  style,
  index: _index,
  showIndex = true,
  img,
  title
}) => {
  const index = _index ?? 0;
  const source = 'https://firebasestorage.googleapis.com/v0/b/newpaper-25148.appspot.com/o/demo%2FltSGfxAXmf.png?alt=media&token=22f75424-fcc8-41bf-8994-0f7c67114d54'

  return (
    <View style={[styles.container, style]}>
      <Image key={index} style={styles.image} source={{uri: img || source}} />
      {
        showIndex && <Text
          style={{
            position: "absolute",
            color: "#00afef",
            fontSize: 18,
            borderRadius: 5,
            overflow: "hidden",
             // backgroundColor: "#EAEAEA",
            // paddingHorizontal: 10,
            // paddingTop: 2,
            bottom: 10
          }}
        >
          {title}
        </Text>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
});
