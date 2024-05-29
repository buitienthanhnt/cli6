import {addCommentServer} from '@queries/comments';
import {useCallback, useEffect, useState} from 'react';
import {useQuery, useInfiniteQuery, useMutation} from 'react-query';
import firebaseType from '@constants/firebaseType';
import database, {FirebaseDatabaseTypes} from '@react-native-firebase/database';
import {useSelector} from 'react-redux';
import {getPapersByWriter} from '@queries/writer';
import homeInfo from '@queries/info';
import Config from '@config/Config';
import useDispatchState from '@hooks/redux/useDispatchState';
import {Alert} from 'react-native';
import {getDetail, getList} from '@queries/paper';
import rApi from '@netWork/rApi';
import {showMessage, hideMessage} from 'react-native-flash-message';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/FontAwesome';

const useComments = (paperId: number, parentId: number, page: any) => {
  const {useFirebase} = useSelector((state: any) => state.defRe);
  const [value, setValue] = useState([]);

  const {mutate, isLoading} = useMutation({
    mutationFn: addCommentServer,
    mutationKey: ['addComment', paperId],
    onSuccess: () => {
      showMessage({
        message: 'added the comment for detail!',
        type: 'info',
        color: 'green',
        style: {zIndex: 999},
        //icon: props => (<Icon name='check-circle' size={28} color='#07ff00'/>)
      });
    },
    onError: () => {
      showMessage({
        message: 'error message',
        type: 'warning',
      });
    },
  });

  const addComment = useCallback(
    (paperId: number, params: any) => {
      if (useFirebase) {
        let ref = database().ref(firebaseType.realTime.addComments).push();
        ref.set({paper_id: paperId, ...params});
      } else {
        mutate({
          paperId: paperId,
          params: params,
        });
      }
    },
    [useFirebase, mutate],
  );

  const commentServer = useCallback(async () => {
    // @ts-ignore
    const {data} = await rApi.callRequest({
      method: 'GET',
      url: Config.api_request.getPaperComments + paperId,
      params: {
        p: page,
        parentId: parentId,
      },
    }); //getComments(paperId, parentId, page || 0);
    setValue(data || []);
  }, [paperId, parentId, page, setValue]);

  useEffect(() => {
    if (useFirebase) {
      const onValueChange = database()
        .ref(firebaseType.realTime.commentPaper + '/' + paperId)
        .on('value', snapshot => {
          if (snapshot.numChildren()) {
            let _data: any = [];
            snapshot.forEach((item: FirebaseDatabaseTypes.DataSnapshot) => {
              _data = item.val();
              return undefined;
            });
            setValue(_data);
          }
        });
      return () =>
        database()
          .ref(firebaseType.realTime.commentPaper + '/' + paperId)
          .off('value', onValueChange);
    } else {
      commentServer();
    }
  }, [setValue, paperId, useFirebase, commentServer]);

  return {
    data: value,
    addComment,
    isLoading: isLoading,
  };
};

const usePaperByWriter = (writerId: number) => {
  const response = useQuery({
    queryKey: ['getPapersByWriter', writerId],
    queryFn: () => getPapersByWriter(writerId),
    retry: false,
  });
  return response;
};

const useHomeInfo = () => {
  const [data, setData] = useState(null);
  // @ts-ignore
  const {useFirebase} = useSelector(state => state.defRe);
  const {actionReducer, updateState} = useDispatchState();

  const response = useQuery({
    queryKey: ['useHomeInfo'],
    queryFn: homeInfo,
    retry: 2,
    onError: () => {
      Alert.alert('server not active!, use data from firebase');
      updateState(actionReducer.useFirebase, true);
    },
  });

  useEffect(() => {
    if (useFirebase || Config.useFirebase) {
      const onValueChange = database()
        .ref(firebaseType.realTime.homeInfo)
        .on('value', snapshot => {
          if (snapshot.numChildren()) {
            snapshot.forEach(item => {
              setData(item.val()?.data);
              return undefined;
            });
          }
        });
      return () =>
        database()
          .ref(firebaseType.realTime.homeInfo)
          .off('value', onValueChange);
    }
  }, [useFirebase]);

  return {
    ...response,
    data: useFirebase || Config.useFirebase ? data : response.data,
  };
};

const usePaperDetail = (id: number) => {
  const fn = useQuery({
    queryKey: ['usePaperDetail', id],
    queryFn: () => getDetail(id),
    cacheTime: 1000 * 60 * 15,
  });
  return {...fn};
};

const usePaperList = () => {
  const fn = useInfiniteQuery({
    // @ts-ignore
    queryKey: ['usePaperList'],
    queryFn: ({pageParam = 1}) => getList(pageParam),
    initialPageParam: 1,
    // ...options,
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
      if (lastPage.current_page < lastPage.last_page) {
        return lastPage.current_page + 1;
      }
      // if (lastPage.data.length) {
      //   return lastPage.page + 1;
      //   // return {nextP: lastPage.page + 1}; // giá trị trả về này sẽ được dùng cho param của hàm gọi tiếp theo: queryFn
      // }
      return false;
    },
    getPreviousPageParam: (
      firstPage,
      allPages,
      firstPageParam,
      allPageParams,
    ) => firstPage.current_page,
  });
  return {...fn};
};

export {
  useComments,
  usePaperByWriter,
  useHomeInfo,
  usePaperDetail,
  usePaperList,
};
