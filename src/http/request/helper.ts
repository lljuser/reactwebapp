import axios, { AxiosError, AxiosResponse } from 'axios';

// 超时
function timeout(requestTimeout: number): Promise<any> {
    requestTimeout = requestTimeout;
    return new Promise((resolve, reject) => {
        setTimeout(() => reject(new Error('网络请求超时')), requestTimeout);
    });
}

// 错误处理(需手动catch)
function handleError(error: AxiosError): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
        // handle canceled request error
        if (axios.isCancel(error)) {
            console.log('Request canceled: ', error.message);
            return;
        }

        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
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

// 处理响应数据
function parseResponse(response: AxiosResponse<any>): Promise<any> {
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
  
export { timeout, handleError, parseResponse };