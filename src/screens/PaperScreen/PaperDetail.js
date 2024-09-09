import React, {useState, useRef, useCallback, useEffect, useMemo} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  RefreshControl,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Button,
  FlatList,
} from 'react-native';
import WebView from 'react-native-webview'; // npm install react-native-webview
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
import {showMessage} from 'react-native-flash-message';
import Price from '@screens/PaperScreen/element/Price';
import Nguon from '@screens/PaperScreen/element/Nguon';
import Title from '@screens/PaperScreen/element/Title';
import Content from '@screens/PaperScreen/element/Content';
import ImageConten from '@screens/PaperScreen/element/ImageConten';

const PaperDetail = ({navigation, route}) => {
  const before = useRef(0);
  const setBe = debounce(val => {
    before.current = val;
  }, 600);

  const [sug, setSug] = useState(false);
  const [showWebview, setShowwebview] = useState(false);
  const [commentParent, setCommentParent] = useState(null);
  const refRBSheet = useRef();

  useEffect(() => {
    before.current = 0;
    setSug(false);
    return () => {
      setSug(false);
    };
  }, [route?.params?.id]);

  const {isLoading, data, refetch} = usePaperDetail(
    route?.params?.id || route?.params?.data?.id,
  );

  const [qty, setQty] = useState(data?.qty || 1);

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

  useEffect(() => {
    return () => {
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          display: 'flex',
        },
      });
    };
  }, [navigation]);

  const renderContents = useCallback(item => {
    switch (item.type) {
      case 'price':
        return <Price />;
      case 'slider_data':
        return <PaperCarousel slider_images={item.value} />;
      case 'image':
        return <ImageConten item={item} />;
      case 'conten':
        return <Content />;
      default:
        return null;
    }
  }, []);

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
          price: data?.contents?.find(i => i.type === 'price')?.value,
          paper: data,
          qty: qty,
          setQty: setQty,
        }}>
        <Suggest show={sug} datas={data?.suggest} />
        <ScrollView
          onScroll={onScroll}
          contentContainerStyle={{paddingBottom: 20}}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={100}
          style={css.container}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={refetch} />
          }>
          <Title />
          {data?.contents?.map(data => {
            return renderContents(data);
          })}
          <DetailLike info={data.info} />
          <Nguon />
          <PaperTag tags={data?.tags} />
          <Comments paperId={data.id} />
          <LastNews
            paper_id={route?.params?.data?.id || 1}
            navigation={navigation}
          />
          <CarolParax data={caroll} />

          <View style={{marginTop: 4}}>
            <Button
              title="view in webview"
              onPress={() => {
                showMessage({
                  message: 'added the comment for detail!',
                  type: 'warning',
                  color: 'green',
                  style: {
                    borderRadius: 8,
                    paddingHorizontal: 5,
                    marginHorizontal: 10,
                    marginTop: 2,
                  },
                });
              }}
            />
          </View>
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
  const flatRef = useRef(null);
  const width = Dimensions.get('screen').width - 8;

  const styleAnimate = useAnimatedStyle(() => {
    return {
      height: withTiming(show ? 92 : 0, {duration: 400}),
      width: width,
      paddingHorizontal: 4,
      gap: 2,
    };
  });

  if (!datas) {
    return null;
  }
  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
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
            <Animated.View style={styleAnimate}>
              {item.length == 2 &&
                item.map((item, key) => {
                  return <SugItem index={key} item={item} show={show} />;
                })}
            </Animated.View>
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
            backgroundColor: 'rgba(0, 135, 0, 0.5)',
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
    paddingHorizontal: 4,
    paddingBottom: layoutDimension.bottomTabHeight,
    // backgroundColor: 'white',
  },
});

export default PaperDetail;
