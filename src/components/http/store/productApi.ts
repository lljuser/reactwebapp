import Request from '../request';

export default class ProductApi {
  getData(successCallback?: (data: any) => void, errorCallback?: (error: string) => void) {
    Request.post('', {}, successCallback, errorCallback);
  }
}