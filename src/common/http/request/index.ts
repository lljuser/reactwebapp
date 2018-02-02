import axios, { AxiosRequestConfig } from 'axios';
import helper from './helper';
import AbortBus from './abort';

export default class Request {

  /**
   * 请求默认超时时间
   */
  private static readonly defaultTimeout = 10 * 1000;

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

    let jsonData = await Request.request(defaultConfig);
    return jsonData;
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
  static async post(url: string, data?: any) {
    const defaultConfig = {
      url: url,
      method: 'POST',
      data: data
    };
  
    let jsonData = await Request.request(defaultConfig);
    return jsonData;
  }

  /**
   * 发送一个异步请求
   * 
   * @param {AxiosRequestConfig} config Axios请求配置
   * @param {(data: any) => void} [successCallback] 成功时的回调
   * @param {(error: string) => void} [errorCallback] 错误时的回调
   */
  private static async request(config: AxiosRequestConfig) {
    const defaultConfig = Object.assign({
      timeout: Request.defaultTimeout,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      cancelToken: AbortBus.cancelToken
    }, config) as AxiosRequestConfig;

    const timeout = defaultConfig.timeout || Request.defaultTimeout;

    let asyncResult = axios.request(defaultConfig)
                          .then(response => helper.parseResponse(response));

    return Promise.race([helper.timeout(timeout), asyncResult]);
  }
}