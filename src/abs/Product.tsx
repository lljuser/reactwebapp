import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Link } from 'dva/router';
import { ListView, Picker } from 'antd-mobile';
import '../public/css/theme.css';
import { connect } from 'dva';

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

const PickerChildren = props => (
  <div
    onClick={props.onClick}
  >
    <div style={{width: '30%', float: 'left', fontSize: '20px'}}>{props.extra}</div>
  </div>
);

function MyBody(props: any) {
  return ( 
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
  );
}

const NUM_ROWS = 15;
let lv: ListView|null;

class Product extends React.Component<any, Parameter> {

  CurrentStatusValue: string[] = [];
  DealTypeValue: string[] = [];
  ProductTypeValue: string[] = [];

  constructor(props: any) {
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

  componentWillReceiveProps() {
    console.log('componentWillReceiveProps');
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
    this.props.dispatch({ 
      type: 'product/firstload', 
      rows: this.props.product.rows,
      height: hei
    });

  }

  onRefresh = () => {
    console.log('onRefresh');
    this.setState({ refreshing: true, isLoading: true });
    // this.genData(true);
    this.setState({
      refreshing: false 
    });
  }

  onEndReached = (event) => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    // console.log('onEndReached');
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }

    // console.log('reach end', event);
    this.setState({ isLoading: true, info: '正在加载...'});

    // this.genData();

  }

  PickerChange(picker: string, val: string[]) {

    this.props.dispatch({ 
      type: 'product/changePicker', 
      picker: picker , 
      val: val,
      currentStatusValue: this.props.product.currentStatusValue,
      dealTypeValue: this.props.product.dealTypeValue,
      productTypeValue: this.props.product.productTypeValue,
      rows: this.props.product.rows,
    });

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
      <div>
      <div style={{height: '50px', marginTop: '50px'}}>
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
          key={this.props.product.useBodyScroll ? '0' : '1'}
          ref={el => lv = el}
          dataSource={this.props.product.dataSource}
          initialListSize={this.props.product.initialListSize}
          renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
            {this.state.info}
          </div>)}
          renderSectionBodyWrapper={(BodyKey) => <MyBody key={BodyKey}  CurrentStatus={this.props.product.CurrentStatus} CurrentStatusValue={this.props.product.CurrentStatusValue} DealType={this.props.product.DealType} DealTypeValue={this.props.product.DealTypeValue} ProductType={this.props.product.ProductType} ProductTypeValue={this.props.product.ProductTypeValue} />}
          renderRow={row}
          useBodyScroll={this.props.product.useBodyScroll}
          style={this.props.product.useBodyScroll ? {} : {
            height: this.props.product.height,
          }}
          // pullToRefresh={<PullToRefresh 
          //   getScrollContainer={() => lv}
          //   direction={'down'}
          //   refreshing={this.props.product.refreshing}
          //   onRefresh={this.onRefresh}
          //   distanceToRefresh={25}
          //   indicator={{
          //     activate: <div>下拉刷新数据</div>
          //   }}
          // />}
          onEndReached={this.onEndReached}
          pageSize={15}
      />    
      </div >  
    );
  }
}

function mapStateToProps(state: any) {

  return {
    product: state.product,
  };
}

export default connect(mapStateToProps)(Product);
