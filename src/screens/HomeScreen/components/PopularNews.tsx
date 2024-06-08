import {Text, View} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import CarolParax from '@screens/CodeScreen/components/animated/CarolParax';
import React, {FunctionComponent} from 'react';

interface PopularNewsProps {
  data: any;
}

const PopularNews: FunctionComponent<PopularNewsProps> = ({data}) => {
  if (!data) {
    return null;
  }

  return (
    <View style={{paddingTop: 5}}>
      <View
        style={{
          flexDirection: 'row',
          gap: 8,
          paddingHorizontal: 5,
          alignItems: 'baseline',
          paddingBottom: 0,
        }}>
        <Text style={{fontSize: 20, color: '#00afef', fontWeight: '600'}}>
          Phổ biến
        </Text>
        <FontAwesome5Icon name="newspaper" size={20} color="#00afef" />
      </View>
      <CarolParax data={data} hideIndicator={true} autoPlay={false} />
    </View>
  );
};

export default PopularNews;
