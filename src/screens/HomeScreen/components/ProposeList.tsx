import {Image, Text, TouchableOpacity, View} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {openDetail} from '@utils/paper';
import PaperInfo from '@screens/PaperScreen/element/PaperInfo';
import React, {FunctionComponent} from 'react';

interface ProposeListProps {
  most: any;
}
const ProposeList: FunctionComponent<ProposeListProps> = ({most}) => {
  if (!most) {
    return null;
  }

  return (
    <View style={{flex: 1, padding: 5, gap: 6}}>
      <View style={{flexDirection: 'row', gap: 6, alignItems: 'center'}}>
        <Text style={{fontSize: 20, color: '#00afef', fontWeight: '600'}}>
          Đề xuất
        </Text>
        <FontAwesome5Icon name="wifi" size={16} color="#00afef" />
      </View>
      {most &&
        most.map((item: any, index: number) => {
          return (
            <TouchableOpacity
              style={{flexDirection: 'row', width: '100%', gap: 6}}
              key={index}
              onPress={() => {
                openDetail(item);
              }}>
              <Image
                width={60}
                height={60}
                style={{borderRadius: 4}}
                source={{uri: item.image_path}}
              />
              <View style={{flex: 1}}>
                <Text style={{fontSize: 14, flex: 1}} numberOfLines={2}>
                  {item.title}
                </Text>
                <PaperInfo
                  info={{
                    like: item?.info?.like,
                    view_count: item?.info?.view_count,
                    comment_count: item?.info?.comment_count,
                  }}
                />
              </View>
            </TouchableOpacity>
          );
        })}
    </View>
  );
};
export default ProposeList;
