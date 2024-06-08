import React, {FunctionComponent} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
} from 'react-native';
// import { Image } from "react-native-elements"; // dùng này bị lỗi nháy ảnh khi chuyển trang thái.
import FastImage from 'react-native-fast-image';

interface LoadingBtnProps {
  children: React.ReactNode;
  onPress?: () => void;
  loading?: boolean;
  loadingSize?: number;
  style?: StyleProp<ViewStyle>;
}
const LoadingBtn: FunctionComponent<LoadingBtnProps> = ({
  children,
  onPress,
  loadingSize,
  loading,
  style,
}) => {
  const _onPress = () => {
    onPress?.();
  };

  return (
    <TouchableOpacity
      style={[css.btn, style, loading ? {opacity: 0.5} : {}]}
      onPress={_onPress}
      disabled={loading}>
      {children}
      {loading && (
        <View style={css.loadding}>
          <FastImage
            source={require('@assets/Rolling-1s-200px.gif')}
            style={{
              width: loadingSize || 24,
              height: loadingSize || 24,
            }}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default LoadingBtn;

const css = StyleSheet.create({
  btn: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    minWidth: 10,
    alignSelf: 'flex-start', // fit conten for btn.
  },
  loadding: {
    position: 'absolute',
  },
});
