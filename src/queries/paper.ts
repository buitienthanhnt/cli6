import Config from '@config/Config';
import axios from 'axios';
import AppStore from '@redux/AppStore';
import database from '@react-native-firebase/database';
import firebaseType from '@constants/firebaseType';

export const addLike = async (paperId: number, params?: any): Promise<any> => {
  const {defRe} = AppStore.getState();

  if (defRe.useFirebase) {
    let ref = database().ref(firebaseType.realTime.addLike).push();
    ref.set({paper_id: paperId, ...params});
    return;
  } else {
    const url = Config.custom_url() + Config.api_request.paperAddLike + paperId;
    return axios
      .post(url, params)
      .then(response => {
        // console.log(response.data);
        return response.data;
      })
      .catch(error => {
        console.log(error);
      });
  }
};

export const search = async (query: string) => {
  const {defRe} = AppStore.getState();
  if (defRe.useFirebase) {
    return [];
  } else {
    const url = `${
      Config.custom_url() + Config.api_request.search
    }?query=${query}`;
    const response = await axios.get(url);
    return response.data;
  }
};