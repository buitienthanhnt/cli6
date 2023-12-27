import { useSelector, useDispatch } from 'react-redux';
import actionReducer from '@utils/reduxActiontype';

const useDispatchState = ()=>{
    const dispatch = useDispatch();

    const updateState = (action_type, data)=>{
        dispatch({
            type: action_type,
            value: data
        })
    };

    return {
        actionReducer: actionReducer,
        updateState: updateState
    }
}

export default useDispatchState;