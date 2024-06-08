import React, {useState} from 'react';
import {Keyboard, TextInput, TouchableOpacity, View} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {openSearch} from '@utils/paper';

const SearchAll = () => {
  const [search, setSearch] = useState('');
  return (
    <View
      style={{
        flex: 1,
        borderColor: 'blue',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
      }}>
      {search.length >= 3 && (
        <TouchableOpacity
          style={{padding: 10}}
          onPress={() => {
            setSearch('');
          }}>
          <FontAwesome5Icon name="trash-alt" size={20} color="#00afef" />
        </TouchableOpacity>
      )}
      <TextInput
        style={{height: 40, fontSize: 18, flex: 1}}
        placeholder="seach in news"
        onChangeText={text => {
          setSearch(text);
        }}
        value={search}
      />

      <TouchableOpacity
        style={{padding: 10}}
        onPress={() => {
          Keyboard.dismiss();
          if (search.length >= 3) {
            openSearch({value: search});
          }
        }}>
        <FontAwesome5Icon name="search" size={24} color="#00afef" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchAll;
