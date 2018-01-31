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
    let aaa: any;
    console.log(this.props);
    aaa = (
      <div>
        <div>
          <ABSNavBar
            title="产品信息"
            path="/product"
          />
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
    console.log(11111);
    console.log(aaa);
    return aaa;
  }
}

export default connect(mapStateToProps)(ProductDetail);