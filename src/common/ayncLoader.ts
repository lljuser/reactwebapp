import Loadable from 'react-loadable';
import Loading from './../components/loading';

export default function asyncLoader(module: Promise<any>) {
  return Loadable({
    loader: () => module,
    loading: Loading
  });
} 
