import axios, { Canceler, CancelToken } from 'axios';

export default class Abort {
  
  static AbortRequest: Canceler;

  cancelToken: CancelToken;

  CreateToken = () => {
    this.cancelToken = new axios.CancelToken ((canceler: Canceler) => {
      // An executor function receives a cancel function as a parameter
      Abort.AbortRequest = canceler;
    });
  }
}

const AbortBus = new Abort();

export { AbortBus };