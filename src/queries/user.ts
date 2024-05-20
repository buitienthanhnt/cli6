import rApi from '@netWork/rApi';

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

export {loginPost};
