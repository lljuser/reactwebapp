import * as React from 'react';
// import { NavBar, Icon } from 'antd-mobile'; 
// import { Link } from 'dva/router';
import ABSPanel from '../components/abs-panel';
import Detail from './product/Detail';
// import Structure from './product/Structure';
// import NoteList from './product/NoteList';
import { ABSNavBar } from '../components/abs-navbar';
import ABSChartMarket from '../components/abs-chart';
import { ABSContentLoader } from '../components/abs-loader';
import { connect } from 'dva';
import '../../public/css/themeCopy.less';
import RoutePageList from '../RouterConfig';
// import { Facebook } from 'react-content-loader';

function mapStateToProps(state: any) {
  return {
    ...state.productdetail
  };
}

class ProductDetail extends React.Component<any, any> {

  componentDidMount() {
    const id = this.props.match.params.id;
    if ( this.props.id !== id ) {
      this.props.getData(id);
    }
  }

  render() {
    return (
      <div>
        <div>
          <ABSNavBar 
            title="产品详情" 
            linkTo={{ 
                pathname: `${RoutePageList.HomePage}`, 
                state: {
                  type: 'product'
                } 
            }}
          /> 
          <ABSContentLoader />
        </div>
        <div className="appH5_body">
          <div className="appH5_content">
            <React.Fragment>
              <ABSPanel title="产品要素" >
                <Detail detail={this.props.detail} />
              </ABSPanel>
              <ABSPanel title="证券结构" >
                {/* <Structure noteConsTable={this.props.noteConsTable} /> */}
              </ABSPanel>
              <ABSPanel title="证券列表" >
                {/* <NoteList detail={this.props.detail} /> */}
              </ABSPanel>
              {
                (!this.props.chart) ? null :
                  <ABSPanel title="证券偿付">
                      <ABSChartMarket data={this.props.chart} />
                  </ABSPanel>
              }
              
            </React.Fragment>
          </div>
        </div>
      </div>
    );
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