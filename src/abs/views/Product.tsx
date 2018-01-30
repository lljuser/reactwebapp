import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Link } from 'dva/router';
import { ListView, PullToRefresh, Picker } from 'antd-mobile';  // WingBlank, SegmentedControl, 
import '../components/abs-table/index.less';
import '../components/abs-picker/index.less';
import { connect } from 'dva';

// 真实产品选择piker点
const PickerChildren = props => (
  <div onClick={props.onClick}>
    <div style={{ width: '30%', float: 'left', fontSize: '15px' }}>{props.extra}</div>
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

let lv: ListView|null;

class Product extends React.Component<any, {}> {

  CurrentStatusValue: string[] = [];
  DealTypeValue: string[] = [];
  ProductTypeValue: string[] = [];

  constructor(props: any) {
    super(props);
   
  }

  componentDidUpdate() {
    if (this.props.useBodyScroll) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
  } 
  
  componentDidMount() { 
    if (this.props.rData.length === 0) {
      const hei = document.documentElement.clientHeight - (ReactDOM.findDOMNode(lv as ListView) as any).offsetTop - 50;
      this.props.dispatch({ 
        type: 'product/firstload', 
        rows: this.props.rows,
        height: hei,
      });
    }
  
  }

  onRefresh = () => {
    this.props.dispatch({ 
      type: 'product/RefreshListView', 
      rows: this.props.rows,
      currentStatusValue: this.props.currentStatusValue,
      dealTypeValue: this.props.dealTypeValue,
      productTypeValue: this.props.productTypeValue,

    });
  }

  onEndReached = (event) => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false

    if (this.props.loading && !this.props.hasMore) {
      return;
    }

    this.props.dispatch({ 
      type: 'product/getList', 
      rows: this.props.rows,
      pageIndex: this.props.pageIndex + 1,
      rData: this.props.rData,
      currentStatusValue: this.props.currentStatusValue,
      dealTypeValue: this.props.dealTypeValue,
      productTypeValue: this.props.productTypeValue,
    });
  
  }

  PickerChange(picker: string, val: string[]) {
    this.props.dispatch({ 
      type: 'product/changePicker', 
      picker: picker , 
      val: val,
      currentStatusValue: this.props.currentStatusValue,
      dealTypeValue: this.props.dealTypeValue,
      productTypeValue: this.props.productTypeValue,
      rows: this.props.rows,
    });

  }

  render() {
    const row = (rowData, sectionID, rowID) => {
      return (
        <tr key={rowData.DealId} className={rowData.DealId} >
          <td className={'text-left'}>
            <Link to={`/productdetail/${rowData.DealId}`}><div className={'td_elips1'}>{rowData.DealName}</div></Link>
          </td>
          <td className={'text-right appH5_color_red'} style={{ fontSize: '17px' }}>{rowData.TotalOffering}</td>
          <td style={{ color: 'white' }} className={'text-right td_elips2'}><div style={{ width: '100%', float: 'right' }}><div>{rowData.DealType}</div></div></td>
        </tr >
      );
    };
   
    return (
      <div className="abs-picker">
        <div style={{height: '30px'}}>
          <Picker  
            title="选择状态" 
            data={this.props.currentStatus} 
            cascade={false}
            value={this.props.currentStatusValue}
            onOk={v => this.PickerChange('CurrentStatusValue', v)}
          >
          <PickerChildren>选择状态</PickerChildren>
          </Picker>
          <Picker  
            title="选择产品" 
            data={this.props.dealType} 
            cascade={false}
            value={this.props.dealTypeValue}
            onOk={v => this.PickerChange('DealTypeValue', v)}
          >
          <PickerChildren>选择产品</PickerChildren>
          </Picker>
          <Picker 
            title="选择市场" 
            data={this.props.productType} 
            cascade={false}
            value={this.props.productTypeValue} 
            onOk={v => this.PickerChange('ProductTypeValue', v)}
          >
            <PickerChildren>选择市场</PickerChildren>
          </Picker>
        </div>
        <ListView
            key={this.props.useBodyScroll ? '0' : '1'}
            ref={el => lv = el}
            dataSource={this.props.dataSource}
            initialListSize={this.props.initialListSize}
            renderFooter={() => (<div style={{ textAlign: 'center' }}>
              {this.props.info}
            </div>)}
            renderSectionBodyWrapper={(BodyKey) => <MyBody key={BodyKey}  CurrentStatus={this.props.currentStatus} CurrentStatusValue={this.props.currentStatusValue} DealType={this.props.dealType} DealTypeValue={this.props.dealTypeValue} ProductType={this.props.productType} ProductTypeValue={this.props.productTypeValue} />}
            renderRow={row}
            useBodyScroll={this.props.useBodyScroll}
            style={this.props.useBodyScroll ? { minHeight: '500px' } : {
              height: this.props.height,
            }}
            pullToRefresh={<PullToRefresh 
              getScrollContainer={() => lv}
              direction={'down'}
              refreshing={this.props.refreshing}
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

function mapStateToProps(state: any) {
  return {
    ...state.product,
  };
}
export default connect(mapStateToProps)(Product);
