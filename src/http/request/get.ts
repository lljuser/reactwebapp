import Request from './request';

async function Get(url: string, params: any, successCallback?: (data: any) => void, errorCallback?: (error: string) => void) {
  const defaultConfig = {
    url: url,
    method: 'GET',
    params: params
  };

  await Request(defaultConfig, successCallback, errorCallback);
}

export default Get;