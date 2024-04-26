import {addCommentServer, getComments} from '@queries/comments';
import {useCallback, useEffect, useState} from 'react';
import {useQuery} from 'react-query';
import firebaseType from '@constants/firebaseType';
import database, {FirebaseDatabaseTypes} from '@react-native-firebase/database';
import {useSelector} from 'react-redux';
import {getPapersByWriter} from '@queries/writer';
import DataSnapshot = FirebaseDatabaseTypes.DataSnapshot;

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
            snapshot.forEach((item: DataSnapshot) => {
              _data = item.val();
              return true;
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
  // const [data, setData] = useState([]);
  // const getData = useCallback(() => {
  //     getPapersByWriter(writerId).then((response) => {
  //         setData(response.data);
  //     })
  // }, []);
  // useEffect(() => {
  //     getData()
  // }, []);
  // return data;

  const response = useQuery({
    queryKey: ['getPapersByWriter', writerId],
    queryFn: () => getPapersByWriter(writerId),
  });
  return response;
};

export {useComments, usePaperByWriter};
