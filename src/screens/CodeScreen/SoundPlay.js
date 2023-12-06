import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import dings from '@assets/titanium-170190.mp3';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text } from 'react-native-ui-lib';
import Config from '@config/Config';
var Sound = require('react-native-sound'); // https://blog.logrocket.com/how-to-play-sounds-in-react-native-using-react-native-sound/#adding-sounds-to-your-react-native-app

Sound.setCategory('Playback');
const SoundPlay = () => {
  return (
    <View style={{ flex: 1 }}>
      {/* <PhisicLink></PhisicLink> */}
      <RemoteLink></RemoteLink>
    </View>
  );
};

const PhisicLink = () => {
  const [play, setPlay] = useState(false);
  var ding = new Sound(dings, error => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
    // if loaded successfully
    console.log(
      'duration in seconds: ' +
      ding.getDuration() +
      'number of channels: ' +
      ding.getNumberOfChannels(),
    );
  });

  useEffect(() => {
    ding.setVolume(3);
    return () => {
      ding.release();
    };
  }, []);

  const playPause = () => {
    if (!play) {
      ding.play(success => {
        setPlay(true)
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    } else {
      ding.pause();
      setPlay(false)
    }
  };
  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.playBtn} onPress={() => {
        ding.pause();
      }}>
        <Icon name='minus' size={28} color='white' />
      </TouchableOpacity>

      <Text>
        {ding.getVolume()}
      </Text>

      <TouchableOpacity style={styles.playBtn} onPress={playPause}>
        <Icon name='plus' size={28} color='white' />
      </TouchableOpacity>

    </View>
  );
}

const RemoteLink = () => {
  const [volume, setVolume] = useState(0.5);
  const [time, setTime] = useState(0);
  var audio = new Sound(
    `${Config.public_url()}Hinh_Bong_Que_Nha.mp3`,
    null,
    error => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // if loaded successfully
      console.log(
        'duration in seconds: ' +
        audio.getDuration() +
        'number of channels: ' +
        audio.getNumberOfChannels(),
      );
    },
  );

  const changeVolume = (type = "add") => {
    let volume = audio.getVolume();
    console.log(volume);
    // switch (type) {
    //   case "sub":
    //     volume = volume - 0.1;
    //     audio.setVolume(volume);
    //     break;

    //   default:
    //     volume = volume + 0.1;
    //     audio.setVolume(volume);
    //     break;
    // }
    // setVolume(audio.getVolume());
  }

  useEffect(()=>{
    audio.getCurrentTime((seconds, isPlaying) =>{
      setTime(seconds)
    })
  }, [time])

  useEffect(() => {
    audio.setVolume(volume);
    return () => {
      audio.release();
    }
  }, [volume]);

  const playPause = () => {
    audio.play(success => {
      console.log('successfully playing', success);
    })
  }


  return (
    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: "rgba(0, 0, 236, 0.5)", padding: 10 }}>

      <View style={{backgroundColor: 'rgba(107, 180, 0, 0.6)', borderRadius: 10}}>
        <View style={{ ...styles.container}}>

          <TouchableOpacity style={styles.playBtn} onPress={() => {
            changeVolume("sub")
          }}>
            <Icon name='minus' size={28} color='white' />
          </TouchableOpacity>

          <Text>
            {volume.toFixed(1)}  {'->'} {audio.getVolume()}
          </Text>
          <Text>( {time} )</Text>

          <TouchableOpacity style={styles.playBtn} onPress={() => {
            changeVolume("add")
          }}>
            <Icon name='plus' size={28} color='white' />
          </TouchableOpacity>
        </View>

        <View style={{ ...styles.container}}>

          <TouchableOpacity style={styles.playBtn} onPress={playPause}>
            <Icon name='play' size={28} color='white' />
          </TouchableOpacity>

          <TouchableOpacity style={styles.playBtn} onPress={() => {
            audio.pause();
          }}>
            <Icon name='stop' size={28} color='white' />
          </TouchableOpacity>

          <TouchableOpacity style={styles.playBtn} onPress={playPause}>
            <Icon name='random' size={28} color='white' />
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 154, 191, 0.5)',
    flexDirection: 'row'
  },
  playBtn: {
    padding: 15,
  },
});
export default SoundPlay;
