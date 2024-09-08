import {Image, View} from 'react-native';

const ImageConten = ({item}: {item: {value: string}}) => {
  return (
    <View
      style={{
        marginVertical: 2,
        paddingVertical: 4,
        backgroundColor: 'white',
        borderRadius: 4,
      }}>
      <Image
        source={{uri: item.value}}
        style={{width: '100%', height: 240, borderRadius: 8}}
      />
    </View>
  );
};

export default ImageConten;
