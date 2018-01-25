import * as React from 'react';
import Request from '../components/http/request/index';
import * as ReactDOM from 'react-dom';
import { Link } from 'dva/router';
import { ListView, PullToRefresh } from 'antd-mobile';
import '../public/css/theme.css';
import { ProductApi } from '../config/api';

interface Parameter {
  dataSource: any;   
  refreshing: boolean; 
  isLoading: boolean;
  height: number;
  useBodyScroll: boolean;
  hasMore: boolean;
  initialListSize: number;
  info: string;
}
  
function MyBody(props: any) {
  return (
    <div className={props.sectionID}>
      <div className={'appH5_body'}>
          <div className={'appH5_panel'}>
          <table id={'productTableId'} className={'appH5_table'}>
          <thead>
            <tr>
              <th>产品名称</th>
              <th className={'text-right'}>总额(亿)</th>
              <th className={'text-right'}>产品分类</th>
            </tr>
          </thead>
          <tbody>
            {props.children}
            </tbody>
          </table>
          </div>
        </div>
    </div > 
  );
}

const NUM_ROWS = 15;
let pageIndex = 0;
var lv: ListView|null;
var rData: Object[] = [];

export default class Product extends React.Component<{}, Parameter> {

  constructor(props: object) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      dataSource: dataSource,
      refreshing: true,
      isLoading: true,
      height: document.documentElement.clientHeight,
      useBodyScroll: false,
      hasMore: true,
      initialListSize: NUM_ROWS,
      info: '',
    };
  }

  genData(refreshing: boolean= false) {

    if (refreshing) {
      pageIndex = 0;
      rData = [];
    } else {
      pageIndex++;
    }

    var url = ProductApi.list;
    url = url + '/' + 0 + '/' + 0 + '/' + 0;
    url = url + '/' + pageIndex + '/' + (pageIndex + 1) * NUM_ROWS + '/' + NUM_ROWS;
  
    Request.post(url, {}, (data) => {
      
        if ( data.Deal.length === 0 ) {
          this.setState({ info: '已全部加载' , hasMore: false});
        } else {
          rData = [...rData, ...data.Deal];
          console.log(rData);
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(rData),
            isLoading: false,
            info: '加载完成',
          });
        }
       
      });
  }

  componentDidUpdate() {
    if (this.state.useBodyScroll) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }
 
  componentDidMount() {
    console.log('componentDidMount');
    const hei = this.state.height - (ReactDOM.findDOMNode(lv as ListView) as any).offsetTop;

    this.genData();
    this.setState({
        height: hei,
        refreshing: false,
      });
  }

  onRefresh = () => {
    console.log('onRefresh');
    this.setState({ refreshing: true, isLoading: true });
    this.genData(true);
    this.setState({
      refreshing: false 
    });
  }

  onEndReached = (event) => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    console.log('onEndReached');
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }

    console.log('reach end', event);
    this.setState({ isLoading: true, info: '正在加载...'});

    this.genData();

  }

  render() {

    const row = (rowData, sectionID, rowID) => {
      return (
        
        <tr key={rowData.DealId} className={rowData.DealId} >
          <td className={'text-left'}>
          <Link to={`/productdetail/${rowData.DealId}`}><div className={'td_elips1'}>{rowData.DealName}</div></Link>
          </td>
          <td className={'text-right appH5_color_red'} style={{ fontSize: '17px'}}>{rowData.TotalOffering}</td>
          <td style={{color: 'white'}} className={'text-right td_elips2'}><div style={{width: '100%', float: 'right'}}><div>{rowData.DealType}</div></div></td>
        </tr >
      );
    };
    return (
      <ListView
          key={this.state.useBodyScroll ? '0' : '1'}
          ref={el => lv = el}
          dataSource={this.state.dataSource}
          initialListSize={this.state.initialListSize}
          renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
            {this.state.info}
          </div>)}
          renderSectionBodyWrapper={(BodyKey) => <MyBody key={BodyKey}/>}
          renderRow={row}
          useBodyScroll={this.state.useBodyScroll}
          style={this.state.useBodyScroll ? {} : {
            height: this.state.height,
          }}
          pullToRefresh={<PullToRefresh 
            getScrollContainer={() => lv}
            direction={'down'}
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
            distanceToRefresh={25}
            indicator={{
              activate: <div>下拉刷新数据</div>
            }}
          />}
          onEndReached={this.onEndReached}
          pageSize={15}
      />     
    );
  }
} 
