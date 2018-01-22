import axios, { AxiosRequestConfig } from 'axios';
import HttpHelpers from './helper';
import AbortBus from './abort';

export default class Request {

  // 默认请求超时时间
  private static defaultTimeout = 10 * 1000;

  /**
   * 发送一个GET异步请求
   * 
   * @param {string} url 请求地址
   * @param {*} params 键值对(url查询参数)
   * @param {(data: any) => void} [successCallback] 成功时的回调
   * @param {(error: string) => void} [errorCallback] 错误时的回调
   * @memberof Request
   */
  static async get(url: string, params: any, successCallback?: (data: any) => void, errorCallback?: (error: string) => void) {
    const defaultConfig = {
      url: url,
      method: 'GET',
      params: params
    };
  
    await Request.request(defaultConfig, successCallback, errorCallback);
  }
  
  /**
   * 发送一个POST异步请求
   * 
   * @param {string} url 请求地址
   * @param {*} data request body的请求数据, 键值对
   * @param {(data: any) => void} [successCallback] 成功时的回调
   * @param {(error: string) => void} [errorCallback] 错误时的回调
   * @memberof Request
   */
  static async post(url: string, data: any, successCallback?: (data: any) => void, errorCallback?: (error: string) => void) {
    const defaultConfig = {
      url: url,
      method: 'POST',
      data: data
    };
  
    await Request.request(defaultConfig, successCallback, errorCallback);
  }

  /**
   * 发送一个异步请求
   * 
   * @param {AxiosRequestConfig} config Axios请求配置
   * @param {(data: any) => void} [successCallback] 成功时的回调
   * @param {(error: string) => void} [errorCallback] 错误时的回调
   */
  private static async request(config: AxiosRequestConfig, successCallback?: (data: any) => void, errorCallback?: (error: string) => void) {
    const defaultConfig = Object.assign({
      timeout: Request.defaultTimeout,
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
      withCredentials: true,
      cancelToken: AbortBus.cancelToken
    }, config) as AxiosRequestConfig;
  
    Promise.race([HttpHelpers.timeout(defaultConfig.timeout || 0), axios.request(defaultConfig) as Promise<any>])
      .then(response => HttpHelpers.parseResponse(response))
      .then(jsonData => successCallback ? successCallback(jsonData) : undefined)
      .catch(error => HttpHelpers.handleError(error))
      .catch(e => {
        errorCallback ? errorCallback(e.message) : alert(e.message);
      });
  }

}