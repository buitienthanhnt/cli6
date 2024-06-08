import React, {FunctionComponent, useCallback} from 'react';
import {
  FlatList,
  Image,
  ListRenderItem,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Navigate} from '@hooks/Navigate';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

interface ListWriterProps {
  writers: any;
}

const ListWriter: FunctionComponent<ListWriterProps> = ({writers}) => {
  if (!writers) {
    return null;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const renderItem: ListRenderItem<any> = useCallback(({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          Navigate('PaperByWriter', item);
        }}>
        <Image
          width={40}
          height={40}
          style={{borderRadius: 40}}
          source={{uri: item.image_path}}
          resizeMode="cover"
        />
      </TouchableOpacity>
    );
  }, []);

  if (!writers) {
    return null;
  }
  return (
    <View style={{width: '100%', padding: 5, alignItems: 'baseline'}}>
      <View style={{flexDirection: 'row', gap: 8}}>
        <Text
          style={{
            fontSize: 20,
            color: '#00afef',
            fontWeight: '600',
            marginBottom: 5,
          }}>
          Tác giả
        </Text>
        <FontAwesome5Icon name="user-edit" size={18} color="#00afef" />
      </View>

      <FlatList
        horizontal={true}
        data={writers}
        renderItem={renderItem}
        ItemSeparatorComponent={() => {
          return <View style={{width: 8}} />;
        }}
        extraData={writers}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default ListWriter;
