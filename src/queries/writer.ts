import Config from '@config/Config';
import axios from 'axios';

const getPapersByWriter: (writerId: number, params?: any) => Promise<any> = (
  writerId,
  params,
) => {
  const url =
    Config.custom_url() +
    Config.api_request.byWriter +
    writerId +
    Config.buy_params(params);
  console.log(url);
  return axios.get(url);
};

export {getPapersByWriter};
