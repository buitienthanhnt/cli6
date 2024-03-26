import { useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery, useMutation } from "react-query";
import { registerNotification } from '@queries/notification';
const useNotification = () => {
	const [count, setCount] = useState(0);

	const messageCount = useCallback(async () => {
		const messages = await AsyncStorage.getItem('listNotifi');
		if (messages) {
			setCount(JSON.parse(messages).length);
		}
	}, [setCount]);

	useEffect(() => {
		messageCount();
		setInterval(() => {
			messageCount();
		}, 2000 * 60)
		return () => {

		}
	}, [])

	return {
		notifi_count: count
	}
}

export const useRegisterFcm = () => {
	const fn = useMutation({
		mutationKey: ['useRegisterFcm'],
		mutationFn: registerNotification,
		onError: (error, variables) => {
			console.log(error);
		},
		onSuccess: (result) => {
			console.log(result);
		},
		retry: false,
	});
	return { ...fn };
}

export default useNotification;