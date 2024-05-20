import react, {Component, useCallback} from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  LogBox,
  ScrollView,
  RefreshControl,
  Button,
} from 'react-native';
import Config from '@config/Config';
import perf from '@react-native-firebase/perf';
import {ProductItem, ProductItemHost} from './element';
import CategoryTop from './CategoryTop';
import rApi from '@netWork/rApi';

class PaperList extends Component {
  constructor(props) {
    // https://viblo.asia/p/superprops-trong-constructor-cua-react-component-gGJ59eA15X2
    super(props);
    this.state = {
      items: [],
      refreshing: false,
      page: 1,
      end: false,
    };
  }

  componentDidMount() {
    this.getSourceData();
    // tắt cảnh báo màu vàng trên màn hình dùng: LogBox.
    LogBox.ignoreAllLogs(); // cho tất cả các cảnh báo.
    // LogBox.ignoreLogs(["Failed %s type: %s%s, prop, Invalid prop `color` supplied to `Text`", 'The "source" tag is a valid HTML element but is not handled by this library']);
  }

  getSourceData = async function (paper = false, refresh = false) {
    const listTrace = await perf().startTrace('paper_list_trace');
    listTrace.putMetric('hits', 1);
    if (!this.state.refreshing) {
      this.setState({refreshing: true});
      const data = await rApi.callRequest({
        method: 'GET',
        url: Config.api_request.getpapers,
        params: {page: paper !== false ? paper : this.state.page},
      });
      var items = this.state.items;
      if (data.data.length) {
        if (refresh) {
          items = data.data;
        } else {
          items.push(...data.data);
        }
        await this.setState({
          items: items,
          page: refresh ? 2 : (this.state.page += 1),
          refreshing: false,
        });
      } else {
        this.setState({
          refreshing: false,
          end: true,
        });
      }
    }
    await listTrace.stop();
  };

  componentDidUpdate() {
    var items_count = this.state.items.length;
    if (
      !this.state.refreshing &&
      !this.state.end &&
      (items_count * Dimensions.get('screen').height) / 7 <
        Dimensions.get('screen').height
    ) {
      this.getSourceData();
    }
  }

  render() {
    // https://viblo.asia/p/react-native-lifecycle-gAm5yXY8ldb
    return (
      <View style={css.container}>
        <CategoryTop navigation={this.props.navigation} />

        <FlatList // use online api server
          data={this.state?.items}
          refreshing={this.state.refreshing}
          onRefresh={() => {
            this.getSourceData(1, true);
          }}
          decelerationRate={'normal'} // speed of scroll page: normal || fast(nên chọn: normal để mượt hơn)
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            if (index % 5 == 0) {
              return (
                <ProductItemHost
                  data={item}
                  navigation={this.props.navigation}
                />
              );
            }
            return (
              <ProductItem data={item} navigation={this.props.navigation} />
            );
          }}
          onEndReachedThreshold={0.1}
          onEndReached={() => {
            this.getSourceData();
          }}
        />
      </View>
    );
  }
}

const css = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PaperList;
