import {Image, Text, View} from 'react-native';

const ImageConten = ({item}: {item: {value: string; depend_value: string}}) => {
  return (
    <View
      style={{
        marginVertical: 2,
        paddingVertical: 4,
        backgroundColor: 'white',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        source={{uri: item.value}}
        style={{width: '100%', height: 240, borderRadius: 8}}
      />
      <Text style={{marginTop: 2, color: 'green', fontStyle: 'italic'}}>
        {item.depend_value}
      </Text>
    </View>
  );
};

export default ImageConten;
