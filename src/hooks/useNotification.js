import { useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useNotification = ()=>{
	const [count, setCount] = useState(0);

	const messageCount = useCallback(async ()=>{
		const messages = await AsyncStorage.getItem('listNotifi');
		if (messages) {
            setCount(JSON.parse(messages).length);
        }
	}, [setCount]);

	useEffect(()=>{
		messageCount();
		setInterval(()=>{
			messageCount();
		}, 2000*60)
		return ()=>{
			
		}
	}, [])

	return {
		notifi_count: count
	}
}

export default useNotification;