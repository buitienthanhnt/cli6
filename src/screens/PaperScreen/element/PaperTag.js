import React, {Component, useCallback} from 'react';
import {View, TouchableOpacity, Text, FlatList} from 'react-native';
import {Navigate} from '@hooks/Navigate';

class PaperTag extends Component {
  constructor(props) {
    super(props);
  }

  onPressTag = function (item) {};

  renderItem = function ({item, index}) {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: 'rgba(0, 109, 227, 0.4)',
          padding: 4,
          alignSelf: 'flex-start',
          borderRadius: 4,
          marginRight: 6,
        }}
        onPress={() => {
          Navigate('Search', {value: item.value});
        }}>
        <Text
          style={{
            fontSize: 16,
            color: '#8400ff',
          }}>
          {item.value}
        </Text>
      </TouchableOpacity>
    );
  };

  render() {
    if (!this.props.tags || this.props.tags.length === 0) {
      return null;
    }

    return (
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: 8,
          backgroundColor: 'white',
          marginVertical: 2,
          borderRadius: 5,
        }}>
        <View style={{padding: 4, justifyContent: 'center'}}>
          <Text
            style={{
              fontWeight: '600',
              fontSize: 16,
            }}>
            Tags:{' '}
          </Text>
        </View>
        <FlatList
          data={this.props.tags || []}
          // style={{paddingTop: 10}}
          extraData={this.props.tags}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => item.index}
          renderItem={this.renderItem.bind(this)}
        />
      </View>
    );
  }
}

export default PaperTag;
