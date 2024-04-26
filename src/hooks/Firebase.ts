import {useCallback, useEffect, useState} from 'react';
import database, {FirebaseDatabaseTypes} from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import firebaseType from '@constants/firebaseType';
import DataSnapshot = FirebaseDatabaseTypes.DataSnapshot;

const useCategory = () => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const onValueChange = database()
      .ref(firebaseType.realTime.categoryTree)
      .on('value', snapshot => {
        if (!snapshot.numChildren()) {
          return;
        }
        let _data: any = [];
        snapshot.forEach((item: DataSnapshot) => {
          _data = item.val();
          return true;
        });
        setCategory(_data);
      });

    return () =>
      database()
        .ref(firebaseType.realTime.categoryTree)
        .off('value', onValueChange);
  }, []);
  return category;
};

const usePapersFirebase = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const onData = database()
      .ref(firebaseType.realTime.allPaper)
      .orderByKey()
      .on('value', snapshot => {
        if (snapshot.numChildren()) {
          let _data: any = [];
          snapshot.forEach((item: DataSnapshot) => {
            const data = item.val();
            if (data.id) {
              _data.push(data);
            } else {
              _data.push(data[Object.keys(data)[0]]);
            }
            return true;
          });
          // _data.sort((a,b) => b.id - a.id); // sort by desc
          setData(_data.reverse()); // đảo ngược thứ tự data
          // setData(_data);
        }
      });

    return () =>
      database().ref(firebaseType.realTime.allPaper).off('value', onData);
  }, []);

  return {
    data: data,
  };
};

const usePaperDetailFirebase = (paperId: string) => {
  const [data, setData] = useState<any>([]);

  const loadData = useCallback(async () => {
    try {
      firestore()
        .collection(firebaseType.storeData.paperDetail)
        .doc(paperId.toString())
        .get()
        .then(snapshot => {
          // doc phải là string, nếu là number có thể lỗi
          if (snapshot.exists) {
            setData(snapshot.data());
          }
        });
    } catch (error) {
      console.log(error);
    }
  }, [paperId]);

  useEffect(() => {
    loadData();
    // firestore().collection('detailContent').doc(paperId.toString()).onSnapshot((documentSnapshot)=>{
    // 	console.log('________________', documentSnapshot);
    // 	if (documentSnapshot) {
    // 		setData(documentSnapshot.data());
    // 	}
    // });
  }, [loadData]);

  return {
    detail: data,
  };
};

const useCategoryTop = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const onData = database()
      .ref(firebaseType.realTime.categoryTop)
      .on('value', snapshot => {
        if (snapshot.numChildren()) {
          snapshot.forEach((item: DataSnapshot) => {
            setData(item.val());
            return true;
          });
        }
      });

    return () =>
      database().ref(firebaseType.realTime.categoryTop).off('value', onData);
  }, []);

  return {
    data: data,
  };
};

const usePaperCategory = (categoryId: string) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const onData = database()
      .ref(firebaseType.realTime.paperByCategory + categoryId)
      .on('value', snapshot => {
        if (snapshot.numChildren()) {
          let _data: any = [];
          snapshot.forEach((item: DataSnapshot) => {
            _data.push(item.val());
            return true;
          });
          setData(_data.reverse());
        }
      });

    return () =>
      database()
        .ref(firebaseType.realTime.paperByCategory + categoryId)
        .off('value', onData);
  }, [categoryId]);

  return {
    data: data,
  };
};

const useRelatedPaper = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const onData = database()
      .ref(firebaseType.realTime.relatedPaper)
      .orderByKey()
      .limitToLast(6)
      .on('value', snapshot => {
        if (snapshot.numChildren()) {
          let _data: any = [];
          snapshot.forEach((item: DataSnapshot) => {
            _data.push(item.val());
            return true;
          });
          setData(_data.reverse());
        }
      });
    return () =>
      database()
        .ref(firebaseType.realTime.relatedPaper)
        .orderByKey()
        .limitToLast(6)
        .off('value', onData);
  }, []);
  return {
    data: data,
  };
};

export {
  useCategory,
  usePapersFirebase,
  usePaperDetailFirebase,
  useCategoryTop,
  usePaperCategory,
  useRelatedPaper,
};
