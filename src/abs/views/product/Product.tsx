import * as React from 'react';
import { Link, withRouter } from 'dva/router';
import { ListView, Picker } from 'antd-mobile';  // WingBlank, SegmentedControl,
import PullToRefresh from '../../../components/rmc-pull-to-refresh';
import '../components/control.less';
import { connect } from 'dva';
import ABSPanel from '../components/abs-panel';
import RoutePageList from '../../RouterConfig';
import ReactDOM from 'react-dom';
import PickerChildren from '../components/abs-pickerchildren';
// import { ABSContentLoader } from '../components/abs-loader/index';

// 列表组件
function MyBody(props: any) {
  return (
    <div className="abs-table abs-table-product">
      <table cellSpacing={0} cellPadding={0} style={{ tableLayout: 'fixed' }}>
        <thead>
          <tr>
            <th className="text-left">产品名称</th>
            <th style={{ width: '65px' }}>总额(亿)</th>
            <th style={{ width: '31%' }}>产品分类</th>
          </tr>
        </thead>
        <tbody>
          {props.children}
        </tbody>
      </table>
    </div>
  );
}

class Product extends React.Component<any, {}> {
  lv: ListView | null;
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
    if (this.lv) {
      this.lv.scrollTo(0, scrollTop);
    }

  }

  /**
   * 在滚动的过程中，每帧最多调用一次此回调函数。调用的频率可以用scrollEventThrottle属性来控制。
   * 
   * @memberof Trade
   */
  onScroll = (e) => {
    // 保存滚动条位置
    this.props.dispatch({
      type: 'product/onScroll',
      scrollTop: (ReactDOM.findDOMNode(this.lv as ListView)).scrollTop,
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
            <Link to={`${RoutePageList.ProductDetailPage}/${rowData.DealId}`}><div className={'abs_ellipsis'} style={{ width: '108%' }}>{rowData.DealName}</div></Link>
          </td>
          <td className={'text-right highLight-red'} style={{ fontSize: '17px' }}>{rowData.TotalOffering}</td>
          <td style={{ color: 'white' }} className={'text-right'}><div className={'abs_ellipsis'} style={{ width: '108%' }}>{rowData.DealType}</div></td>
        </tr >
      );
    };

    return (
      <ABSPanel className={'abs-pull-refresh-wrapper'}>
        <div className="abs-picker">
          <Picker
            title="选择市场"
            data={this.props.productType}
            cascade={false}
            value={this.props.productTypeValue}
            onOk={v => this.PickerChange('ProductTypeValue', v)}
          >
            <PickerChildren />
          </Picker>
          <Picker
            title="选择产品"
            data={this.props.dealType}
            cascade={false}
            value={this.props.dealTypeValue}
            onOk={v => this.PickerChange('DealTypeValue', v)}
          >
            <PickerChildren />
          </Picker>
          <Picker
            title="选择状态"
            data={this.props.currentStatus}
            cascade={false}
            value={this.props.currentStatusValue}
            onOk={v => this.PickerChange('CurrentStatusValue', v)}
          >
            <PickerChildren />
          </Picker>
        </div>
        <div className="abs-scrollview-container">
          <ListView
            key={this.props.useBodyScroll ? '0' : '1'}
            ref={el => this.lv = el}
            dataSource={this.props.dataSource}
            initialListSize={this.props.initialListSize}
            renderFooter={() => (<div style={{ textAlign: 'center', color: 'grey' }}>
              {this.props.info}
            </div>)}
            renderSectionBodyWrapper={(BodyKey) => <MyBody key={BodyKey} CurrentStatus={this.props.currentStatus} CurrentStatusValue={this.props.currentStatusValue} DealType={this.props.dealType} DealTypeValue={this.props.dealTypeValue} ProductType={this.props.productType} ProductTypeValue={this.props.productTypeValue} />}
            renderRow={row}
            useBodyScroll={this.props.useBodyScroll}
            pullToRefresh={<PullToRefresh
              getScrollContainer={() => this.lv}
              refreshing={this.props.refreshing}
              onRefresh={this.onRefresh}
              indicator={{
                activate: <div style={{ height: 25, textAlign: 'center' }}>释放更新</div>,
                deactivate: <div style={{ height: 25, textAlign: 'center' }}>下拉刷新</div>,
                release: <div style={{ height: 25, textAlign: 'center' }}>正在刷新...</div>,
                finish: <div style={{ height: 25, textAlign: 'center' }}>完成刷新</div>
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
