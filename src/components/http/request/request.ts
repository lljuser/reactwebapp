import axios, { AxiosRequestConfig } from 'axios';
import { timeout, handleError, parseResponse } from './helper';
import { AbortBus } from './abort';

// 默认请求超时时间
const defaultTimeout = 10 * 1000;

async function Request(config: AxiosRequestConfig, successCallback?: (data: any) => void, errorCallback?: (error: string) => void) {
  const defaultConfig = Object.assign({
    timeout: defaultTimeout,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    cancelToken: AbortBus.cancelToken
  }, config) as AxiosRequestConfig;

  Promise.race([timeout(defaultConfig.timeout || 0), axios.request(defaultConfig) as Promise<any>])
    .then(response => parseResponse(response))
    .then(jsonData => successCallback ? successCallback(jsonData) : undefined)
    .catch(error => handleError(error))
    .catch(e => {
      errorCallback ? errorCallback(e.message) : alert(e.message);
    });
}

export default Request;