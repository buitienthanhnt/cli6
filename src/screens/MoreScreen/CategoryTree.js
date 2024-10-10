import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import Config from '@config/Config';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'; // https://fontawesome.com/v5/search?q=right&o=r
import Collapsible from 'react-native-collapsible'; // npm install --save react-native-collapsible
import {useCategory} from '@hooks/Firebase';
import rApi from '@netWork/rApi';
import {useSelector} from 'react-redux';
import useClearcart from '@hooks/cart/useClearcart';
import {useRemoveCartItem} from '@hooks/cart';
import {isEmpty} from 'lodash';

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

  const listCartItems = useMemo(() => {
    let total = 0;
    if (isEmpty(cart_data) || !Array.isArray(cart_data)) {
      return null;
    }
    const listItem = cart_data.map((item, index) => {
      total += item.price * item.qty;
      return <CartItem item={item} index={index} />;
    });

    return (
      <View style={{gap: 4, width: '100%'}}>
        {listItem}
        <View>
          <Text
            style={{
              width: '100%',
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 8,
              backgroundColor: 'rgba(244, 255, 255, 0.5)',
              color: '#d700ff',
              fontSize: 16,
              fontWeight: '600',
              textAlign: 'right',
            }}>
            Tổng tiền: {total}
          </Text>
        </View>
      </View>
    );
  }, [cart_data]);

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
            setRefresh(true);
            getCategoryTree();
          }}
          ListFooterComponent={() => {
            if (isEmpty(cart_data)) {
              return null;
            }
            return (
              <View style={{marginTop: 4, gap: 4}}>
                {listCartItems}
                <View style={{flexDirection: 'row', gap: 4}}>
                  <TouchableOpacity
                    onPress={clearCart}
                    disabled={isLoading}
                    style={{
                      height: 40,
                      backgroundColor: 'rgba(112, 35, 75, 1)',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 8,
                      flex: 1,
                    }}>
                    {isLoading ? (
                      <ActivityIndicator />
                    ) : (
                      <Text
                        style={{
                          color: 'white',
                          fontWeight: '600',
                          fontSize: 16,
                        }}>
                        clear cart {cart_data?.length}
                      </Text>
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={clearCart}
                    disabled={isLoading}
                    style={{
                      height: 40,
                      backgroundColor: 'green',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 8,
                      flex: 1,
                    }}>
                    {isLoading ? (
                      <ActivityIndicator />
                    ) : (
                      <Text
                        style={{
                          fontSize: 18,
                          color: 'violet',
                          fontWeight: '600',
                        }}>
                        checkout
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      </ImageBackground>
    );
  }
};

const CartItem = ({item, index}) => {
  const {isLoading, mutate} = useRemoveCartItem();
  const onRemoveItem = useCallback(() => {
    mutate(index);
  }, [index, mutate]);
  return (
    <View
      style={{
        width: '100%',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        backgroundColor: 'rgba(244, 255, 255, 0.5)',
      }}>
      <Text style={{color: 'rgba(59, 73, 255, 0.7)'}}>{item.title}</Text>
      <Text style={{fontSize: 16}}>giá: {item.price}</Text>
      <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
        <View style={{flex: 1}}>
          <Text style={{fontSize: 16}}>số lượng: {item.qty}</Text>
          <Text style={{fontSize: 16, color: 'green'}}>
            Số tiền: {item.price * item.qty}
          </Text>
        </View>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <TouchableOpacity onPress={onRemoveItem}>
            <FontAwesome5Icon name="trash-alt" size={24} color="blue" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
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
    paddingHorizontal: 4,
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
