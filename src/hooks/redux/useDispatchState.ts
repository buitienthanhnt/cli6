import {useDispatch} from 'react-redux';
import actionReducer from '@constants/actionReducer';

const useDispatchState = () => {
  const dispatch = useDispatch();

  const updateState = (action_type: string, data: any) => {
    dispatch({
      type: action_type,
      value: data,
    });
  };

  return {
    actionReducer: actionReducer,
    updateState: updateState,
  };
};

export default useDispatchState;
