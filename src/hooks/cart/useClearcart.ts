import {useMutation} from 'react-query';
import {removeCart} from '@queries/cart';
import {useCallback} from 'react';
import useDispatchState from '@hooks/redux/useDispatchState';

const useClearcart = () => {
  const {actionReducer, updateState} = useDispatchState();
  const {mutate, isLoading} = useMutation({
    mutationKey: ['clearCart'],
    mutationFn: removeCart,
    onSuccess: () => {
      updateState(actionReducer.reUpdateCart, null);
    },
  });

  const clearCart = useCallback(() => {
    if (!isLoading) {
      mutate();
    }
  }, [isLoading, mutate]);

  return {
    clearCart,
    isLoading,
  };
};
export default useClearcart;
