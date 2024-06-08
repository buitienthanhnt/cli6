import {Text, View} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Carousel from '@elements/Carousel';
import {openDetail} from '@utils/paper';
import React, {FunctionComponent} from 'react';

interface ListCarouselProps {
  data: any;
}
const ListCarousel: FunctionComponent<ListCarouselProps> = ({data}) => {
  if (!data) {
    return null;
  }
  return (
    <View style={{flex: 1, padding: 4, paddingBottom: 20}}>
      <View
        style={{
          flexDirection: 'row',
          gap: 6,
          alignItems: 'center',
          marginBottom: 5,
        }}>
        <Text style={{fontSize: 20, color: '#00afef', fontWeight: '600'}}>
          Thể loại
        </Text>
        <FontAwesome5Icon name="compass" size={16} color="#00afef" />
      </View>
      <View>
        <Carousel data={data} onPress={openDetail} itemStyle={{height: 160}} />
      </View>
    </View>
  );
};

export default ListCarousel;
