import React, {FunctionComponent, useCallback, useEffect} from 'react';
import {
  Dimensions,
  FlatList,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {openDetail} from '@utils/paper';

interface ImageParacelProps {
  listImages: any;
}
const ImageParacel: FunctionComponent<ImageParacelProps> = ({listImages}) => {
  if (!listImages) {
    return null;
  }

  // const [width, setWidth] = useState(null);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    setTimeout(() => {
      // setData({ values: data.values.reverse() });
    }, 3000);
  }, []);

  // You can maybe pass the data as props,
  // and take the prop data from the store.
  // You are right in that onLayout will only be triggered after everything is rendered,
  // but that simply means that you have to pass the props with a null value on the first render.
  // For instance: Hàm onLayout để lấy kisck thước của 1 thẻ mà nó được gán khi thẻ đó được render xong.
  // điều kiện là trong thể đó phải đã có chứa nội dung ban đầu.
  // thường dùng trong trường hợp dùng trong thẻ con cần lấy kích thước thẻ cha.
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const onPageLayout = useCallback((event: any) => {
    const {width, height} = event.nativeEvent.layout;
    // console.log("ON LAYOUT", width, height);
    // setWidth(width)
  }, []);

  return (
    <View style={{flex: 8}} onLayout={onPageLayout}>
      <View
        style={{
          flexDirection: 'row',
          gap: 6,
          alignItems: 'center',
          paddingLeft: 5,
        }}>
        <Text style={{fontSize: 20, color: '#00afef', fontWeight: '600'}}>
          Ấn tượng
        </Text>
        <FontAwesome5Icon name="images" size={16} color="#00afef" />
      </View>
      <FlatList
        data={listImages}
        numColumns={2}
        horizontal={false}
        scrollEnabled={false} // VirtualizedLists should never be nested inside plain ScrollViews
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
          let height = 145;
          if (index === listImages.length - 1 && index % 2 == 0) {
            height = Math.ceil(Dimensions.get('screen').height / 5 + 20);
          }
          return (
            <TouchableOpacity
              style={{flex: 1}}
              onPress={() => {
                openDetail(item);
              }}>
              <View style={{width: '100%', height: height, padding: 1}}>
                <ImageBackground
                  style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    paddingBottom: 4,
                    paddingLeft: 4,
                  }}
                  defaultSource={require('@assets/splash.png')}
                  resizeMode="cover"
                  source={{
                    uri: item.image_path,
                    // priority: FastImage.priority.normal,
                  }}
                  borderRadius={4}>
                  <Text
                    style={{fontSize: 14, color: 'white', fontWeight: '500'}}
                    numberOfLines={2}>
                    {item.title}
                  </Text>
                </ImageBackground>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default ImageParacel;
