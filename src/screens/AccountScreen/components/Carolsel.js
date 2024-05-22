import react, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import Config from '@config/Config';
import rApi from '@netWork/rApi';

//   npm install --save react-native-snap-carousel ||(type Typescript) npm install --save @types/react-native-snap-carousel
import Carousel from 'react-native-snap-carousel'; // https://www.npmjs.com/package/react-native-snap-carousel#example

class Carolsel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      data: null,
    };
  }

  loadData = async () => {
    const {data} = await rApi.callRequest(Config.api_request.getRelatedPaper);
    this.setState({
      data: data,
    });
  };

  componentDidMount() {
    this.loadData();
  }

  _renderItem({item, index}) {
    return (
      <TouchableOpacity
        style={css.item}
        activeOpacity={1} // không làm mờ khi nhấn vào.
        onPress={() => {
          this.props.navigation.push('PaperDetail', {data: item}); // dùng push để  chuyển hướng trong cùng trang với props thay đổi.
        }}>
        <View style={{paddingLeft: 8}}>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: '#5877f4'}}>
            {item.title}
          </Text>
        </View>
        <Image source={{uri: item.image_path}} style={{flex: 1}} />
      </TouchableOpacity>
    );
  }

  render() {
    return this.state.data ? (
      <SafeAreaView style={css.area}>
        <View style={{marginBottom: 8}}>
          <Text style={{color: '#d31bd6', fontSize: 16, fontWeight: 600}}>
            Tin liên quan:
          </Text>
        </View>
        <View style={css.container1}>
          <Carousel
            layout={'stack'}
            ref={ref => (this.carousel = ref)}
            data={this.state.data}
            sliderWidth={400}
            itemWidth={360}
            renderItem={this._renderItem.bind(this)}
            onSnapToItem={index => this.setState({activeIndex: index})}
          />
        </View>
      </SafeAreaView>
    ) : null;
    // <View style={{flexDirection: 'row', justifyContent: 'center'}}>
    //   <Image
    //     source={require('../../../assets/Ripple-1s-200px.gif')}
    //     style={{width: 60, height: 60}}
    //   />
    // </View>
  }
}

const css = StyleSheet.create({
  area: {
    flex: 1,
    paddingTop: 8,
    borderRadius: 12,
    // paddingBottom: 10,
    // height: 320,
    // paddingLeft: 8,
    // backgroundColor: '#c4f4b0',
  },
  item: {
    borderRadius: 5,
    height: 250,
    backgroundColor: '#ffdc9b',
    // padding: 6,
    // marginRight: 20
    // marginLeft: 20,
  },
  container1: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingRight: 4,
    // backgroundColor: 'red',
  },
});

export default Carolsel;
