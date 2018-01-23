import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ListView } from 'antd-mobile';
import Request from '../components/http/request';

interface Parameter {
  dataSource: any;   
  refreshing: boolean; 
  isLoading: boolean;
  height: number;
  useBodyScroll: boolean;
  hasMore: boolean;
}
  
function MyBody(props: any) {
  return (
    <div >
      <div className={'appH5_body'}>
          <div className={'appH5_panel'}>
          <table id={'productTableId'} className={'appH5_table'}>
          <thead>
            <tr>
              <th>��Ʒ����</th>
              <th className={'text-right'}>�ܶ�(��)</th>
              <th className={'text-right'}>��Ʒ����</th>
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

const data = [
  {
    TotalOffering: '1',
    DealName: '��������',
    DealType: '����',
  },
  {
    TotalOffering: '2',
    DealName: '��������',
    DealType: '����',
  },
  {
    TotalOffering: '3',
    DealName: '��������',
    DealType: '����',
  },
];

const NUM_ROWS = 15;
let pageIndex = 0;
var rData: string[];
var lv: ListView|null;

function genData(pIndex: number = 0) {
  const dataArr: string[] = [];
  for (let i = 0; i < NUM_ROWS; i++) {
    dataArr.push(`row - ${(pIndex * NUM_ROWS) + i}`);
  }
  return dataArr;
}

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
    };
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

    var url = 'http://10.1.1.35/modeal/getdeallist';
    url = url + '/' + 0 + '/' + 0 + '/' + 0;
    url = url + '/' + pageIndex + '/' + 1 * NUM_ROWS + '/' + NUM_ROWS;

    // tslint:disable-next-line:no-shadowed-variable
    Request.post(url, {}, (data) => {
      console.log(data);
    });

    setTimeout(() => {
      rData = genData();
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(genData()),
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
      rData = genData();
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(rData),
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
      rData = [...rData, ...genData(++pageIndex)];
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(rData),
        isLoading: false,
      });
    },         1000);
  }

  render() {
   
    let index = data.length - 1;
    const row = (rowData, sectionID, rowID) => {
      if (index < 0) {
        index = data.length - 1;
      }
      const obj = data[index--];
      console.log(rowID);
      return (
        <tr key={rowID} className={rowID} >
          <td className={'text-left'}>
            <div className={'td_elips1'}> {obj.DealName}</div>
          </td>
          <td className={'text-right appH5_color_red'} style={{ fontSize: '17px'}}>{obj.TotalOffering}</td>
          <td style={{color: 'white'}} className={'text-right td_elips2'}><div style={{width: '100%', float: 'right'}}><div>{obj.DealType}</div></div></td>
        </tr >
      );
    };
    return (
      <ListView
          key={this.state.useBodyScroll ? '0' : '1'}
          ref={el => lv = el}
          dataSource={this.state.dataSource}
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
