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
          console.log('gọi lại fn lỗi token-->');
          return this.callRequest(error.config);
        }

        // if (error.response.status === 402) {
        //   console.log(
        //     '402 refreshToken error please get token.',
        //     this.isTokenExpired,
        //   );
        //   if (!this.isTokenExpired) {
        //     this.isTokenExpired = true;
        //     this.reFreshTokenProcess = this.awGetToken();
        //   }
        //   console.log('gọi lại fn lỗi token-->');
        //   return this.callRequest(error.config);
        // }

        return Promise.reject(error);
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
    return axios.get(Config.custom_url('refreshUserToken'), {
      params: {
        refresh_token: this.initRefreshToken(),
      },
    });
  }

  async processRequest(config) {
    try {
      console.log(
        'begin processRequest with token:',
        this.token,
        config?.headers,
      );
      this.cAxios.defaults.headers.Authorization =
        this.token || this.initToken();
      if (config?.headers) {
        config.headers.Authorization = this.token;
      }
      return await this.cAxios(config);
    } catch (e) {
      console.log('?????__??', e);
    }
  }

  async callRequest(config) {
    console.log('------> start callRequest');
    if (this.isTokenExpired) {
      try {
        console.log('-----> await reFreshToken');
        const reToken = this.reFreshTokenProcess;
        const newData = await reToken;
        console.log(',,,,,,,,,,,,,,,', newData);
        this.token = newData.data?.token?.value;
        this.dispathToken();
        this.dispathRefreshToken(newData.data?.refresh_token?.value);
        this.isTokenExpired = false;
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
              this.dispathToken();
              this.dispathRefreshToken(newTokenData.data?.refresh_token?.value);
              this.isTokenExpired = false;
            }
          } catch (e) {
            console.log('?? getToken error', e, e.response.status);
            throw new Error('getToken error!');
          }
        } else {
          console.log('?', error, error.response.status);
          throw new Error('refreshToken error!');
        }
        // return await new Promise((resolve, reject) => {
        //   // resolve(e);
        //   reject(e);
        // });
      }
    }
    // return 1 promies.
    return await this.processRequest(config);
  }
  async dispathToken(token) {
    // force set value for reduxState
    AppStore.dispatch({
      type: actionReducerType.setToken,
      value: token || this.token,
    });
    await AsyncStorage.setItem('token', token || this.token);
  }

  async dispathRefreshToken(refreshToken) {
    // force set value for reduxState
    AppStore.dispatch({
      type: actionReducerType.setRefreshToken,
      value: refreshToken,
    });
    await AsyncStorage.setItem('refresh_token', refreshToken);
  }

  initToken() {
    const {authenRe} = AppStore.getState();
    this.token = authenRe?.token;
    return authenRe.token;
  }

  initRefreshToken() {
    const {authenRe} = AppStore.getState();
    return authenRe.refreshToken;
  }
}

export default rApi.getInstance();
