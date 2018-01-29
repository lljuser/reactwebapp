import axios, { Canceler, CancelToken } from 'axios';

class Abort {
  
  AbortRequest: Canceler;

  cancelToken: CancelToken;

  CreateToken = () => {
    this.cancelToken = new axios.CancelToken ((canceler: Canceler) => {
      // An executor function receives a cancel function as a parameter
      this.AbortRequest = canceler;
    });
  }
}

const AbortBus = new Abort();

export default AbortBus;