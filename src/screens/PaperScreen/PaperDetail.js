import React, {useEffect, useState, useRef} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  RefreshControl,
  Text,
  View,
  StyleSheet,
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
import {usePaperDetail} from '@hooks/usePapers';
import rApi from '@netWork/rApi';

const renderers = {
  iframe: IframeRenderer,
};

const customHTMLElementModels = {
  iframe: iframeModel,
};

const PaperDetail = ({navigation, route}) => {
  // use custom hook
  const [showWebview, setShowwebview] = useState(false);
  const [commentParent, setCommentParent] = useState(null);
  const refRBSheet = useRef();

  const {isLoading, data, refetch} = usePaperDetail(
    route?.params?.id || route?.params?.data?.id,
  );

  if (data) {
    if (showWebview) {
      return <WebView source={{uri: 'www.topsy-fashion.nl'}} />;
    }
    return (
      <PaperDetailContext.Provider
        value={{
          paperId: data.id,
          url: data.url,
          title: data.title,
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
            <RefreshControl refreshing={isLoading} onRefresh={refetch} />
          }>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '600',
              color: 'green',
              textDecorationLine: 'underline',
            }}>
            {data.title}
          </Text>
          {/* <RenderHTML contentWidth={Dimensions.get("screen").width} source={{ html }}></RenderHTML> */}
          <PaperCarousel slider_images={data.slider_images} />
          <RenderHTML
            renderers={renderers}
            WebView={WebView}
            source={{html: data?.conten || ''}}
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
          <DetailLike info={data.info} />
          <PaperTag tags={data?.tags} />
          <Comments paperId={data.id} />
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
  const {navigation} = props;

  return <Carolsel navigation={navigation} />;
};

const css = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    paddingBottom: layoutDimension.bottomTabHeight,
  },
});

export default PaperDetail;
