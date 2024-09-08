import React, {FunctionComponent, useCallback, useContext} from 'react';
import {
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import {PaperDetailContext} from '@screens/PaperScreen/PaperContext';
import Icon from 'react-native-vector-icons/FontAwesome';
// @ts-ignore
import {debounce} from 'lodash';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {useAddCart} from '@hooks/cart';

interface Props {}
const Price: FunctionComponent<Props> = () => {
  const {price, qty, setQty} = useContext(PaperDetailContext);
  const {onAddToCart: _onAddCart, isLoading} = useAddCart();

  const onAddQty = debounce(() => {
    // @ts-ignore
    setQty(value => (value as number) + 1);
  }, 300);

  const onMinusQty = debounce(() => {
    if (qty > 1) {
      // @ts-ignore
      setQty(value => (value as number) - 1);
    }
  }, 300);

  const onAddToCart = useCallback(() => {
    _onAddCart();
  }, [_onAddCart]);

  if (!price) {
    return null;
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 4,
        borderRadius: 6,
        marginVertical: 2,
      }}>
      <View>
        <Text style={{fontWeight: '600', fontSize: 16, paddingVertical: 4}}>
          Số tiền:
          <Text style={{color: '#00bfff'}}>
            {' '}
            {qty < 1 ? price : (qty as number) * price} vnđ
          </Text>
        </Text>
        <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
          <Text>Số lượng:{'  '}</Text>
          <Pressable onPress={onMinusQty}>
            <FontAwesome5Icon name="minus" size={20} color="tomato" />
          </Pressable>
          <TextInput
            value={qty.toString()}
            style={{
              width: 'auto',
              color: 'red',
              paddingHorizontal: 2,
              paddingVertical: 0,
              fontSize: 20,
              textAlign: 'center',
            }}
            keyboardType={'numeric'}
            numberOfLines={1}
            onChangeText={value => {
              setQty(value as unknown as number);
            }}
          />
          <Pressable onPress={onAddQty}>
            <Icon name="plus-circle" size={20} color="tomato" />
          </Pressable>
        </View>
      </View>
      <TouchableOpacity
        onPress={onAddToCart}
        disabled={isLoading}
        style={{
          paddingHorizontal: 20,
          paddingVertical: 4,
          backgroundColor: 'rgba(121, 177, 226, 0.5)',
          borderRadius: 6,
          opacity: isLoading ? 0.6 : 1,
        }}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <Icon name="cart-arrow-down" size={28} color="#8400ff" />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Price;
