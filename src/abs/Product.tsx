import * as React from 'react';
import Request from '../components/http/request/index';
import * as ReactDOM from 'react-dom';
import { ListView } from 'antd-mobile';

interface Parameter {
  dataSource: any;   
  refreshing: boolean; 
  isLoading: boolean;
  height: number;
  useBodyScroll: boolean;
  hasMore: boolean;
  initialListSize: number;
}
  
function MyBody(props: any) {
  return (
    <div >
      <div className={'appH5_body'}>
          <div className={'appH5_panel'}>
          <table className={'appH5_table'}>
          <thead>
            <tr key={'11111'}>
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
    };
  }

  genData() {

    var url = 'http://10.1.1.35/modeal/getdeallist';
    url = url + '/' + 0 + '/' + 0 + '/' + 0;
    url = url + '/' + pageIndex + '/' + 1 * NUM_ROWS + '/' + NUM_ROWS;
  
      // tslint:disable-next-line:no-shadowed-variable
    Request.post(url, {}, (data) => {
      pageIndex++;
      
      this.setState({dataSource: this.state.dataSource.cloneWithRows(data.Deal)});
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
    const hei = this.state.height - (ReactDOM.findDOMNode(lv as ListView) as any).offsetTop;

    setTimeout(() => {
      this.genData();
      this.setState({
        height: hei,
        refreshing: false,
        isLoading: false,
      });
    },         1500);
  }

    onRefresh = () => {
    
      this.setState({ refreshing: true, isLoading: true });
      // simulate initial Ajax
      setTimeout(() => {
        this.genData();
        this.setState({
          refreshing: false,
          isLoading: false,
        });
      },         600);
    }

  onEndReached = (event) => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }
    console.log('reach end', event);
    this.setState({ isLoading: true });
    setTimeout(() => {
      this.genData();
      this.setState({
        isLoading: false,
      });
    },         1000);
  }

  render() {

    const row = (rowData, sectionID, rowID) => {
      return (
        
        <tr key={rowData.DealId} className={rowData.DealId} >
          <td className={'text-left'}>
            <div className={'td_elips1'}> {rowData.DealName}</div>
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
            {this.state.isLoading ? 'Loading...' : 'Loaded'}
          </div>)}
          renderSectionBodyWrapper={() => <MyBody />}
          renderRow={row}
          useBodyScroll={this.state.useBodyScroll}
          style={this.state.useBodyScroll ? {} : {
            height: this.state.height,
          }}
        
          onEndReached={this.onEndReached}
          pageSize={5}
      />     
    );
  }
} 
