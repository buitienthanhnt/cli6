import {useEffect, useState, useCallback, useRef, useMemo} from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {debounce} from 'lodash';
import {useQuery, useMutation, useInfiniteQuery} from 'react-query';
import rApi from '@netWork/rApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DemoUseCallBack = () => {
  const [val, setVal] = useState([]);
  const [text, setText] = useState('');
  const [userData, setUserData] = useState(null);

  const callApi = useCallback(pageParam => {
    console.log(pageParam, `https://reqres.in/api/users?page=${pageParam}`);
    // Hàm truy vấn có thể là bất kỳ hàm nào trả về một lời hứa .
    // Lời hứa được trả lại sẽ giải quyết được dữ liệu hoặc đưa ra lỗi .
    return fetch(`https://reqres.in/api/users?page=${pageParam}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        return data;
      })
      .catch(e => {
        return Promise.reject(new Error(e));
      });
  }, []);

  const onSuccess = data => {
    console.log('===============onSuccess=====================');
    console.log(data);
  };

  const getUserData = useCallback(async () => {
    const {error, data} = await rApi.callRequest({
      method: 'get',
      url: '/getUserTokenData',
    });
    if (data) {
      return data;
    }
    if (error) {
      throw new Error(error.message);
    }
  }, []);

  // auto query by hook.
  // const {isLoading, error, data, isSuccess} = useQuery({
  //   queryKey: ['getUserTokenData'], // 1 array of key and depend (sẽ tự động gọi lại nếu key hoặc depend thay đổi)
  //   queryFn: getUserData,
  // });

  // query with action
  const {
    data: mData,
    error: mError,
    isError,
    isIdle,
    isPending,
    isPaused,
    isSuccess: misSuccess,
    failureCount,
    failureReason,
    mutate: onCallApi,
    mutateAsync,
    reset,
    status,
    submittedAt,
    variables,
  } = useMutation({
    mutationFn: callApi,
    // gcTime,
    // meta,
    mutationKey: ['actionApi'],
    // networkMode,
    // onError,
    // onMutate,
    // onSettled,
    onSuccess: onSuccess,
    // retry,
    // retryDelay,
    // scope,
    // throwOnError,
  });

  // dùng useCallback sẽ chỉ định nghĩa 1 lần nên trong: useEffect
  // của childrent component sẽ chỉ chạy 1 lần.
  const getData = useCallback(() => {
    console.log('====================================');
    console.log('get Data in DemoUseCallBack');
  }, []);

  // dùng với debound để giảm số sự kiện được lắng nghe.
  // sau 1s mới gọi vào hàm 1 lần.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onChange = useCallback(
    debounce(text => {
      setText(text);
    }, 1000),
    [text],
  );

  const onChangeText = useCallback(
    text => {
      setVal(text);
      onChange(text);
    },
    [onChange],
  );

  // dùng: useInfiniteQuery để query liên tiếp trong list.
  const {
    data: inData,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    // ...result
  } = useInfiniteQuery({
    queryKey: ['useInfiniteQuery16'],
    queryFn: ({pageParam = 1}) => callApi(pageParam),
    initialPageParam: 1,
    // ...options,
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
      // console.log(lastPage.page);
      if (lastPage.data.length) {
        return lastPage.page + 1;
        // return {nextP: lastPage.page + 1}; // giá trị trả về này sẽ được dùng cho param của hàm gọi tiếp theo: queryFn
      }
      return false;
    },
    getPreviousPageParam: (
      firstPage,
      allPages,
      firstPageParam,
      allPageParams,
    ) => firstPage.prevCursor,
  });

  const rData = useMemo(() => {
    return inData?.pages.flatMap(({data}) => {
      return data;
    });
  }, [inData]);

  // console.log('==============mIsSuccess', hasNextPage, inData?.pages.flatMap(({ data }) => {
  //     return data;
  // }));
  // console.log(isPending, misSuccess, inData, data);

  if (isPending) {
    return (
      <View>
        <Text>isLoading...</Text>
      </View>
    );
  }

  // if (isLoading) {
  //   return (
  //     <View>
  //       <Text>calling get token data...</Text>
  //     </View>
  //   );
  // }
  // if (error) {
  //   return (
  //     <View>
  //       <Text style={{color: 'red'}}>error____</Text>
  //     </View>
  //   );
  // }

  return (
    <View>
      <Text>DemoUseCallBack</Text>

      <Childrent getData={getData} />
      <View className={'flex-row items-center'}>
        <TextInput
          style={{
            borderWidth: 1,
            height: 40,
            width: 220,
            marginLeft: 20,
            borderRadius: 5,
            padding: 5,
          }}
          value={val}
          onChangeText={onChangeText}
        />
        <TouchableOpacity
          className={'ml-2'}
          onPress={() => {
            setVal('');
            setText('');
          }}>
          <Text className={'text-lg font-semibold'}>X</Text>
        </TouchableOpacity>
      </View>
      <Text>{text}</Text>
      {rData &&
        rData.map((item, index) => {
          return <Text key={index}>{item.first_name}</Text>;
        })}
      <Button
        title="call api by mutate"
        onPress={() => {
          // passParam and call action.
          // onCallApi({ by: 'desc', p: 23456 })
          if (hasNextPage) {
            fetchNextPage();
          }
        }}
      />

      <Text />
      <Button
        title={'call api test refresh token'}
        onPress={async () => {
          const datas = await rApi.callRequest({
            method: 'get',
            url: '/getUserTokenData',
          });
          datas && setUserData(datas.value.iss);
          console.log('<<<<<<<<<<<<+', datas);
        }}
      />
      <Text />
      <Button
        title={'log token'}
        onPress={async () => {
          const t = await AsyncStorage.getItem('token');
          console.log('token: ', t);
        }}
      />

      <Text />
      <Button
        title={'log refresh token'}
        onPress={async () => {
          // const initRefreshToken = rApi.initRefreshToken();
          const t = await AsyncStorage.getItem('refresh_token');
          console.log('refresh_token: ', t);
        }}
      />

      <Text />
      <Button
        title={'set token'}
        onPress={() => {
          rApi.dispathToken();
        }}
      />

      <Text />
      <Button
        title={'set refresh token'}
        onPress={() => {
          rApi.dispathRefreshToken('ppppppppp');
        }}
      />

      {userData && (
        <View>
          <Text>id: {userData.id}</Text>
          <Text>name: {userData.name}</Text>
          <Text>email: {userData.email}</Text>
        </View>
      )}
    </View>
  );
};

const Childrent = ({getData}) => {
  useEffect(() => {
    console.log('====================================');
    console.log('noi dung chajy trong useeffect Childrent');
  }, [getData]);

  return (
    <View>
      <Text>childrent</Text>
    </View>
  );
};

export default DemoUseCallBack;
