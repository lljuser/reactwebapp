import * as React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import '../../components/abs-tabs/index.less'; 
import '../../../public/css/theme.css';
import moment from 'moment';

class Detail extends React.Component<any, {}> {

  componentDidMount() {

    // 阻止其再次请求数据，如果state中已经有数据了
    // if (this.props.detail && this.props.detail.length > 0) {
    //   return;
    // }
    // this.props.dispatch({type: 'productdetail/getDetail', id: id});
  }

  render() {
    console.log(this.props);
    if (this.props.detail !== null && this.props.detail !== undefined) {
      return (
        <table className="appH5_list_two" >
        <tbody>
            <tr>
                <td>产品名称</td>
                <td>{this.props.detail.Basic.DealNameChinese}</td>
            </tr>
            <tr>
                <td>产品分类</td>
                <td>
                    <div><Link to={`/product/${this.props.detail.Basic.ProductTypeId}`}>{this.props.detail.Basic.ProductType}</Link></div>
                    <div>&nbsp;└&nbsp;<Link to={{pathname: `/product/${this.props.detail.Basic.ProductTypeId}/${this.props.detail.Basic.DealTypeId}}`, state: { type: 'product' }}}>{this.props.detail.Basic.DealType}</Link></div>
                    {this.props.detail.Basic.AssetSubCategoryId != null ?  <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└&nbsp;{this.props.detail.Basic.AssetSubCategory}</div> : ''} 
                </td>
            </tr>
            <tr>
            <td>产品状态</td>
            <td>{this.props.detail.Basic.CurrentStatus}</td>
            </tr>
            <tr>
            <td>成立日期</td>
            <td>
            {this.props.detail.Basic.ClosingDate != null ? moment(this.props.detail.Basic.ClosingDate).format('YYYY年MM月DD日') : '-'}</td>
            </tr>
            <tr>
            <td>发起机构</td>
            <td>
            {
              this.props.detail.Basic.DealOriginator.map((item) =>
                <div key={item}>
                    <span>{item}</span><br/>
                </div> 
              )
            }
               
            </td>
            </tr>
            <tr>
            <td style={{verticalAlign: 'middle'}}>金额(亿)</td>
            <td className="appH5_font_largest appH5_color_red">{this.props.detail.Basic.TotalOffering}</td>
            </tr>
          </tbody>
        </table>
      );
    } else {
      return '';
    }
  }
}

function mapStateToProps(state: any) {

  return {
    ...state.productdetail
  };
}

export default connect(mapStateToProps)(Detail);