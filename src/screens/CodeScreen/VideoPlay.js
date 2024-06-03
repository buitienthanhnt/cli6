import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Button, Dimensions} from 'react-native';
import Video from 'react-native-video'; // https://blog.logrocket.com/adding-videos-react-native-react-native-video/
import {videosUrl} from './testVideoUrl';

// https://www.pexels.com/search/videos/gif/
const VideoPlay = () => {
  const [pause, setPause] = useState(false);
  return (
    <View style={{flex: 1, paddingHorizontal: 5}}>
      <Video
        source={{
          uri: videosUrl[0],
        }}
        paused={pause} // make it start
        style={styles.backgroundVideo} // any style you want
        repeat={true} // make it a loop
        // type={'m3u8'} // định dạng này hỗ trợ tốt hơn
        resizeMode={'cover'}
      />
      <View style={{height: 10}} />
      <Button
        style={styles.button}
        title={'pause'}
        onPress={() => {
          setPause(pause => !pause);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundVideo: {
    height: ((Dimensions.get('screen').width - 10) / 4) * 3,
    marginTop: 10,
    borderRadius: 4,
  },
  button: {
    marginTop: 5,
  },
});

export default VideoPlay;
