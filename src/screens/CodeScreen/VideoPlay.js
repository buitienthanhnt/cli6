import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import dings from '@assets/titanium-170190.mp3';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Text} from 'react-native-ui-lib';
import Config from '@config/Config';
import Video from 'react-native-video'; // https://blog.logrocket.com/adding-videos-react-native-react-native-video/

// https://www.pexels.com/search/videos/gif/
const VideoPlay = () => {
  return (
    <View style={{flex: 1, paddingHorizontal: 10}}>
      {/*<Video*/}
      {/*  source={{uri: `${Config.public_url()}canh_dong_hoa_cai_vang.mp4`}} // the video file*/}
      {/*  paused={false} // make it start*/}
      {/*  style={styles.backgroundVideo} // any style you want*/}
      {/*  repeat={true} // make it a loop*/}
      {/*/>*/}

      {/*<Video*/}
      {/*  source={require('@assets/3129671-uhd_3840_2160_30fps.mp4')} // the video file*/}
      {/*  paused={false} // make it start*/}
      {/*  style={styles.backgroundVideo} // any style you want*/}
      {/*  repeat={true} // make it a loop*/}
      {/*/>*/}

      <Video
        source={require('@assets/3125427-uhd_3840_2160_25fps.mp4')} // the video file
        paused={false} // make it start
        style={styles.backgroundVideo} // any style you want
        repeat={true} // make it a loop
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundVideo: {
    width: '100%',
    height: 240,
  },
});

export default VideoPlay;
