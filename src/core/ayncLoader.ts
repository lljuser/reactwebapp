import Loadable from 'react-loadable';
import Loading from '../core/loading';

export default function asyncLoader(module: Promise<any>) {
  return Loadable({
    loader: () => module,
    loading: Loading
  });
}
