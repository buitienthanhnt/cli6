import rApi from '@netWork/rApi';
import Config from '@config/Config';

const loginPost = async (email: string, password: string) => {
  // @ts-ignore
  const response = await rApi.callRequest({
    method: 'POST',
    url: 'api/login',
    data: {
      email: email,
      password: password,
    },
  });
  return response;
};

const logoutPost = async () => {
  // @ts-ignore
  const newData = await rApi.callRequest({
    method: 'GET',
    url: Config.api_request.getToken,
    params: {
      api_key: 'laravel1.com',
    },
  });
  return newData;
};

export {loginPost, logoutPost};
