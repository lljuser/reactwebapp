import Request from './request';

async function Post(url: string, data: any, successCallback?: (data: any) => void, errorCallback?: (error: string) => void) {
  const defaultConfig = {
    url: url,
    method: 'POST',
    data: data
  };

  await Request(defaultConfig, successCallback, errorCallback);
}

export default Post;