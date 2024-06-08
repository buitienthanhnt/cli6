import React from 'react';
import {useSelector} from 'react-redux';
import {useMutation} from 'react-query';
import {logoutPost} from '@queries/user';
import useDispatchState from '@hooks/redux/useDispatchState';
import rApi from '@netWork/rApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useLogout = () => {
  const {actionReducer, updateState} = useDispatchState();

  const fn = useMutation({
    mutationFn: logoutPost,
    mutationKey: ['useLogout'],
    onError: (e: unknown) => {
      console.log(e);
    },
    onSuccess: (result: any) => {
      console.log('_________', result);
      updateState(actionReducer.setUser, null);
      updateState(actionReducer.setToken, result.token.value);
      updateState(actionReducer.setRefreshToken, result.refresh_token.value);
      // @ts-ignore
      rApi.reSetCaxiosAu(result.token.value);
      AsyncStorage.setItem('token', result.token.value);
      AsyncStorage.setItem('refresh_token', result.refresh_token.value);
    },
  });
  return {...fn};
};

export default useLogout;
