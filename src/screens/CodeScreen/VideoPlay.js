import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Button,
  Dimensions,
  FlatList,
  Text,
} from 'react-native';
import Video from 'react-native-video'; // https://blog.logrocket.com/adding-videos-react-native-react-native-video/
import {videosUrl} from './testVideoUrl';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import YoutubePlayer from 'react-native-youtube-iframe';

const datas = ['iLUhJGx40QM', 'xNAgOlLuUk8', 'hJ7Rg1821Q0', '61YBXPbgn7I'];

// https://www.pexels.com/search/videos/gif/
const VideoPlay = () => {
  const VideoPlayer = Animated.createAnimatedComponent(Video);
  const [pause, setPause] = useState(false);
  const leftNote = useSharedValue(0);
  const width = (Dimensions.get('screen').width - 20) * (datas.length - 1);
  const onWidth = 12 * datas.length + (datas.length - 1) * 4;

  const animatedStyle = useAnimatedStyle(() => ({
    left: interpolate(
      leftNote.value,
      [0, width],
      [0, onWidth],
      Extrapolation.EXTEND,
    ),
  }));

  const renderItem = useCallback(({item, index}) => {
    return (
      <View
        style={{
          width: Dimensions.get('screen').width - 20,
          height: 205,
        }}>
        <YoutubePlayer
          height={205}
          mute={false}
          volume={0}
          videoId={item}
          allowWebViewZoom={true}
        />
      </View>
    );
  }, []);

  return (
    <View style={{flex: 1, paddingHorizontal: 10}}>
      {/*<VideoPlayer*/}
      {/*  source={{*/}
      {/*    uri: 'https://alphonso-uppy.jmango360.dev/files/vjuz0dfqo7gz0dnzs6xmv7zt/1496953604',*/}
      {/*    type: 'm3u8',*/}
      {/*  }}*/}
      {/*  paused={true} // make it start*/}
      {/*  style={styles.backgroundVideo} // any style you want*/}
      {/*  repeat={true} // make it a loop*/}
      {/*  // type={'m3u8'} // định dạng này hỗ trợ tốt hơn*/}
      {/*  resizeMode={'cover'}*/}
      {/*  poster={*/}
      {/*    'https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-6/448182425_426022043682243_3046730575109270469_n.jpg?stp=dst-jpg_s600x600&_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_ohc=GQokLNZ-2S0Q7kNvgFAFuTA&_nc_ht=scontent.fhan2-5.fna&oh=00_AYBqjIc1qKxxyaZqrEllb6W5a-BCLvE3e8Hd91TolRN5xQ&oe=6670427E'*/}
      {/*  }*/}
      {/*  onError={error => {*/}
      {/*    console.log('----', error);*/}
      {/*  }}*/}
      {/*  pictureInPicture={false}*/}
      {/*  playInBackground={false}*/}
      {/*  playWhenInactive={false}*/}
      {/*  allowsExternalPlayback={false}*/}
      {/*  preventsDisplaySleepDuringVideoPlayback={true}*/}
      {/*  hideShutterView={true}*/}
      {/*/>*/}
      {/*<View style={{height: 10}} />*/}
      <Button
        style={styles.button}
        title={'pause'}
        onPress={() => {
          // setPause(pause => !pause);
          leftNote.value = withTiming(16, {duration: 300});
        }}
      />

      <View
        style={{
          marginTop: 10,
          width: Dimensions.get('screen').width - 20,
        }}>
        <View style={{width: '100%', paddingVertical: 12}}>
          <Text style={{fontWeight: '600', color: '#22252D'}}>Videos</Text>
        </View>
        <FlatList
          data={datas}
          renderItem={renderItem}
          pagingEnabled={true}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => {}}
          onScroll={event => {
            // console.log(event.nativeEvent.contentOffset.x, width);
            leftNote.value = withTiming(event.nativeEvent.contentOffset.x, {
              duration: 25,
            });
          }}
        />
        <View style={{marginVertical: 10}}>
          <View
            style={{
              flexDirection: 'row',
              gap: 8,
              left:
                (Dimensions.get('screen').width - 20) / 2 -
                (datas.length * 2 - 1) * 4,
            }}>
            {datas.map(item => {
              return (
                <View
                  style={{
                    width: 12,
                    height: 4,
                    borderRadius: 10,
                    backgroundColor: '#7F8596',
                    opacity: 0.64,
                  }}
                />
              );
            })}
            <Animated.View
              style={[
                {
                  width: 12,
                  height: 4,
                  borderRadius: 10,
                  backgroundColor: '#1F2128',
                  position: 'absolute',
                  opacity: 0.64,
                },
                animatedStyle,
              ]}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundVideo: {
    height: ((Dimensions.get('screen').width - 10) / 4) * 3,
    width: '100%',
    marginTop: 10,
    borderRadius: 4,
  },
  button: {
    marginTop: 5,
  },
});

export default VideoPlay;
