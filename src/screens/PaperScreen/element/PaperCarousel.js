import {useCallback, useRef} from 'react';

import {
  View,
  Text,
  Dimensions,
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

const PaperCarousel = ({slider_images}) => {
  const height = (Math.floor(Dimensions.get('screen').width) / 4) * 2;
  const active = useRef(0);
  const ref = useRef(FlatList);

  const renderItem = useCallback(
    ({item, index}) => {
      return (
        <ImageBackground
          source={{uri: item.value}}
          imageStyle={{borderRadius: 10, resizeMode: 'cover'}}
          style={{
            width: Dimensions.get('screen').width - 8, // paddding ngoai = 4
            height: height,
            padding: 10,
            justifyContent: 'flex-end',
            borderRadius: 10,
          }}>
          <Text
            style={{
              width: '100%',
              color: 'white',
              fontSize: 16,
              textAlign: 'center',
              fontWeight: 600,
            }}>
            {item.description}
          </Text>
        </ImageBackground>
      );
    },
    [height],
  );
  if (!slider_images || !slider_images?.length) {
    return null;
  }
  return (
    <View>
      <FlatList
        contentContainerStyle={{
          height: height + 10,
          paddingVertical: 5,
          // gap: 5,
        }}
        ref={ref}
        horizontal={true}
        data={slider_images}
        extraData={slider_images}
        keyExtractor={(item, index) => index}
        renderItem={renderItem}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
      />
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: height / 2,
          backgroundColor: 'rgba(55, 123, 247, 0.2)',
          padding: 2,
          borderRadius: 4,
        }}
        onPress={() => {
          if (active.current == 0) {
            return;
          }
          ref.current.scrollToIndex({index: active.current - 1});
          active.current = active.current - 1;
        }}>
        <Text style={{color: 'white', fontSize: 16, fontWeight: 600}}>
          Prev
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: height / 2,
          right: 0,
          backgroundColor: 'rgba(55, 123, 247, 0.2)',
          padding: 2,
          borderRadius: 4,
        }}
        onPress={() => {
          if (active.current >= slider_images.length - 1) {
            return;
          }
          ref.current.scrollToIndex({index: active.current + 1});
          active.current = active.current + 1;
        }}>
        <Text style={{color: 'white', fontSize: 16, fontWeight: 600}}>
          Next
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaperCarousel;
