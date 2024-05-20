import {addCommentServer, getComments} from '@queries/comments';
import {useCallback, useEffect, useState} from 'react';
import {useQuery} from 'react-query';
import firebaseType from '@constants/firebaseType';
import database, {FirebaseDatabaseTypes} from '@react-native-firebase/database';
import {useSelector} from 'react-redux';
import {getPapersByWriter} from '@queries/writer';
import homeInfo from '@queries/info';
import Config from '@config/Config';
import useDispatchState from '@hooks/redux/useDispatchState';
import {Alert} from 'react-native';

const useComments = (paperId: number, parentId: number, page: any) => {
  const {useFirebase} = useSelector((state: any) => state.defRe);
  const [value, setValue] = useState([]);

  const commentServer = useCallback(async () => {
    const {data} = await getComments(paperId, parentId, page || 0);
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

  const addComment = useCallback(
    (paperId: number, params: any) => {
      if (useFirebase) {
        let ref = database().ref(firebaseType.realTime.addComments).push();
        ref.set({paper_id: paperId, ...params});
      } else {
        addCommentServer(paperId, params);
      }
    },
    [useFirebase],
  );

  return {
    data: value,
    addComment,
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

export {useComments, usePaperByWriter, useHomeInfo};
