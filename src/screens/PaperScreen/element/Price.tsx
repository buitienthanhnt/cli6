import React, {
  FunctionComponent,
  useCallback,
  useContext,
  useState,
} from 'react';
import {
  Alert,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {PaperDetailContext} from '@screens/PaperScreen/PaperContext';
import Icon from 'react-native-vector-icons/FontAwesome';
// @ts-ignore
import {debounce} from 'lodash';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

interface Props {}
const Price: FunctionComponent<Props> = () => {
  const {price} = useContext(PaperDetailContext);
  const [qty, setQty] = useState<number>(1);

  const onAddQty = debounce(() => {
    setQty(value => (value as number) + 1);
  }, 300);

  const onMinusQty = debounce(() => {
    if (qty > 1) {
      setQty(value => (value as number) - 1);
    }
  }, 300);

  const onAddToCart = useCallback(() => {
    Alert.alert('you choose add to cart');
  }, []);

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
        marginTop: 4,
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
        style={{
          paddingHorizontal: 20,
          paddingVertical: 4,
          backgroundColor: 'rgba(121, 177, 226, 0.5)',
          borderRadius: 6,
        }}>
        <Icon name="cart-arrow-down" size={28} color="#8400ff" />
      </TouchableOpacity>
    </View>
  );
};

export default Price;
