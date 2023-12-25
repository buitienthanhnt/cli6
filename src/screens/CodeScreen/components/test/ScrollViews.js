import React, { useRef, useState, useMemo, useCallback } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  View,
  ImageBackground,
  Animated,
  useWindowDimensions,
  Modal,
  Button,
  TouchableOpacity,
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import Icon from 'react-native-vector-icons/FontAwesome';

const images = new Array(6).fill(
  'https://images.unsplash.com/photo-1556740749-887f6717d7e4',
);

const ScrollViews = () => {
  const scrollX = useRef(new Animated.Value(0)).current;

  const { width: windowWidth } = useWindowDimensions();
  const [modalVisible, setModalVisible] = useState(false);
  const modalImages = [
    {
      url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',

      width: 300,
      // height: number
      // Optional, if you know the image size, you can set the optimization performance

      // You can pass props to <Image />.
      props: {
        // headers: ...
      }
    }, {
      uri: '',
      props: {
        // Or you can set source directory.
        source: require('@assets/6623ThuydienLaiChau1_1.jpg')
      },
    }, {
      props: { source: require('@assets/trail-5yOnGsKUNGw-unsplash.jpg') }
    }
  ]

  const openModal = () => {
    setModalVisible(!modalVisible);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.scrollContainer}>
        <ScrollView
          horizontal={true}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ])}
          scrollEventThrottle={1}>
          {images.map((image, imageIndex) => {
            return (
              <View style={{ width: windowWidth, height: 250 }} key={imageIndex}>
                <ImageBackground source={{ uri: image }} style={styles.card}>
                  <View style={styles.textContainer}>
                    <Text style={styles.infoText}>
                      {'Image - ' + imageIndex}
                    </Text>
                  </View>
                </ImageBackground>
              </View>
            );
          })}
        </ScrollView>
        <View style={styles.indicatorContainer}>
          {images.map((image, imageIndex) => {
            const width = scrollX.interpolate({
              inputRange: [
                windowWidth * (imageIndex - 1),
                windowWidth * imageIndex,
                windowWidth * (imageIndex + 1),
              ],
              outputRange: [8, 16, 8],
              extrapolate: 'clamp',
            });
            return (
              <Animated.View
                key={imageIndex}
                style={[styles.normalDot, { width }]}
              />
            );
          })}
        </View>
      </View>

      <Button title='open modal zoom image' onPress={openModal}></Button>

      <Modal visible={modalVisible} transparent={false}>
        <ImageViewer imageUrls={modalImages} />
        <TouchableOpacity onPress={() => { setModalVisible(false) }} style={{ height: 40, justifyContent: 'flex-end', backgroundColor: 'black', paddingLeft: 20 }}>
          <Icon name='remove' size={28} color='white' />
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    flex: 1,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 5,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    backgroundColor: 'rgba(0,0,0, 0.7)',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 5,
  },
  infoText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  normalDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: 'silver',
    marginHorizontal: 4,
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ScrollViews;