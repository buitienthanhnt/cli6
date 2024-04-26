import {useState} from 'react';

const useReduce = (reducer: any, initValue: any) => {
  const [state, setState] = useState(initValue);

  const dispatch = (action: any) => {
    const newState = reducer(state, action);
    setState(newState);
  };
  return [state, dispatch];
};

export {useReduce};
