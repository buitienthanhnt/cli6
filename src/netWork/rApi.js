import axios from 'axios';
import Config from '@config/Config';

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static
class rApi {
  static instance = null;
  constructor() {
    this.refreshToken = 0;
    this.cAxios = axios.create({
      baseURL: Config.custom_url(),
      timeout: 8000,
      headers: {
        'X-Custom-Header': 'foobar',
        Authorization: Config.token,
      },
    });
  }

  static getInstance() {
    if (!rApi.instance) {
      rApi.instance = new rApi();
    }
    return rApi.instance;
  }

  async callRequest() {
    // console.log(this.cAxios);
    var data = await this.cAxios.get('/getUserToken');
    console.log(data.data);
    return 123;
  }

  setRefreshToken() {
    this.refreshToken = this.refreshToken + 1;
    console.log(this.refreshToken);
  }
}

export default rApi.getInstance();
