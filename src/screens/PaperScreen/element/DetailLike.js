import {Component} from 'react';
import {Text, View} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/FontAwesome';
import {debounce} from 'lodash';
import {addLike} from '@queries/paper';
import {PaperDetailContext} from '../PaperContext';
import LoadingBtn from '@elements/LoadingBtn';
import ShareBtn from '@screens/components/ShareBtn';

export default class DetailLike extends Component {
  static contextType = PaperDetailContext;
  constructor(props) {
    super(props);
    this.state = {
      liked: false,
      hearted: false,
      isLoading: false,
    };
  }

  addAction = debounce(async function (type) {
    this.setState({...this.state, isLoading: true});
    if (type === 'like') {
      if (this.state.liked) {
        addLike(this.context.paperId, {type: 'like', action: 'sub'});
      } else {
        addLike(this.context.paperId, {type: 'like', action: 'add'});
      }
      this.setState({...this.state, liked: !this.state.liked});
      return;
    }
    if (type === 'heart') {
      if (this.state.heart) {
        addLike(this.context.paperId, {type: 'heart', action: 'sub'});
      } else {
        addLike(this.context.paperId, {type: 'heart', action: 'add'});
      }
      this.setState({...this.state, hearted: !this.state.hearted});
      return;
    }
  }, 400);

  likeCount = function () {
    const value =
      Number(this.props.info?.like || 0) + (this.state.liked ? 1 : 0);
    return value > 0 ? value : '';
  };

  heartCount = function () {
    const value =
      Number(this.props.info?.heart || 0) + (this.state.hearted ? 1 : 0);
    return value > 0 ? value : '';
  };

  render() {
    const {info} = this.props;
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          backgroundColor: 'white',
          marginTop: 4,
          borderRadius: 4,
          paddingHorizontal: 8,
          paddingVertical: 2,
        }}>
        <LoadingBtn
          loadingSize={16}
          onPress={() => {
            this.addAction('like');
          }}
          style={{
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'baseline',
            padding: 5,
          }}>
          {this.state.liked ? (
            <Icon name="thumbs-up" size={14} color="red" />
          ) : (
            <FontAwesome5Icon name="thumbs-up" size={14} color="red" />
          )}
          <Text> {this.likeCount()}</Text>
        </LoadingBtn>

        <LoadingBtn
          loadingSize={16}
          onPress={() => {
            this.addAction('heart');
          }}
          style={{
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'baseline',
            padding: 5,
          }}>
          <Text> | {this.heartCount()} </Text>
          {this.state.hearted ? (
            <Icon name="heart" size={14} color="red" />
          ) : (
            <FontAwesome5Icon name="heart" size={14} color="red" />
          )}
        </LoadingBtn>
        <ShareBtn
          data={{
            url: this.context.url,
            title: this.context.title,
          }}
        />
      </View>
    );
  }
}
