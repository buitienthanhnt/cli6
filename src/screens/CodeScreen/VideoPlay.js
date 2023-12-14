import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import dings from '@assets/titanium-170190.mp3';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text } from 'react-native-ui-lib';
import Config from '@config/Config';
import Video from 'react-native-video'; // https://blog.logrocket.com/adding-videos-react-native-react-native-video/

const VideoPlay = () => {
    return (
        <View style={{flex: 1}}>
            <Video
                source={{ uri: `${Config.public_url()}canh_dong_hoa_cai_vang.mp4` }}                  // the video file
                paused={false}                  // make it start    
                style={styles.backgroundVideo}  // any style you want
                repeat={true}                   // make it a loop
            />
        </View>
    )
}

const styles = StyleSheet.create({
    backgroundVideo: {
        width: '100%', 
        height: '100%',
    }
})

export default VideoPlay;

