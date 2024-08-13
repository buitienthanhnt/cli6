import {Alert, Text, TouchableOpacity, View} from 'react-native';
import {FunctionComponent, useCallback, useContext} from 'react';
import {PaperDetailContext} from '@screens/PaperScreen/PaperContext';
import Icon from 'react-native-vector-icons/FontAwesome';

interface Props {}
const Price: FunctionComponent<Props> = () => {
  const {price} = useContext(PaperDetailContext);
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
      }}>
      <Text style={{fontWeight: '600', fontSize: 16}}>
        prices:
        <Text style={{color: '#00bfff'}}> {price} vnđ</Text>
      </Text>
      <TouchableOpacity
        onPress={onAddToCart}
        style={{
          paddingHorizontal: 15,
          paddingVertical: 4,
          backgroundColor: 'rgba(121, 177, 226, 0.5)',
          borderRadius: 6,
        }}>
        <Icon name="cart-arrow-down" size={28} color="tomato" />
      </TouchableOpacity>
    </View>
  );
};

export default Price;
