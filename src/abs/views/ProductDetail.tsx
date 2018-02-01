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
import RoutePageList from '../RouterConfig';
import ContentLoader, { Facebook } from 'react-content-loader';
import SpinnerLoader from 'react-loader-spinner';

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
          <SpinnerLoader 
            type="Grid"
            color="orange"
            height="100"	
            width="100"
          /> 
          <SpinnerLoader type="Oval" color="#00BFFF" height={80} width={80}/>  
          <Facebook speed={2} primaryColor="#ffc446" secondaryColor="#444444" />
          <ContentLoader speed={10} primaryColor="#ffc446" secondaryColor="#444444">
            {/* Pure SVG */}
            <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
            <rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
            <rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
          </ContentLoader>
        </div>
        <div className="appH5_body">
        <div className="appH5_content">
          <React.Fragment>
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