// https://reactnative.dev/docs/network

import axios from 'axios'; // https://github.com/axios/axios
import {HeaderKey} from '@constants/enum';
import Config from '@config/Config';

// fetch
// nên dùng với get, không nên dùng với POST hay PUT vì:
// dùng các phương thức trên sẽ không vào .catch() cho dù đã throw error trên server.
// cũng gọi như thế nhưng axios thì vẫn vào .catch() bình thường.
// cho nên nếu dùng với POST hay PUT thì nên bắt exception trong data để kiểm tra luôn
const fechData = (uri: string, params = {}, method = 'GET') => {
  console.log(uri, params);
  let data = {};
  if (method == 'GET') {
    data = fetch(uri)
      .then(response => {
        return response.json();
      })
      .then(data => {
        return data;
      })
      .catch(error => {
        console.log('error message ===>: ', error.message);
        return null;
      });
  } else {
    // @ts-ignore
    data = fetch(uri, {
      method: method,
      body: method == 'POST' ? JSON.stringify(params) : [],
      headers:
        method == 'GET'
          ? null
          : {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
    } as unknown as RequestInit)
      .then(response => {
        return response.json();
      })
      .then(data => {
        return data;
      })
      .catch(error => {
        console.log('error message ===>: ', error.message);
        return null;
      });
  }

  return data;
};

// https://github.com/axios/axios
// GET
const getAxios = async (url: string, params = {}) => {
  try {
    const data = await axios.get(url, {
      timeout: 8000, // Set a timeout of 8 seconds
      params: params,
    });
    return data;
  } catch (error) {
    return null;
  }
};

// POST|PUT
const anyAxios = async (
  url = '',
  params = {},
  method = 'POST' || 'PUT' || 'DELETE',
) => {
  console.log('anyAxios: ', method, url);
  let data = axios({
    method: method,
    url: url,
    data: params,
  })
    .then(response => {
      // console.log(response);
      return response.data;
    })
    .catch(error => {
      console.log('error message ===>: ', error.message);
    })
    .finally(() => {});
  return data;
};

const apiWithAuth = (
  url = '',
  // params = {},
  // method = 'POST' || 'PUT' || 'DELETE',
) => {
  const instance = axios.create({
    baseURL: url,
    timeout: 4000,
    headers: {
      'X-Custom-Header': 'foobar',
      [HeaderKey.Authorization]: Config.token,
    },
  });
  return instance;
};
export {fechData, getAxios, anyAxios, apiWithAuth};
