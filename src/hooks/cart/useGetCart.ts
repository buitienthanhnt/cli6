import {useQuery} from 'react-query';
import {getCart} from '@queries/cart';

const useGetCart = () => {
  const cartData = useQuery({
    queryKey: ['getCartData'],
    queryFn: getCart,
  });
  return cartData;
};

export default useGetCart;
