import * as React from 'react';
import ABSPanel from '../components/abs-panel';
import Detail from './Detail';
import Structure from './Structure';
import NoteList from './NoteList';
import { ABSNavBar } from '../components/abs-navbar';
import ABSChartMarket from '../components/abs-chart';
import { connect } from 'dva';
import RoutePageList from '../../RouterConfig'; 
import './theme_old.less';
import '../components/index.less';
import { ABSContentLoader } from '../components/abs-loader/index';
import ABSContainer from '../components/abs-container/index';

function mapStateToProps(state: any) {
  return {
    ...state.productdetail
  };
}

class ProductDetail extends React.Component<any, any> {

  componentDidMount() {
    // 进入同一id，只查询一次
    const id = this.props.match.params.id;
    if (this.props.id !== id) {
      this.props.getData(id);
    }
  }

  render() {
    // 显示loading动画
    if (this.props.loading === true) {
      return (
        <React.Fragment>
          <ABSNavBar
            title=""
            linkTo={{
              pathname: `${RoutePageList.HomePage}`,
              state: {
                type: 'product'
              }
            }}
          />
          <ABSContentLoader /> 
        </React.Fragment>
      );
    } else {
      // 显示详情页面
      return (
        <ABSContainer> 
          <ABSNavBar
            title={this.props.detail.Basic.DealName}
            linkTo={{
              pathname: `${RoutePageList.HomePage}`,
              state: {
                type: 'product'
              }
            }}
          />   
          <div className="appH5_content">
          <ABSPanel title="产品要素" >
            
              <Detail detail={this.props.detail} />
          </ABSPanel>
          <ABSPanel title="证券结构" >
              <Structure noteConsTable={this.props.noteConsTable} />
           
          </ABSPanel>
          <ABSPanel title="证券列表" >
            <NoteList detail={this.props.detail} />
          </ABSPanel>
          {
            (!this.props.chart) ? null :
              <ABSPanel title="证券偿付">
                    <ABSChartMarket data={this.props.chart} />
              </ABSPanel>
          }
          </div> 
        </ABSContainer> 
      );
    }

  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    getData: (id) => {
      dispatch({ type: 'productdetail/getData', id: id });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);