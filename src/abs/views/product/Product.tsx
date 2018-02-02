import * as React from 'react';
import { Link, withRouter } from 'dva/router';
import { ListView, Picker } from 'antd-mobile';  // WingBlank, SegmentedControl, 
import PullToRefresh from '../../../common/components/rmc-pull-to-refresh';
import '../components/index.less';
import '../components/theme-common.less';
import { connect } from 'dva';
import ABSPanel from '../components/abs-panel';
import RoutePageList from '../../RouterConfig';
import ReactDOM from 'react-dom';
import Spinner from 'react-spinkit';

// 真实产品选择piker点
const PickerChildren = props => (
  <div onClick={props.onClick} className={props.first ? 'picker-trigger first' : 'picker-trigger'}>
    <div className="selector">{props.extra}
      <i className="iconfont">&#xe692;</i>
    </div>
  </div>
);

// 列表组件
function MyBody(props: any) {
  return (
    <div className="abs-table abs-table-product">
      <table>
        <thead>
          <tr>
            <th className="text-left">产品名称</th>
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

let lv: ListView | null;

class Product extends React.Component<any, {}> {

  CurrentStatusValue: string[] = [];
  DealTypeValue: string[] = [];
  ProductTypeValue: string[] = [];

  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    // 阻止其再次请求数据，如果state中已经有数据了
    if (this.props.rData.length === 0) {
      this.props.dispatch({
        type: 'product/firstload',
        rows: this.props.rows,
      });
    }

    // 若有productQuery则触发picker改变
    let { location } = this.props;
    if (location && location.state && location.state.productQuery) {
      const productTypeValue = location.state.productQuery.productTypeValue;
      const dealTypeValue = location.state.productQuery.dealTypeValue;
      this.props.dispatch({
        type: 'product/changePicker',
        picker: 'Multi',
        val: '',
        dealTypeValue: dealTypeValue === undefined ? [0] : dealTypeValue,
        productTypeValue: productTypeValue === undefined ? [0] : productTypeValue,
        rows: this.props.rows,
      });
    } else {
      this.scrollTo(this.props.scrollTop);
    }
  }

  // 若scrollTop为0则滚动条返回顶部
  componentDidUpdate() {
    if (this.props.scrollTop === 0) {
      this.scrollTo(this.props.scrollTop);
    }
  }

  // 刷新数据
  onRefresh = () => {
    this.props.dispatch({
      type: 'product/RefreshListView',
      rows: this.props.rows,
      currentStatusValue: this.props.currentStatusValue,
      dealTypeValue: this.props.dealTypeValue,
      productTypeValue: this.props.productTypeValue,

    });
  }

  // 滚动条滚动至指定距离
  scrollTo(scrollTop: number) {
    (ReactDOM.findDOMNode(lv as ListView)).scrollTo(0, scrollTop);
  }

  onScroll = (e) => {
    // 保存滚动条位置
    this.props.dispatch({
      type: 'product/onScroll',
      scrollTop: (ReactDOM.findDOMNode(lv as ListView)).scrollTop,
      initialListSize: this.props.rData.length
    });
  }

  // 加载更多数据
  onEndReached = (event) => {
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

  // picker改变时获取数据
  PickerChange(picker: string, val: string[]) {
    this.props.dispatch({
      type: 'product/changePicker',
      picker: picker,
      val: val,
      currentStatusValue: this.props.currentStatusValue,
      dealTypeValue: this.props.dealTypeValue,
      productTypeValue: this.props.productTypeValue,
      rows: this.props.rows,
    });
    this.scrollTo(0);
  }

  render() {
    const row = (rowData, sectionID, rowID) => {
      return (
        <tr key={rowData.DealId} className={rowData.DealId} >
          <td className={'text-left'}>
            <Link to={`${RoutePageList.ProductDetailPage}/${rowData.DealId}`}><div className={'td_elips1'}>{rowData.DealName}</div></Link>
          </td>
          <td className={'text-right highLight-red'} style={{ fontSize: '17px' }}>{rowData.TotalOffering}</td>
          <td style={{ color: 'white' }} className={'text-right td_elips2'}><div style={{ width: '100%', float: 'right' }}><div>{rowData.DealType}</div></div></td>
        </tr >
      );
    };

    return (
      <ABSPanel className={'pull-refresh-wrapper'}>
        <div className="abs-picker">
          <Picker
            title="选择市场"
            data={this.props.productType}
            cascade={false}
            value={this.props.productTypeValue}
            onOk={v => this.PickerChange('ProductTypeValue', v)}
          >
            <PickerChildren first={true}>选择市场</PickerChildren>
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
            title="选择状态"
            data={this.props.currentStatus}
            cascade={false}
            value={this.props.currentStatusValue}
            onOk={v => this.PickerChange('CurrentStatusValue', v)}
          >
            <PickerChildren>选择状态</PickerChildren>
          </Picker>
        </div>
        <div className="abs-scrollview-container">
          <ListView
            key={this.props.useBodyScroll ? '0' : '1'}
            ref={el => lv = el}
            dataSource={this.props.dataSource}
            initialListSize={this.props.initialListSize}
            renderFooter={() => (<div style={{ textAlign: 'center' }}>
              {this.props.info}
            </div>)}
            renderSectionBodyWrapper={(BodyKey) => <MyBody key={BodyKey} CurrentStatus={this.props.currentStatus} CurrentStatusValue={this.props.currentStatusValue} DealType={this.props.dealType} DealTypeValue={this.props.dealTypeValue} ProductType={this.props.productType} ProductTypeValue={this.props.productTypeValue} />}
            renderRow={row}
            useBodyScroll={this.props.useBodyScroll}
            // style={this.props.useBodyScroll ? { minHeight: '500px' } : {
            //   height: 'auto',
            // }}
            pullToRefresh={<PullToRefresh
              maxscreeny={100}
              getScrollContainer={() => lv}
              direction={'down'}
              refreshing={this.props.refreshing}
              onRefresh={this.onRefresh}
              distanceToRefresh={25}
              indicator={{
                activate: <Spinner name="double-bounce" color="goldenrod" />, // <div>释放更新</div>,
                deactivate: <Spinner name="three-bounce" color="purple" />,  // <div>下拉刷新</div>,
                release: <Spinner name="cube-grid" color="coral" />,
                finish: <Spinner name="ball-scale-ripple" color="olive" />,
              }}
            />}
            onEndReached={this.onEndReached}
            onScroll={this.onScroll}
            pageSize={15}
          />
        </div>
      </ABSPanel>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    ...state.product,
  };
}
export default withRouter(connect(mapStateToProps)(Product));
