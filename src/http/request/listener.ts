import createHistory from 'history/createBrowserHistory';
import Abort, { AbortBus } from './abort';

const history = createHistory();

// 监听路由变化，变化时创建新的Cancel token
history.listen((location, action) => {

  if (Abort.AbortRequest && typeof Abort.AbortRequest === 'function') {
    Abort.AbortRequest('route changed');
  }

  AbortBus.CreateToken();
});

export default history;