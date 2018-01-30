import * as React from 'react';
import { connect } from 'dva';
import '../components/abs-tabs/index.less'; 

class ABSTableMarketComponent extends React.Component<any> {

  componentDidMount() {
    // 阻止其再次请求数据，如果state中已经有数据了
    if (this.props.marketSummary && this.props.marketSummary.length > 0) {
      return;
    }

    this.props.dispatch({type: 'market/fetch'});
  }

  render() {
    return (
      <div className="abs-table abs-table-market" >
        <table>
          <thead>
            <tr>
                <th>分类</th>
                <th>今年(单)</th>
                <th>今年(亿)</th>
                <th>累计(亿)</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.marketSummary.map((item) =>
                <tr key={item.ProductTypeId}>
                  <td><a href="javascript:"> {item.SimpleProductType}</a></td>
                  <td>{item.DealCountCurrentYear}</td>
                  <td className="highLight-red">{item.BalanceCurrentYear}</td>
                  <td>{item.BalanceCumulative}</td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  
  return {
    ...state.market
  };
}

export default connect(mapStateToProps)(ABSTableMarketComponent);