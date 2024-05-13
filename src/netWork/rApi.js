import axios from 'axios';
import Config from '@config/Config';

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static
class rApi {
  static instance = null;
  constructor() {
    this.token =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOnsibmFtZSI6ImRlbW8iLCJpZCI6OCwiZW1haWwiOiJkZW1vQGdtYWlsLmNvbSJ9LCJpYXQiOjE3MTU1ODIyMzYsIm5iZiI6MCwiZXhwIjoxNzE1NTgyMjk2fQ.KzrE8mpmbdiaEkKMqgSchlFmf_p01HpOZ_bMhSISMMY';
    this.isTokenExpired = false;
    this.reFreshTokenProcess = null;
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
          return this.callRequest();
        }
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
        refresh_token: 'tha_refresh_token_key',
      },
    });
  }

  async processRequest() {
    console.log('begin processRequest with token', this.token);
    this.cAxios.defaults.headers.Authorization = this.token;
    const data = await this.cAxios.get('/getUserTokenData');
    return data;
  }

  async callRequest() {
    console.log('------> callRequest');
    if (this.isTokenExpired) {
      try {
        console.log('-----> this.reFreshToken: ');
        const reToken = this.reFreshTokenProcess;
        const newData = await reToken;
        console.log('..............', newData.data?.token?.value);
        this.token = newData.data?.token?.value;
        this.isTokenExpired = false;
      } catch (e) {
        console.log('?????????', e);
      }
    }

    const data = await this.processRequest();
    return data;
  }
}

export default rApi.getInstance();
