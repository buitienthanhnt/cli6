import React, { useState, useRef, useCallback } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  RefreshControl,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Button,
} from 'react-native';
import IframeRenderer, { iframeModel } from '@native-html/iframe-plugin'; // npm install @native-html/iframe-plugin
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
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import {openDetail} from '@utils/paper';
import {debounce} from 'lodash';
import {showMessage, hideMessage} from 'react-native-flash-message';

const renderers = {
  iframe: IframeRenderer,
};

const customHTMLElementModels = {
  iframe: iframeModel,
  input: defaultHTMLElementModels.input.extend({
    mixedUAStyles: {
      width: 150,
      height: 40,
      backgroundColor: 'yellow',
    },
    contentModel: HTMLContentModel.void, // change this from none to void
  }),
};

const PaperDetail = ({navigation, route}) => {
  const before = useRef(0);
  const setBe = debounce(val => {
    before.current = val;
  }, 600);
  const [sug, setSug] = useState(false);
  const [showWebview, setShowwebview] = useState(false);
  const [commentParent, setCommentParent] = useState(null);
  const refRBSheet = useRef();

  const {isLoading, data, refetch} = usePaperDetail(
    route?.params?.id || route?.params?.data?.id,
  );

  const onScroll = useCallback(
    e => {
      setBe(e.nativeEvent.contentOffset.y);
      if (!sug && e.nativeEvent.contentOffset.y - before.current > 90) {
        setSug(true);
        navigation.getParent()?.setOptions({
          tabBarStyle: {
            display: 'none',
          },
          tabBarVisible: false,
        });
        navigation.setOptions({
          headerShown: false,
        });
      }
      if (sug && before.current - e.nativeEvent.contentOffset.y > 90) {
        setSug(false);
        navigation.getParent()?.setOptions({
          tabBarStyle: {
            display: 'flex',
          },
        });
        navigation.setOptions({
          headerShown: true,
        });
      }
    },
    [navigation, setBe, sug],
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
        <Suggest show={sug} datas={data?.suggest} />
        <ScrollView
          onScroll={onScroll}
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
              console.log('&&&&', before.current);
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

          <Button
            title="view in webview"
            onPress={() => {
              // setShowwebview(true);
              showMessage({
                message: 'added the comment for detail!',
                type: 'info',
                color: 'green',
              });
            }}
          />
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

const Suggest = ({show, datas}) => {
  const index = useRef(0);
  const flatRef = useRef(null);
  const interId = useRef('');

  // useEffect(() => {
  //   if (!show) {
  //     clearInterval(interId.current);
  //   } else {
  //     interId.current = setInterval(function () {
  //       index.current = index.current === 0 ? 1 : 0;
  //       flatRef?.current?.scrollToIndex({
  //         index: index.current,
  //         animated: true,
  //       });
  //     }, 4500);
  //   }
  // }, [show]);

  if (!datas) {
    return null;
  }
  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          height: 92,
          width: '100%',
          paddingHorizontal: 4,
          top: 2,
          left: 0,
          zIndex: 999,
        },
      ]}>
      <FlatList
        ref={flatRef}
        data={datas}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index + '_slug_key'}
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                height: 92,
                width: Dimensions.get('screen').width - 10 - 2,
                paddingHorizontal: 4,
                gap: 2,
                // backgroundColor: `rgba(${randomValue(256)}, ${randomValue(256)}, ${randomValue(256)}, 1)`
              }}>
              {item.length == 2 &&
                item.map((item, key) => {
                  return <SugItem index={key} item={item} show={show} />;
                })}
            </View>
          );
        }}
      />
    </Animated.View>
  );
};

const SugItem = ({item, index, show}) => {
  const aniStyle = useAnimatedStyle(() => {
    return {
      flex: 1,
      opacity: withTiming(show ? 1 : 0, {
        duration: (show ? index + 1 : 1 / (index + 1)) * 1000,
      }),
    };
  });
  return (
    <Animated.View style={[aniStyle]}>
      <TouchableOpacity
        style={{flex: 1, flexDirection: 'row', gap: 2}}
        onPress={() => {
          openDetail(item);
        }}>
        <Image
          source={{uri: item.image_path}}
          style={{
            padding: 4,
            width: 80,
            borderRadius: 5,
          }}
          resizeMode="cover."
        />
        <View
          style={{
            flex: 1,
            borderRadius: 5,
            paddingHorizontal: 5,
            backgroundColor: 'rgba(31, 10, 28, 0.1)',
          }}>
          <Text
            style={{
              fontWeight: '500',
              fontSize: 16,
              color: 'blue',
            }}
            numberOfLines={2}>
            {item.title}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
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
