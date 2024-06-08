import {Dimensions, Image, Text, TouchableOpacity, View} from 'react-native';
import {Navigate} from '@hooks/Navigate';
import React, {FunctionComponent} from 'react';

interface TopNewProps {
  hit: any;
}

const TopNew: FunctionComponent<TopNewProps> = ({hit}) => {
  if (!hit) {
    return null;
  }

  return (
    <View style={{flex: 1}}>
      <TouchableOpacity
        onPress={() => {
          // openDetail({
          //     initial: false,
          //     params: hit
          // })
          Navigate('PaperDetail', hit);
        }}>
        <Image
          style={{borderRadius: 4, width: '100%'}}
          height={Dimensions.get('screen').height / 5 + 30}
          source={{uri: hit?.image_path}}
        />
        <View // @ts-ignore
          className={'px-2 py-[5px] absolute'}
          style={{
            bottom: 10,
            left: 10,
            borderRadius: 8,
            backgroundColor: 'rgba(136, 188, 255, 0.8)',
          }}>
          <Text // @ts-ignore
            className={'text-base italic font-bold text-[#e900ff]'}>
            newest
          </Text>
        </View>
      </TouchableOpacity>
      <View style={{marginTop: 2, paddingHorizontal: 4}}>
        <Text
          style={{flex: 1, fontSize: 18, fontWeight: '600', color: '#84a9ff'}}
          numberOfLines={2}>
          {hit?.title}
        </Text>
        <Text // @ts-ignore
          className={'text-base font-medium'}
          style={{paddingLeft: 4}}
          numberOfLines={2}>
          {hit.short_conten}
        </Text>
      </View>
    </View>
  );
};
export default TopNew;
