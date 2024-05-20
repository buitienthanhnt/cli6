import React, {FunctionComponent, useCallback} from 'react';
import {Alert, Text, View} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import YoutubePlayer from 'react-native-youtube-iframe';

interface YvideoProps {
  video: any;
}

const Yvideo: FunctionComponent<YvideoProps> = ({video}) => {
  if (!video) {
    return null;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const onStateChange = useCallback((state: string) => {
    if (state === 'ended') {
      // setPlaying(false);
      Alert.alert('video has finished playing!');
    }
  }, []);

  return (
    <View style={{flex: 1, padding: 4}}>
      <View style={{flexDirection: 'row', gap: 6, alignItems: 'center'}}>
        <Text style={{fontSize: 20, color: '#00afef', fontWeight: '600'}}>
          Video nổi bật
        </Text>
        <FontAwesome5Icon name="video" size={16} color="#00afef" />
      </View>

      <View style={{marginTop: 5}}>
        <YoutubePlayer
          {...video}
          videoId="hJ7Rg1821Q0"
          onChangeState={onStateChange}
        />
        <Text style={{fontSize: 16, fontWeight: '500', color: '#b600ff'}}>
          {video.title}
        </Text>
      </View>
    </View>
  );
};

export default Yvideo;
