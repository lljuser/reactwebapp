import * as React from 'react'; 
import ABSPanel from '../components/abs-panel';
import Detail from './Detail';
import Structure from './Structure';
import NoteList from './NoteList';
import { ABSNavBar } from '../components/abs-navbar';
import ABSChartMarket from '../components/abs-chart';
import { connect } from 'dva';
import RoutePageList from '../../RouterConfig';
import { PageLoader } from '../PageLoader';

function mapStateToProps(state: any) {
  return {
    ...state.productdetail
  };
}

class ProductDetail extends React.Component<any, any> {

  componentDidMount() {
    // 进入同一id，只查询一次
    const id = this.props.match.params.id;
    if ( this.props.id !== id ) {
      this.props.getData(id);
    }
  }

  render() {
    // 显示loading动画
    if ( this.props.loading === true ) {
      return (
        <React.Fragment>
        <ABSNavBar 
          title="产品详情" 
          linkTo={{ 
              pathname: `${RoutePageList.HomePage}`, 
              state: {
                type: 'product'
              } 
          }}
        />  
          <PageLoader/>
      </React.Fragment>
      );
    } else {
      // 显示详情页面
      return ( 
          <React.Fragment>
            <ABSNavBar 
              title="产品详情" 
              linkTo={{ 
                  pathname: `${RoutePageList.HomePage}`, 
                  state: {
                    type: 'product'
                  } 
              }}
            />   
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
          </React.Fragment> 
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