import {Dimensions, Image, Text, TouchableOpacity, View} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {formatDate} from '@utils/helper';
import {openDetail} from '@utils/paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, {FunctionComponent} from 'react';

interface ForwardProps {
  value: any;
}
const Forward: FunctionComponent<ForwardProps> = ({value}) => {
  if (!value) {
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
          Góc nhìn
        </Text>
        <FontAwesome5Icon name="compass" size={16} color="#00afef" />
      </View>
      <View style={{flexDirection: 'row'}}>
        <View style={{flexDirection: 'row', flex: 1, gap: 10}}>
          <Image
            source={{uri: value?.writer?.image_path}}
            style={{width: 40, height: 40, borderRadius: 20}}
          />
          <View style={{flex: 1}}>
            <Text numberOfLines={1} style={{fontSize: 18, fontWeight: '600'}}>
              {value?.writer?.name}
            </Text>
            {value?.created_at && (
              <Text>{formatDate(value.created_at, 'vi-VN')}</Text>
            )}
          </View>
        </View>
        <TouchableOpacity style={{alignItems: 'center', paddingHorizontal: 5}}>
          <Text style={{fontSize: 24, fontWeight: 'bold'}}>...</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={{marginTop: 10, paddingHorizontal: 10}}
        onPress={() => {
          openDetail(value);
        }}>
        <Text style={{marginBottom: 5}}>{value.title}</Text>
        <Image
          source={{uri: value.image_path}}
          style={{width: 'auto', height: 210, borderRadius: 20}}
        />
        <View
          style={{
            position: 'absolute',
            bottom: -20,
            left: Dimensions.get('screen').width / 2 - 130,
            backgroundColor: 'rgba(181, 151, 246, 0.6)',
            borderRadius: 20,
            padding: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 300,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="thumbs-up" size={15} color={'red'} />
            <Text style={{fontWeight: '600'}}> 123 likes</Text>
          </View>
          <View style={{}}>
            <Text style={{fontWeight: '600'}}>
              123 <Icon name="comment" size={15} color="tomato" />
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Forward;
