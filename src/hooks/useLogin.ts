import {useMutation} from 'react-query';
import {loginPost} from '@queries/user';

type Params = {
  email: string;
  password: string;
};
const useLogin = (params: Params, onSuccess: () => void) => {
  // const {
  //   data,
  //   error,
  //   isError,
  //   isIdle,
  //   isPaused,
  //   isSuccess,
  //   failureCount,
  //   mutate: onCallApi,
  //   mutateAsync,
  //   reset,
  //   status,
  //   variables,
  // }
  const fn = useMutation({
    mutationFn: () => {
      return loginPost(params.email, params.password);
    },
    mutationKey: ['useLogin', params.email, params.password],
    onSuccess: onSuccess,
  });
  return {...fn};
};
export default useLogin;
