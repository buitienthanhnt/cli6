import {useMutation} from 'react-query';
import {removeCartItem} from '@queries/cart';
import useDispatchState from '@hooks/redux/useDispatchState';
import {showMessage, hideMessage} from 'react-native-flash-message';

const useRemoveCartItem = () => {
  const {updateState, actionReducer} = useDispatchState();

  const process = useMutation({
    mutationKey: ['removeItem'],
    mutationFn: removeCartItem,
    onSuccess: (cartData, variables) => {
      console.log('========remove cartItem index========>', variables);
      if (Array.isArray(cartData)) {
        updateState(
          actionReducer.reUpdateCart,
          Array.isArray(cartData) ? cartData : [],
        );
        return;
      }
      showMessage({
        message: 'cart data return is not an array',
        type: 'warning',
        duration: 2000,
      });
    },
    onError: error => {
      console.log(error);
    },
  });

  return {...process};
};

export default useRemoveCartItem;
