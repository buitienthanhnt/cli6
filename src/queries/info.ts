import Config from '@config/Config';
import rApi from '@netWork/rApi';

const homeInfo: () => Promise<any> = async () => {
  // @ts-ignore
  const value = await rApi.callRequest({
    method: 'GET',
    url: Config.api_request.getInfo,
  });

  if (value) {
    return value;
  }
};

export default homeInfo;
