import React, {useCallback, useRef, useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import CategoryTop from './CategoryTop';
import {usePaperList} from '@hooks/usePapers';
import {ProductItem, ProductItemHost} from './element';
import {FlashList} from '@shopify/flash-list';
import {debounce} from 'lodash';

const ScreenHeight = Dimensions.get('screen').height;
const PaperListFunc = props => {
  const {data, isLoading, fetchNextPage, refetch, isFetchingNextPage} =
    usePaperList();

  const [showTopCategory, setShowTopCategory] = useState(true);
  const currentPosition = useRef(0);

  const setCurrentPosition = debounce(val => {
    currentPosition.current = val;
  }, 600);

  const onScroll = useCallback(
    e => {
      const y = e.nativeEvent.contentOffset.y;
      setCurrentPosition(y);
      if (showTopCategory && y - currentPosition.current > ScreenHeight / 3) {
        setShowTopCategory(false);
      }

      if (!showTopCategory && currentPosition.current - y > ScreenHeight / 3) {
        setShowTopCategory(true);
      }
    },
    [setCurrentPosition, showTopCategory],
  );

  const renderItem = useCallback(
    ({item, index}) => {
      if (index % 5 == 0) {
        return (
          <ProductItemHost
            data={item}
            navigation={props.navigation}
            index={index}
          />
        );
      }
      return (
        <ProductItem data={item} navigation={props.navigation} index={index} />
      );
    },
    [props.navigation],
  );

  return (
    <View style={css.container}>
      {showTopCategory && <CategoryTop navigation={props.navigation} />}
      <FlashList // use online api server
        data={data?.pages.flatMap(({data}) => {
          return data;
        })}
        refreshing={isLoading || isFetchingNextPage}
        onRefresh={refetch}
        decelerationRate={'normal'} // speed of scroll page: normal || fast(nên chọn: normal để mượt hơn)
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        onEndReachedThreshold={0.1}
        onEndReached={() => {
          if (!(isLoading || isFetchingNextPage)) {
            fetchNextPage();
          }
        }}
        estimatedItemSize={ScreenHeight / 4}
        onScroll={onScroll}
        scrollEventThrottle={200}
        ItemSeparatorComponent={() => {
          return <View style={{height: 4, backgroundColor: 'white'}} />;
        }}
      />
    </View>
  );
};

const css = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PaperListFunc;
