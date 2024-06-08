import {Text, TouchableOpacity, View} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {Navigate} from '@hooks/Navigate';
import React, {FunctionComponent} from 'react';

interface TopSearchProps {
  search: any;
}
const TopSearch: FunctionComponent<TopSearchProps> = ({search}) => {
  if (!search) {
    return null;
  }

  return (
    <View style={{flex: 1, padding: 5}}>
      <View style={{flexDirection: 'row', gap: 8}}>
        <Text
          style={{
            fontSize: 20,
            color: '#00afef',
            fontWeight: '600',
            marginBottom: 5,
          }}>
          Tìm kiếm
        </Text>
        <FontAwesome5Icon name="chart-line" size={24} color="#00afef" />
      </View>
      <View
        style={{
          gap: 4,
          flexDirection: 'row',
          flexWrap: 'wrap', // để tự động co dãn xuống dòng.
        }}>
        {search &&
          search.map((item: any, index: number) => {
            return (
              <TouchableOpacity
                key={index}
                style={{
                  backgroundColor: '#bababa',
                  alignSelf: 'flex-start',
                  height: 32,
                  borderRadius: 8,
                  paddingHorizontal: 4,
                  justifyContent: 'center',
                  marginHorizontal: 4,
                }}
                onPress={() => {
                  Navigate('Search', {value: item});
                }}>
                <Text style={{fontSize: 16}}>{item}</Text>
              </TouchableOpacity>
            );
          })}
      </View>
    </View>
  );
};
export default TopSearch;
