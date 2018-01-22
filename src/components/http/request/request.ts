import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { AbortBus } from './abort';

// 默认请求超时时间
const defaultTimeout = 10 * 1000;

function timeout(requestTimeout: number|undefined) {
  requestTimeout = requestTimeout || defaultTimeout;
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error('网络请求超时')), requestTimeout);
  });
}

function handleError(error: AxiosError) {
  return new Promise((resolve: any, reject: any) => {
    // handle canceled request error
    if (axios.isCancel(error)) {
      console.log('Request canceled: ', error.message);
      return;
    }

    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      // console.log(error.response.data);
      // console.log(error.response.status);
      // console.log(error.response.headers);
      let errorMessage: string = '抱歉，服务器出错了';
      switch (error.response.status) {
        case 400:
          break;
        case 401:
          errorMessage = '请求授权失败';
          break;
        case 404:
          errorMessage = '你是不是找错地方了';
          break;
        default:
          break;
      }
      reject(new Error(errorMessage));
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      // console.log('Error', error.message);
      reject(error);
    }
  });
}

function parseResponse(response: AxiosResponse<any>) {
  const error = new Error('数据格式错误');
  return new Promise((resolve: any, reject: any): void => {

    if (response && response.status === 200 && response.data) {
      // 记录服务端响应数据
      let serverResponseData;
      if (typeof response.data === 'object' && response.data.hasOwnProperty('data')) {
        serverResponseData = response.data;
      } else if (typeof response.data === 'string') {
        
        try {
          // try parse json
          serverResponseData = JSON.parse(response.data);
        } catch (e) {
          // nothing to do
        }
      }

      // handle data or error
      if (serverResponseData && typeof serverResponseData === 'object') {

        if (serverResponseData.status === 'ok' && serverResponseData.hasOwnProperty('data')) {
          resolve(serverResponseData.data);
          return;
        }

        reject(new Error(serverResponseData.data));
        return;
      }

    }

    reject(error);

  });
}

async function Request(config: AxiosRequestConfig, successCallback?: (data: any) => void, errorCallback?: (error: string) => void) {
  const defaultConfig = Object.assign({
    timeout: defaultTimeout,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    cancelToken: AbortBus.cancelToken
  }, config) as AxiosRequestConfig;

  Promise.race([timeout(config.timeout), axios.request(defaultConfig) as Promise<any>])
    .then(response => parseResponse(response))
    .then(jsonData => successCallback ? successCallback(jsonData) : undefined)
    .catch(error => handleError(error))
    .catch(e => {
      errorCallback ? errorCallback(e.message) : alert(e.message);
    });
}

export default Request;