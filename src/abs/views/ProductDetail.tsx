import * as React from 'react';
// import { NavBar, Icon } from 'antd-mobile'; 
// import { Link } from 'dva/router';
import ABSPanel from '../components/abs-panel';
import Detail from './product/Detail';
import Structure from './product/Structure';
import NoteList from './product/NoteList';
import { ABSNavBar } from '../components/abs-navbar';
import ABSChartMarket from '../components/abs-chart';
import { connect } from 'dva';
import '../../public/css/themeCopy.less';

function mapStateToProps(state: any) {
  return {
    ...state.productdetail
  };
}

class ProductDetail extends React.Component<any, any> {

  componentDidMount() {
    // if (this.props.detail && this.props.detail.length > 0) {
    //   return;
    // }
    const id = this.props.match.params.id;
    this.props.dispatch({ type: 'productdetail/getData', id: id });
  }

  render() {
    return (
      <div>
        <div>
          <ABSNavBar 
            title="产品详情" 
            linkTo={{ 
                pathname: '/home',
                state: {type: 'product'} 
            }} 
          />
        </div>
        <div className="appH5_body">
          <React.Fragment>
            <ABSPanel title="产品要素" >
              <Detail detail={this.props.detail} />
            </ABSPanel>
            <ABSPanel title="证券结构" >
              <Structure detail={this.props.noteConsTable} />
            </ABSPanel>
            <ABSPanel title="证券列表" >
              <NoteList detail={this.props.detail} />
            </ABSPanel>
            <ABSPanel title="证券偿付">
              <ABSChartMarket data={this.props.chart} />
            </ABSPanel>
          </React.Fragment>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(ProductDetail);