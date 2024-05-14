import axios from 'axios';
import Config from '@config/Config';
import AppStore from '@redux/AppStore';
import actionReducerType from '@constants/actionReducer';

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static
class rApi {
  static instance = null;
  constructor() {
    this.isTokenExpired = false;
    this.reFreshTokenProcess = null;
    console.log('...... init rApi !!!');
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
          console.log('401 eror please refresh token.', this.isTokenExpired);
          if (!this.isTokenExpired) {
            this.isTokenExpired = true;
            this.reFreshTokenProcess = this.awReFreshToken();
          }
          // return Promise.resolve(error.config);
          console.log('gọi lại fn lỗi token-->');
          return this.callRequest(error.config);
        }
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
      console.log('begin processRequest with token:', this.token);
      this.cAxios.defaults.headers.Authorization =
        this.token || this.initToken();
      if (config?.headers?.Authorization) {
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
        this.token = newData.data?.token?.value;
        console.log('newToken..........:', this.token);
        this.dispathToken();
        this.dispathRefreshToken(newData.data?.refresh_token?.value);
        this.isTokenExpired = false;
      } catch (e) {
        console.log('?????????', e);
        throw new Error('Parameter is not a number!');
        // return await new Promise((resolve, reject) => {
        //   // resolve(e);
        //   reject(e);
        // });
      }
    }
    // const data = await this.processRequest(config);
    // return data;

    // return 1 promies.
    return await this.processRequest(config);
  }
  dispathToken(token) {
    // force set value for reduxState
    AppStore.dispatch({
      type: actionReducerType.setToken,
      value: token || this.token,
    });
  }

  dispathRefreshToken(refreshToken) {
    // force set value for reduxState
    AppStore.dispatch({
      type: actionReducerType.setRefreshToken,
      value: refreshToken,
    });
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
