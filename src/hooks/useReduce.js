import { useState } from 'react';

const useReduce = (reducer, initValue)=>{
	const [state, setState] = useState(initValue);

	const dispatch = (action)=>{
		const newState = reducer(state, action);
		setState(newState);
	}
	return [state, dispatch];
}

export {useReduce};