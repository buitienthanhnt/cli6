import react, {useCallback, useEffect, useState, useRef} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  RefreshControl,
  Text,
  View,
  StyleSheet,
  Button,
} from 'react-native';
import Config from '@config/Config';
import IframeRenderer, {iframeModel} from '@native-html/iframe-plugin'; // npm install @native-html/iframe-plugin
import RenderHTML from 'react-native-render-html'; // npm install react-native-render-html
import WebView from 'react-native-webview'; // npm install react-native-webview
import perf from '@react-native-firebase/perf';
import Comments from './element/Comments';
import DetailLike from './element/DetailLike';
import {PaperDetailContext} from './PaperContext';
import CarolParax from '@screens/CodeScreen/components/animated/CarolParax';
import {layoutDimension} from '@styles/css';
import {caroll} from './api/datatest';
import Carolsel from '@screens/AccountScreen/components/Carolsel';
import PaperTag from './element/PaperTag';
import PaperCarousel from './element/PaperCarousel';
import rApi from '@netWork/rApi';

const renderers = {
  iframe: IframeRenderer,
};

const customHTMLElementModels = {
  iframe: iframeModel,
};

const PaperDetail = ({navigation, route}) => {
  // use custom hook
  // gan bien detail banfg gia tri bien data(detail = data)
  // const {isLoading, data: detail, error} = useFect(Config.url + Config.api_request.getPaperDetail + (route.params?.paper_id || route.params.data.id));
  const [detail, setDetail] = useState(null);
  const [showWebview, setShowwebview] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [commentParent, setCommentParent] = useState(null);
  const refRBSheet = useRef();

  const getDetailPaper = useCallback(
    async (id = 0) => {
      const traceInitScreen = await perf().startTrace('detail_trace');
      traceInitScreen.putMetric('hits', 1);
      if (id) {
        try {
          setRefreshing(true);
          const result = await rApi.callRequest({
            method: 'GET',
            url: Config.api_request.getPaperDetail + id
          })
          setRefreshing(false);
          if (result) {
            setDetail(result);
          } else {
            navigation.goBack();
          }
        } catch (error) {
          navigation.goBack();
        }
      }
      await traceInitScreen.stop();
    },
    [navigation],
  );

  useEffect(() => {
    // console.log(route.params.data.id);
    if (route.params.id != undefined) {
      getDetailPaper(route.params.id);
    } else {
      getDetailPaper(route.params.data.id);
    }
  }, [getDetailPaper, route.params]);

  const onRefresh = () => {
    if (route?.params?.data?.id) {
      getDetailPaper(route.params.data.id);
    }
  };

  if (detail) {
    if (showWebview) {
      return <WebView source={{uri: 'www.topsy-fashion.nl'}} />;
    }
    return (
      <PaperDetailContext.Provider
        value={{
          paperId: detail.id,
          url: detail.url,
          title: detail.title,
          refRBSheet,
          commentParent,
          setCommentParent,
        }}>
        <ScrollView
          contentContainerStyle={{paddingBottom: 20}}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={css.container}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '600',
              color: 'green',
              textDecorationLine: 'underline',
            }}>
            {detail.title}
          </Text>
          {/* <RenderHTML contentWidth={Dimensions.get("screen").width} source={{ html }}></RenderHTML> */}
          <PaperCarousel slider_images={detail.slider_images} />
          <RenderHTML
            renderers={renderers}
            WebView={WebView}
            source={{html: detail?.conten || ''}}
            contentWidth={Dimensions.get('screen').width}
            customHTMLElementModels={customHTMLElementModels}
            defaultWebViewProps={
              {
                /* Any prop you want to pass to all WebViews */
              }
            }
            renderersProps={{
              iframe: {
                scalesPageToFit: true,
                webViewProps: {
                  /* Any prop you want to pass to iframe WebViews */
                },
              },
            }}
            onPress={event => {
              return undefined;
            }}
          />
          <DetailLike info={detail.info} />
          <PaperTag tags={detail?.tags} />
          <Comments paperId={detail.id} />
          <View style={{height: 1, backgroundColor: 'black'}} />
          <LastNews
            paper_id={route?.params?.data?.id || 1}
            navigation={navigation}
          />
          <CarolParax data={caroll} />
          {/* <Button title="view in webview" onPress={() => {
                        setShowwebview(true)
                    }}></Button> */}
        </ScrollView>
      </PaperDetailContext.Provider>
    );
  } else {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {/* <ActivityIndicator size="small" color="#0000ff" /> */}
        <Image
          source={require('@assets/Ripple-1s-200px.gif')}
          style={{width: 60, height: 60}}
        />
      </View>
    );
  }
};

const LastNews = props => {
  const {paper_id, navigation} = props;
  const [data, setData] = useState(['1', '2', '3', '4', '5']);

  const getRelatedPaper = async () => {
    try {
      let request_api =
        Config.url + Config.api_request.getRelatedPaper + paper_id;
      const response = await fetch(request_api);
      const _data = await response.json();
      setData(_data?.items);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // console.log(paper_id);
  }, []);

  return <Carolsel navigation={navigation} />;
};

const css = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    paddingBottom: layoutDimension.bottomTabHeight,
    // backgroundColor: "#d6ffc6"
  },
});

export default PaperDetail;
