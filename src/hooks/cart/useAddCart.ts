import {useCallback, useContext} from 'react';
import {PaperDetailContext} from '@screens/PaperScreen/PaperContext';
import {useMutation} from 'react-query';
import {addToCart} from '@queries/cart';

const useAddCart = () => {
  const {qty, paperId} = useContext(PaperDetailContext);
  const {mutate, ...query} = useMutation({
    mutationKey: ['addCartPaper'],
    mutationFn: addToCart,
    onSuccess: cartData => {
      console.log('------>', cartData);
    },
  });

  const onAddToCart = useCallback(() => {
    const params = {
      id: paperId,
      qty: qty,
    };
    mutate(params);
  }, [mutate, paperId, qty]);

  return {
    onAddToCart,
    ...query,
  };
};

export default useAddCart;
