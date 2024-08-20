import axios from 'axios';
import Config from '@config/Config';
import AppStore from '@redux/AppStore';
import actionReducerType from '@constants/actionReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static

class rApi {
  static instance = null;
  constructor() {
    this.isTokenExpired = false;
    this.reFreshTokenProcess = null;
    this.getTokenProcess = null;
    this.initToken();
    this.cAxios = axios.create({
      baseURL: Config.custom_url(),
      timeout: 8000,
      headers: {
        'X-Custom-Header': 'foobar',
        Authorization: this.token,
      },
    });

    this.cAxios.interceptors.response.use(
      response => {
        return response.data;
      },
      error => {
        if (error.response.status === 401) {
          console.log('401 error please refresh token.', this.isTokenExpired);
          if (!this.isTokenExpired) {
            this.isTokenExpired = true;
            this.reFreshTokenProcess = this.awReFreshToken();
          }
          // return Promise.resolve(error.config);
          console.log('gọi lại fn lỗi token expire -->');
          return this.callRequest(error.config);
        }
        // return Promise.reject(error);
        // return loi cho request
        return Promise.reject(error.response);
      },
    );
  }

  static getInstance() {
    if (!rApi.instance) {
      rApi.instance = new rApi();
    }
    return rApi.instance;
  }

  async awGetToken() {
    console.log('-----> chạy vào get token awGetToken');
    return axios.get(Config.custom_url('getUserToken'), {
      params: {
        api_key: Config.api_key,
      },
    });
  }

  async awReFreshToken() {
    console.log('-----> chạy vào refresh token awReFreshToken');
    return axios.post(Config.custom_url('refreshUserToken'), {
      refresh_token: this.initRefreshToken(),
    });
  }

  async processRequest(config) {
    try {
      // console.log(
      //   'begin processRequest with token:',
      //   this.token,
      //   config?.headers,
      // );
      if (config?.headers && config.headers?.Authorization !== this.token) {
        config.headers.Authorization = this.token;
      }
      return await this.cAxios(config);
    } catch (e) {
      console.log('?__processRequest__?', e);
      // return loi tu interceoptor cho request
      return Promise.reject(e);
      // throw new Error(e);
    }
  }

  async callRequest(config) {
    console.log('------> start callRequest');
    if (this.isTokenExpired) {
      try {
        console.log('-----> await reFreshToken');
        const reToken = this.reFreshTokenProcess;
        const newData = await reToken;
        console.log(',,,,,,,,,,,,,,,', newData.data);
        this.token = newData.data?.token?.value;
        this.dispathToken();
        this.dispathRefreshToken(newData.data?.refresh_token?.value);
        this.isTokenExpired = false;
        this.reFreshTokenProcess = null;
      } catch (error) {
        if (error?.response?.status === 402) {
          console.log('refresh token bị lỗi, gọi getToken mới --->');
          try {
            if (!this.getTokenProcess) {
              const awaitTokenProcess = this.awGetToken();
              this.getTokenProcess = awaitTokenProcess;
            }
            console.log('-----> await getToken');
            const newTokenData = await this.getTokenProcess;
            if (newTokenData.data) {
              this.getTokenProcess = null;
              this.token = newTokenData.data?.token?.value;
              this.dispathToken(newTokenData.data?.token?.value);
              this.dispathRefreshToken(newTokenData.data?.refresh_token?.value);
              this.isTokenExpired = false;
            }
          } catch (e) {
            console.log('?__getToken__?', e, e.response.status);
            throw new Error('getToken error!');
          }
        } else {
          console.log('?__refreshToken__?', error, error.response.status);
          throw new Error('refreshToken error!');
        }
      }
    }
    // return 1 promies.
    return await this.processRequest(config);
  }
  async dispathToken(token) {
    // force set value for reduxState
    const {authenRe} = AppStore.getState();
    if (authenRe.token !== this.token) {
      this.cAxios.defaults.headers.Authorization =
        this.token || this.initToken();
      AppStore.dispatch({
        type: actionReducerType.setToken,
        value: token || this.token,
      });
      await AsyncStorage.setItem('token', token || this.token);
    }
  }

  async dispathRefreshToken(refreshToken) {
    // force set value for reduxState
    const {authenRe} = AppStore.getState();
    if (authenRe.refreshToken !== refreshToken) {
      AppStore.dispatch({
        type: actionReducerType.setRefreshToken,
        value: refreshToken,
      });
      await AsyncStorage.setItem('refresh_token', refreshToken);
    }
  }

  initToken() {
    const {
      authenRe: {token},
    } = AppStore.getState();
    this.token = token;
    return token;
  }

  reSetCaxiosAu(token) {
    this.token = token;
    this.cAxios.defaults.headers.Authorization = token;
  }

  initRefreshToken() {
    const {
      authenRe: {refreshToken},
    } = AppStore.getState();
    return refreshToken;
  }
}

export default rApi.getInstance();
