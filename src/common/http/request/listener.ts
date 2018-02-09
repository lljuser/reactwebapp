import createHistory from 'history/createBrowserHistory';
import AbortBus from './abort';

const history = createHistory();

// 监听路由变化，变化时创建新的Cancel token
history.listen((location, action) => {

  if (AbortBus.AbortRequest && typeof AbortBus.AbortRequest === 'function') {
    AbortBus.AbortRequest('route changed');
  }

  AbortBus.CreateToken();
});

export default history;