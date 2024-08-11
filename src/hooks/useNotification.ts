import {useEffect, useState, useCallback} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMutation} from 'react-query';
import {registerNotification} from '@queries/notification';

const getNotifi = async () => {
  const noti = await AsyncStorage.getItem('listNotifi');
  return noti ? JSON.parse(<string>noti).reverse() : null;
};

const useNotification = () => {
  const [count, setCount] = useState(0);

  const messageCount = useCallback(async () => {
    const messages = await getNotifi();
    if (messages) {
      setCount(JSON.parse(messages).length);
    }
  }, [setCount]);

  useEffect(() => {
    messageCount();
    setInterval(() => {
      messageCount();
    }, 2000 * 60);
    return () => {};
  }, [messageCount]);

  return {
    notifi_count: count,
  };
};

export const useRegisterFcm = () => {
  const fn = useMutation({
    mutationKey: ['useRegisterFcm'],
    mutationFn: registerNotification,
    onError: error => {
      console.log(error);
    },
    onSuccess: result => {
      console.log(result);
    },
    retry: false,
  });
  return {...fn};
};

export const useListNoti = () => {
  const [data, setData] = useState([]);

  const deleteItem = useCallback(
    async (index: number) => {
      const value = [...data];
      value.splice(index, 1);
      await AsyncStorage.setItem('listNotifi', JSON.stringify(value));
      setData(value);
    },
    [data],
  );

  const getNoti = useCallback(async () => {
    const notifi = await getNotifi();
    setData(notifi);
  }, []);

  useEffect(() => {
    getNoti();
  }, [getNoti]);

  return {
    data,
    deleteItem,
  };
};

export default useNotification;
