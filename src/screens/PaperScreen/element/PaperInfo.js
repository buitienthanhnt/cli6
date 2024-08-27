import {Component} from 'react';
import {Text, View} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class PaperInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {info} = this.props;
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          paddingLeft: 8,
          paddingRight: 4,
          backgroundColor: 'white',
          alignSelf: 'flex-end',
          borderRadius: 4,
        }}>
        <View
          style={{
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'baseline',
          }}>
          <Text style={{fontWeight: 'bold'}}>{info?.view_count} </Text>
          <FontAwesome5Icon name="eye" size={12} color="#2ec2ff" />
        </View>

        {!!info?.like && (
          <View
            style={{
              justifyContent: 'center',
              flexDirection: 'row',
              alignItems: 'baseline',
            }}>
            <Text> | </Text>
            <FontAwesome5Icon name="thumbs-up" size={12} color="#ff2290" />
            <Text style={{fontWeight: 'bold'}}> {info?.like}</Text>
          </View>
        )}

        {!!info?.comment_count && (
          <View style={{justifyContent: 'center', flexDirection: 'row'}}>
            <Text style={{fontWeight: 'bold'}}> | {info?.comment_count} </Text>
            <Icon name="comment" size={12} color="tomato" />
          </View>
        )}
      </View>
    );
  }
}
