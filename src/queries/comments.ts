import AppStore from '@redux/AppStore';
import Config from '@config/Config';
import axios from 'axios';
import database from '@react-native-firebase/database';
import firebaseType from '@constants/firebaseType';
import rApi from '@netWork/rApi';

const getComments = async (
  paperId: number,
  parentId: number,
  page: number = 1,
): Promise<any> => {
  const url =
    Config.custom_url() +
    Config.api_request.getPaperComments +
    paperId +
    '?limit=4' +
    '&p=' +
    page +
    (parentId ? '&parent_id=' + parentId : '');
  // console.log(url);
  const waitData = axios
    .get(url)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(error);
    });
  return waitData;
};

const addCommentServer = async (params: any): Promise<any> => {
   // @ts-ignore
  const {data} = await rApi.callRequest({
    method: "POST",
    url: Config.api_request.paperAddComment + params.paperId,
    params: params.params
  })
  return data;
};

const addLike = (commentId: number, params?: any): Promise<any> | null => {
  const {defRe} = AppStore.getState();

  if (defRe.useFirebase) {
    let ref = database().ref(firebaseType.realTime.addCommentLike).push();
    ref.set({comment_id: commentId, ...params});
    return null;
  } else {
    const url =
      Config.custom_url() + Config.api_request.commentLike + commentId;
    const waitData = axios
      .post(url, params)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.log(error);
      });
    return waitData;
  }
};

export {getComments, addCommentServer, addLike};
