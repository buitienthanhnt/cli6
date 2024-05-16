import Config from '@config/Config';
import axios from 'axios';
import rApi from '@netWork/rApi';

const getPapersByWriter: (
  writerId: number,
  params?: any,
) => Promise<any> = async (writerId, params) => {
  // const url =
  //   Config.custom_url() +
  //   Config.api_request.byWriter +
  //   writerId +
  //   Config.buy_params(params);
  // console.log(url);
  // return axios.get(url);

  // @ts-ignore
  const value = await rApi.callRequest({
    method: 'GET',
    url: Config.api_request.byWriter + writerId,
  });

  if (value) {
    return value;
  }
};

export {getPapersByWriter};
