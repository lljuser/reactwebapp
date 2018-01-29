import * as React from 'react';
import Request from '../../common/http/request';
import * as ReactDOM from 'react-dom';
import { Link } from 'dva/router';
import { WingBlank, SegmentedControl, ListView, PullToRefresh, Picker } from 'antd-mobile'; 
import '../components/abs-table/index.less';
import '../components/abs-picker/index.less';
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
  CurrentStatus: PickerItem[][];
  DealType: PickerItem[][];
  ProductType: PickerItem[][];
  isFirstLoad: boolean;
}

interface PickerItem {
  label: string;
  value: string;
 }

// 按钮切换事件
var onFakePickerClick = (e) => {
  alert(`selectedIndex:${e.nativeEvent.selectedSegmentIndex}`);
};

// 虚拟切换按钮组
const PickerFakeChildren = props => (
  <WingBlank size="lg" className="sc-example">
    <SegmentedControl values={['全部状态', '全部产品', '全部市场']} onChange={onFakePickerClick}/>
  </WingBlank>
);

// 真实产品选择piker点
const PickerChildren = props => (
  <div onClick={props.onClick}>
    <div style={{ width: '30%', float: 'left', fontSize: '20px' }}>{props.extra}</div>
  </div>
);

// 列表组件
function MyBody(props: any) {
  return (
      <div className="abs-table abs-table-product">
          <table>
            <thead>
              <tr>
                <th>产品名称</th>
                <th>总额(亿)</th>
                <th>产品分类</th>
              </tr>
            </thead>
            <tbody>
                {props.children}
            </tbody>
          </table>
      </div>
  );
}

const NUM_ROWS = 15;
let pageIndex = 0;
let lv: ListView|null;
let rData: Object[] = [];

export default class Product extends React.Component<{}, Parameter> {

  CurrentStatusValue: string[] = [];
  DealTypeValue: string[] = [];
  ProductTypeValue: string[] = [];

  constructor(props: object) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      dataSource: dataSource,
      CurrentStatus: [],
      DealType: [],
      ProductType: [],
      refreshing: true,
      isLoading: true,
      height: document.documentElement.clientHeight,
      useBodyScroll: false,
      hasMore: true,
      initialListSize: NUM_ROWS,
      info: '',
      isFirstLoad: true
    };
  }

  formatPickerData(data: any) {
    let CurrentStatus: PickerItem[] = [];
    let DealType: PickerItem[] = [];
    let ProductType: PickerItem[] = [];
    data.CurrentStatus.forEach(element => {
      let item = element as any;
      CurrentStatus.push({label: item.Text, value: item.Value });
    });
    data.DealType.forEach(element => {
      let item = element as any;
      DealType.push({label: item.Text, value: item.Value });
    });
    data.ProductType.forEach(element => {
      let item = element as any;
      ProductType.push({label: item.Text, value: item.Value });
    });
    
    this.CurrentStatusValue = [CurrentStatus[0].value];
    this.DealTypeValue = [DealType[0].value];
    this.ProductTypeValue = [ProductType[0].value];

    this.setState({       
      CurrentStatus: [CurrentStatus],
      DealType: [DealType],
      ProductType: [ProductType]
    });
   
  }

  genData(refreshing: boolean= false) {
    if (refreshing) {
      pageIndex = 0;
      rData = [];
    } else {
      pageIndex++;
    }
    
    let CurrentStatusValue = this.CurrentStatusValue[0] === undefined ? 0 : this.CurrentStatusValue[0];
    let DealTypeValue = this.DealTypeValue[0] === undefined ? 0 : this.DealTypeValue[0];
    let ProductTypeValue = this.ProductTypeValue[0] === undefined ? 0 : this.ProductTypeValue[0];

    let url = ProductApi.list;
    url = url + '/' + CurrentStatusValue + '/' + DealTypeValue + '/' + ProductTypeValue;
    url = url + '/' + pageIndex + '/' + (pageIndex + 1) * NUM_ROWS + '/' + NUM_ROWS;

    Request.post(url).then((data) => {
        if ( data.Deal.length === 0 ) {
          this.setState({ info: '已全部加载' , hasMore: false});
        } else {
          rData = [...rData, ...data.Deal];

          if (this.state.isFirstLoad === true) {
            this.formatPickerData(data);
            this.setState({isFirstLoad: false});
          }

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
    const hei = this.state.height - (ReactDOM.findDOMNode(lv as ListView) as any).offsetTop - 50;

    this.genData(true);
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

  PickerChange(picker: string, val: string[]) {
    if (picker === 'CurrentStatusValue') {
      this.CurrentStatusValue = val;
    }
    if (picker === 'DealTypeValue') {
      this.DealTypeValue = val;
    }
    if (picker === 'ProductTypeValue') {
      this.ProductTypeValue = val;
    }
    this.onRefresh();
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
      <div className="abs-picker">
        <PickerFakeChildren/>
        <div style={{height: '30px'}}>
          <Picker  
            title="选择市场" 
            data={this.state.CurrentStatus} 
            cascade={false}
            value={this.CurrentStatusValue}
            onOk={v => this.PickerChange('CurrentStatusValue', v)}
          >
          <PickerChildren>选择市场</PickerChildren>
          </Picker>
          <Picker  
            title="选择产品" 
            data={this.state.DealType} 
            cascade={false}
            value={this.DealTypeValue}
            onOk={v => this.PickerChange('DealTypeValue', v)}
          >
          <PickerChildren>选择产品</PickerChildren>
          </Picker>
          <Picker 
            title="选择状态" 
            data={this.state.ProductType} 
            cascade={false}
            value={this.ProductTypeValue} 
            onOk={v => this.PickerChange('ProductTypeValue', v)}
          >
            <PickerChildren>选择状态</PickerChildren>
          </Picker>
        </div>
        <ListView
            key={this.state.useBodyScroll ? '0' : '1'}
            ref={el => lv = el}
            dataSource={this.state.dataSource}
            initialListSize={this.state.initialListSize}
            renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
              {this.state.info}
            </div>)}
            renderSectionBodyWrapper={(BodyKey) => <MyBody key={BodyKey}  CurrentStatus={this.state.CurrentStatus} CurrentStatusValue={this.CurrentStatusValue} DealType={this.state.DealType} DealTypeValue={this.DealTypeValue} ProductType={this.state.ProductType} ProductTypeValue={this.ProductTypeValue} />}
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
      </div >  
    );
  }
  
}
