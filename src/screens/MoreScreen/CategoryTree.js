import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import Config from '@config/Config';
import axios from 'react-native-axios'; // npm i react-native-axios
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'; // https://fontawesome.com/v5/search?q=right&o=r
import Collapsible from 'react-native-collapsible'; // npm install --save react-native-collapsible
import {useCategory} from '@hooks/Firebase';
import rApi from '@netWork/rApi';
import {useSelector} from 'react-redux';
import useClearcart from '@hooks/cart/useClearcart';

const CategoryTree = props => {
  const [category_id, setCategoryId] = useState(0);
  const [tree, setTree] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);
  const categoryTree = useCategory();
  const {cart_data} = useSelector(State => State.defRe);
  const {clearCart, isLoading} = useClearcart();

  const getCategoryTree = useCallback(async () => {
    try {
      const result = await rApi.callRequest({
        method: 'GET',
        url:
          Config.api_request.getCategoryTree +
          Config.buy_params({category_id: category_id}),
      });
      setTree(result);
      setRefresh(false);
    } catch (error) {
      // goi request ban loi khong co mang kha lau
      console.log(error);
      setLoading(false);
    }
  }, [category_id]);

  useEffect(() => {
    getCategoryTree();
  }, [category_id, getCategoryTree]);

  if (!(tree || categoryTree)) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {loading && (
          <Image
            source={require('../../assets/Ripple-1s-200px.gif')}
            style={{width: 60, height: 60}}
          />
        )}
      </View>
    );
  } else {
    return (
      <ImageBackground
        style={css.backGroundView}
        source={require('../../assets/pexels-brakou-abdelghani-1723637.jpg')}>
        <FlatList
          data={(Config.useFirebase ? categoryTree : tree)?.items || []}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return <CategoryItem data={item} navigation={props.navigation} />;
          }}
          refreshing={refresh}
          onRefresh={() => {
            () => {
              setRefresh(true);
              CategoryTree();
            };
          }}
          ListFooterComponent={() => {
            return (
              <View style={{width: '100%', alignItems: 'center', marginTop: 4}}>
                <TouchableOpacity
                  onPress={clearCart}
                  disabled={isLoading}
                  style={{
                    height: 40,
                    backgroundColor: 'rgba(112, 35, 75, 1)',
                    width: Dimensions.get('screen').width / 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 8,
                  }}>
                  {isLoading ? (
                    <ActivityIndicator />
                  ) : (
                    <Text>clear cart {cart_data?.length}</Text>
                  )}
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </ImageBackground>
    );
  }
};

const CategoryItem = props => {
  const [status, setStatus] = useState(true);
  useEffect(() => {}, []);
  return (
    <View style={{paddingLeft: 6, paddingRight: 6}}>
      <View style={css.categoryItem}>
        <TouchableOpacity
          onPress={() => {
            props?.navigation.navigate(
              Config.useFirebase ? 'PaperCategoryFirebase' : 'PaperCategory',
              {category_id: props?.data?.id},
            );
          }}
          style={{width: '70%'}}>
          <Text style={css.categoryItemName}>{props?.data?.name}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props?.data?.items && setStatus(!status);
          }}>
          {props?.data?.items && (
            <FontAwesome5Icon
              name={status ? 'plus' : 'chevron-down'}
              size={18}
              color="#000000"
            />
          )}
        </TouchableOpacity>
      </View>
      {props?.data?.items && (
        <Collapsible collapsed={status}>
          <View style={{paddingLeft: 10, paddingRight: 8}}>
            <FlatList
              data={props?.data?.items}
              renderItem={({item}) => {
                return (
                  <CategoryItem data={item} navigation={props.navigation} />
                );
              }}
            />
          </View>
        </Collapsible>
      )}
    </View>
  );
};

const css = StyleSheet.create({
  container: {
    flex: 1,
  },
  backGroundView: {
    flex: 1,
    paddingTop: 12,
    resizeMode: 'cover',
  },
  categoryItem: {
    padding: 4,
    paddingLeft: 10,
    margin: 2,
    backgroundColor: '#c69eff', //"#dddddd",
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 15,
    borderRadius: 4,
  },
  categoryItemName: {
    fontSize: 18,
    color: '#000000',
  },
});

export {CategoryTree};
